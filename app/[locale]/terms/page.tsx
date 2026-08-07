import type {Metadata} from "next";
import Link from "next/link";
import {notFound, redirect} from "next/navigation";
import {ArrowLeft, FileText} from "lucide-react";

type PageProps = {params: Promise<{locale: string}>};

export const metadata: Metadata = {title: "លក្ខខណ្ឌប្រើប្រាស់ | Sesan Group", description: "លក្ខខណ្ឌប្រើប្រាស់ Sesan App, Sesan Shop និងសេវាកម្មរបស់ Sesan Group។"};

const sections = [
  ["០១", "ការយល់ព្រមលើលក្ខខណ្ឌ", "លក្ខខណ្ឌទាំងនេះគ្រប់គ្រងការចូលប្រើ Sesan App, Sesan Shop, Website, មុខងារទីផ្សារ និងឧបករណ៍ទំនាក់ទំនង។ ការបង្កើតគណនី ដាក់ផលិតផល បញ្ជាទិញ ឬប្រើសេវា មានន័យថាអ្នកយល់ព្រមតាមលក្ខខណ្ឌទាំងនេះ។"],
  ["០២", "សិទ្ធិប្រើប្រាស់", "អ្នកត្រូវមានសមត្ថភាពផ្លូវច្បាប់ក្នុងការធ្វើកិច្ចព្រមព្រៀង។ ប្រសិនបើប្រើក្នុងនាមក្រុមហ៊ុន ហាង កសិដ្ឋាន ឬអង្គការ អ្នកបញ្ជាក់ថាមានសិទ្ធិតំណាងឱ្យអង្គភាពនោះ។"],
  ["០៣", "គណនីអ្នកប្រើ", "អ្នកត្រូវផ្ដល់ព័ត៌មានពិតប្រាកដ ប្រើលេខទូរស័ព្ទរបស់ខ្លួន រក្សាលេខកូដផ្ទៀងផ្ទាត់ និងឧបករណ៍ឱ្យមានសុវត្ថិភាព។ ហាមបង្កើតគណនីក្លែងក្លាយ ក្លែងអត្តសញ្ញាណ ឬប្រើគណនីសម្រាប់ការក្លែងបន្លំ។"],
  ["០៤", "តួនាទីរបស់ទីផ្សារ", "Sesan ផ្ដល់បច្ចេកវិទ្យាដើម្បីឱ្យអ្នកប្រើដាក់ និងស្វែងរកផលិតផល ទំនាក់ទំនង និងគ្រប់គ្រងការបញ្ជាទិញ។ ជាទូទៅ Sesan មិនមែនជាម្ចាស់ ឬអ្នកផលិតផលិតផលរបស់អ្នកលក់ទេ។"],
  ["០៥", "កាតព្វកិច្ចរបស់អ្នកលក់", "អ្នកលក់ត្រូវផ្ដល់ព័ត៌មាន និងរូបភាពត្រឹមត្រូវ បញ្ជាក់តម្លៃ រូបិយប័ណ្ណ បរិមាណ និងស្ថានភាពស្តុក បង្ហាញហានិភ័យសំខាន់ៗ និងមានសិទ្ធិស្របច្បាប់ក្នុងការលក់។ ហាមដាក់ផលិតផលខុសច្បាប់ ក្លែងក្លាយ លួច ឬគ្មានសុវត្ថិភាព។"],
  ["០៦", "កាតព្វកិច្ចរបស់អ្នកទិញ", "អ្នកទិញត្រូវពិនិត្យព័ត៌មានផលិតផល សួរបន្ថែមនៅពេលមិនច្បាស់ ផ្ដល់ទំនាក់ទំនង និងទីតាំងដឹកជញ្ជូនត្រឹមត្រូវ បង់ប្រាក់តាមការព្រមព្រៀង និងពិនិត្យផលិតផលក្នុងរយៈពេលសមស្រប។"],
  ["០៧", "តម្លៃ កម្រៃ និងការទូទាត់", "អ្នកលក់ជាអ្នកកំណត់តម្លៃផលិតផល។ ការបើក ឬចុះឈ្មោះដេប៉ូក្នុង Sesan App គឺឥតគិតថ្លៃ លើកលែងមានសេចក្ដីប្រកាសផ្សេង។ ការលក់តាមមុខងារ Cart មានកម្រៃសេវាបច្ចុប្បន្ន ៧% លើតម្លៃលក់។"],
  ["០៨", "ការបញ្ជាទិញ និងការលុបចោល", "ការបញ្ជាទិញអាចនៅរង់ចាំរហូតដល់អ្នកលក់បញ្ជាក់។ អ្នកទិញគួរស្នើលុបឱ្យបានឆាប់ ហើយអ្នកលក់អាចលុបនៅពេលអស់ស្តុក តម្លៃខុស ឬមិនអាចបំពេញការបញ្ជាទិញ។ ការសងប្រាក់អាស្រ័យលើការព្រមព្រៀងរវាងភាគី។"],
  ["០៩", "ការដឹកជញ្ជូន", "អ្នកទិញ អ្នកលក់ និងអ្នកដឹកជញ្ជូនត្រូវព្រមព្រៀងអាសយដ្ឋាន ថ្លៃដឹក ពេលវេលា វិធីទូទាត់ ការវេចខ្ចប់ និងការទទួលខុសត្រូវពេលខូចឬយឺត។ Sesan មិនធានាសេវាដឹកជញ្ជូនឯករាជ្យឡើយ។"],
  ["១០", "ខ្លឹមសាររបស់អ្នកប្រើ", "អ្នកនៅតែជាម្ចាស់ខ្លឹមសារស្របច្បាប់របស់ខ្លួន។ ពេលផ្សព្វផ្សាយតាម Sesan អ្នកអនុញ្ញាតឱ្យ Sesan បង្ហាញ និងដំណើរការខ្លឹមសារនោះសម្រាប់ផ្ដល់ និងផ្សព្វផ្សាយសេវាកម្ម។ Sesan អាចលាក់ ឬលុបខ្លឹមសារដែលល្មើសលក្ខខណ្ឌ។"],
  ["១១", "ពិន្ទុ និងមតិយោបល់", "មតិយោបល់ត្រូវផ្អែកលើបទពិសោធន៍ពិត។ ហាមមតិក្លែងក្លាយ វាយតម្លៃគណនីខ្លួនឯង បង់ប្រាក់ដើម្បីទទួលមតិមិនស្មោះត្រង់ គំរាមអ្នកប្រើ ឬបង្ហាញព័ត៌មានរសើបរបស់អ្នកដទៃ។"],
  ["១២", "សកម្មភាពហាមឃាត់", "ហាមលក់ផលិតផលខុសច្បាប់ ឬក្លែងក្លាយ បង្ហោះព័ត៌មានបោកបញ្ឆោត ក្លែងអត្តសញ្ញាណ គំរាមកំហែង ផ្ញើ Spam ឬ Malware លួចចូលគណនី ប្រមូលទិន្នន័យគ្មានការអនុញ្ញាត បង្កើតការបញ្ជាទិញក្លែងក្លាយ ឬរំខានសុវត្ថិភាពប្រព័ន្ធ។"],
  ["១៣", "កម្មសិទ្ធិបញ្ញា", "ឈ្មោះ Sesan, Logo, Sesan App, Sesan Shop និងរចនាបទរបស់វេទិកា គឺជាកម្មសិទ្ធិបញ្ញារបស់ Sesan ឬម្ចាស់សិទ្ធិពាក់ព័ន្ធ។ ហាមចម្លង កែប្រែ ចែកចាយ ឬប្រើសម្រាប់ពាណិជ្ជកម្មដោយគ្មានការអនុញ្ញាត។"],
  ["១៤", "ភាពអាចប្រើបាននៃសេវា", "យើងខិតខំរក្សាសេវាឱ្យមានសុវត្ថិភាព និងអាចប្រើបាន ប៉ុន្តែមិនអាចធានាថាដំណើរការមិនដាច់ជានិច្ចទេ។ សេវាអាចផ្អាកបណ្ដោះអាសន្នសម្រាប់ថែទាំ កែបញ្ហាបច្ចេកទេស ឬធ្វើបច្ចុប្បន្នភាព។"],
  ["១៥", "ការផ្អាក ឬបិទគណនី", "Sesan អាចកំណត់ ផ្អាក ឬបិទគណនីដែលល្មើសលក្ខខណ្ឌ ពាក់ព័ន្ធការក្លែងបន្លំ ឬសកម្មភាពខុសច្បាប់ បង្កហានិភ័យដល់អ្នកប្រើ ឬផ្ដល់ព័ត៌មានក្លែងក្លាយ។"],
  ["១៦", "ការមិនធានា និងកម្រិតទទួលខុសត្រូវ", "សេវាត្រូវបានផ្ដល់តាមស្ថានភាពដែលមាន។ Sesan មិនធានាភាពត្រឹមត្រូវរបស់រាល់អ្នកប្រើ ផលិតផល តម្លៃ ឬការដឹកជញ្ជូនទេ។ អ្នកប្រើត្រូវវាយតម្លៃ និងសម្រេចចិត្តដោយខ្លួនឯងមុនធ្វើប្រតិបត្តិការ។"],
  ["១៧", "ច្បាប់គ្រប់គ្រង", "លក្ខខណ្ឌទាំងនេះស្ថិតក្រោមច្បាប់នៃព្រះរាជាណាចក្រកម្ពុជា។ វិវាទគួរត្រូវបានដោះស្រាយជាមុនតាមការពិភាក្សាដោយសុចរិត ហើយអាចបញ្ជូនទៅអាជ្ញាធរ ឬតុលាការមានសមត្ថកិច្ច។"],
  ["១៨", "ការកែប្រែលក្ខខណ្ឌ", "Sesan អាចធ្វើបច្ចុប្បន្នភាពលក្ខខណ្ឌទាំងនេះតាមមុខងារ បច្ចេកវិទ្យា គោលនយោបាយ ឬច្បាប់ថ្មី។ ការបន្តប្រើសេវាបន្ទាប់ពីកំណែថ្មីចូលជាធរមាន មានន័យថាអ្នកទទួលយកកំណែនោះ។"],
];

export default async function KhmerTermsPage({params}: PageProps) {
  const {locale} = await params;
  if (locale === "en") redirect("/terms");
  if (locale !== "km") notFound();
  return <main className="min-h-screen bg-slate-50 text-slate-950"><header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8"><Link href="/km" className="flex items-center gap-3"><img src="/sesan-logo.png" alt="Sesan" className="h-12 w-12 object-contain"/><div><p className="text-xl font-black text-green-700">SESAN</p><p className="text-[9px] font-black tracking-[0.34em] text-amber-500">GROUP</p></div></Link><Link href="/km" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700"><ArrowLeft className="h-4 w-4"/>ត្រឡប់ទៅទំព័រដើម</Link></div></header><section className="bg-gradient-to-br from-slate-950 via-slate-900 to-green-950 px-5 py-24 text-white lg:px-8"><div className="mx-auto max-w-7xl"><div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-black"><FileText className="h-5 w-5"/>ព័ត៌មានផ្លូវច្បាប់</div><h1 className="mt-8 text-5xl font-black sm:text-7xl">លក្ខខណ្ឌប្រើប្រាស់</h1><p className="mt-7 max-w-3xl text-lg leading-9 text-slate-300">លក្ខខណ្ឌទាំងនេះពន្យល់ពីវិធាន និងកាតព្វកិច្ចក្នុងការប្រើ Sesan App, Sesan Shop, មុខងារទីផ្សារ និងសេវាកម្មរបស់ Sesan Group។</p><div className="mt-8 flex flex-wrap gap-3 text-sm font-bold"><span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">ចូលជាធរមាន៖ ៥ សីហា ២០២៦</span><span className="rounded-full border border-white/20 bg-white/10 px-4 py-2">កែចុងក្រោយ៖ ៧ សីហា ២០២៦</span></div></div></section><section className="px-5 py-20 lg:px-8"><div className="mx-auto max-w-5xl space-y-6">{sections.map(([number,title,body])=><article key={number} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"><p className="text-sm font-black text-green-700">ផ្នែកទី {number}</p><h2 className="mt-3 text-2xl font-black sm:text-3xl">{title}</h2><p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{body}</p></article>)}<div className="rounded-3xl bg-green-700 p-8 text-white sm:p-10"><p className="text-sm font-black uppercase tracking-wider text-green-100">ទាក់ទង Sesan</p><h2 className="mt-3 text-3xl font-black">មានសំណួរអំពីលក្ខខណ្ឌ?</h2><p className="mt-4 leading-8 text-green-50">អ៊ីមែល៖ info@sesanshop.com<br/>ទូរស័ព្ទ៖ +855 11 930 717<br/>Website៖ sesanshop.com<br/>ប្រទេស៖ កម្ពុជា</p></div></div></section></main>;
}
