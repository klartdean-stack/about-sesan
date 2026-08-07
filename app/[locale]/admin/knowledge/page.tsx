"use client";

import Link from "next/link";
import Image from "next/image";
import {useParams} from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  Eye,
  FileText,
  Languages,
  LayoutDashboard,
  Pencil,
  Plus,
  Save,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import {FormEvent, useEffect, useMemo, useState} from "react";

type ArticleStatus = "draft" | "published";

type KnowledgeArticle = {
  id: string;
  titleKm: string;
  titleEn: string;
  summaryKm: string;
  summaryEn: string;
  contentKm: string;
  contentEn: string;
  category: string;
  coverImage: string;
  status: ArticleStatus;
  featured: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "sesan-knowledge-admin-articles";

const categories = [
  "ដំណាំ និងបច្ចេកទេស",
  "ការពារដំណាំ",
  "ដី និងជី",
  "ការចិញ្ចឹមសត្វ",
  "ទីផ្សារ និងអាជីវកម្ម",
  "បច្ចេកវិទ្យាកសិកម្ម",
];

const initialArticles: KnowledgeArticle[] = [
  {
    id: "prepare-soil-for-vegetables",
    titleKm: "វិធីរៀបចំដីមុនពេលដាំបន្លែ",
    titleEn: "How to prepare soil before planting vegetables",
    summaryKm:
      "ជំហានសំខាន់ៗក្នុងការរៀបចំដី ដែលជួយឫសដុះល្អ និងកាត់បន្ថយបញ្ហាទឹកជន់។",
    summaryEn:
      "Important soil preparation steps that help roots grow well and reduce waterlogging problems.",
    contentKm: "",
    contentEn: "",
    category: "ដី និងជី",
    coverImage: "",
    status: "published",
    featured: true,
    updatedAt: "2026-08-07T09:00:00.000Z",
  },
  {
    id: "common-leaf-diseases",
    titleKm: "សញ្ញាដំបូងនៃជំងឺស្លឹកដំណាំ",
    titleEn: "Early signs of common leaf diseases",
    summaryKm:
      "សម្គាល់ពណ៌ស្លឹក ស្នាមអុជ និងការខូចខាតមិនប្រក្រតី មុនជំងឺរីករាលដាលធ្ងន់ធ្ងរ។",
    summaryEn:
      "Recognize unusual leaf colors, spots and damage before the disease becomes severe.",
    contentKm: "",
    contentEn: "",
    category: "ការពារដំណាំ",
    coverImage: "",
    status: "draft",
    featured: false,
    updatedAt: "2026-08-06T09:00:00.000Z",
  },
  {
    id: "reduce-farming-costs",
    titleKm: "គន្លឹះកាត់បន្ថយថ្លៃដើមកសិកម្ម",
    titleEn: "Simple ways to reduce farming production costs",
    summaryKm:
      "រៀបចំសម្ភារៈ កម្លាំងពលកម្ម និងធាតុចូលកសិកម្មឱ្យបានត្រឹមត្រូវ ដើម្បីបង្កើនប្រាក់ចំណេញ។",
    summaryEn:
      "Plan materials, labor and farm inputs carefully to improve profitability.",
    contentKm: "",
    contentEn: "",
    category: "ទីផ្សារ និងអាជីវកម្ម",
    coverImage: "",
    status: "published",
    featured: false,
    updatedAt: "2026-08-05T09:00:00.000Z",
  },
];

const emptyArticle = (): KnowledgeArticle => ({
  id: crypto.randomUUID(),
  titleKm: "",
  titleEn: "",
  summaryKm: "",
  summaryEn: "",
  contentKm: "",
  contentEn: "",
  category: categories[0],
  coverImage: "",
  status: "draft",
  featured: false,
  updatedAt: new Date().toISOString(),
});

export default function KnowledgeAdminPage() {
  const params = useParams<{locale: string}>();
  const locale = params.locale === "en" ? "en" : "km";
  const [articles, setArticles] = useState<KnowledgeArticle[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ArticleStatus>("all");
  const [editingArticle, setEditingArticle] = useState<KnowledgeArticle | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<"km" | "en">("km");
  const [savedNotice, setSavedNotice] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const savedArticles = window.localStorage.getItem(STORAGE_KEY);
        if (savedArticles) {
          setArticles(JSON.parse(savedArticles) as KnowledgeArticle[]);
        }
      } catch {
        setArticles(initialArticles);
      } finally {
        setReady(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (ready) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    }
  }, [articles, ready]);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();

    return articles.filter((article) => {
      const matchesStatus = statusFilter === "all" || article.status === statusFilter;
      const matchesQuery =
        query.length === 0 ||
        article.titleKm.toLocaleLowerCase().includes(query) ||
        article.titleEn.toLocaleLowerCase().includes(query) ||
        article.category.toLocaleLowerCase().includes(query);

      return matchesStatus && matchesQuery;
    });
  }, [articles, searchQuery, statusFilter]);

  const publishedCount = articles.filter((article) => article.status === "published").length;
  const draftCount = articles.length - publishedCount;

  function openNewArticle() {
    setActiveLanguage("km");
    setEditingArticle(emptyArticle());
  }

  function updateEditingArticle<K extends keyof KnowledgeArticle>(
    field: K,
    value: KnowledgeArticle[K],
  ) {
    setEditingArticle((current) =>
      current ? {...current, [field]: value} : current,
    );
  }

  function saveArticle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editingArticle?.titleKm.trim() || !editingArticle.titleEn.trim()) return;

    const savedArticle = {
      ...editingArticle,
      updatedAt: new Date().toISOString(),
    };

    setArticles((current) => {
      const exists = current.some((article) => article.id === savedArticle.id);
      return exists
        ? current.map((article) =>
            article.id === savedArticle.id ? savedArticle : article,
          )
        : [savedArticle, ...current];
    });

    setEditingArticle(null);
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2500);
  }

  function deleteArticle(article: KnowledgeArticle) {
    const confirmed = window.confirm(`តើបងពិតជាចង់លុប “${article.titleKm}” មែនទេ?`);
    if (!confirmed) return;
    setArticles((current) => current.filter((item) => item.id !== article.id));
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat(locale === "km" ? "km-KH" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  }

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <Image src="/sesan-logo.png" alt="Sesan" width={40} height={40} className="h-10 w-10 object-contain" />
              <div className="hidden sm:block">
                <p className="text-lg font-black leading-none text-green-700">SESAN</p>
                <p className="mt-1 text-[8px] font-black tracking-[0.32em] text-amber-500">GROUP</p>
              </div>
            </Link>
            <span className="h-8 w-px bg-slate-200" />
            <div>
              <p className="text-sm font-black sm:text-base">Knowledge Admin</p>
              <p className="text-xs text-slate-500">គ្រប់គ្រងអត្ថបទកសិកម្ម</p>
            </div>
          </div>

          <Link
            href={`/${locale}/knowledge`}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 transition hover:border-green-300 hover:text-green-700 sm:px-4"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">មើល Knowledge</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[245px_1fr]">
        <aside className="hidden min-h-[calc(100vh-65px)] border-r border-slate-200 bg-white p-5 lg:block">
          <nav className="space-y-2">
            <Link href={`/${locale}`} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
              <LayoutDashboard className="h-5 w-5" /> ទំព័រដើម
            </Link>
            <div className="flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3 text-sm font-black text-green-700">
              <BookOpen className="h-5 w-5" /> អត្ថបទ Knowledge
            </div>
          </nav>

          <div className="mt-8 rounded-2xl bg-slate-950 p-5 text-white">
            <Sparkles className="h-6 w-6 text-amber-300" />
            <p className="mt-4 text-sm font-black">Sesan Knowledge</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">រៀបចំចំណេះដឹងកសិកម្មជាភាសាខ្មែរ និងអង់គ្លេសនៅកន្លែងតែមួយ។</p>
          </div>
        </aside>

        <section className="min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <Link href={`/${locale}`} className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-green-700 lg:hidden">
                <ArrowLeft className="h-4 w-4" /> ត្រឡប់ទៅទំព័រដើម
              </Link>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-green-700">Knowledge Management</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">អត្ថបទចំណេះដឹង</h1>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">បន្ថែម កែប្រែ និងផ្សព្វផ្សាយចំណេះដឹងកសិកម្មរបស់ Sesan។</p>
            </div>

            <button onClick={openNewArticle} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700 sm:w-auto">
              <Plus className="h-5 w-5" /> បន្ថែមអត្ថបទថ្មី
            </button>
          </div>

          {savedNotice && (
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-bold text-green-800">
              <Check className="h-5 w-5" /> បានរក្សាទុកអត្ថបទដោយជោគជ័យ។
            </div>
          )}

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatCard label="អត្ថបទសរុប" value={articles.length} icon={<FileText className="h-6 w-6" />} color="slate" />
            <StatCard label="បានផ្សព្វផ្សាយ" value={publishedCount} icon={<Check className="h-6 w-6" />} color="green" />
            <StatCard label="ព្រាង" value={draftCount} icon={<Pencil className="h-6 w-6" />} color="amber" />
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="relative w-full sm:max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="ស្វែងរកអត្ថបទ..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value as "all" | ArticleStatus)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm font-bold outline-none focus:border-green-500 sm:w-auto"
                >
                  <option value="all">ស្ថានភាពទាំងអស់</option>
                  <option value="published">បានផ្សព្វផ្សាយ</option>
                  <option value="draft">ព្រាង</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredArticles.map((article) => (
                <article key={article.id} className="p-4 transition hover:bg-slate-50/70 sm:p-5">
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-green-100 text-green-700 sm:h-20 sm:w-20">
                      {article.coverImage ? (
                        <Image src={article.coverImage} alt="" width={80} height={80} unoptimized className="h-full w-full object-cover" />
                      ) : (
                        <BookOpen className="h-7 w-7" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`rounded-full px-2.5 py-1 text-[11px] font-black ${article.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                              {article.status === "published" ? "បានផ្សព្វផ្សាយ" : "ព្រាង"}
                            </span>
                            <span className="text-xs font-bold text-slate-400">{article.category}</span>
                            {article.featured && <span className="rounded-full bg-purple-100 px-2.5 py-1 text-[11px] font-black text-purple-700">អត្ថបទពិសេស</span>}
                          </div>
                          <h2 className="mt-2 truncate text-base font-black sm:text-lg">{article.titleKm}</h2>
                          <p className="mt-1 truncate text-sm text-slate-500">{article.titleEn}</p>
                          <p className="mt-2 text-xs text-slate-400">កែចុងក្រោយ៖ {formatDate(article.updatedAt)}</p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <button
                            onClick={() => {
                              setActiveLanguage("km");
                              setEditingArticle({...article});
                            }}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 transition hover:border-green-300 hover:text-green-700"
                          >
                            <Pencil className="h-4 w-4" /> កែ
                          </button>
                          <button onClick={() => deleteArticle(article)} aria-label="លុបអត្ថបទ" className="rounded-xl border border-slate-200 bg-white p-2 text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {filteredArticles.length === 0 && (
                <div className="px-5 py-16 text-center">
                  <Search className="mx-auto h-9 w-9 text-slate-300" />
                  <p className="mt-4 font-black text-slate-700">រកមិនឃើញអត្ថបទ</p>
                  <p className="mt-2 text-sm text-slate-500">សូមសាកល្បងពាក្យស្វែងរក ឬស្ថានភាពផ្សេង។</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-5">
          <form onSubmit={saveArticle} className="flex max-h-[96vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:max-h-[92vh] sm:rounded-[28px]">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
              <div>
                <p className="text-lg font-black">{articles.some((article) => article.id === editingArticle.id) ? "កែអត្ថបទ" : "បន្ថែមអត្ថបទថ្មី"}</p>
                <p className="mt-1 text-xs text-slate-500">បំពេញចំណងជើងទាំងភាសាខ្មែរ និងអង់គ្លេស</p>
              </div>
              <button type="button" onClick={() => setEditingArticle(null)} className="rounded-xl bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex border-b border-slate-200 px-5 sm:px-7">
              <LanguageTab active={activeLanguage === "km"} onClick={() => setActiveLanguage("km")} label="ភាសាខ្មែរ" />
              <LanguageTab active={activeLanguage === "en"} onClick={() => setActiveLanguage("en")} label="English" />
            </div>

            <div className="overflow-y-auto p-5 sm:p-7">
              <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                <div className="space-y-5">
                  {activeLanguage === "km" ? (
                    <>
                      <Field label="ចំណងជើងអត្ថបទ (ខ្មែរ)" required>
                        <input required value={editingArticle.titleKm} onChange={(event) => updateEditingArticle("titleKm", event.target.value)} className="admin-input" placeholder="ឧ. វិធីរៀបចំដីមុនពេលដាំបន្លែ" />
                      </Field>
                      <Field label="សេចក្ដីសង្ខេប (ខ្មែរ)">
                        <textarea value={editingArticle.summaryKm} onChange={(event) => updateEditingArticle("summaryKm", event.target.value)} className="admin-input min-h-24 resize-y" placeholder="សរសេរសេចក្ដីសង្ខេបខ្លី..." />
                      </Field>
                      <Field label="ខ្លឹមសារអត្ថបទ (ខ្មែរ)">
                        <textarea value={editingArticle.contentKm} onChange={(event) => updateEditingArticle("contentKm", event.target.value)} className="admin-input min-h-64 resize-y" placeholder="សរសេរខ្លឹមសារអត្ថបទនៅទីនេះ..." />
                      </Field>
                    </>
                  ) : (
                    <>
                      <Field label="Article title (English)" required>
                        <input required value={editingArticle.titleEn} onChange={(event) => updateEditingArticle("titleEn", event.target.value)} className="admin-input" placeholder="e.g. How to prepare soil before planting" />
                      </Field>
                      <Field label="Summary (English)">
                        <textarea value={editingArticle.summaryEn} onChange={(event) => updateEditingArticle("summaryEn", event.target.value)} className="admin-input min-h-24 resize-y" placeholder="Write a short article summary..." />
                      </Field>
                      <Field label="Article content (English)">
                        <textarea value={editingArticle.contentEn} onChange={(event) => updateEditingArticle("contentEn", event.target.value)} className="admin-input min-h-64 resize-y" placeholder="Write the full article here..." />
                      </Field>
                    </>
                  )}
                </div>

                <aside className="space-y-5">
                  <Field label="ប្រភេទអត្ថបទ">
                    <select value={editingArticle.category} onChange={(event) => updateEditingArticle("category", event.target.value)} className="admin-input">
                      {categories.map((category) => <option key={category}>{category}</option>)}
                    </select>
                  </Field>
                  <Field label="ស្ថានភាព">
                    <select value={editingArticle.status} onChange={(event) => updateEditingArticle("status", event.target.value as ArticleStatus)} className="admin-input">
                      <option value="draft">ព្រាង</option>
                      <option value="published">ផ្សព្វផ្សាយ</option>
                    </select>
                  </Field>
                  <Field label="តំណរូបភាពគម្រប">
                    <input type="url" value={editingArticle.coverImage} onChange={(event) => updateEditingArticle("coverImage", event.target.value)} className="admin-input" placeholder="https://..." />
                  </Field>
                  <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-4 transition hover:border-purple-300 hover:bg-purple-50/50">
                    <input type="checkbox" checked={editingArticle.featured} onChange={(event) => updateEditingArticle("featured", event.target.checked)} className="mt-1 h-4 w-4 accent-purple-600" />
                    <span>
                      <span className="block text-sm font-black">ដាក់ជាអត្ថបទពិសេស</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">បង្ហាញអត្ថបទនេះធំជាងគេនៅ Knowledge Center។</span>
                    </span>
                  </label>
                </aside>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
              <button type="button" onClick={() => setEditingArticle(null)} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-50">បោះបង់</button>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-black text-white transition hover:bg-green-700">
                <Save className="h-4 w-4" /> រក្សាទុកអត្ថបទ
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

function StatCard({label, value, icon, color}: {label: string; value: number; icon: React.ReactNode; color: "slate" | "green" | "amber"}) {
  const colors = {
    slate: "bg-slate-100 text-slate-700",
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors[color]}`}>{icon}</div>
      <div>
        <p className="text-2xl font-black">{value}</p>
        <p className="text-xs font-bold text-slate-500 sm:text-sm">{label}</p>
      </div>
    </div>
  );
}

function LanguageTab({active, onClick, label}: {active: boolean; onClick: () => void; label: string}) {
  return (
    <button type="button" onClick={onClick} className={`relative flex items-center gap-2 px-4 py-4 text-sm font-black transition ${active ? "text-green-700" : "text-slate-400 hover:text-slate-700"}`}>
      <Languages className="h-4 w-4" /> {label}
      {active && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-green-600" />}
    </button>
  );
}

function Field({label, required = false, children}: {label: string; required?: boolean; children: React.ReactNode}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-700">{label}{required && <span className="ml-1 text-red-500">*</span>}</span>
      {children}
    </label>
  );
}
