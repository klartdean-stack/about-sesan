import {academyAdministrator} from "@/lib/academy-server";
import {academyAdminFetch, academyFirestoreBase} from "@/lib/firebase-admin";

type Value = {stringValue?: string; integerValue?: string};

export async function POST(request: Request) {
  const input = await request.json().catch(() => ({})) as {idToken?: string};
  const admin = await academyAdministrator(input.idToken);
  if (!admin) return Response.json({error: "NOT_ACADEMY_ADMIN"}, {status: 403});
  const response = await academyAdminFetch(`${academyFirestoreBase}/academyManualPayments?pageSize=100`);
  const data = await response.json() as {documents?: Array<{fields?: Record<string, Value>}>};
  if (!response.ok) return Response.json({error: "PAYMENT_LIST_FAILED"}, {status: 500});
  const payments = (data.documents || []).map(({fields = {}}) => ({
    paymentId: fields.paymentId?.stringValue || "",
    buyerEmail: fields.buyerEmail?.stringValue || "",
    courseId: fields.courseId?.stringValue || "",
    courseTitle: fields.courseTitle?.stringValue || "",
    amountRiel: Number(fields.amountRiel?.integerValue || 0),
    status: fields.status?.stringValue || "pending",
    adminNote: fields.adminNote?.stringValue || "",
    createdAt: fields.createdAt?.stringValue || "",
  })).filter((item) => item.paymentId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return Response.json({payments});
}
