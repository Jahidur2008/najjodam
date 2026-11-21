/**
 * Master Agricultural Product Catalog for "ন্যায্য দাম" (Najjo Dam)
 * Contains all 9 Agricultural Categories and comprehensive product entries.
 * Bilingual: Bengali (bn) and English (en)
 * Includes maundMultiplier (40 for kg, 0 for non-kg) and Unsplash image URLs.
 */

const masterProducts = [
  // ==========================================
  // 1. প্রধান খাদ্যশস্য (Cereal Crops)
  // ==========================================
  {
    name_bn: "ধান (আউশ)",
    name_en: "Aus Paddy",
    category_bn: "প্রধান খাদ্যশস্য",
    category_en: "Cereal Crops",
    subCategory_bn: "ধান",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 30, wholesale_max: 33, retail_min: 34, retail_max: 36, prev_avg: 31.5 }
  },
  {
    name_bn: "ধান (আমন)",
    name_en: "Aman Paddy",
    category_bn: "প্রধান খাদ্যশস্য",
    category_en: "Cereal Crops",
    subCategory_bn: "ধান",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 32, wholesale_max: 35, retail_min: 36, retail_max: 38, prev_avg: 33.0 }
  },
  {
    name_bn: "ধান (বোরো)",
    name_en: "Boro Paddy",
    category_bn: "প্রধান খাদ্যশস্য",
    category_en: "Cereal Crops",
    subCategory_bn: "ধান",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 33, wholesale_max: 36, retail_min: 37, retail_max: 40, prev_avg: 34.0 }
  },
  {
    name_bn: "চাল (মিনিকেট)",
    name_en: "Miniket Rice",
    category_bn: "প্রধান খাদ্যশস্য",
    category_en: "Cereal Crops",
    subCategory_bn: "চাল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 68, wholesale_max: 72, retail_min: 75, retail_max: 80, prev_avg: 70.0 }
  },
  {
    name_bn: "চাল (মোটা / স্বর্ণা)",
    name_en: "Coarse Rice (Swarna)",
    category_bn: "প্রধান খাদ্যশস্য",
    category_en: "Cereal Crops",
    subCategory_bn: "চাল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 48, wholesale_max: 52, retail_min: 54, retail_max: 58, prev_avg: 49.0 }
  },
  {
    name_bn: "গম",
    name_en: "Wheat",
    category_bn: "প্রধান খাদ্যশস্য",
    category_en: "Cereal Crops",
    subCategory_bn: "গম",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 42, wholesale_max: 46, retail_min: 48, retail_max: 52, prev_avg: 45.0 }
  },
  {
    name_bn: "ভুট্টা",
    name_en: "Maize (Corn)",
    category_bn: "প্রধান খাদ্যশস্য",
    category_en: "Cereal Crops",
    subCategory_bn: "ভুট্টা",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 28, wholesale_max: 32, retail_min: 34, retail_max: 38, prev_avg: 30.0 }
  },
  {
    name_bn: "যব (বার্লি)",
    name_en: "Barley",
    category_bn: "প্রধান খাদ্যশস্য",
    category_en: "Cereal Crops",
    subCategory_bn: "অন্যান্য খাদ্যশস্য",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 55, wholesale_max: 62, retail_min: 68, retail_max: 75, prev_avg: 58.0 }
  },
  {
    name_bn: "কাউন চাল",
    name_en: "Foxtail Millet (Kaun)",
    category_bn: "প্রধান খাদ্যশস্য",
    category_en: "Cereal Crops",
    subCategory_bn: "ক্ষুদ্র খাদ্যশস্য",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1607672632458-9eb56696346b?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 90, wholesale_max: 100, retail_min: 110, retail_max: 120, prev_avg: 94.0 }
  },
  {
    name_bn: "চিনা",
    name_en: "Proso Millet (Cheena)",
    category_bn: "প্রধান খাদ্যশস্য",
    category_en: "Cereal Crops",
    subCategory_bn: "ক্ষুদ্র খাদ্যশস্য",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 80, wholesale_max: 90, retail_min: 95, retail_max: 105, prev_avg: 85.0 }
  },

  // ==========================================
  // 2. অর্থকরী ফসল (Cash Crops)
  // ==========================================
  {
    name_bn: "পাট (তোষা)",
    name_en: "Tossa Jute",
    category_bn: "অর্থকরী ফসল",
    category_en: "Cash Crops",
    subCategory_bn: "পাট",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 75, wholesale_max: 85, retail_min: 90, retail_max: 100, prev_avg: 78.0 }
  },
  {
    name_bn: "পাট (সাদা দেশি)",
    name_en: "White Jute",
    category_bn: "অর্থকরী ফসল",
    category_en: "Cash Crops",
    subCategory_bn: "পাট",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 65, wholesale_max: 75, retail_min: 80, retail_max: 90, prev_avg: 72.0 }
  },
  {
    name_bn: "চা (কাঁচা পাতা)",
    name_en: "Tea (Raw Leaves)",
    category_bn: "অর্থকরী ফসল",
    category_en: "Cash Crops",
    subCategory_bn: "চা",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 24, wholesale_max: 28, retail_min: 30, retail_max: 35, prev_avg: 25.0 }
  },
  {
    name_bn: "তামাক পাতা",
    name_en: "Tobacco Leaf",
    category_bn: "অর্থকরী ফসল",
    category_en: "Cash Crops",
    subCategory_bn: "তামাক",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 120, wholesale_max: 140, retail_min: 150, retail_max: 165, prev_avg: 130.0 }
  },
  {
    name_bn: "তুলা (কার্পাস)",
    name_en: "Seed Cotton (Karpas)",
    category_bn: "অর্থকরী ফসল",
    category_en: "Cash Crops",
    subCategory_bn: "তুলা",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1594897030560-692131976a44?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 85, wholesale_max: 95, retail_min: 100, retail_max: 110, prev_avg: 90.0 }
  },
  {
    name_bn: "তুলা (শিমুল)",
    name_en: "Silk Cotton (Simul)",
    category_bn: "অর্থকরী ফসল",
    category_en: "Cash Crops",
    subCategory_bn: "তুলা",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 140, wholesale_max: 160, retail_min: 180, retail_max: 200, prev_avg: 150.0 }
  },
  {
    name_bn: "আখ (ইক্ষু)",
    name_en: "Sugarcane",
    category_bn: "অর্থকরী ফসল",
    category_en: "Cash Crops",
    subCategory_bn: "আখ",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 30, wholesale_max: 40, retail_min: 45, retail_max: 60, prev_avg: 35.0 }
  },
  {
    name_bn: "রাবার (শিট)",
    name_en: "Raw Rubber Sheet",
    category_bn: "অর্থকরী ফসল",
    category_en: "Cash Crops",
    subCategory_bn: "রাবার",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 180, wholesale_max: 210, retail_min: 220, retail_max: 240, prev_avg: 195.0 }
  },
  {
    name_bn: "পান পাতা",
    name_en: "Betel Leaf",
    category_bn: "অর্থকরী ফসল",
    category_en: "Cash Crops",
    subCategory_bn: "পান ও সুপারি",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 90, wholesale_max: 120, retail_min: 130, retail_max: 160, prev_avg: 100.0 }
  },
  {
    name_bn: "সুপারি (কাঁচা ও শুকনা)",
    name_en: "Betel Nut (Areca Nut)",
    category_bn: "অর্থকরী ফসল",
    category_en: "Cash Crops",
    subCategory_bn: "পান ও সুপারি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 350, wholesale_max: 420, retail_min: 440, retail_max: 500, prev_avg: 380.0 }
  },

  // ==========================================
  // 3. ডালজাতীয় ফসল (Pulses)
  // ==========================================
  {
    name_bn: "মসুর ডাল (দেশি)",
    name_en: "Red Lentil (Deshi Masoor)",
    category_bn: "ডালজাতীয় ফসল",
    category_en: "Pulses",
    subCategory_bn: "মসুর",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1585994114537-899818886309?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 125, wholesale_max: 135, retail_min: 140, retail_max: 150, prev_avg: 130.0 }
  },
  {
    name_bn: "মুগ ডাল",
    name_en: "Mung Bean (Moog Dal)",
    category_bn: "ডালজাতীয় ফসল",
    category_en: "Pulses",
    subCategory_bn: "মুগ",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 130, wholesale_max: 145, retail_min: 155, retail_max: 170, prev_avg: 138.0 }
  },
  {
    name_bn: "মাষকলাই ডাল",
    name_en: "Black Gram (Mashkalai)",
    category_bn: "ডালজাতীয় ফসল",
    category_en: "Pulses",
    subCategory_bn: "মাষকলাই",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 110, wholesale_max: 125, retail_min: 130, retail_max: 145, prev_avg: 115.0 }
  },
  {
    name_bn: "খেসারি ডাল",
    name_en: "Grass Pea (Khesari Dal)",
    category_bn: "ডালজাতীয় ফসল",
    category_en: "Pulses",
    subCategory_bn: "খেসারি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1585994114537-899818886309?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 80, wholesale_max: 90, retail_min: 95, retail_max: 105, prev_avg: 84.0 }
  },
  {
    name_bn: "ছোলা (বুট)",
    name_en: "Chickpeas (Chola / Boot)",
    category_bn: "ডালজাতীয় ফসল",
    category_en: "Pulses",
    subCategory_bn: "ছোলা",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 95, wholesale_max: 105, retail_min: 110, retail_max: 120, prev_avg: 98.0 }
  },
  {
    name_bn: "মটর ডাল",
    name_en: "Field Pea (Motor Dal)",
    category_bn: "ডালজাতীয় ফসল",
    category_en: "Pulses",
    subCategory_bn: "মটর",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 75, wholesale_max: 85, retail_min: 90, retail_max: 100, prev_avg: 80.0 }
  },
  {
    name_bn: "অড়হর ডাল",
    name_en: "Pigeon Pea (Arhar Dal)",
    category_bn: "ডালজাতীয় ফসল",
    category_en: "Pulses",
    subCategory_bn: "অড়হর",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1585994114537-899818886309?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 150, wholesale_max: 170, retail_min: 180, retail_max: 200, prev_avg: 160.0 }
  },

  // ==========================================
  // 4. তৈলবীজ ফসল (Oilseeds)
  // ==========================================
  {
    name_bn: "সরিষা (তরি)",
    name_en: "Mustard Seed (Tori)",
    category_bn: "তৈলবীজ ফসল",
    category_en: "Oilseeds",
    subCategory_bn: "সরিষা",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 75, wholesale_max: 82, retail_min: 88, retail_max: 95, prev_avg: 78.0 }
  },
  {
    name_bn: "সরিষা (শ্বেত / হলুদ)",
    name_en: "Yellow Mustard (Shweta)",
    category_bn: "তৈলবীজ ফসল",
    category_en: "Oilseeds",
    subCategory_bn: "সরিষা",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 80, wholesale_max: 88, retail_min: 92, retail_max: 100, prev_avg: 82.0 }
  },
  {
    name_bn: "সরিষা (রাই)",
    name_en: "Brown Mustard (Rai)",
    category_bn: "তৈলবীজ ফসল",
    category_en: "Oilseeds",
    subCategory_bn: "সরিষা",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 72, wholesale_max: 78, retail_min: 84, retail_max: 90, prev_avg: 75.0 }
  },
  {
    name_bn: "তিল",
    name_en: "Sesame Seed (Til)",
    category_bn: "তৈলবীজ ফসল",
    category_en: "Oilseeds",
    subCategory_bn: "তিল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 130, wholesale_max: 150, retail_min: 160, retail_max: 180, prev_avg: 138.0 }
  },
  {
    name_bn: "তিসি",
    name_en: "Linseed / Flaxseed (Tishi)",
    category_bn: "তৈলবীজ ফসল",
    category_en: "Oilseeds",
    subCategory_bn: "তিসি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 90, wholesale_max: 105, retail_min: 115, retail_max: 130, prev_avg: 96.0 }
  },
  {
    name_bn: "চিনাবাদাম",
    name_en: "Peanut / Groundnut",
    category_bn: "তৈলবীজ ফসল",
    category_en: "Oilseeds",
    subCategory_bn: "বাদাম",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1567894340315-735d7c361db0?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 95, wholesale_max: 110, retail_min: 120, retail_max: 135, prev_avg: 102.0 }
  },
  {
    name_bn: "সয়াবিন বীজ",
    name_en: "Soybean Seed",
    category_bn: "তৈলবীজ ফসল",
    category_en: "Oilseeds",
    subCategory_bn: "সয়াবিন",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 65, wholesale_max: 72, retail_min: 78, retail_max: 85, prev_avg: 68.0 }
  },
  {
    name_bn: "সূর্যমুখী বীজ",
    name_en: "Sunflower Seed",
    category_bn: "তৈলবীজ ফসল",
    category_en: "Oilseeds",
    subCategory_bn: "সূর্যমুখী",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 85, wholesale_max: 95, retail_min: 105, retail_max: 120, prev_avg: 90.0 }
  },
  {
    name_bn: "নারিকেল",
    name_en: "Coconut",
    category_bn: "তৈলবীজ ফসল",
    category_en: "Oilseeds",
    subCategory_bn: "নারিকেল",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 60, wholesale_max: 75, retail_min: 80, retail_max: 100, prev_avg: 68.0 }
  },

  // ==========================================
  // 5. মসলাজাতীয় ফসল (Spices)
  // ==========================================
  {
    name_bn: "পেঁয়াজ (দেশি)",
    name_en: "Local Onion (Deshi)",
    category_bn: "মসলাজাতীয় ফসল",
    category_en: "Spices",
    subCategory_bn: "পেঁয়াজ",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 75, wholesale_max: 85, retail_min: 90, retail_max: 105, prev_avg: 82.0 }
  },
  {
    name_bn: "পেঁয়াজ (আমদানি)",
    name_en: "Imported Onion",
    category_bn: "মসলাজাতীয় ফসল",
    category_en: "Spices",
    subCategory_bn: "পেঁয়াজ",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 65, wholesale_max: 72, retail_min: 78, retail_max: 85, prev_avg: 68.0 }
  },
  {
    name_bn: "রসুন (দেশি ও আমদানি)",
    name_en: "Garlic",
    category_bn: "মসলাজাতীয় ফসল",
    category_en: "Spices",
    subCategory_bn: "রসুন",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 170, wholesale_max: 195, retail_min: 210, retail_max: 235, prev_avg: 180.0 }
  },
  {
    name_bn: "আদা (দেশি)",
    name_en: "Ginger",
    category_bn: "মসলাজাতীয় ফসল",
    category_en: "Spices",
    subCategory_bn: "আদা",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 160, wholesale_max: 185, retail_min: 200, retail_max: 230, prev_avg: 172.0 }
  },
  {
    name_bn: "হলুদ (কাঁচা ও শুকনা)",
    name_en: "Turmeric",
    category_bn: "মসলাজাতীয় ফসল",
    category_en: "Spices",
    subCategory_bn: "হলুদ",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1615485290176-a192135081b2?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 220, wholesale_max: 250, retail_min: 270, retail_max: 300, prev_avg: 235.0 }
  },
  {
    name_bn: "কাঁচা মরিচ",
    name_en: "Green Chili",
    category_bn: "মসলাজাতীয় ফসল",
    category_en: "Spices",
    subCategory_bn: "মরিচ",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 70, wholesale_max: 90, retail_min: 100, retail_max: 120, prev_avg: 85.0 }
  },
  {
    name_bn: "শুকনা মরিচ",
    name_en: "Dry Red Chili",
    category_bn: "মসলাজাতীয় ফসল",
    category_en: "Spices",
    subCategory_bn: "মরিচ",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 320, wholesale_max: 360, retail_min: 380, retail_max: 420, prev_avg: 345.0 }
  },
  {
    name_bn: "ধনিয়া বীজ",
    name_en: "Coriander Seed",
    category_bn: "মসলাজাতীয় ফসল",
    category_en: "Spices",
    subCategory_bn: "ধনিয়া",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 140, wholesale_max: 160, retail_min: 175, retail_max: 200, prev_avg: 150.0 }
  },
  {
    name_bn: "জিরা",
    name_en: "Cumin Seed",
    category_bn: "মসলাজাতীয় ফসল",
    category_en: "Spices",
    subCategory_bn: "জিরা",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 680, wholesale_max: 750, retail_min: 780, retail_max: 850, prev_avg: 710.0 }
  },
  {
    name_bn: "কালোজিরা",
    name_en: "Black Cumin / Nigella",
    category_bn: "মসলাজাতীয় ফসল",
    category_en: "Spices",
    subCategory_bn: "কালোজিরা",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1607672632458-9eb56696346b?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 300, wholesale_max: 340, retail_min: 360, retail_max: 400, prev_avg: 320.0 }
  },
  {
    name_bn: "মেথি",
    name_en: "Fenugreek Seed (Methi)",
    category_bn: "মসলাজাতীয় ফসল",
    category_en: "Spices",
    subCategory_bn: "মেথি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 110, wholesale_max: 130, retail_min: 140, retail_max: 160, prev_avg: 120.0 }
  },
  {
    name_bn: "মৌরি (মিষ্টিজিরা)",
    name_en: "Fennel Seed (Mouri)",
    category_bn: "মসলাজাতীয় ফসল",
    category_en: "Spices",
    subCategory_bn: "মৌরি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 220, wholesale_max: 250, retail_min: 270, retail_max: 300, prev_avg: 235.0 }
  },
  {
    name_bn: "তেজপাতা",
    name_en: "Bay Leaf (Tejpatta)",
    category_bn: "মসলাজাতীয় ফসল",
    category_en: "Spices",
    subCategory_bn: "তেজপাতা",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 130, wholesale_max: 155, retail_min: 170, retail_max: 195, prev_avg: 140.0 }
  },
  {
    name_bn: "দারুচিনি",
    name_en: "Cinnamon (Daruchini)",
    category_bn: "মসলাজাতীয় ফসল",
    category_en: "Spices",
    subCategory_bn: "দারুচিনি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 440, wholesale_max: 490, retail_min: 520, retail_max: 580, prev_avg: 460.0 }
  },

  // ==========================================
  // 6. শাকসবজি ও কন্দাল ফসল (Vegetables & Tubers)
  // ==========================================
  {
    name_bn: "গোল আলু",
    name_en: "Potato",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "কন্দাল ফসল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 45, wholesale_max: 52, retail_min: 55, retail_max: 62, prev_avg: 48.0 }
  },
  {
    name_bn: "মিষ্টি আলু",
    name_en: "Sweet Potato",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "কন্দাল ফসল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 35, wholesale_max: 42, retail_min: 45, retail_max: 55, prev_avg: 38.0 }
  },
  {
    name_bn: "মুখীকচু",
    name_en: "Mukhi Taro",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "কচু",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 40, wholesale_max: 48, retail_min: 52, retail_max: 60, prev_avg: 44.0 }
  },
  {
    name_bn: "মানকচু",
    name_en: "Giant Taro (Maan Kochu)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "কচু",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 35, wholesale_max: 45, retail_min: 50, retail_max: 60, prev_avg: 40.0 }
  },
  {
    name_bn: "পানিকচু",
    name_en: "Water Taro (Pani Kochu)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "কচু",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1592417817098-8f3d69109853?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 30, wholesale_max: 38, retail_min: 42, retail_max: 50, prev_avg: 34.0 }
  },
  {
    name_bn: "ওলকচু",
    name_en: "Elephant Foot Yam (Olkachu)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "কচু",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 45, wholesale_max: 55, retail_min: 60, retail_max: 70, prev_avg: 50.0 }
  },
  {
    name_bn: "শালগম",
    name_en: "Turnip",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "মূলজাতীয়",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 25, wholesale_max: 32, retail_min: 35, retail_max: 45, prev_avg: 28.0 }
  },
  {
    name_bn: "মুলা",
    name_en: "Radish",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "মূলজাতীয়",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 20, wholesale_max: 26, retail_min: 30, retail_max: 40, prev_avg: 22.0 }
  },
  {
    name_bn: "গাজর",
    name_en: "Carrot",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "মূলজাতীয়",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 45, wholesale_max: 55, retail_min: 60, retail_max: 75, prev_avg: 50.0 }
  },
  {
    name_bn: "বিট",
    name_en: "Beetroot",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "মূলজাতীয়",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 60, wholesale_max: 75, retail_min: 80, retail_max: 95, prev_avg: 68.0 }
  },
  {
    name_bn: "বেগুন (গোল ও লম্বা)",
    name_en: "Eggplant (Brinjal)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 45, wholesale_max: 55, retail_min: 60, retail_max: 75, prev_avg: 50.0 }
  },
  {
    name_bn: "টমেটো",
    name_en: "Tomato",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 50, wholesale_max: 65, retail_min: 70, retail_max: 85, prev_avg: 58.0 }
  },
  {
    name_bn: "পটল",
    name_en: "Pointed Gourd (Potol)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 40, wholesale_max: 48, retail_min: 55, retail_max: 65, prev_avg: 44.0 }
  },
  {
    name_bn: "করলা",
    name_en: "Bitter Gourd (Korola)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 55, wholesale_max: 68, retail_min: 75, retail_max: 90, prev_avg: 60.0 }
  },
  {
    name_bn: "উচ্ছে",
    name_en: "Wild Bitter Gourd (Uchhe)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 60, wholesale_max: 75, retail_min: 80, retail_max: 95, prev_avg: 65.0 }
  },
  {
    name_bn: "ঝিঙা",
    name_en: "Ridge Gourd (Jhinga)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 35, wholesale_max: 45, retail_min: 50, retail_max: 60, prev_avg: 40.0 }
  },
  {
    name_bn: "চিচিঙ্গা",
    name_en: "Snake Gourd (Chichinga)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 35, wholesale_max: 42, retail_min: 48, retail_max: 58, prev_avg: 38.0 }
  },
  {
    name_bn: "ধুন্দল",
    name_en: "Sponge Gourd (Dhundul)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 30, wholesale_max: 38, retail_min: 45, retail_max: 55, prev_avg: 34.0 }
  },
  {
    name_bn: "চালকুমড়া",
    name_en: "Wax Gourd / Ash Gourd",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 35, wholesale_max: 45, retail_min: 50, retail_max: 65, prev_avg: 40.0 }
  },
  {
    name_bn: "মিষ্টিকুমড়া",
    name_en: "Sweet Pumpkin",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 28, wholesale_max: 35, retail_min: 40, retail_max: 50, prev_avg: 32.0 }
  },
  {
    name_bn: "লাউ",
    name_en: "Bottle Gourd (Lau)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 40, wholesale_max: 55, retail_min: 60, retail_max: 80, prev_avg: 48.0 }
  },
  {
    name_bn: "শসা",
    name_en: "Cucumber",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 35, wholesale_max: 45, retail_min: 50, retail_max: 65, prev_avg: 40.0 }
  },
  {
    name_bn: "ঢ্যাঁড়স",
    name_en: "Okra / Ladyfinger (Dherosh)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 38, wholesale_max: 48, retail_min: 55, retail_max: 65, prev_avg: 42.0 }
  },
  {
    name_bn: "বরবটি",
    name_en: "Yardlong Bean (Borboti)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 45, wholesale_max: 55, retail_min: 60, retail_max: 75, prev_avg: 50.0 }
  },
  {
    name_bn: "শিম",
    name_en: "Hyacinth Bean (Shim)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 40, wholesale_max: 52, retail_min: 58, retail_max: 70, prev_avg: 46.0 }
  },
  {
    name_bn: "বাঁধাকপি",
    name_en: "Cabbage",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 25, wholesale_max: 35, retail_min: 40, retail_max: 50, prev_avg: 30.0 }
  },
  {
    name_bn: "ফুলকপি",
    name_en: "Cauliflower",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 30, wholesale_max: 42, retail_min: 48, retail_max: 60, prev_avg: 35.0 }
  },
  {
    name_bn: "ওলকপি",
    name_en: "Kohlrabi (Olkopi)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 25, wholesale_max: 32, retail_min: 38, retail_max: 48, prev_avg: 28.0 }
  },
  {
    name_bn: "ব্রকলি",
    name_en: "Broccoli",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 40, wholesale_max: 55, retail_min: 60, retail_max: 75, prev_avg: 48.0 }
  },
  {
    name_bn: "সজনে ডাঁটা",
    name_en: "Drumstick (Sojne Data)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 120, wholesale_max: 150, retail_min: 160, retail_max: 190, prev_avg: 135.0 }
  },
  {
    name_bn: "কাঁচকলা",
    name_en: "Green Cooking Banana",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "হালি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 25, wholesale_max: 32, retail_min: 36, retail_max: 45, prev_avg: 28.0 }
  },
  {
    name_bn: "কাঁচা পেঁপে",
    name_en: "Green Papaya",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "সবজি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 25, wholesale_max: 32, retail_min: 38, retail_max: 48, prev_avg: 28.0 }
  },
  {
    name_bn: "লালশাক",
    name_en: "Red Amaranth Leaves",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "শাক",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 12, wholesale_max: 16, retail_min: 20, retail_max: 25, prev_avg: 14.0 }
  },
  {
    name_bn: "পালংশাক",
    name_en: "Spinach (Palongshak)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "শাক",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 15, wholesale_max: 20, retail_min: 25, retail_max: 30, prev_avg: 17.0 }
  },
  {
    name_bn: "পুঁইশাক",
    name_en: "Malabar Spinach (Puinshak)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "শাক",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 18, wholesale_max: 24, retail_min: 30, retail_max: 35, prev_avg: 20.0 }
  },
  {
    name_bn: "কলমিশাক",
    name_en: "Water Spinach (Kolmishak)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "শাক",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 10, wholesale_max: 14, retail_min: 18, retail_max: 22, prev_avg: 12.0 }
  },
  {
    name_bn: "ডাঁটাশাক",
    name_en: "Stem Amaranth (Datashak)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "শাক",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 14, wholesale_max: 18, retail_min: 22, retail_max: 28, prev_avg: 16.0 }
  },
  {
    name_bn: "লাউশাক",
    name_en: "Bottle Gourd Leaves (Laushak)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "শাক",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 20, wholesale_max: 28, retail_min: 35, retail_max: 45, prev_avg: 24.0 }
  },
  {
    name_bn: "কুমড়াশাক",
    name_en: "Pumpkin Greens (Kumrashak)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "শাক",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 18, wholesale_max: 25, retail_min: 30, retail_max: 40, prev_avg: 21.0 }
  },
  {
    name_bn: "পাটশাক",
    name_en: "Jute Leaves (Patshak)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "শাক",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 10, wholesale_max: 15, retail_min: 18, retail_max: 25, prev_avg: 12.0 }
  },
  {
    name_bn: "সরিষা শাক",
    name_en: "Mustard Greens (Shorisha Shak)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "শাক",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 12, wholesale_max: 16, retail_min: 20, retail_max: 25, prev_avg: 14.0 }
  },
  {
    name_bn: "মুলাশাক",
    name_en: "Radish Greens (Mulashak)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "শাক",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 10, wholesale_max: 14, retail_min: 16, retail_max: 20, prev_avg: 12.0 }
  },
  {
    name_bn: "বথুয়া শাক",
    name_en: "Bathua Greens (Lamb's Quarters)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "শাক",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 12, wholesale_max: 16, retail_min: 20, retail_max: 25, prev_avg: 14.0 }
  },
  {
    name_bn: "হেলেঞ্চা শাক",
    name_en: "Helencha Greens (Water Cress)",
    category_bn: "শাকসবজি ও কন্দাল ফসল",
    category_en: "Vegetables & Tubers",
    subCategory_bn: "শাক",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 14, wholesale_max: 18, retail_min: 22, retail_max: 28, prev_avg: 16.0 }
  },

  // ==========================================
  // 7. ফলমূল (Fruits)
  // ==========================================
  {
    name_bn: "আম (হিমসাগর / ল্যাংড়া / আম্রপালি)",
    name_en: "Mango (Himsagar / Langra / Amrapali)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "গ্রীষ্মকালীন ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 80, wholesale_max: 110, retail_min: 120, retail_max: 150, prev_avg: 92.0 }
  },
  {
    name_bn: "কাঁঠাল",
    name_en: "Jackfruit",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "জাতীয় ফল",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 120, wholesale_max: 180, retail_min: 200, retail_max: 280, prev_avg: 145.0 }
  },
  {
    name_bn: "লিচু (মাদ্রাজ / বোম্বাই / বেদানা)",
    name_en: "Litchi (Lychee)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "গ্রীষ্মকালীন ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 220, wholesale_max: 280, retail_min: 300, retail_max: 380, prev_avg: 240.0 }
  },
  {
    name_bn: "কালোজাম",
    name_en: "Black Plum (Jamun)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "গ্রীষ্মকালীন ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 120, wholesale_max: 160, retail_min: 180, retail_max: 220, prev_avg: 135.0 }
  },
  {
    name_bn: "জামরুল",
    name_en: "Wax Apple / Water Apple",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "দেশি ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 80, wholesale_max: 110, retail_min: 120, retail_max: 150, prev_avg: 90.0 }
  },
  {
    name_bn: "আনারস (জলডুগি / ক্যালেন্ডার)",
    name_en: "Pineapple",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "গ্রীষ্মকালীন ফল",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 30, wholesale_max: 45, retail_min: 50, retail_max: 70, prev_avg: 36.0 }
  },
  {
    name_bn: "তরমুজ",
    name_en: "Watermelon",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "গ্রীষ্মকালীন ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 30, wholesale_max: 42, retail_min: 48, retail_max: 60, prev_avg: 35.0 }
  },
  {
    name_bn: "বাঙ্গি",
    name_en: "Muskmelon (Bangi)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "গ্রীষ্মকালীন ফল",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 50, wholesale_max: 80, retail_min: 90, retail_max: 130, prev_avg: 62.0 }
  },
  {
    name_bn: "তাল (পাকা ও কচি)",
    name_en: "Palmyra Palm (Taal)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "দেশি ফল",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 40, wholesale_max: 60, retail_min: 70, retail_max: 100, prev_avg: 48.0 }
  },
  {
    name_bn: "বেল",
    name_en: "Wood Apple (Bael)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "দেশি ফল",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 30, wholesale_max: 50, retail_min: 60, retail_max: 85, prev_avg: 38.0 }
  },
  {
    name_bn: "কদবেল",
    name_en: "Elephant Apple (Kodbel)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "দেশি ফল",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 20, wholesale_max: 35, retail_min: 40, retail_max: 55, prev_avg: 26.0 }
  },
  {
    name_bn: "লটকন",
    name_en: "Burmese Grape (Lotkon)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "দেশি ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 90, wholesale_max: 130, retail_min: 140, retail_max: 180, prev_avg: 105.0 }
  },
  {
    name_bn: "আমড়া",
    name_en: "Hog Plum (Amra)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "দেশি ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 40, wholesale_max: 55, retail_min: 60, retail_max: 80, prev_avg: 46.0 }
  },
  {
    name_bn: "পেয়ারা (কাজী ও থাই)",
    name_en: "Guava (Kazi & Thai)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "বারোমাসি ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1536511135899-7a7167661386?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 45, wholesale_max: 60, retail_min: 68, retail_max: 85, prev_avg: 50.0 }
  },
  {
    name_bn: "কলা (সাগর)",
    name_en: "Sagar Banana",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "কলা",
    unit_bn: "হালি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 30, wholesale_max: 38, retail_min: 42, retail_max: 50, prev_avg: 33.0 }
  },
  {
    name_bn: "কলা (সবরি)",
    name_en: "Sabri Banana",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "কলা",
    unit_bn: "হালি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 35, wholesale_max: 45, retail_min: 50, retail_max: 60, prev_avg: 38.0 }
  },
  {
    name_bn: "কলা (চম্পা)",
    name_en: "Champa Banana",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "কলা",
    unit_bn: "হালি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 22, wholesale_max: 28, retail_min: 30, retail_max: 38, prev_avg: 24.0 }
  },
  {
    name_bn: "কলা (বাংলা)",
    name_en: "Bangla Banana",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "কলা",
    unit_bn: "হালি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 20, wholesale_max: 26, retail_min: 28, retail_max: 35, prev_avg: 22.0 }
  },
  {
    name_bn: "পাকা পেঁপে",
    name_en: "Ripe Papaya",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "বারোমাসি ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 60, wholesale_max: 80, retail_min: 90, retail_max: 120, prev_avg: 68.0 }
  },
  {
    name_bn: "লেবু (কাগজি)",
    name_en: "Kagzi Lime",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "লেবু",
    unit_bn: "হালি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 25, wholesale_max: 38, retail_min: 40, retail_max: 55, prev_avg: 30.0 }
  },
  {
    name_bn: "লেবু (এলাচি)",
    name_en: "Elachi Lemon",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "লেবু",
    unit_bn: "হালি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 20, wholesale_max: 30, retail_min: 35, retail_max: 45, prev_avg: 24.0 }
  },
  {
    name_bn: "বাতাবি লেবু (জাম্বুরা)",
    name_en: "Pomelo (Batabi Lebu)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "লেবু",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 30, wholesale_max: 50, retail_min: 60, retail_max: 80, prev_avg: 38.0 }
  },
  {
    name_bn: "কমলা",
    name_en: "Orange",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "লেবুজাতীয়",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 220, wholesale_max: 260, retail_min: 280, retail_max: 320, prev_avg: 235.0 }
  },
  {
    name_bn: "মাল্টা (বারি মাল্টা-১)",
    name_en: "Malta (Sweet Orange)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "লেবুজাতীয়",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 150, wholesale_max: 180, retail_min: 190, retail_max: 220, prev_avg: 162.0 }
  },
  {
    name_bn: "কুল (বরই)",
    name_en: "Jujube / Plum (Kul Boroi)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "শীতকালীন ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 60, wholesale_max: 85, retail_min: 95, retail_max: 120, prev_avg: 70.0 }
  },
  {
    name_bn: "সফেদা",
    name_en: "Sapodilla (Sofeda)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "দেশি ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 80, wholesale_max: 110, retail_min: 120, retail_max: 150, prev_avg: 92.0 }
  },
  {
    name_bn: "ডালিম (বেদানা)",
    name_en: "Pomegranate (Dalim / Bedana)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "ফলমূল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1541344999736-83eca872f240?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 320, wholesale_max: 380, retail_min: 400, retail_max: 480, prev_avg: 345.0 }
  },
  {
    name_bn: "আতা ফল",
    name_en: "Custard Apple (Ata)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "দেশি ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 160, wholesale_max: 200, retail_min: 220, retail_max: 260, prev_avg: 175.0 }
  },
  {
    name_bn: "শরীফা",
    name_en: "Sugar Apple (Shorifa)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "দেশি ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 170, wholesale_max: 220, retail_min: 240, retail_max: 280, prev_avg: 190.0 }
  },
  {
    name_bn: "কামরাঙা",
    name_en: "Starfruit (Kamranga)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "দেশি ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 50, wholesale_max: 70, retail_min: 80, retail_max: 100, prev_avg: 58.0 }
  },
  {
    name_bn: "জলপাই",
    name_en: "Olive (Jolpai)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "দেশি ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1541344999736-83eca872f240?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 40, wholesale_max: 55, retail_min: 65, retail_max: 80, prev_avg: 45.0 }
  },
  {
    name_bn: "চালতা",
    name_en: "Elephant Apple (Chalta)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "দেশি ফল",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 15, wholesale_max: 25, retail_min: 30, retail_max: 40, prev_avg: 20.0 }
  },
  {
    name_bn: "তেঁতুল (পাকা)",
    name_en: "Tamarind (Tetul)",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "দেশি ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 140, wholesale_max: 180, retail_min: 190, retail_max: 240, prev_avg: 155.0 }
  },
  {
    name_bn: "ড্রাগন ফল",
    name_en: "Dragon Fruit",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "বিদেশি ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 180, wholesale_max: 240, retail_min: 260, retail_max: 320, prev_avg: 200.0 }
  },
  {
    name_bn: "স্ট্রবেরি",
    name_en: "Strawberry",
    category_bn: "ফলমূল",
    category_en: "Fruits",
    subCategory_bn: "শীতকালীন ফল",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 350, wholesale_max: 450, retail_min: 480, retail_max: 600, prev_avg: 380.0 }
  },

  // ==========================================
  // 8. ফুল ও শোভাবর্ধক উদ্ভিদ (Flowers)
  // ==========================================
  {
    name_bn: "গোলাপ (লাল ও সাদা)",
    name_en: "Rose",
    category_bn: "ফুল ও শোভাবর্ধক উদ্ভিদ",
    category_en: "Flowers",
    subCategory_bn: "ফুল",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 6, wholesale_max: 10, retail_min: 15, retail_max: 25, prev_avg: 8.0 }
  },
  {
    name_bn: "গাঁদা ফুল",
    name_en: "Marigold",
    category_bn: "ফুল ও শোভাবর্ধক উদ্ভিদ",
    category_en: "Flowers",
    subCategory_bn: "ফুল",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 30, wholesale_max: 50, retail_min: 60, retail_max: 80, prev_avg: 40.0 }
  },
  {
    name_bn: "রজনীগন্ধা (স্টিক)",
    name_en: "Tuberose (Rajnigandha)",
    category_bn: "ফুল ও শোভাবর্ধক উদ্ভিদ",
    category_en: "Flowers",
    subCategory_bn: "ফুল",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 4, wholesale_max: 7, retail_min: 10, retail_max: 15, prev_avg: 5.5 }
  },
  {
    name_bn: "গ্ল্যাডিওলাস (স্টিক)",
    name_en: "Gladiolus",
    category_bn: "ফুল ও শোভাবর্ধক উদ্ভিদ",
    category_en: "Flowers",
    subCategory_bn: "ফুল",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 8, wholesale_max: 14, retail_min: 18, retail_max: 25, prev_avg: 10.0 }
  },
  {
    name_bn: "জারবেরা",
    name_en: "Gerbera",
    category_bn: "ফুল ও শোভাবর্ধক উদ্ভিদ",
    category_en: "Flowers",
    subCategory_bn: "ফুল",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 10, wholesale_max: 16, retail_min: 20, retail_max: 30, prev_avg: 12.0 }
  },
  {
    name_bn: "জুঁই ফুল",
    name_en: "Jasmine (Jui)",
    category_bn: "ফুল ও শোভাবর্ধক উদ্ভিদ",
    category_en: "Flowers",
    subCategory_bn: "ফুল",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 40, wholesale_max: 60, retail_min: 70, retail_max: 90, prev_avg: 48.0 }
  },
  {
    name_bn: "বেলি ফুল",
    name_en: "Arabian Jasmine (Beli)",
    category_bn: "ফুল ও শোভাবর্ধক উদ্ভিদ",
    category_en: "Flowers",
    subCategory_bn: "ফুল",
    unit_bn: "আঁটি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 45, wholesale_max: 65, retail_min: 75, retail_max: 100, prev_avg: 52.0 }
  },
  {
    name_bn: "চন্দ্রমল্লিকা",
    name_en: "Chrysanthemum",
    category_bn: "ফুল ও শোভাবর্ধক উদ্ভিদ",
    category_en: "Flowers",
    subCategory_bn: "ফুল",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 5, wholesale_max: 9, retail_min: 12, retail_max: 18, prev_avg: 7.0 }
  },
  {
    name_bn: "অর্কিড (স্টিক)",
    name_en: "Orchid",
    category_bn: "ফুল ও শোভাবর্ধক উদ্ভিদ",
    category_en: "Flowers",
    subCategory_bn: "ফুল",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1566806785865-c322ce36df52?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 40, wholesale_max: 65, retail_min: 80, retail_max: 120, prev_avg: 50.0 }
  },

  // ==========================================
  // 9. অন্যান্য কৃষিজাত ও উপজাত পণ্য (Allied Agricultural Products)
  // ==========================================
  {
    name_bn: "রুই মাছ",
    name_en: "Rui Fish (Rohu)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "মাছ",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 280, wholesale_max: 340, retail_min: 360, retail_max: 420, prev_avg: 300.0 }
  },
  {
    name_bn: "কাতলা মাছ",
    name_en: "Catla Fish",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "মাছ",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 300, wholesale_max: 360, retail_min: 380, retail_max: 450, prev_avg: 320.0 }
  },
  {
    name_bn: "মৃগেল মাছ",
    name_en: "Mrigal Fish",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "মাছ",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 220, wholesale_max: 260, retail_min: 280, retail_max: 320, prev_avg: 235.0 }
  },
  {
    name_bn: "ইলিশ মাছ (১ কেজি সাইজ)",
    name_en: "Hilsa Fish (Ilish 1kg)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "মাছ",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 1200, wholesale_max: 1450, retail_min: 1550, retail_max: 1800, prev_avg: 1300.0 }
  },
  {
    name_bn: "পাঙাশ মাছ",
    name_en: "Pangas Fish",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "মাছ",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 140, wholesale_max: 165, retail_min: 180, retail_max: 200, prev_avg: 150.0 }
  },
  {
    name_bn: "তেলাপিয়া মাছ",
    name_en: "Tilapia Fish",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "মাছ",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 160, wholesale_max: 190, retail_min: 210, retail_max: 240, prev_avg: 175.0 }
  },
  {
    name_bn: "বাগদা চিংড়ি",
    name_en: "Bagda Prawn (Tiger Shrimp)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "চিংড়ি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 650, wholesale_max: 750, retail_min: 800, retail_max: 950, prev_avg: 680.0 }
  },
  {
    name_bn: "গলদা চিংড়ি",
    name_en: "Golda Prawn (Giant Freshwater)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "চিংড়ি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 750, wholesale_max: 900, retail_min: 950, retail_max: 1100, prev_avg: 800.0 }
  },
  {
    name_bn: "কই মাছ (দেশি ও চাষের)",
    name_en: "Climbing Perch (Koi)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "মাছ",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 220, wholesale_max: 280, retail_min: 300, retail_max: 360, prev_avg: 240.0 }
  },
  {
    name_bn: "শিং মাছ",
    name_en: "Stinging Catfish (Shing)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "মাছ",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 380, wholesale_max: 480, retail_min: 520, retail_max: 600, prev_avg: 410.0 }
  },
  {
    name_bn: "মাগুর মাছ",
    name_en: "Walking Catfish (Magur)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "মাছ",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1534043464124-3be32fe00099?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 420, wholesale_max: 520, retail_min: 560, retail_max: 650, prev_avg: 450.0 }
  },
  {
    name_bn: "গরুর মাংস",
    name_en: "Beef",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "মাংস",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 680, wholesale_max: 720, retail_min: 750, retail_max: 800, prev_avg: 700.0 }
  },
  {
    name_bn: "খাসির মাংস",
    name_en: "Mutton (Goat Meat)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "মাংস",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 980, wholesale_max: 1050, retail_min: 1100, retail_max: 1200, prev_avg: 1000.0 }
  },
  {
    name_bn: "মহিষের মাংস",
    name_en: "Buffalo Meat",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "মাংস",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 600, wholesale_max: 650, retail_min: 680, retail_max: 720, prev_avg: 620.0 }
  },
  {
    name_bn: "ভেড়ার মাংস",
    name_en: "Lamb / Sheep Meat",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "মাংস",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 750, wholesale_max: 820, retail_min: 850, retail_max: 920, prev_avg: 780.0 }
  },
  {
    name_bn: "কাঁচা চামড়া (গরু)",
    name_en: "Raw Hide (Cow)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "উপজাত",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 700, wholesale_max: 950, retail_min: 1000, retail_max: 1200, prev_avg: 800.0 }
  },
  {
    name_bn: "গরুর দুধ (খাঁটি কাঁচা)",
    name_en: "Cow Milk (Raw)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "দুগ্ধজাত",
    unit_bn: "লিটার",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 65, wholesale_max: 75, retail_min: 80, retail_max: 95, prev_avg: 70.0 }
  },
  {
    name_bn: "খাঁটি দেশি ঘি",
    name_en: "Pure Deshi Ghee",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "দুগ্ধজাত",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 1200, wholesale_max: 1400, retail_min: 1500, retail_max: 1750, prev_avg: 1250.0 }
  },
  {
    name_bn: "মাখন",
    name_en: "Butter (Deshi)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "দুগ্ধজাত",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 800, wholesale_max: 950, retail_min: 1000, retail_max: 1150, prev_avg: 850.0 }
  },
  {
    name_bn: "ছানা",
    name_en: "Chhena (Curd / Cottage Cheese)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "দুগ্ধজাত",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 350, wholesale_max: 420, retail_min: 450, retail_max: 500, prev_avg: 380.0 }
  },
  {
    name_bn: "ব্রয়লার মুরগি",
    name_en: "Broiler Chicken",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "পোল্ট্রি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 170, wholesale_max: 185, retail_min: 195, retail_max: 210, prev_avg: 175.0 }
  },
  {
    name_bn: "দেশি মুরগি",
    name_en: "Deshi / Indigenous Chicken",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "পোল্ট্রি",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 480, wholesale_max: 540, retail_min: 560, retail_max: 620, prev_avg: 500.0 }
  },
  {
    name_bn: "হাঁস",
    name_en: "Duck",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "পোল্ট্রি",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 450, wholesale_max: 550, retail_min: 580, retail_max: 700, prev_avg: 480.0 }
  },
  {
    name_bn: "ফার্মের ডিম (লাল)",
    name_en: "Farm Egg (Layer)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "ডিম",
    unit_bn: "হালি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 44, wholesale_max: 48, retail_min: 52, retail_max: 56, prev_avg: 46.0 }
  },
  {
    name_bn: "দেশি ডিম (মুরগি / হাঁস)",
    name_en: "Deshi Egg (Hen / Duck)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "ডিম",
    unit_bn: "হালি",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 65, wholesale_max: 72, retail_min: 75, retail_max: 85, prev_avg: 68.0 }
  },
  {
    name_bn: "খাঁটি মধু (সুন্দরবন ও সরিষা)",
    name_en: "Pure Raw Honey",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "উপজাত",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 650, wholesale_max: 850, retail_min: 900, retail_max: 1200, prev_avg: 700.0 }
  },
  {
    name_bn: "প্রাকৃতিক মৌচাকের মোম",
    name_en: "Natural Beeswax",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "উপজাত",
    unit_bn: "কেজি",
    maundMultiplier: 40,
    image_url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 450, wholesale_max: 550, retail_min: 600, retail_max: 750, prev_avg: 480.0 }
  },
  {
    name_bn: "বাঁশ (বরাক ও মুলি)",
    name_en: "Bamboo (Barak & Muli)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "বনজ কৃষিপণ্য",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 180, wholesale_max: 280, retail_min: 300, retail_max: 420, prev_avg: 210.0 }
  },
  {
    name_bn: "বেত",
    name_en: "Cane / Rattan",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "বনজ কৃষিপণ্য",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 120, wholesale_max: 180, retail_min: 200, retail_max: 260, prev_avg: 140.0 }
  },
  {
    name_bn: "কাঠ (মেহগনি / আকাশমণি)",
    name_en: "Timber Wood (Mahogany / Akasmoni)",
    category_bn: "অন্যান্য কৃষিজাত ও উপজাত পণ্য",
    category_en: "Allied Agricultural Products",
    subCategory_bn: "বনজ কৃষিপণ্য",
    unit_bn: "পিস",
    maundMultiplier: 0,
    image_url: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80",
    defaultPrices: { wholesale_min: 650, wholesale_max: 950, retail_min: 1000, retail_max: 1400, prev_avg: 750.0 }
  }
];

module.exports = masterProducts;
