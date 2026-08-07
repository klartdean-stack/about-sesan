import type {Metadata} from "next";
import Link from "next/link";
import {notFound, redirect} from "next/navigation";
import {ArrowLeft, ShieldCheck} from "lucide-react";

type PageProps = {params: Promise<{locale: string}>};

export const metadata: Metadata = {
  title: "គោលការណ៍ឯកជនភាព | Sesan Group",
  description: "គោលការណ៍ឯកជនភាពសម្រាប់ Sesan App, Sesan Shop និងសេវាកម្មរបស់ Sesan Group។",
};

const sections = [
  ["០១", "សេចក្ដីផ្ដើម", "Sesan Group ដំណើរការ Sesan App, Sesan Shop និងសេវាកម្មបច្ចេកវិទ្យាកសិកម្មពាក់ព័ន្ធ។ គោលការណ៍នេះពន្យល់ពីរបៀបដែលយើងប្រមូល ប្រើ រក្សាទុក ចែករំលែក និងការពារព័ត៌មានរបស់អ្នក។"],
  ["០២", "ព័ត៌មានដែលយើងប្រមូល", "អាស្រ័យលើមុខងារដែលអ្នកប្រើ យើងអាចប្រមូលឈ្មោះ លេខទូរស័ព្ទ រូបថតគណនី ព័ត៌មានអាជីវកម្ម ផលិតផល ការបញ្ជាទិញ ទីតាំងដែលអ្នកជ្រើសរើស សារ និងឯកសារភ្ជាប់ ពិន្ទុវាយតម្លៃ ព្រមទាំងព័ត៌មានបច្ចេកទេសរបស់ឧបករណ៍។"],
  ["០៣", "ព័ត៌មានសាធារណៈក្នុងទីផ្សារ", "ព័ត៌មានដែលអ្នកដាក់ផ្សាយ ដូចជា ឈ្មោះអ្នកលក់ រូបភាព ផលិតផល តម្លៃ លេខទំនាក់ទំនង និងទីតាំងទូទៅ អាចត្រូវបានមើលឃើញជាសាធារណៈ។ សូមកុំដាក់ឯកសារអត្តសញ្ញាណ លេខសម្ងាត់ ឬលេខកូដផ្ទៀងផ្ទាត់ជាសាធារណៈ។"],
  ["០៤", "សិទ្ធិចូលប្រើឧបករណ៍", "Sesan អាចស្នើសុំប្រើកាមេរ៉ា រូបភាព មីក្រូហ្វូន ទីតាំង ការជូនដំណឹង និងឯកសារ នៅពេលចាំបាច់សម្រាប់មុខងារដែលអ្នកជ្រើសរើស។ អ្នកអាចបិទសិទ្ធិទាំងនេះក្នុង Settings របស់ទូរស័ព្ទ។"],
  ["០៥", "របៀបប្រើព័ត៌មាន", "យើងប្រើព័ត៌មានដើម្បីបង្កើត និងគ្រប់គ្រងគណនី បង្ហាញផលិតផល ភ្ជាប់អ្នកទិញនិងអ្នកលក់ ដំណើរការការបញ្ជាទិញ ផ្ញើការជូនដំណឹង ផ្ដល់ជំនួយ ការពារការក្លែងបន្លំ និងកែលម្អសុវត្ថិភាពនិងប្រសិទ្ធភាពសេវាកម្ម។"],
  ["០៦", "ការចែករំលែកព័ត៌មាន", "ព័ត៌មានអាចត្រូវបានចែករំលែកតាមតម្រូវការជាមួយអ្នកទិញ អ្នកលក់ ដៃគូដឹកជញ្ជូន អ្នកផ្ដល់សេវា Cloud, Authentication, Storage, Notification និងផែនទី ឬអាជ្ញាធរតាមច្បាប់។ Sesan មិនលក់ព័ត៌មានផ្ទាល់ខ្លួនជាទំនិញឯករាជ្យឡើយ។"],
  ["០៧", "Cookies និងបច្ចេកវិទ្យា Website", "Website អាចប្រើ Cookies ឬ Local Storage ដើម្បីចងចាំភាសា រក្សាសុវត្ថិភាព Session វាស់ស្ទង់ប្រសិទ្ធភាព និងការពារសកម្មភាពមិនប្រក្រតី។ អ្នកអាចគ្រប់គ្រង Cookies តាម Browser។"],
  ["០៨", "សុវត្ថិភាពទិន្នន័យ", "យើងប្រើការផ្ទៀងផ្ទាត់គណនី ការគ្រប់គ្រងសិទ្ធិ Cloud ដែលមានសុវត្ថិភាព ការត្រួតពិនិត្យបច្ចេកទេស និងការបញ្ជូនទិន្នន័យដែលបានការពារ។ ទោះជាយ៉ាងណា គ្មានប្រព័ន្ធអ៊ីនធឺណិតណាអាចធានាសុវត្ថិភាពបាន១០០%ទេ។"],
  ["០៩", "រយៈពេលរក្សាទុក", "យើងរក្សាទុកព័ត៌មានត្រឹមរយៈពេលចាំបាច់សម្រាប់ផ្ដល់សេវា គ្រប់គ្រងការបញ្ជាទិញ ដោះស្រាយវិវាទ ការពារការក្លែងបន្លំ និងបំពេញកាតព្វកិច្ចផ្លូវច្បាប់។ ទិន្នន័យខ្លះអាចនៅក្នុង Backup មួយរយៈកំណត់។"],
  ["១០", "ការលុបគណនី", "អ្នកអាចស្នើលុបគណនី និងព័ត៌មានផ្ទាល់ខ្លួនពាក់ព័ន្ធដោយទាក់ទង info@sesanshop.com ឬ +855 11 930 717។ យើងអាចស្នើឱ្យផ្ទៀងផ្ទាត់អត្តសញ្ញាណមុនពេលលុប ហើយកំណត់ត្រាខ្លះអាចត្រូវរក្សាទុកតាមច្បាប់។"],
  ["១១", "សិទ្ធិរបស់អ្នក", "អ្នកអាចស្នើចូលមើល កែតម្រូវ ឬលុបព័ត៌មានរបស់អ្នក លុបផលិតផល ដកសិទ្ធិដែលបានអនុញ្ញាត បិទការជូនដំណឹង និងទាក់ទង Sesan អំពីបញ្ហាឯកជនភាព។"],
  ["១២", "ឯកជនភាពកុមារ", "សេវាកម្ម Sesan មិនមានបំណងប្រមូលព័ត៌មានផ្ទាល់ខ្លួនពីកុមារដោយដឹងជាមុនទេ។ ប្រសិនបើអ្នកជឿថាកុមារបានផ្ដល់ព័ត៌មាន សូមទាក់ទងយើងដើម្បីពិនិត្យ និងចាត់វិធានការ។"],
  ["១៣", "ការកែប្រែគោលការណ៍", "យើងអាចកែប្រែគោលការណ៍នេះនៅពេលមានមុខងារ បច្ចេកវិទ្យា ឬតម្រូវការផ្លូវច្បាប់ថ្មី។ កំណែថ្មីនឹងត្រូវបានបង្ហោះលើ Website ដោយមានកាលបរិច្ឆេទកែប្រែ។"],
];

export default async function KhmerPrivacyPage({params}: PageProps) {
  const {locale} = await params;
  if (locale === "en") redirect("/privacy");
  if (locale !== "km") notFound();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/km" className="flex items-center gap-3"><img src="/sesan-logo.png" alt="Sesan" className="h-12 w-12 object-contain"/><div><p className="text-xl font-black text-green-700">SESAN</p><p className="text-[9px] font-black tracking-[0.34em] text-amber-500">GROUP</p></div></Link>
          <Link href="/km" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700"><ArrowLeft className="h-4 w-4"/>ត្រឡប់ទៅទំព័រដើម</Link>
        </div>
      </header>

      <section className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-500 px-5 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl"><div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-black"><ShieldCheck className="h-5 w-5"/>ព័ត៌មានផ្លូវច្បាប់</div><h1 className="mt-8 text-5xl font-black sm:text-7xl">គោលការណ៍ឯកជនភាព</h1><p className="mt-7 max-w-3xl text-lg leading-9 text-green-50">គោលការណ៍នេះពន្យល់ពីរបៀបដែល Sesan Group ប្រមូល ប្រើ រក្សាទុក ការពារ និងគ្រប់គ្រងព័ត៌មានក្នុង Sesan App, Sesan Shop និងសេវាកម្មពាក់ព័ន្ធ។</p><div className="mt-8 flex flex-wrap gap-3 text-sm font-bold"><span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">ចូលជាធរមាន៖ ៥ សីហា ២០២៦</span><span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">កែចុងក្រោយ៖ ៧ សីហា ២០២៦</span></div></div>
      </section>

      <section className="px-5 py-20 lg:px-8"><div className="mx-auto max-w-5xl space-y-6">{sections.map(([number,title,body])=><article key={number} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"><p className="text-sm font-black text-green-700">ផ្នែកទី {number}</p><h2 className="mt-3 text-2xl font-black sm:text-3xl">{title}</h2><p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{body}</p></article>)}<div className="rounded-3xl bg-slate-950 p-8 text-white sm:p-10"><p className="text-sm font-black uppercase tracking-wider text-green-400">ទាក់ទង Sesan</p><h2 className="mt-3 text-3xl font-black">សំណួរអំពីឯកជនភាព?</h2><p className="mt-4 leading-8 text-slate-300">អ៊ីមែល៖ info@sesanshop.com<br/>ទូរស័ព្ទ៖ +855 11 930 717<br/>ប្រទេស៖ កម្ពុជា</p></div></div></section>
    </main>
  );
}
