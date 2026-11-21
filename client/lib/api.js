/**
 * API client for "ন্যায্য দাম" (Najjo Dam)
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Bengali number translation helper
export function toBengaliNumber(num) {
  if (num === null || num === undefined || isNaN(num)) return "০";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[parseInt(digit, 10)]);
}

// Format Bengali Currency (e.g. ৳ ২,৪০০)
export function formatTaka(num) {
  if (num === null || num === undefined || isNaN(num)) return "৳ ०";
  const formattedWithCommas = Math.round(num).toLocaleString("en-IN");
  return `৳ ${toBengaliNumber(formattedWithCommas)}`;
}

// Format Date in Bengali
export function getBengaliDate() {
  const date = new Date();
  const months = [
    "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
    "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
  ];
  const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
  
  const dayName = days[date.getDay()];
  const dayNum = toBengaliNumber(date.getDate());
  const monthName = months[date.getMonth()];
  const yearNum = toBengaliNumber(date.getFullYear());

  return `${dayName}, ${dayNum} ${monthName} ${yearNum}`;
}

// Fetch all administrative locations
export async function fetchLocations() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/public/locations`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch locations");
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return null;
  }
}

// Fetch active notices
export async function fetchNotices() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/public/notices`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch notices");
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching notices:", error);
    return [];
  }
}

// Fetch categories
export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/public/categories`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch categories");
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Fetch prices with filter
export async function fetchPrices({ division = 'Dhaka', district = 'Dhaka', upazila = '', category = '', search = '' }) {
  try {
    const params = new URLSearchParams();
    if (division) params.append('division', division);
    if (district) params.append('district', district);
    if (upazila) params.append('upazila', upazila);
    if (category) params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE_URL}/api/public/prices?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch prices");
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Error fetching prices:", error);
    return { success: false, data: [] };
  }
}

// Fetch comparison data for a product
export async function fetchProductComparison(productId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/public/prices/compare/${productId}`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch comparison");
    return await res.json();
  } catch (error) {
    console.error("Error fetching comparison:", error);
    return null;
  }
}
