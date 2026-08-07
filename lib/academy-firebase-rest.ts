export type AcademySession = {
  idToken: string;
  uid: string;
  email: string;
  expiresAt: number;
};

export type CreatorApplication = {
  id: string;
  uid: string;
  email: string;
  fullName: string;
  phone: string;
  province: string;
  expertise: string;
  experience: string;
  sampleLink: string;
  status: "pending" | "approved" | "rejected";
  adminNote: string;
  createdAt: string;
  updatedAt: string;
};

export type AcademyCourseRecord = {
  id: string;
  creatorId: string;
  creatorName: string;
  titleKm: string;
  titleEn: string;
  descriptionKm: string;
  descriptionEn: string;
  category: string;
  priceRiel: number;
  coverImage: string;
  coverPath: string;
  videoPath: string;
  videoFileName: string;
  status: "pending" | "published" | "rejected";
  adminNote: string;
  createdAt: string;
  updatedAt: string;
};

const apiKey =
  process.env.NEXT_PUBLIC_ACADEMY_FIREBASE_API_KEY ??
  "AIzaSyAn2AB1Lx0z2zf1GGkfdq2SCa7hC8nzJgM";
const projectId =
  process.env.NEXT_PUBLIC_ACADEMY_FIREBASE_PROJECT_ID ?? "sesan-academy";
const storageBucket =
  process.env.NEXT_PUBLIC_ACADEMY_FIREBASE_STORAGE_BUCKET ??
  "sesan-academy.firebasestorage.app";
const firestoreBase = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

type FirestoreValue =
  | {stringValue: string}
  | {booleanValue: boolean}
  | {integerValue: string}
  | {timestampValue: string};

type FirestoreDocument = {
  name: string;
  fields?: Record<string, FirestoreValue>;
};

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  const data = (await response.json().catch(() => ({}))) as T & {
    error?: {message?: string};
  };
  if (!response.ok) throw new Error(data.error?.message || "ACADEMY_FIREBASE_ERROR");
  return data;
}

function sessionFromAuth(auth: {
  idToken: string;
  localId: string;
  email: string;
  expiresIn: string;
}): AcademySession {
  return {
    idToken: auth.idToken,
    uid: auth.localId,
    email: auth.email,
    expiresAt: Date.now() + Number(auth.expiresIn) * 1000,
  };
}

export async function registerAcademyUser(email: string, password: string) {
  const auth = await requestJson<{
    idToken: string;
    localId: string;
    email: string;
    expiresIn: string;
  }>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email, password, returnSecureToken: true}),
  });
  return sessionFromAuth(auth);
}

export async function signInAcademyUser(email: string, password: string) {
  const auth = await requestJson<{
    idToken: string;
    localId: string;
    email: string;
    expiresIn: string;
  }>(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password, returnSecureToken: true}),
    },
  );
  return sessionFromAuth(auth);
}

function fieldString(fields: FirestoreDocument["fields"], name: string) {
  const value = fields?.[name];
  return value && "stringValue" in value ? value.stringValue : "";
}

function fieldInteger(fields: FirestoreDocument["fields"], name: string) {
  const value = fields?.[name];
  return value && "integerValue" in value ? Number(value.integerValue) || 0 : 0;
}

function courseFromDocument(document: FirestoreDocument): AcademyCourseRecord {
  const fields = document.fields;
  const status = fieldString(fields, "status");
  return {
    id: document.name.split("/").pop() ?? "",
    creatorId: fieldString(fields, "creatorId"),
    creatorName: fieldString(fields, "creatorName"),
    titleKm: fieldString(fields, "titleKm"),
    titleEn: fieldString(fields, "titleEn"),
    descriptionKm: fieldString(fields, "descriptionKm"),
    descriptionEn: fieldString(fields, "descriptionEn"),
    category: fieldString(fields, "category"),
    priceRiel: fieldInteger(fields, "priceRiel"),
    coverImage: fieldString(fields, "coverImage"),
    coverPath: fieldString(fields, "coverPath"),
    videoPath: fieldString(fields, "videoPath"),
    videoFileName: fieldString(fields, "videoFileName"),
    status: status === "published" || status === "rejected" ? status : "pending",
    adminNote: fieldString(fields, "adminNote"),
    createdAt: fieldString(fields, "createdAt"),
    updatedAt: fieldString(fields, "updatedAt"),
  };
}

function courseFields(course: AcademyCourseRecord) {
  return {
    creatorId: {stringValue: course.creatorId},
    creatorName: {stringValue: course.creatorName},
    titleKm: {stringValue: course.titleKm},
    titleEn: {stringValue: course.titleEn},
    descriptionKm: {stringValue: course.descriptionKm},
    descriptionEn: {stringValue: course.descriptionEn},
    category: {stringValue: course.category},
    priceRiel: {integerValue: String(course.priceRiel)},
    coverImage: {stringValue: course.coverImage},
    coverPath: {stringValue: course.coverPath},
    videoPath: {stringValue: course.videoPath},
    videoFileName: {stringValue: course.videoFileName},
    status: {stringValue: course.status},
    adminNote: {stringValue: course.adminNote},
    createdAt: {stringValue: course.createdAt},
    updatedAt: {stringValue: course.updatedAt},
  };
}

function applicationFromDocument(document: FirestoreDocument): CreatorApplication {
  const fields = document.fields;
  const status = fieldString(fields, "status");
  return {
    id: document.name.split("/").pop() ?? "",
    uid: fieldString(fields, "uid"),
    email: fieldString(fields, "email"),
    fullName: fieldString(fields, "fullName"),
    phone: fieldString(fields, "phone"),
    province: fieldString(fields, "province"),
    expertise: fieldString(fields, "expertise"),
    experience: fieldString(fields, "experience"),
    sampleLink: fieldString(fields, "sampleLink"),
    status: status === "approved" || status === "rejected" ? status : "pending",
    adminNote: fieldString(fields, "adminNote"),
    createdAt: fieldString(fields, "createdAt"),
    updatedAt: fieldString(fields, "updatedAt"),
  };
}

function applicationFields(application: CreatorApplication) {
  return {
    uid: {stringValue: application.uid},
    email: {stringValue: application.email},
    fullName: {stringValue: application.fullName},
    phone: {stringValue: application.phone},
    province: {stringValue: application.province},
    expertise: {stringValue: application.expertise},
    experience: {stringValue: application.experience},
    sampleLink: {stringValue: application.sampleLink},
    status: {stringValue: application.status},
    adminNote: {stringValue: application.adminNote},
    createdAt: {stringValue: application.createdAt},
    updatedAt: {stringValue: application.updatedAt},
  };
}

export async function getCreatorApplication(session: AcademySession) {
  const response = await fetch(
    `${firestoreBase}/academyCreatorApplications/${encodeURIComponent(session.uid)}`,
    {headers: {Authorization: `Bearer ${session.idToken}`}, cache: "no-store"},
  );
  if (response.status === 404) return null;
  const data = (await response.json().catch(() => ({}))) as FirestoreDocument & {
    error?: {message?: string};
  };
  if (!response.ok) throw new Error(data.error?.message || "ACADEMY_FIREBASE_ERROR");
  return applicationFromDocument(data);
}

export async function saveCreatorApplication(
  session: AcademySession,
  input: Pick<CreatorApplication, "fullName" | "phone" | "province" | "expertise" | "experience" | "sampleLink">,
) {
  const existing = await getCreatorApplication(session);
  const now = new Date().toISOString();
  const application: CreatorApplication = {
    id: session.uid,
    uid: session.uid,
    email: session.email,
    ...input,
    status: existing?.status === "approved" ? "approved" : "pending",
    adminNote: existing?.adminNote ?? "",
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };
  await requestJson(
    `${firestoreBase}/academyCreatorApplications/${encodeURIComponent(session.uid)}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({fields: applicationFields(application)}),
    },
  );
  return application;
}

export async function signInAcademyAdmin(email: string, password: string) {
  const session = await signInAcademyUser(email, password);
  const admin = await requestJson<FirestoreDocument>(
    `${firestoreBase}/academyAdmins/${encodeURIComponent(session.uid)}`,
    {headers: {Authorization: `Bearer ${session.idToken}`}},
  );
  const active = admin.fields?.active;
  if (!active || !("booleanValue" in active) || active.booleanValue !== true) {
    throw new Error("NOT_ACADEMY_ADMIN");
  }
  return session;
}

export async function listCreatorApplications(session: AcademySession) {
  const data = await requestJson<{documents?: FirestoreDocument[]}>(
    `${firestoreBase}/academyCreatorApplications?pageSize=500`,
    {headers: {Authorization: `Bearer ${session.idToken}`}, cache: "no-store"},
  );
  return (data.documents ?? [])
    .map(applicationFromDocument)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function reviewCreatorApplication(
  session: AcademySession,
  application: CreatorApplication,
  status: "approved" | "rejected",
  adminNote: string,
) {
  const now = new Date().toISOString();
  const reviewed = {...application, status, adminNote, updatedAt: now};
  const writes: object[] = [
    {
      update: {
        name: `projects/${projectId}/databases/(default)/documents/academyCreatorApplications/${application.uid}`,
        fields: applicationFields(reviewed),
      },
    },
  ];
  if (status === "approved") {
    writes.push({
      update: {
        name: `projects/${projectId}/databases/(default)/documents/academyCreators/${application.uid}`,
        fields: {
          uid: {stringValue: application.uid},
          email: {stringValue: application.email},
          displayName: {stringValue: application.fullName},
          expertise: {stringValue: application.expertise},
          active: {booleanValue: true},
          totalSales: {integerValue: "0"},
          availableBalance: {integerValue: "0"},
          pendingBalance: {integerValue: "0"},
          approvedAt: {stringValue: now},
        },
      },
    });
  }
  await requestJson(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:commit`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({writes}),
    },
  );
  return reviewed;
}

function safeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-");
}

export async function uploadAcademyCourseFile(
  session: AcademySession,
  file: File,
  kind: "cover" | "video",
) {
  const folder = kind === "cover" ? "academy-course-covers" : "academy-course-videos";
  const path = `${folder}/${session.uid}/${Date.now()}-${safeFileName(file.name)}`;
  const uploaded = await requestJson<{name: string}>(
    `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o?uploadType=media&name=${encodeURIComponent(path)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.idToken}`,
        "Content-Type": file.type,
      },
      body: file,
    },
  );
  return {
    path: uploaded.name,
    publicUrl: kind === "cover"
      ? `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(uploaded.name)}?alt=media`
      : "",
  };
}

export async function listCreatorCourses(session: AcademySession) {
  const data = await requestJson<Array<{document?: FirestoreDocument}>>(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({structuredQuery: {
        from: [{collectionId: "academyCourses"}],
        where: {fieldFilter: {
          field: {fieldPath: "creatorId"},
          op: "EQUAL",
          value: {stringValue: session.uid},
        }},
      }}),
    },
  );
  return data.flatMap(item => item.document ? [courseFromDocument(item.document)] : [])
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function listAllAcademyCourses(session: AcademySession) {
  const data = await requestJson<{documents?: FirestoreDocument[]}>(
    `${firestoreBase}/academyCourses?pageSize=500`,
    {headers: {Authorization: `Bearer ${session.idToken}`}, cache: "no-store"},
  );
  return (data.documents ?? []).map(courseFromDocument)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function submitAcademyCourse(
  session: AcademySession,
  input: Omit<AcademyCourseRecord, "id" | "creatorId" | "status" | "adminNote" | "createdAt" | "updatedAt">,
) {
  const now = new Date().toISOString();
  const id = `${session.uid}-${Date.now()}`;
  const course: AcademyCourseRecord = {
    id,
    creatorId: session.uid,
    ...input,
    status: "pending",
    adminNote: "",
    createdAt: now,
    updatedAt: now,
  };
  await requestJson(`${firestoreBase}/academyCourses/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session.idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({fields: courseFields(course)}),
  });
  return course;
}

export async function reviewAcademyCourse(
  session: AcademySession,
  course: AcademyCourseRecord,
  status: "published" | "rejected",
  adminNote: string,
) {
  const updated = {...course, status, adminNote, updatedAt: new Date().toISOString()};
  await requestJson(`${firestoreBase}/academyCourses/${encodeURIComponent(course.id)}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session.idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({fields: courseFields(updated)}),
  });
  return updated;
}

export async function getAcademyVideoBlobUrl(
  session: AcademySession,
  videoPath: string,
) {
  const response = await fetch(
    `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(videoPath)}?alt=media`,
    {headers: {Authorization: `Bearer ${session.idToken}`}},
  );
  if (!response.ok) throw new Error("VIDEO_PREVIEW_FAILED");
  return URL.createObjectURL(await response.blob());
}

export function readableAcademyError(error: unknown) {
  const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";
  if (message.includes("EMAIL_EXISTS")) return "អ៊ីមែលនេះបានចុះឈ្មោះរួចហើយ។";
  if (message.includes("INVALID_LOGIN_CREDENTIALS")) return "អ៊ីមែល ឬលេខសម្ងាត់មិនត្រឹមត្រូវ។";
  if (message.includes("WEAK_PASSWORD")) return "លេខសម្ងាត់ត្រូវមានយ៉ាងតិច 6 តួ។";
  if (message.includes("PERMISSION_DENIED")) return "Firebase Rules មិនទាន់អនុញ្ញាតមុខងារនេះទេ។";
  if (message.includes("NOT_ACADEMY_ADMIN")) return "គណនីនេះមិនមែនជា Academy Admin ទេ។";
  if (message.includes("storage/unauthorized")) return "អ្នកមិនមានសិទ្ធិ Upload ឯកសារនេះទេ។";
  return "មានបញ្ហាក្នុងការភ្ជាប់ Sesan Academy។ សូមសាកល្បងម្ដងទៀត។";
}
