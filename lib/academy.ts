export type AcademyCategory = "ai-coding" | "ai-video" | "agriculture" | "business";

export type AcademyCourse = {
  id: string;
  titleKm: string;
  titleEn: string;
  descriptionKm: string;
  descriptionEn: string;
  category: AcademyCategory;
  creatorName: string;
  priceRiel: number;
  durationMinutes: number;
  lessons: number;
  students: number;
  accent: string;
  featured?: boolean;
};

export const SESAN_COMMISSION_RATE = 0.3;
export const CREATOR_SHARE_RATE = 0.7;
export const MINIMUM_WITHDRAWAL_RIEL = 30_000;
export const PAYOUT_HOLD_DAYS = 7;

export function splitAcademySale(priceRiel: number) {
  return {
    gross: priceRiel,
    creatorEarning: Math.round(priceRiel * CREATOR_SHARE_RATE),
    sesanCommission: Math.round(priceRiel * SESAN_COMMISSION_RATE),
  };
}

export const academyCourses: AcademyCourse[] = [
  {
    id: "build-website-with-ai",
    titleKm: "បង្កើត Website ដោយប្រើ AI សម្រាប់អ្នកចាប់ផ្ដើម",
    titleEn: "Build a Website with AI for Beginners",
    descriptionKm: "រៀនពីគំនិតដំបូង រហូតដល់បង្កើត និងផ្សព្វផ្សាយ Website ដោយប្រើឧបករណ៍ AI។",
    descriptionEn: "Go from an idea to building and publishing a website with practical AI tools.",
    category: "ai-coding",
    creatorName: "Sesan Academy",
    priceRiel: 5_000,
    durationMinutes: 42,
    lessons: 6,
    students: 0,
    accent: "from-violet-600 via-indigo-600 to-sky-500",
    featured: true,
  },
  {
    id: "create-ai-video",
    titleKm: "បង្កើតវីដេអូផ្សព្វផ្សាយដោយ AI",
    titleEn: "Create Promotional Videos with AI",
    descriptionKm: "សរសេរ Prompt បង្កើតរូប ចលនា សំឡេង និងរៀបចំវីដេអូខ្លីសម្រាប់ Social Media។",
    descriptionEn: "Create images, motion, voice and polished short videos for social media with AI.",
    category: "ai-video",
    creatorName: "Sesan Academy",
    priceRiel: 5_000,
    durationMinutes: 35,
    lessons: 5,
    students: 0,
    accent: "from-fuchsia-600 via-rose-500 to-orange-400",
  },
  {
    id: "prepare-soil-vegetables",
    titleKm: "បច្ចេកទេសរៀបចំដីសម្រាប់ដាំបន្លែ",
    titleEn: "Soil Preparation for Vegetable Farming",
    descriptionKm: "មេរៀនជាក់ស្តែងអំពីរងដាំ ជីកំប៉ុស សំណើម និងប្រព័ន្ធបង្ហូរទឹក។",
    descriptionEn: "Practical raised-bed, compost, moisture and drainage techniques for vegetables.",
    category: "agriculture",
    creatorName: "Sesan Agriculture",
    priceRiel: 2_000,
    durationMinutes: 18,
    lessons: 3,
    students: 0,
    accent: "from-green-700 via-emerald-500 to-lime-400",
  },
  {
    id: "smart-farm-records",
    titleKm: "កត់ត្រាចំណូលចំណាយកសិដ្ឋានឱ្យមានប្រសិទ្ធភាព",
    titleEn: "Simple Farm Income and Expense Tracking",
    descriptionKm: "រៀនគណនាថ្លៃដើម ចំណេញ និងរៀបចំកំណត់ត្រាកសិដ្ឋានបែបសាមញ្ញ។",
    descriptionEn: "Learn to calculate costs, profit and maintain simple farm business records.",
    category: "agriculture",
    creatorName: "Sesan Agriculture",
    priceRiel: 3_000,
    durationMinutes: 24,
    lessons: 4,
    students: 0,
    accent: "from-emerald-700 via-teal-500 to-cyan-400",
  },
  {
    id: "facebook-content-ai",
    titleKm: "បង្កើត Content Facebook សម្រាប់អាជីវកម្មដោយ AI",
    titleEn: "Create Facebook Business Content with AI",
    descriptionKm: "បង្កើត Caption ផែនការផុស និងរូបភាពផ្សព្វផ្សាយឱ្យលឿន និងមានគុណភាព។",
    descriptionEn: "Create captions, posting plans and promotional visuals faster with AI.",
    category: "business",
    creatorName: "Sesan Academy",
    priceRiel: 5_000,
    durationMinutes: 30,
    lessons: 5,
    students: 0,
    accent: "from-blue-700 via-sky-500 to-cyan-400",
  },
];
