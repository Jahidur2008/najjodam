# 🌾 ন্যায্য দাম (Najjo Dam) — কৃষকের নির্ভরযোগ্য বাজারদর

> **"ন্যায্য দাম"** হলো বাংলাদেশের প্রান্তিক কৃষক ভাইদের জন্য একটি উন্মুক্ত, রিয়েল-টাইম কৃষিপণ্য বাজারদর প্ল্যাটফর্ম। কোনো রেজিস্ট্রেশন বা অ্যাকাউন্ট ছাড়াই সারা দেশের **৮টি বিভাগ, ৬৪টি জেলা ও ৪৯৫টি উপজেলার** পাইকারি ও খুচরা বাজারদর যাচাই করা যায়।

---

## 🌟 মূল বৈশিষ্ট্যসমূহ (Key Features)

1. **উন্মুক্ত ও দ্রুত (Zero Login for Farmers):**
   - সাধারণ কৃষকদের জন্য কোনো প্রকার লগইন বা পাসওয়ার্ডের ঝামেলা নেই।
   - সাইটে ঢোকার সাথে সাথে স্বয়ংক্রিয়ভাবে **ঢাকা জেলা (Baseline Market)** এর সর্বশেষ দর প্রদর্শিত হয়।
2. **৩-ধাপের ক্যাসকেডিং ভৌগোলিক ফিল্টার (8 Divisions, 64 Districts, 495 Upazilas):**
   - **বিভাগ → জেলা → উপজেলা** তাৎক্ষণিক ফিল্টারিং।
   - **স্মার্ট ফলব্যাক আর্কিটেকচার:** কোনো নির্দিষ্ট উপজেলার নিজস্ব আড়ত দর ডাটাবেজে না থাকলে সিস্টেমটি স্বয়ংক্রিয়ভাবে সেই জেলার মূল আড়ত বা ঢাকা জেলা বেসলাইন দর প্রদর্শন করে (`priceLevel: "DISTRICT_FALLBACK"`), যাতে কৃষকের স্ক্রিন কখনো খালি না থাকে।
3. **স্বয়ংক্রিয় মণ ভিত্তিক মূল্য হিসাব (১ মণ = ৪০ কেজি):**
   - প্রতি কেজি দরের পাশাপাশি কেজি-ভিত্তিক পণ্যের ক্ষেত্রে স্বয়ংক্রিয়ভাবে **প্রতি মণ (৪০ কেজি) পাইকারি দর** হিসাব করে দেখায় (`maundMultiplier: 40`)।
4. **মূল্য পরিবর্তনের গতিধারা (Price Trend Indicators):**
   - বিগত দিনের পাইকারি দরের সাথে তুলনা করে সবুজ (`↑ বেড়েছে`), লাল (`↓ কমেছে`) অথবা ধূসর (`— অপরিবর্তিত`) ট্রেন্ড ব্যাজ।
5. **জেলা ভিত্তিক তুলনামূলক চার্ট ও মডেল (Recharts Interactive Comparison):**
   - যেকোনো পণ্যের "অন্যান্য জেলার সাথে তুলনা করুন" বাটনে চাপ দিলে সারা দেশের জেলাভিত্তিক পাইকারি দরের চার্ট ওপেন হয়।
   - কৃষক দেখতে পারেন কোন জেলায় তার ফসল বেশি দামে বিক্রি হচ্ছে।
6. **হাইব্রিড এক্সটার্নাল API সিঙ্ক ইঞ্জিন ও ব্যাকগ্রাউন্ড ক্রন:**
   - সরকারি কৃষি বিপণন অধিদপ্তর (DAM) বা অন্যান্য API থেকে স্বয়ংক্রিয় সিঙ্ক (`node-cron`)।
   - **ম্যানুয়াল ওভাররাইড প্রোটেকশন:** অ্যাডমিন কর্তৃক নির্ধারিত দর (`isManualOverride: true`) এক্সটার্নাল API কখনো মুছে বা ওভাররাইট করতে পারে না।
7. **সুরক্ষিত অ্যাডমিন কন্ট্রোল প্যানেল (JWT Authentication):**
   - রিয়েল-টাইম ড্যাশবোর্ড ওভারভিউ ও সিস্টেম টেলিমেট্রি।
   - যেকোনো জেলা ও উপজেলার বাজারদর নির্ধারণ ও এডিটিং।
   - ৯টি ক্যাটাগরির ১৬৮টি কৃষিপণ্য ও ছবি আপলোড ম্যানেজার।
   - এক্সটার্নাল API প্রোভাইডার কনফিগারেশন ও ইনস্ট্যান্ট **Sync Now** অ্যাকশন।
   - হোমপেজের শীর্ষে চলমান জরুরি নোটিশ ও ঘোষণা ম্যানেজার।

---

## 🛠️ টেকনোলজি স্ট্যাক (Tech Stack)

- **Frontend:** Next.js 16+ (App Router), React 19, Tailwind CSS v4, Shadcn/ui (Radix UI), Framer Motion, Lucide Icons, Recharts, Axios
- **Backend:** Node.js, Express.js, node-cron, Axios, Helmet, CORS, Morgan, Multer (Local Image Storage)
- **Database:** MongoDB with Mongoose ODM (Geospatial & Compound Indexing)
- **Authentication (Admin Only):** JWT (JSON Web Tokens) + bcryptjs password hashing

---

## 📁 প্রজেক্ট ডিরেক্টরি কাঠামো (Directory Structure)

```
NajjoDam/
├── client/                     # Next.js 14+ Frontend (App Router)
│   ├── app/
│   │   ├── admin/              # অ্যাডমিন পোর্টাল রুট
│   │   │   ├── dashboard/      # ওভারভিউ, মূল্য, পণ্য, API ও নোটিশ কন্ট্রোলার
│   │   │   └── login/          # অ্যাডমিন লগইন পেজ
│   │   ├── globals.css         # Tailwind v4 স্টাইলিং ও এগ্রি থিম ভ্যারিয়েবল
│   │   ├── layout.tsx          # Hind Siliguri + Inter ফন্ট ও মেটাডাটা
│   │   └── page.tsx            # পাবলিক কৃষক হোমপেজ ও ফিল্টার
│   ├── components/             # Reusable UI ও কম্পোনেন্টসমূহ
│   │   ├── LocationFilterBar   # ৩-লেভেল ক্যাসকেডিং ড্রপডাউন
│   │   ├── CategoryTabs        # ৯-ক্যাটাগরি পিল ট্যাব
│   │   ├── ProductPriceCard    # কেজি ও মণ ভিত্তিক প্রিমিয়াম প্রাইস কার্ড
│   │   ├── PriceCompareModal   # Recharts জেলা ভিত্তিক তুলনামূলক চার্ট
│   │   ├── Navbar & NoticeTicker # নোটিশ বার ও হেডার
│   │   └── Footer              # কৃষি কল সেন্টার (১৬১২৩) ও ফুটার
│   ├── context/
│   │   └── AdminAuthContext    # JWT স্টেট ও রিঅ্যাক্ট কনটেক্সট
│   ├── lib/
│   │   ├── api.js              # বাংলা সংখ্যা/মুদ্রা ফরম্যাটার ও API ফেচার
│   │   └── utils.js            # Shadcn cn() ইউটিলিটি
│   └── public/images/          # ভেক্টর ব্র্যান্ড লোগো ও ফ্যাভিকন
│
├── server/                     # Node.js + Express.js Backend
│   ├── config/db.js            # MongoDB কানেকশন ও ইভেন্ট হ্যান্ডলার
│   ├── controllers/            # Public, Location, Product, Price, Admin কন্ট্রোলার
│   ├── data/bdLocations.js     # বাংলাদেশের ৮ বিভাগ, ৬৪ জেলা ও ৪৯৫ উপজেলা (BN/EN)
│   ├── jobs/syncScheduler.js   # node-cron স্বয়ংক্রিয় ব্যাকগ্রাউন্ড সিঙ্ক জব
│   ├── middleware/             # JWT authMiddleware, multer uploadMiddleware
│   ├── models/                 # Admin, Product, MarketPrice, ApiConfig, Notice
│   ├── routes/                 # REST API রাউটসমূহ
│   ├── seed/
│   │   ├── masterProducts.js   # ১৬৮টি মাস্টার কৃষিপণ্য ক্যাটালগ
│   │   └── seedData.js         # ফুল অটোমেটেড ডাটাবেজ সিডার
│   ├── uploads/                # আপলোডকৃত পণ্যের ছবি
│   ├── index.js                # Express মেইন সার্ভার
│   └── .env                    # ব্যাকএন্ড কনফিগারেশন
└── package.json                # রুট মনোরেপো স্ক্রিপ্ট
```

---

## 🚀 সেটআপ ও রান করার নিয়ম (Installation & Run Guide)

### ১. ডিপেন্ডেন্সি ইনস্টল করুন

রুট ডিরেক্টরি থেকে সার্ভার ও ক্লায়েন্ট উভয়ের প্যাকেজ ইনস্টল করুন:

```bash
# ব্যাকএন্ড ডিপেন্ডেন্সি ইনস্টল
cd server
npm install

# ফ্রন্টএন্ড ডিপেন্ডেন্সি ইনস্টল
cd ../client
npm install --legacy-peer-deps
cd ..
```

---

### ২. এনভায়রনমেন্ট ভ্যারিয়েবল কনফিগার করুন

#### ক. ব্যাকএন্ড কনফিগারেশন (`server/.env`)
`server/.env` ফাইলে নিচের তথ্যগুলো নিশ্চিত করুন:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/najjodam
JWT_SECRET=supersecretjwtkeyfornajjodamadminauth2026
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
CRON_SYNC_SCHEDULE=0 */1 * * *
```
*(যদি আপনি MongoDB Atlas ক্লাউড ডাটাবেজ ব্যবহার করেন, তবে `MONGODB_URI` এর স্থানে আপনার `mongodb+srv://...` কানেকশন স্ট্রিং দিন।)*

#### খ. ফ্রন্টএন্ড কনফিগারেশন (`client/.env.local`)
`client/.env.local` ফাইলে নিশ্চিত করুন:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

### ৩. ডাটাবেজ সিড করুন (Seed Master Data)

এই স্ক্রিপ্টটি স্বয়ংক্রিয়ভাবে:
- ডিফল্ট সুপার-অ্যাডমিন অ্যাকাউন্ট তৈরি করবে।
- ৯টি ক্যাটাগরির **১৬৮টি মাস্টার কৃষিজাত পণ্য** যুক্ত করবে।
- সবকটি পণ্যের জন্য **ঢাকা জেলার ডিফল্ট বাজারদর** যুক্ত করবে।
- কুষ্টিয়া, বগুড়া, দিনাজপুর, চট্টগ্রামসহ বিভিন্ন উপজেলার আঞ্চলিক বাজারদর ও নোটিশ তৈরি করবে।

```bash
cd server
npm run seed
cd ..
```

> **ডিফল্ট অ্যাডমিন ক্রেডেনশিয়াল:**
> - **ইমেইল:** `admin@najjodam.com`
> - **পাসওয়ার্ড:** `Admin@1234`

---

### ৪. সার্ভার এবং ক্লায়েন্ট চালু করুন

দুটি আলাদা টার্মিনালে ব্যাকএন্ড এবং ফ্রন্টএন্ড চালু করুন:

#### টার্মিনাল ১ (Backend Server):
```bash
npm --prefix server run dev
```
*সার্ভার চালু হবে: `http://localhost:5000`*

#### টার্মিনাল ২ (Frontend Client):
```bash
npm --prefix client run dev
```
*ওয়েবসাইট ওপেন হবে: `http://localhost:3000`*

---

## 🌐 মূল পেজ ও রাউটসমূহ

| পেজের নাম | URL | বর্ণনা |
|---|---|---|
| **পাবলিক কৃষক ড্যাশবোর্ড** | `http://localhost:3000/` | ৬৪ জেলার কৃষিপণ্যের লাইভ পাইকারি/খুচরা দর ও জেলা তুলনা |
| **অ্যাডমিন লগইন** | `http://localhost:3000/admin/login` | নিরাপদ অ্যাডমিন সাইন ইন |
| **অ্যাডমিন ড্যাশবোর্ড** | `http://localhost:3000/admin/dashboard` | সিস্টেম টেলিমেট্রি, সিঙ্ক বাটন ও পরিসংখ্যান |
| **বাজারদর এডিটর** | `http://localhost:3000/admin/dashboard/prices` | এলাকাভিত্তিক পাইকারি ও খুচরা দর এন্ট্রি ও লক |
| **পণ্য ও ছবি ম্যানেজার** | `http://localhost:3000/admin/dashboard/products` | ১৬৮+ কৃষিপণ্য তৈরি ও ফটো আপলোড |
| **এক্সটার্নাল API সেটিংস** | `http://localhost:3000/admin/dashboard/api-configs` | সরকারি API কানেকশন ও Sync Now বাটন |
| **জরুরি নোটিশ বার** | `http://localhost:3000/admin/dashboard/notices` | হোমপেজের শীর্ষ স্ক্রলিং ঘোষণা ম্যানেজার |
| **সিস্টেম হেলথ চেক** | `http://localhost:5000/api/health` | ব্যাকএন্ড ও ডাটাবেজ স্ট্যাটাস |

---

## 🌾 কৃষকের মুখে হাসি, দেশের সমৃদ্ধি!
কোনো ত্রুটি বা অনুসন্ধানের জন্য কৃষি হেল্পলাইন **১৬১২৩** অথবা অ্যাডমিন পোর্টাল ব্যবহার করুন।
#   n a j j o d a m  
 