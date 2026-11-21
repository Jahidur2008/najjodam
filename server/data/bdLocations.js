/**
 * Bangladesh Administrative Geo-Dataset
 * Contains all 8 Divisions, 64 Districts, and 495 Upazilas
 * Bilingual: Bengali (bn) and English (en)
 * Baseline default: Dhaka Division -> Dhaka District
 */

const bdLocations = [
  {
    "division_bn": "ঢাকা",
    "division_en": "Dhaka",
    "districts": [
      {
        "district_bn": "ঢাকা",
        "district_en": "Dhaka",
        "upazilas": [
          {
            "upazila_bn": "ধামরাই",
            "upazila_en": "Dhamrai"
          },
          {
            "upazila_bn": "দোহার",
            "upazila_en": "Dohar"
          },
          {
            "upazila_bn": "কেরানীগঞ্জ",
            "upazila_en": "Keraniganj"
          },
          {
            "upazila_bn": "নবাবগঞ্জ",
            "upazila_en": "Nawabganj"
          },
          {
            "upazila_bn": "সাভার",
            "upazila_en": "Savar"
          }
        ]
      },
      {
        "district_bn": "ফরিদপুর",
        "district_en": "Faridpur",
        "upazilas": [
          {
            "upazila_bn": "আলফাডাঙ্গা",
            "upazila_en": "Alfadanga"
          },
          {
            "upazila_bn": "ভাঙ্গা",
            "upazila_en": "Bhanga"
          },
          {
            "upazila_bn": "বোয়ালমারী",
            "upazila_en": "Boalmari"
          },
          {
            "upazila_bn": "চরভদ্রাসন",
            "upazila_en": "Charbhadrasan"
          },
          {
            "upazila_bn": "ফরিদপুর সদর",
            "upazila_en": "Faridpur Sadar"
          },
          {
            "upazila_bn": "মধুখালী",
            "upazila_en": "Madhukhali"
          },
          {
            "upazila_bn": "নগরকান্দা",
            "upazila_en": "Nagarkanda"
          },
          {
            "upazila_bn": "সদরপুর",
            "upazila_en": "Sadarpur"
          },
          {
            "upazila_bn": "সালথা",
            "upazila_en": "Saltha"
          }
        ]
      },
      {
        "district_bn": "গাজীপুর",
        "district_en": "Gazipur",
        "upazilas": [
          {
            "upazila_bn": "গাজীপুর সদর",
            "upazila_en": "Gazipur Sadar"
          },
          {
            "upazila_bn": "কালিয়াকৈর",
            "upazila_en": "Kaliakair"
          },
          {
            "upazila_bn": "কালীগঞ্জ",
            "upazila_en": "Kaliganj"
          },
          {
            "upazila_bn": "কাপাসিয়া",
            "upazila_en": "Kapasia"
          },
          {
            "upazila_bn": "শ্রীপুর",
            "upazila_en": "Sreepur"
          }
        ]
      },
      {
        "district_bn": "গোপালগঞ্জ",
        "district_en": "Gopalganj",
        "upazilas": [
          {
            "upazila_bn": "গোপালগঞ্জ সদর",
            "upazila_en": "Gopalganj Sadar"
          },
          {
            "upazila_bn": "কাশিয়ানী",
            "upazila_en": "Kashiani"
          },
          {
            "upazila_bn": "কোটালীপাড়া",
            "upazila_en": "Kotalipara"
          },
          {
            "upazila_bn": "মুকসুদপুর",
            "upazila_en": "Muksudpur"
          },
          {
            "upazila_bn": "টুঙ্গীপাড়া",
            "upazila_en": "Tungipara"
          }
        ]
      },
      {
        "district_bn": "কিশোরগঞ্জ",
        "district_en": "Kishoreganj",
        "upazilas": [
          {
            "upazila_bn": "অষ্টগ্রাম",
            "upazila_en": "Austagram"
          },
          {
            "upazila_bn": "বাজিতপুর",
            "upazila_en": "Bajitpur"
          },
          {
            "upazila_bn": "ভৈরব",
            "upazila_en": "Bhairab"
          },
          {
            "upazila_bn": "হোসেনপুর",
            "upazila_en": "Hossainpur"
          },
          {
            "upazila_bn": "ইটনা",
            "upazila_en": "Itna"
          },
          {
            "upazila_bn": "করিমগঞ্জ",
            "upazila_en": "Karimganj"
          },
          {
            "upazila_bn": "কটিয়াদী",
            "upazila_en": "Katiadi"
          },
          {
            "upazila_bn": "কিশোরগঞ্জ সদর",
            "upazila_en": "Kishoreganj Sadar"
          },
          {
            "upazila_bn": "কুলিয়ারচর",
            "upazila_en": "Kuliarchar"
          },
          {
            "upazila_bn": "মিঠামইন",
            "upazila_en": "Mithamain"
          },
          {
            "upazila_bn": "নিকলী",
            "upazila_en": "Nikli"
          },
          {
            "upazila_bn": "পাকুন্দিয়া",
            "upazila_en": "Pakundia"
          },
          {
            "upazila_bn": "তাড়াইল",
            "upazila_en": "Tarail"
          }
        ]
      },
      {
        "district_bn": "মাদারীপুর",
        "district_en": "Madaripur",
        "upazilas": [
          {
            "upazila_bn": "দাসার",
            "upazila_en": "Dasar"
          },
          {
            "upazila_bn": "কালকিনি",
            "upazila_en": "Kalkini"
          },
          {
            "upazila_bn": "মাদারীপুর সদর",
            "upazila_en": "Madaripur Sadar"
          },
          {
            "upazila_bn": "রাজৈর",
            "upazila_en": "Rajoir"
          },
          {
            "upazila_bn": "শিবচর",
            "upazila_en": "Shibchar"
          }
        ]
      },
      {
        "district_bn": "মানিকগঞ্জ",
        "district_en": "Manikganj",
        "upazilas": [
          {
            "upazila_bn": "দৌলতপুর",
            "upazila_en": "Daulatpur"
          },
          {
            "upazila_bn": "ঘিওর",
            "upazila_en": "Ghior"
          },
          {
            "upazila_bn": "হরিরামপুর",
            "upazila_en": "Harirampur"
          },
          {
            "upazila_bn": "মানিকগঞ্জ সদর",
            "upazila_en": "Manikganj Sadar"
          },
          {
            "upazila_bn": "সাটুরিয়া",
            "upazila_en": "Saturia"
          },
          {
            "upazila_bn": "শিবালয়",
            "upazila_en": "Shivalaya"
          },
          {
            "upazila_bn": "সিংগাইর",
            "upazila_en": "Singair"
          }
        ]
      },
      {
        "district_bn": "মুন্সিগঞ্জ",
        "district_en": "Munshiganj",
        "upazilas": [
          {
            "upazila_bn": "গজারিয়া",
            "upazila_en": "Gazaria"
          },
          {
            "upazila_bn": "লৌহজং",
            "upazila_en": "Lohajang"
          },
          {
            "upazila_bn": "মুন্সিগঞ্জ সদর",
            "upazila_en": "Munshiganj Sadar"
          },
          {
            "upazila_bn": "সিরাজদিখান",
            "upazila_en": "Serajdikhan"
          },
          {
            "upazila_bn": "শ্রীনগর",
            "upazila_en": "Sreenagar"
          },
          {
            "upazila_bn": "টংগীবাড়ি",
            "upazila_en": "Tongibari"
          }
        ]
      },
      {
        "district_bn": "নারায়ণগঞ্জ",
        "district_en": "Narayanganj",
        "upazilas": [
          {
            "upazila_bn": "আড়াইহাজার",
            "upazila_en": "Araihazar"
          },
          {
            "upazila_bn": "বন্দর",
            "upazila_en": "Bandar"
          },
          {
            "upazila_bn": "নারায়ণগঞ্জ সদর",
            "upazila_en": "Narayanganj Sadar"
          },
          {
            "upazila_bn": "রূপগঞ্জ",
            "upazila_en": "Rupganj"
          },
          {
            "upazila_bn": "সোনারগাঁ",
            "upazila_en": "Sonargaon"
          }
        ]
      },
      {
        "district_bn": "নরসিংদী",
        "district_en": "Norsingdi",
        "upazilas": [
          {
            "upazila_bn": "বেলাবো",
            "upazila_en": "Belabo"
          },
          {
            "upazila_bn": "মনোহরদী",
            "upazila_en": "Monohardi"
          },
          {
            "upazila_bn": "নরসিংদী সদর",
            "upazila_en": "Norsingdi Sadar"
          },
          {
            "upazila_bn": "পলাশ",
            "upazila_en": "Palash"
          },
          {
            "upazila_bn": "রায়পুরা",
            "upazila_en": "Raipura"
          },
          {
            "upazila_bn": "শিবপুর",
            "upazila_en": "Shibpur"
          }
        ]
      },
      {
        "district_bn": "রাজবাড়ী",
        "district_en": "Rajbari",
        "upazilas": [
          {
            "upazila_bn": "বালিয়াকান্দি",
            "upazila_en": "Baliakandi"
          },
          {
            "upazila_bn": "গোয়ালন্দ ঘাট",
            "upazila_en": "Goalandaghat"
          },
          {
            "upazila_bn": "কালুখালী",
            "upazila_en": "Kalukhali"
          },
          {
            "upazila_bn": "পাংশা",
            "upazila_en": "Pangsha"
          },
          {
            "upazila_bn": "রাজবাড়ী সদর",
            "upazila_en": "Rajbari Sadar"
          }
        ]
      },
      {
        "district_bn": "শরীয়তপুর",
        "district_en": "Shariatpur",
        "upazilas": [
          {
            "upazila_bn": "ভেদরগঞ্জ",
            "upazila_en": "Bhedarganj"
          },
          {
            "upazila_bn": "ডামুড্যা",
            "upazila_en": "Damudya"
          },
          {
            "upazila_bn": "গোসাইরহাট",
            "upazila_en": "Gosairhat"
          },
          {
            "upazila_bn": "নড়িয়া",
            "upazila_en": "Naria"
          },
          {
            "upazila_bn": "শাখিপুর",
            "upazila_en": "Shakhipur"
          },
          {
            "upazila_bn": "শরীয়তপুর সদর",
            "upazila_en": "Shariatpur Sadar"
          },
          {
            "upazila_bn": "জাজিরা",
            "upazila_en": "Zajira"
          }
        ]
      },
      {
        "district_bn": "টাঙ্গাইল",
        "district_en": "Tangail",
        "upazilas": [
          {
            "upazila_bn": "বাসাইল",
            "upazila_en": "Basail"
          },
          {
            "upazila_bn": "ভূয়াপুর",
            "upazila_en": "Bhuapur"
          },
          {
            "upazila_bn": "দেলদুয়ার",
            "upazila_en": "Delduar"
          },
          {
            "upazila_bn": "ধনবাড়ী",
            "upazila_en": "Dhanbari"
          },
          {
            "upazila_bn": "ঘাটাইল",
            "upazila_en": "Ghatail"
          },
          {
            "upazila_bn": "গোপালপুর",
            "upazila_en": "Gopalpur"
          },
          {
            "upazila_bn": "কালিহাতী",
            "upazila_en": "Kalihati"
          },
          {
            "upazila_bn": "মধুপুর",
            "upazila_en": "Madhupur"
          },
          {
            "upazila_bn": "মির্জাপুর",
            "upazila_en": "Mirzapur"
          },
          {
            "upazila_bn": "নাগরপুর",
            "upazila_en": "Nagarpur"
          },
          {
            "upazila_bn": "সখিপুর",
            "upazila_en": "Sakhipur"
          },
          {
            "upazila_bn": "টাঙ্গাইল সদর",
            "upazila_en": "Tangail Sadar"
          }
        ]
      }
    ]
  },
  {
    "division_bn": "চট্টগ্রাম",
    "division_en": "Chattogram",
    "districts": [
      {
        "district_bn": "বান্দরবান",
        "district_en": "Bandarban",
        "upazilas": [
          {
            "upazila_bn": "আলী কদম",
            "upazila_en": "Ali Kadam"
          },
          {
            "upazila_bn": "বান্দরবান সদর",
            "upazila_en": "Bandarban Sadar"
          },
          {
            "upazila_bn": "লামা",
            "upazila_en": "Lama"
          },
          {
            "upazila_bn": "নাইক্ষ্যংছড়ি",
            "upazila_en": "Naikhongchhari"
          },
          {
            "upazila_bn": "রোয়াংছড়ি",
            "upazila_en": "Rowangchhari"
          },
          {
            "upazila_bn": "রুমা",
            "upazila_en": "Ruma"
          },
          {
            "upazila_bn": "থানচি",
            "upazila_en": "Thanchi"
          }
        ]
      },
      {
        "district_bn": "ব্রাহ্মণবাড়িয়া",
        "district_en": "Brahmanbaria",
        "upazilas": [
          {
            "upazila_bn": "আখাউড়া",
            "upazila_en": "Akhaura"
          },
          {
            "upazila_bn": "আশুগঞ্জ",
            "upazila_en": "Ashuganj"
          },
          {
            "upazila_bn": "বাঞ্ছারামপুর",
            "upazila_en": "Bancharampur"
          },
          {
            "upazila_bn": "বিজয়নগর",
            "upazila_en": "Bijoynagar"
          },
          {
            "upazila_bn": "ব্রাহ্মণবাড়িয়া সদর",
            "upazila_en": "Brahmanbaria Sadar"
          },
          {
            "upazila_bn": "কসবা",
            "upazila_en": "Kasba"
          },
          {
            "upazila_bn": "নবীনগর",
            "upazila_en": "Nabinagar"
          },
          {
            "upazila_bn": "নাসিরনগর",
            "upazila_en": "Nasirnagar"
          },
          {
            "upazila_bn": "সরাইল",
            "upazila_en": "Sarail"
          }
        ]
      },
      {
        "district_bn": "চাঁদপুর",
        "district_en": "Chandpur",
        "upazilas": [
          {
            "upazila_bn": "চাঁদপুর সদর",
            "upazila_en": "Chandpur Sadar"
          },
          {
            "upazila_bn": "ফরিদগঞ্জ",
            "upazila_en": "Faridganj"
          },
          {
            "upazila_bn": "হাইমচর",
            "upazila_en": "Haimchar"
          },
          {
            "upazila_bn": "হাজীগঞ্জ",
            "upazila_en": "Haziganj"
          },
          {
            "upazila_bn": "কচুয়া",
            "upazila_en": "Kachua"
          },
          {
            "upazila_bn": "মতলব দক্ষিণ",
            "upazila_en": "Matlab Dakshin"
          },
          {
            "upazila_bn": "মতলব উত্তর",
            "upazila_en": "Matlab Uttar"
          },
          {
            "upazila_bn": "শাহরাস্তি",
            "upazila_en": "Shahrasti"
          }
        ]
      },
      {
        "district_bn": "চট্টগ্রাম",
        "district_en": "Chattogram",
        "upazilas": [
          {
            "upazila_bn": "আনোয়ারা",
            "upazila_en": "Anwara"
          },
          {
            "upazila_bn": "বাঁশখালী",
            "upazila_en": "Banshkhali"
          },
          {
            "upazila_bn": "বোয়ালখালী",
            "upazila_en": "Boalkhali"
          },
          {
            "upazila_bn": "চন্দনাইশ",
            "upazila_en": "Chandanaish"
          },
          {
            "upazila_bn": "ফটিকছড়ি",
            "upazila_en": "Fatikchhari"
          },
          {
            "upazila_bn": "হাটহাজারী",
            "upazila_en": "Hathazari"
          },
          {
            "upazila_bn": "লোহাগাড়া",
            "upazila_en": "Lohagara"
          },
          {
            "upazila_bn": "মীরসরাই",
            "upazila_en": "Mirsharai"
          },
          {
            "upazila_bn": "পটিয়া",
            "upazila_en": "Patiya"
          },
          {
            "upazila_bn": "রাঙ্গুনিয়া",
            "upazila_en": "Rangunia"
          },
          {
            "upazila_bn": "রাউজান",
            "upazila_en": "Raozan"
          },
          {
            "upazila_bn": "সন্দ্বীপ",
            "upazila_en": "Sandwip"
          },
          {
            "upazila_bn": "সাতকানিয়া",
            "upazila_en": "Satkania"
          },
          {
            "upazila_bn": "সীতাকুণ্ড",
            "upazila_en": "Sitakunda"
          }
        ]
      },
      {
        "district_bn": "কক্সবাজার",
        "district_en": "Cox's Bazar",
        "upazilas": [
          {
            "upazila_bn": "চকরিয়া",
            "upazila_en": "Chakaria"
          },
          {
            "upazila_bn": "কক্সবাজার সদর",
            "upazila_en": "Cox's Bazar Sadar"
          },
          {
            "upazila_bn": "ঈদগাঁও",
            "upazila_en": "Eidgaon"
          },
          {
            "upazila_bn": "কুতুবদিয়া",
            "upazila_en": "Kutubdia"
          },
          {
            "upazila_bn": "মহেশখালী",
            "upazila_en": "Maheshkhali"
          },
          {
            "upazila_bn": "পেকুয়া",
            "upazila_en": "Pekua"
          },
          {
            "upazila_bn": "রামু",
            "upazila_en": "Ramu"
          },
          {
            "upazila_bn": "টেকনাফ",
            "upazila_en": "Teknaf"
          },
          {
            "upazila_bn": "উখিয়া",
            "upazila_en": "Ukhia"
          }
        ]
      },
      {
        "district_bn": "কুমিল্লা",
        "district_en": "Cumilla",
        "upazilas": [
          {
            "upazila_bn": "বরুড়া",
            "upazila_en": "Barura"
          },
          {
            "upazila_bn": "ব্রাহ্মণপাড়া",
            "upazila_en": "Brahmanpara"
          },
          {
            "upazila_bn": "বুড়িচং",
            "upazila_en": "Burichang"
          },
          {
            "upazila_bn": "চান্দিনা",
            "upazila_en": "Chandina"
          },
          {
            "upazila_bn": "চৌদ্দগ্রাম",
            "upazila_en": "Chauddagram"
          },
          {
            "upazila_bn": "কুমিল্লা সদর",
            "upazila_en": "Cumilla Sadar"
          },
          {
            "upazila_bn": "কুমিল্লা সদর দক্ষিণ",
            "upazila_en": "Cumilla Sadar Dakshin"
          },
          {
            "upazila_bn": "দাউদকান্দি",
            "upazila_en": "Daudkandi"
          },
          {
            "upazila_bn": "দেবিদ্বার",
            "upazila_en": "Debidwar"
          },
          {
            "upazila_bn": "হোমনা",
            "upazila_en": "Homna"
          },
          {
            "upazila_bn": "লাকসাম",
            "upazila_en": "Laksam"
          },
          {
            "upazila_bn": "লালমাই",
            "upazila_en": "Lalmai"
          },
          {
            "upazila_bn": "মেঘনা",
            "upazila_en": "Meghna"
          },
          {
            "upazila_bn": "মনোহরগঞ্জ",
            "upazila_en": "Monohorgonj"
          },
          {
            "upazila_bn": "মুরাদনগর",
            "upazila_en": "Muradnagar"
          },
          {
            "upazila_bn": "নাঙ্গলকোট",
            "upazila_en": "Nangalkot"
          },
          {
            "upazila_bn": "তিতাস",
            "upazila_en": "Titas"
          }
        ]
      },
      {
        "district_bn": "ফেনী",
        "district_en": "Feni",
        "upazilas": [
          {
            "upazila_bn": "ছাগলনাইয়া",
            "upazila_en": "Chhagalnaiya"
          },
          {
            "upazila_bn": "দাগনভূঞা",
            "upazila_en": "Daganbhuiyan"
          },
          {
            "upazila_bn": "ফেনী সদর",
            "upazila_en": "Feni Sadar"
          },
          {
            "upazila_bn": "ফুলগাজী",
            "upazila_en": "Fulgazi"
          },
          {
            "upazila_bn": "পরশুরাম",
            "upazila_en": "Parshuram"
          },
          {
            "upazila_bn": "সোনাগাজী",
            "upazila_en": "Sonagazi"
          }
        ]
      },
      {
        "district_bn": "খাগড়াছড়ি",
        "district_en": "Khagrachhari",
        "upazilas": [
          {
            "upazila_bn": "দিঘীনালা",
            "upazila_en": "Dighinala"
          },
          {
            "upazila_bn": "গুইমারা",
            "upazila_en": "Guimara"
          },
          {
            "upazila_bn": "খাগড়াছড়ি সদর",
            "upazila_en": "Khagrachhari Sadar"
          },
          {
            "upazila_bn": "লক্ষ্মীছড়ি",
            "upazila_en": "Lakshmichhari"
          },
          {
            "upazila_bn": "মহালছড়ি",
            "upazila_en": "Mahalchhari"
          },
          {
            "upazila_bn": "মানিকছড়ি",
            "upazila_en": "Manikchhari"
          },
          {
            "upazila_bn": "মাটিরাঙ্গা",
            "upazila_en": "Matiranga"
          },
          {
            "upazila_bn": "পানছড়ি",
            "upazila_en": "Panchhari"
          },
          {
            "upazila_bn": "রামগড়",
            "upazila_en": "Ramgarh"
          }
        ]
      },
      {
        "district_bn": "লক্ষ্মীপুর",
        "district_en": "Lakshmipur",
        "upazilas": [
          {
            "upazila_bn": "কমলনগর",
            "upazila_en": "Kamalnagar"
          },
          {
            "upazila_bn": "লক্ষ্মীপুর সদর",
            "upazila_en": "Lakshmipur Sadar"
          },
          {
            "upazila_bn": "রায়পুর",
            "upazila_en": "Raipur"
          },
          {
            "upazila_bn": "রামগঞ্জ",
            "upazila_en": "Ramganj"
          },
          {
            "upazila_bn": "রামগতি",
            "upazila_en": "Ramgati"
          }
        ]
      },
      {
        "district_bn": "নোয়াখালী",
        "district_en": "Noakhali",
        "upazilas": [
          {
            "upazila_bn": "বেগমগঞ্জ",
            "upazila_en": "Begumganj"
          },
          {
            "upazila_bn": "চাটখিল",
            "upazila_en": "Chatkhil"
          },
          {
            "upazila_bn": "কোম্পানীগঞ্জ",
            "upazila_en": "Companiganj"
          },
          {
            "upazila_bn": "হাতিয়া",
            "upazila_en": "Hatiya"
          },
          {
            "upazila_bn": "কবিরহাট",
            "upazila_en": "Kabirhat"
          },
          {
            "upazila_bn": "নোয়াখালী সদর",
            "upazila_en": "Noakhali Sadar"
          },
          {
            "upazila_bn": "সেনবাগ",
            "upazila_en": "Senbagh"
          },
          {
            "upazila_bn": "সোনাইমুড়ী",
            "upazila_en": "Sonaimuri"
          },
          {
            "upazila_bn": "সুবর্ণচর",
            "upazila_en": "Subarnachar"
          }
        ]
      },
      {
        "district_bn": "রাঙ্গামাটি",
        "district_en": "Rangamati",
        "upazilas": [
          {
            "upazila_bn": "বাঘাইছড়ি",
            "upazila_en": "Baghaichhari"
          },
          {
            "upazila_bn": "বরকল",
            "upazila_en": "Barkal"
          },
          {
            "upazila_bn": "বিলাইছড়ি",
            "upazila_en": "Belaichhari"
          },
          {
            "upazila_bn": "জুরাছড়ি",
            "upazila_en": "Juraichhari"
          },
          {
            "upazila_bn": "কাপ্তাই",
            "upazila_en": "Kaptai"
          },
          {
            "upazila_bn": "কাউখালী",
            "upazila_en": "Kawkhali"
          },
          {
            "upazila_bn": "লাঙ্গাডু",
            "upazila_en": "Langadu"
          },
          {
            "upazila_bn": "নানিয়ারচর",
            "upazila_en": "Naniarchar"
          },
          {
            "upazila_bn": "রাজস্থলী",
            "upazila_en": "Rajasthali"
          },
          {
            "upazila_bn": "রাঙ্গামাটি সদর",
            "upazila_en": "Rangamati Sadar"
          }
        ]
      }
    ]
  },
  {
    "division_bn": "রাজশাহী",
    "division_en": "Rajshahi",
    "districts": [
      {
        "district_bn": "বগুড়া",
        "district_en": "Bogura",
        "upazilas": [
          {
            "upazila_bn": "আদমদিঘী",
            "upazila_en": "Adamdighi"
          },
          {
            "upazila_bn": "বগুড়া সদর",
            "upazila_en": "Bogura Sadar"
          },
          {
            "upazila_bn": "ধুনট",
            "upazila_en": "Dhunat"
          },
          {
            "upazila_bn": "দুপচাঁচিয়া",
            "upazila_en": "Dhupchanchia"
          },
          {
            "upazila_bn": "গাবতলী",
            "upazila_en": "Gabtali"
          },
          {
            "upazila_bn": "কাহালু",
            "upazila_en": "Kahaloo"
          },
          {
            "upazila_bn": "নন্দিগ্রাম",
            "upazila_en": "Nandigram"
          },
          {
            "upazila_bn": "সারিয়াকান্দি",
            "upazila_en": "Sariakandi"
          },
          {
            "upazila_bn": "শাজাহানপুর",
            "upazila_en": "Shajahanpur"
          },
          {
            "upazila_bn": "শেরপুর",
            "upazila_en": "Sherpur"
          },
          {
            "upazila_bn": "শিবগঞ্জ",
            "upazila_en": "Shibganj"
          },
          {
            "upazila_bn": "সোনাতলা",
            "upazila_en": "Sonatola"
          }
        ]
      },
      {
        "district_bn": "জয়পুরহাট",
        "district_en": "Joypurhat",
        "upazilas": [
          {
            "upazila_bn": "আক্কেলপুর",
            "upazila_en": "Akkelpur"
          },
          {
            "upazila_bn": "জয়পুরহাট সদর",
            "upazila_en": "Joypurhat Sadar"
          },
          {
            "upazila_bn": "কালাই",
            "upazila_en": "Kalai"
          },
          {
            "upazila_bn": "ক্ষেতলাল",
            "upazila_en": "Khetlal"
          },
          {
            "upazila_bn": "পাঁচবিবি",
            "upazila_en": "Panchbibi"
          }
        ]
      },
      {
        "district_bn": "নওগাঁ",
        "district_en": "Naogaon",
        "upazilas": [
          {
            "upazila_bn": "আত্রাই",
            "upazila_en": "Atrai"
          },
          {
            "upazila_bn": "বদলগাছী",
            "upazila_en": "Badalgachhi"
          },
          {
            "upazila_bn": "ধামইরহাট",
            "upazila_en": "Dhamoirhat"
          },
          {
            "upazila_bn": "মান্দা",
            "upazila_en": "Manda"
          },
          {
            "upazila_bn": "মহাদেবপুর",
            "upazila_en": "Mohadevpur"
          },
          {
            "upazila_bn": "নওগাঁ সদর",
            "upazila_en": "Naogaon Sadar"
          },
          {
            "upazila_bn": "নিয়ামতপুর",
            "upazila_en": "Niamatpur"
          },
          {
            "upazila_bn": "পত্নিতলা",
            "upazila_en": "Patnitala"
          },
          {
            "upazila_bn": "পোরশা",
            "upazila_en": "Porsha"
          },
          {
            "upazila_bn": "রাণীনগর",
            "upazila_en": "Raninagar"
          },
          {
            "upazila_bn": "সাপাহার",
            "upazila_en": "Sapahar"
          }
        ]
      },
      {
        "district_bn": "নাটোর",
        "district_en": "Natore",
        "upazilas": [
          {
            "upazila_bn": "বাগাতিপাড়া",
            "upazila_en": "Bagatipara"
          },
          {
            "upazila_bn": "বড়াইগ্রাম",
            "upazila_en": "Baraigram"
          },
          {
            "upazila_bn": "গুরুদাসপুর",
            "upazila_en": "Gurudaspur"
          },
          {
            "upazila_bn": "লালপুর",
            "upazila_en": "Lalpur"
          },
          {
            "upazila_bn": "নলডাঙ্গা",
            "upazila_en": "Naldanga"
          },
          {
            "upazila_bn": "নাটোর সদর",
            "upazila_en": "Natore Sadar"
          },
          {
            "upazila_bn": "সিংড়া",
            "upazila_en": "Singra"
          }
        ]
      },
      {
        "district_bn": "নবাবগঞ্জ",
        "district_en": "Nawabganj",
        "upazilas": [
          {
            "upazila_bn": "ভোলাহাট",
            "upazila_en": "Bholahat"
          },
          {
            "upazila_bn": "গোমস্তাপুর",
            "upazila_en": "Gomastapur"
          },
          {
            "upazila_bn": "নাচোল",
            "upazila_en": "Nachole"
          },
          {
            "upazila_bn": "নবাবগঞ্জ সদর",
            "upazila_en": "Nawabganj Sadar"
          },
          {
            "upazila_bn": "শিবগঞ্জ",
            "upazila_en": "Shibganj"
          }
        ]
      },
      {
        "district_bn": "পাবনা",
        "district_en": "Pabna",
        "upazilas": [
          {
            "upazila_bn": "আটঘরিয়া",
            "upazila_en": "Atgharia"
          },
          {
            "upazila_bn": "বেড়া",
            "upazila_en": "Bera"
          },
          {
            "upazila_bn": "ভাঙ্গুড়া",
            "upazila_en": "Bhangura"
          },
          {
            "upazila_bn": "চাটমোহর",
            "upazila_en": "Chatmohar"
          },
          {
            "upazila_bn": "ফরিদপুর",
            "upazila_en": "Faridpur"
          },
          {
            "upazila_bn": "ঈশ্বরদী",
            "upazila_en": "Ishwardi"
          },
          {
            "upazila_bn": "পাবনা সদর",
            "upazila_en": "Pabna Sadar"
          },
          {
            "upazila_bn": "সাঁথিয়া",
            "upazila_en": "Santhia"
          },
          {
            "upazila_bn": "সুজানগর",
            "upazila_en": "Sujanagar"
          }
        ]
      },
      {
        "district_bn": "রাজশাহী",
        "district_en": "Rajshahi",
        "upazilas": [
          {
            "upazila_bn": "বাঘা",
            "upazila_en": "Bagha"
          },
          {
            "upazila_bn": "বাগমারা",
            "upazila_en": "Bagmara"
          },
          {
            "upazila_bn": "চারঘাট",
            "upazila_en": "Charghat"
          },
          {
            "upazila_bn": "দুর্গাপুর",
            "upazila_en": "Durgapur"
          },
          {
            "upazila_bn": "গোদাগাড়ী",
            "upazila_en": "Godagari"
          },
          {
            "upazila_bn": "মোহনপুর",
            "upazila_en": "Mohanpur"
          },
          {
            "upazila_bn": "পবা",
            "upazila_en": "Paba"
          },
          {
            "upazila_bn": "পুঠিয়া",
            "upazila_en": "Puthia"
          },
          {
            "upazila_bn": "তানোর",
            "upazila_en": "Tanore"
          }
        ]
      },
      {
        "district_bn": "সিরাজগঞ্জ",
        "district_en": "Sirajganj",
        "upazilas": [
          {
            "upazila_bn": "বেলকুচি",
            "upazila_en": "Belkuchi"
          },
          {
            "upazila_bn": "চৌহালি",
            "upazila_en": "Chauhali"
          },
          {
            "upazila_bn": "কামারখন্ড",
            "upazila_en": "Kamarkhand"
          },
          {
            "upazila_bn": "কাজীপুর",
            "upazila_en": "Kazipur"
          },
          {
            "upazila_bn": "রায়গঞ্জ",
            "upazila_en": "Raiganj"
          },
          {
            "upazila_bn": "শাহজাদপুর",
            "upazila_en": "Shahjadpur"
          },
          {
            "upazila_bn": "সিরাজগঞ্জ সদর",
            "upazila_en": "Sirajganj Sadar"
          },
          {
            "upazila_bn": "তাড়াশ",
            "upazila_en": "Tarash"
          },
          {
            "upazila_bn": "উল্লাপাড়া",
            "upazila_en": "Ullahpara"
          }
        ]
      }
    ]
  },
  {
    "division_bn": "খুলনা",
    "division_en": "Khulna",
    "districts": [
      {
        "district_bn": "বাগেরহাট",
        "district_en": "Bagerhat",
        "upazilas": [
          {
            "upazila_bn": "বাগেরহাট সদর",
            "upazila_en": "Bagerhat Sadar"
          },
          {
            "upazila_bn": "চিতলমারী",
            "upazila_en": "Chitalmari"
          },
          {
            "upazila_bn": "ফকিরহাট",
            "upazila_en": "Fakirhat"
          },
          {
            "upazila_bn": "কচুয়া",
            "upazila_en": "Kachua"
          },
          {
            "upazila_bn": "মোল্লাহাট",
            "upazila_en": "Mollahat"
          },
          {
            "upazila_bn": "মংলা",
            "upazila_en": "Mongla"
          },
          {
            "upazila_bn": "মোড়েলগঞ্জ",
            "upazila_en": "Morrelganj"
          },
          {
            "upazila_bn": "রামপাল",
            "upazila_en": "Rampal"
          },
          {
            "upazila_bn": "শরণখোলা",
            "upazila_en": "Sarankhola"
          }
        ]
      },
      {
        "district_bn": "চুয়াডাঙ্গা",
        "district_en": "Chuadanga",
        "upazilas": [
          {
            "upazila_bn": "আলমডাঙ্গা",
            "upazila_en": "Alamdanga"
          },
          {
            "upazila_bn": "চুয়াডাঙ্গা সদর",
            "upazila_en": "Chuadanga Sadar"
          },
          {
            "upazila_bn": "দামুড়হুদা",
            "upazila_en": "Damurhuda"
          },
          {
            "upazila_bn": "জীবননগর",
            "upazila_en": "Jibannagar"
          }
        ]
      },
      {
        "district_bn": "যশোর",
        "district_en": "Jashore",
        "upazilas": [
          {
            "upazila_bn": "অভয়নগর",
            "upazila_en": "Abhaynagar"
          },
          {
            "upazila_bn": "বাঘারপাড়া",
            "upazila_en": "Bagherpara"
          },
          {
            "upazila_bn": "চৌগাছা",
            "upazila_en": "Chaugachha"
          },
          {
            "upazila_bn": "যশোর সদর",
            "upazila_en": "Jashore Sadar"
          },
          {
            "upazila_bn": "ঝিকরগাছা",
            "upazila_en": "Jhikargachha"
          },
          {
            "upazila_bn": "কেশবপুর",
            "upazila_en": "Keshabpur"
          },
          {
            "upazila_bn": "মণিরামপুর",
            "upazila_en": "Manirampur"
          },
          {
            "upazila_bn": "শার্শা",
            "upazila_en": "Sharsha"
          }
        ]
      },
      {
        "district_bn": "ঝিনাইদহ",
        "district_en": "Jhenaidah",
        "upazilas": [
          {
            "upazila_bn": "হরিণাকুন্ডু",
            "upazila_en": "Harinakunda"
          },
          {
            "upazila_bn": "ঝিনাইদহ সদর",
            "upazila_en": "Jhenaidah Sadar"
          },
          {
            "upazila_bn": "কালীগঞ্জ",
            "upazila_en": "Kaliganj"
          },
          {
            "upazila_bn": "কোটচাঁদপুর",
            "upazila_en": "Kotchandpur"
          },
          {
            "upazila_bn": "মহেশপুর",
            "upazila_en": "Maheshpur"
          },
          {
            "upazila_bn": "শৈলকুপা",
            "upazila_en": "Shailkupa"
          }
        ]
      },
      {
        "district_bn": "খুলনা",
        "district_en": "Khulna",
        "upazilas": [
          {
            "upazila_bn": "বটিয়াঘাটা",
            "upazila_en": "Batiaghata"
          },
          {
            "upazila_bn": "ডাকোপ",
            "upazila_en": "Dacope"
          },
          {
            "upazila_bn": "দিঘলিয়া",
            "upazila_en": "Dighalia"
          },
          {
            "upazila_bn": "দুমুরিয়া",
            "upazila_en": "Dumuria"
          },
          {
            "upazila_bn": "কয়রা",
            "upazila_en": "Koyra"
          },
          {
            "upazila_bn": "পাইকগাছা",
            "upazila_en": "Paikgachha"
          },
          {
            "upazila_bn": "ফুলতলা",
            "upazila_en": "Phultala"
          },
          {
            "upazila_bn": "রূপসা",
            "upazila_en": "Rupsa"
          },
          {
            "upazila_bn": "তেরখাদা",
            "upazila_en": "Terokhada"
          }
        ]
      },
      {
        "district_bn": "কুষ্টিয়া",
        "district_en": "Kushtia",
        "upazilas": [
          {
            "upazila_bn": "ভেড়ামারা",
            "upazila_en": "Bheramara"
          },
          {
            "upazila_bn": "দৌলতপুর",
            "upazila_en": "Daulatpur"
          },
          {
            "upazila_bn": "খোকসা",
            "upazila_en": "Khoksa"
          },
          {
            "upazila_bn": "কুমারখালী",
            "upazila_en": "Kumarkhali"
          },
          {
            "upazila_bn": "কুষ্টিয়া সদর",
            "upazila_en": "Kushtia Sadar"
          },
          {
            "upazila_bn": "মিরপুর",
            "upazila_en": "Mirpur"
          }
        ]
      },
      {
        "district_bn": "মাগুরা",
        "district_en": "Magura",
        "upazilas": [
          {
            "upazila_bn": "মাগুরা সদর",
            "upazila_en": "Magura Sadar"
          },
          {
            "upazila_bn": "মোহাম্মদপুর",
            "upazila_en": "Mohammadpur"
          },
          {
            "upazila_bn": "শালিখা",
            "upazila_en": "Shalikha"
          },
          {
            "upazila_bn": "শ্রীপুর",
            "upazila_en": "Sreepur"
          }
        ]
      },
      {
        "district_bn": "মেহেরপুর",
        "district_en": "Meherpur",
        "upazilas": [
          {
            "upazila_bn": "গাংনী",
            "upazila_en": "Gangni"
          },
          {
            "upazila_bn": "মেহেরপুর সদর",
            "upazila_en": "Meherpur Sadar"
          },
          {
            "upazila_bn": "মুজিবনগর",
            "upazila_en": "Mujibnagar"
          }
        ]
      },
      {
        "district_bn": "নড়াইল",
        "district_en": "Narail",
        "upazilas": [
          {
            "upazila_bn": "কালিয়া",
            "upazila_en": "Kalia"
          },
          {
            "upazila_bn": "লোহাগড়া",
            "upazila_en": "Lohagara"
          },
          {
            "upazila_bn": "নড়াইল সদর",
            "upazila_en": "Narail Sadar"
          }
        ]
      },
      {
        "district_bn": "সাতক্ষীরা",
        "district_en": "Satkhira",
        "upazilas": [
          {
            "upazila_bn": "আশাশুনি",
            "upazila_en": "Assasuni"
          },
          {
            "upazila_bn": "দেবহাটা",
            "upazila_en": "Debhata"
          },
          {
            "upazila_bn": "কলারোয়া",
            "upazila_en": "Kalaroa"
          },
          {
            "upazila_bn": "কালিগঞ্জ",
            "upazila_en": "Kaliganj"
          },
          {
            "upazila_bn": "সাতক্ষীরা সদর",
            "upazila_en": "Satkhira Sadar"
          },
          {
            "upazila_bn": "শ্যামনগর",
            "upazila_en": "Shyamnagar"
          },
          {
            "upazila_bn": "তালা",
            "upazila_en": "Tala"
          }
        ]
      }
    ]
  },
  {
    "division_bn": "বরিশাল",
    "division_en": "Barishal",
    "districts": [
      {
        "district_bn": "বরগুনা",
        "district_en": "Barguna",
        "upazilas": [
          {
            "upazila_bn": "আমতলী",
            "upazila_en": "Amtali"
          },
          {
            "upazila_bn": "বামনা",
            "upazila_en": "Bamna"
          },
          {
            "upazila_bn": "বেতাগী",
            "upazila_en": "Betagi"
          },
          {
            "upazila_bn": "পাথরঘাটা",
            "upazila_en": "Patharghata"
          },
          {
            "upazila_bn": "তালতলি",
            "upazila_en": "Taltali"
          }
        ]
      },
      {
        "district_bn": "বরিশাল",
        "district_en": "Barishal",
        "upazilas": [
          {
            "upazila_bn": "আগৈলঝাড়া",
            "upazila_en": "Agailjhara"
          },
          {
            "upazila_bn": "বাবুগঞ্জ",
            "upazila_en": "Babuganj"
          },
          {
            "upazila_bn": "বাকেরগঞ্জ",
            "upazila_en": "Bakerganj"
          },
          {
            "upazila_bn": "বানারীপাড়া",
            "upazila_en": "Banaripara"
          },
          {
            "upazila_bn": "বরিশাল সদর",
            "upazila_en": "Barishal Sadar"
          },
          {
            "upazila_bn": "গৌরনদী",
            "upazila_en": "Gournadi"
          },
          {
            "upazila_bn": "হিজলা",
            "upazila_en": "Hizla"
          },
          {
            "upazila_bn": "মেহেন্দিগঞ্জ",
            "upazila_en": "Mehendiganj"
          },
          {
            "upazila_bn": "মুলাদী",
            "upazila_en": "Muladi"
          },
          {
            "upazila_bn": "ওয়াজিরপুর",
            "upazila_en": "Wazirpur"
          }
        ]
      },
      {
        "district_bn": "ভোলা",
        "district_en": "Bhola",
        "upazilas": [
          {
            "upazila_bn": "ভোলা সদর",
            "upazila_en": "Bhola Sadar"
          },
          {
            "upazila_bn": "বুরহানউদ্দিন",
            "upazila_en": "Burhanuddin"
          },
          {
            "upazila_bn": "চর ফ্যাশন",
            "upazila_en": "Char Fasson"
          },
          {
            "upazila_bn": "দৌলতখান",
            "upazila_en": "Daulatkhan"
          },
          {
            "upazila_bn": "লালমোহন",
            "upazila_en": "Lalmohan"
          },
          {
            "upazila_bn": "মনপুরা",
            "upazila_en": "Manpura"
          },
          {
            "upazila_bn": "তাজুমুদ্দিন",
            "upazila_en": "Tazumuddin"
          }
        ]
      },
      {
        "district_bn": "ঝালকাঠি",
        "district_en": "Jhalokathi",
        "upazilas": [
          {
            "upazila_bn": "ঝালকাঠি সদর",
            "upazila_en": "Jhalokathi Sadar"
          },
          {
            "upazila_bn": "কাঠালিয়া",
            "upazila_en": "Kathalia"
          },
          {
            "upazila_bn": "নলছিটি",
            "upazila_en": "Nalchity"
          },
          {
            "upazila_bn": "রাজাপুর",
            "upazila_en": "Rajapur"
          }
        ]
      },
      {
        "district_bn": "পটুয়াখালী",
        "district_en": "Patuakhali",
        "upazilas": [
          {
            "upazila_bn": "বাউফল",
            "upazila_en": "Bauphal"
          },
          {
            "upazila_bn": "দশমিনা",
            "upazila_en": "Dashmina"
          },
          {
            "upazila_bn": "দুমকি",
            "upazila_en": "Dumki"
          },
          {
            "upazila_bn": "গলাচিপা",
            "upazila_en": "Galachipa"
          },
          {
            "upazila_bn": "কলাপাড়া",
            "upazila_en": "Kalapara"
          },
          {
            "upazila_bn": "মির্জাগঞ্জ",
            "upazila_en": "Mirzaganj"
          },
          {
            "upazila_bn": "পটুয়াখালী সদর",
            "upazila_en": "Patuakhali Sadar"
          },
          {
            "upazila_bn": "রাঙ্গাবালী",
            "upazila_en": "Rangabali"
          }
        ]
      },
      {
        "district_bn": "পিরোজপুর",
        "district_en": "Pirojpur",
        "upazilas": [
          {
            "upazila_bn": "ভান্ডারিয়া",
            "upazila_en": "Bhandaria"
          },
          {
            "upazila_bn": "কাউখালী",
            "upazila_en": "Kawkhali"
          },
          {
            "upazila_bn": "মঠবাড়িয়া",
            "upazila_en": "Mathbaria"
          },
          {
            "upazila_bn": "নাজিরপুর",
            "upazila_en": "Nazirpur"
          },
          {
            "upazila_bn": "নেছারাবাদ",
            "upazila_en": "Nesarabad"
          },
          {
            "upazila_bn": "পিরোজপুর সদর",
            "upazila_en": "Pirojpur Sadar"
          },
          {
            "upazila_bn": "জিয়ানগর",
            "upazila_en": "Zianagar"
          }
        ]
      }
    ]
  },
  {
    "division_bn": "সিলেট",
    "division_en": "Sylhet",
    "districts": [
      {
        "district_bn": "হবিগঞ্জ",
        "district_en": "Habiganj",
        "upazilas": [
          {
            "upazila_bn": "আজমিরীগঞ্জ",
            "upazila_en": "Ajmiriganj"
          },
          {
            "upazila_bn": "বাহুবল",
            "upazila_en": "Bahubal"
          },
          {
            "upazila_bn": "বানিয়াচং",
            "upazila_en": "Baniachong"
          },
          {
            "upazila_bn": "চুনারুঘাট",
            "upazila_en": "Chunarughat"
          },
          {
            "upazila_bn": "হবিগঞ্জ সদর",
            "upazila_en": "Habiganj Sadar"
          },
          {
            "upazila_bn": "লাখাই",
            "upazila_en": "Lakhai"
          },
          {
            "upazila_bn": "মাধবপুর",
            "upazila_en": "Madhabpur"
          },
          {
            "upazila_bn": "নবীগঞ্জ",
            "upazila_en": "Nabiganj"
          },
          {
            "upazila_bn": "শায়েস্তাগঞ্জ",
            "upazila_en": "Shaistagonj"
          }
        ]
      },
      {
        "district_bn": "মৌলভীবাজার",
        "district_en": "Moulvibazar",
        "upazilas": [
          {
            "upazila_bn": "বড়লেখা",
            "upazila_en": "Barlekha"
          },
          {
            "upazila_bn": "জুড়ী",
            "upazila_en": "Juri"
          },
          {
            "upazila_bn": "কমলগঞ্জ",
            "upazila_en": "Kamalganj"
          },
          {
            "upazila_bn": "কুলাউড়া",
            "upazila_en": "Kulaura"
          },
          {
            "upazila_bn": "মৌলভীবাজার সদর",
            "upazila_en": "Moulvibazar Sadar"
          },
          {
            "upazila_bn": "রাজনগর",
            "upazila_en": "Rajnagar"
          },
          {
            "upazila_bn": "শ্রীমঙ্গল",
            "upazila_en": "Sreemangal"
          }
        ]
      },
      {
        "district_bn": "সুনামগঞ্জ",
        "district_en": "Sunamganj",
        "upazilas": [
          {
            "upazila_bn": "বিশ্বম্ভরপুর",
            "upazila_en": "Bishwamvarpur"
          },
          {
            "upazila_bn": "ছাতক",
            "upazila_en": "Chhatak"
          },
          {
            "upazila_bn": "দিরাই",
            "upazila_en": "Derai"
          },
          {
            "upazila_bn": "ধর্মপাশা",
            "upazila_en": "Dharamapasha"
          },
          {
            "upazila_bn": "দোয়ারাবাজার",
            "upazila_en": "Dowarabazar"
          },
          {
            "upazila_bn": "জগন্নাথপুর",
            "upazila_en": "Jagannathpur"
          },
          {
            "upazila_bn": "জামালগঞ্জ",
            "upazila_en": "Jamalganj"
          },
          {
            "upazila_bn": "মধ্যনগর",
            "upazila_en": "Madhyanagar"
          },
          {
            "upazila_bn": "শান্তিগঞ্জ",
            "upazila_en": "Shantiganj"
          },
          {
            "upazila_bn": "দক্ষিণ সুনামগঞ্জ",
            "upazila_en": "South Sunamganj"
          },
          {
            "upazila_bn": "সুল্লা",
            "upazila_en": "Sulla"
          },
          {
            "upazila_bn": "সুনামগঞ্জ সদর",
            "upazila_en": "Sunamganj Sadar"
          },
          {
            "upazila_bn": "সুনামগঞ্জ সদর",
            "upazila_en": "Sunamganj Sadar"
          },
          {
            "upazila_bn": "তাহিরপুর",
            "upazila_en": "Tahirpur"
          }
        ]
      },
      {
        "district_bn": "সিলেট",
        "district_en": "Sylhet",
        "upazilas": [
          {
            "upazila_bn": "বালাগঞ্জ",
            "upazila_en": "Balaganj"
          },
          {
            "upazila_bn": "বিয়ানীবাজার",
            "upazila_en": "Beanibazar"
          },
          {
            "upazila_bn": "বিশ্বনাথ",
            "upazila_en": "Bishwanath"
          },
          {
            "upazila_bn": "কোম্পানীগঞ্জ",
            "upazila_en": "Companiganj"
          },
          {
            "upazila_bn": "কোম্পানীগঞ্জ",
            "upazila_en": "Companiganj"
          },
          {
            "upazila_bn": "দক্ষিণ সুরমা",
            "upazila_en": "Dakshin Surma"
          },
          {
            "upazila_bn": "ফেঞ্চুগঞ্জ",
            "upazila_en": "Fenchuganj"
          },
          {
            "upazila_bn": "গোলাপগঞ্জ",
            "upazila_en": "Golapganj"
          },
          {
            "upazila_bn": "গোয়াইনঘাট",
            "upazila_en": "Gowainghat"
          },
          {
            "upazila_bn": "জৈন্তাপুর",
            "upazila_en": "Jaintiapur"
          },
          {
            "upazila_bn": "কানাইঘাট",
            "upazila_en": "Kanaighat"
          },
          {
            "upazila_bn": "সিলেট সদর",
            "upazila_en": "Sylhet Sadar"
          },
          {
            "upazila_bn": "জকিগঞ্জ",
            "upazila_en": "Zakiganj"
          }
        ]
      }
    ]
  },
  {
    "division_bn": "রংপুর",
    "division_en": "Rangpur",
    "districts": [
      {
        "district_bn": "দিনাজপুর",
        "district_en": "Dinajpur",
        "upazilas": [
          {
            "upazila_bn": "বিরল",
            "upazila_en": "Biral"
          },
          {
            "upazila_bn": "বীরামপুর",
            "upazila_en": "Birampur"
          },
          {
            "upazila_bn": "বীরগঞ্জ",
            "upazila_en": "Birganj"
          },
          {
            "upazila_bn": "বোচাগঞ্জ",
            "upazila_en": "Bochaganj"
          },
          {
            "upazila_bn": "চিরিরবন্দর",
            "upazila_en": "Chirirbandar"
          },
          {
            "upazila_bn": "দিনাজপুর সদর",
            "upazila_en": "Dinajpur Sadar"
          },
          {
            "upazila_bn": "ঘোড়াঘাট",
            "upazila_en": "Ghoraghat"
          },
          {
            "upazila_bn": "হাকিমপুর",
            "upazila_en": "Hakimpur"
          },
          {
            "upazila_bn": "কাহারোল",
            "upazila_en": "Kaharole"
          },
          {
            "upazila_bn": "খানসামা",
            "upazila_en": "Khansama"
          },
          {
            "upazila_bn": "নবাবগঞ্জ",
            "upazila_en": "Nawabganj"
          },
          {
            "upazila_bn": "পার্বতীপুর",
            "upazila_en": "Parbatipur"
          },
          {
            "upazila_bn": "ফুলবাড়ী",
            "upazila_en": "Phulbari"
          }
        ]
      },
      {
        "district_bn": "গাইবান্ধা",
        "district_en": "Gaibandha",
        "upazilas": [
          {
            "upazila_bn": "গাইবান্ধা সদর",
            "upazila_en": "Gaibandha Sadar"
          },
          {
            "upazila_bn": "গোবিন্দগঞ্জ",
            "upazila_en": "Gobindaganj"
          },
          {
            "upazila_bn": "পলাশবাড়ী",
            "upazila_en": "Palashbari"
          },
          {
            "upazila_bn": "ফুলছড়ি",
            "upazila_en": "Phulchhari"
          },
          {
            "upazila_bn": "সাদুল্লাপুর",
            "upazila_en": "Sadullapur"
          },
          {
            "upazila_bn": "সুঘাটা",
            "upazila_en": "Sughatta"
          },
          {
            "upazila_bn": "সুন্দরগঞ্জ",
            "upazila_en": "Sundarganj"
          }
        ]
      },
      {
        "district_bn": "কুড়িগ্রাম",
        "district_en": "Kurigram",
        "upazilas": [
          {
            "upazila_bn": "ভুরুঙ্গামারী",
            "upazila_en": "Bhurungamari"
          },
          {
            "upazila_bn": "চর রাজিবপুর",
            "upazila_en": "Char Rajibpur"
          },
          {
            "upazila_bn": "চিলমারী",
            "upazila_en": "Chilmari"
          },
          {
            "upazila_bn": "কুড়িগ্রাম সদর",
            "upazila_en": "Kurigram Sadar"
          },
          {
            "upazila_bn": "নাগেশ্বরী",
            "upazila_en": "Nageshwari"
          },
          {
            "upazila_bn": "ফুলবাড়ী",
            "upazila_en": "Phulbari"
          },
          {
            "upazila_bn": "রাজারহাট",
            "upazila_en": "Rajarhat"
          },
          {
            "upazila_bn": "রৌমারী",
            "upazila_en": "Raomari"
          },
          {
            "upazila_bn": "উলিপুর",
            "upazila_en": "Ulipur"
          }
        ]
      },
      {
        "district_bn": "লালমনিরহাট",
        "district_en": "Lalmonirhat",
        "upazilas": [
          {
            "upazila_bn": "আদিতমারী",
            "upazila_en": "Aditmari"
          },
          {
            "upazila_bn": "হাতীবান্ধা",
            "upazila_en": "Hatibandha"
          },
          {
            "upazila_bn": "কালীগঞ্জ",
            "upazila_en": "Kaliganj"
          },
          {
            "upazila_bn": "লালমনিরহাট সদর",
            "upazila_en": "Lalmonirhat Sadar"
          },
          {
            "upazila_bn": "পাটগ্রাম",
            "upazila_en": "Patgram"
          }
        ]
      },
      {
        "district_bn": "নীলফামারী",
        "district_en": "Nilphamari",
        "upazilas": [
          {
            "upazila_bn": "ডিমলা",
            "upazila_en": "Dimla"
          },
          {
            "upazila_bn": "ডোমার",
            "upazila_en": "Domar"
          },
          {
            "upazila_bn": "জলঢাকা",
            "upazila_en": "Jaldhaka"
          },
          {
            "upazila_bn": "কিশোরগঞ্জ",
            "upazila_en": "Kishoreganj"
          },
          {
            "upazila_bn": "নীলফামারী সদর",
            "upazila_en": "Nilphamari Sadar"
          },
          {
            "upazila_bn": "সৈয়দপুর",
            "upazila_en": "Saidpur"
          }
        ]
      },
      {
        "district_bn": "পঞ্চগড়",
        "district_en": "Panchagarh",
        "upazilas": [
          {
            "upazila_bn": "আটোয়ারী",
            "upazila_en": "Atwari"
          },
          {
            "upazila_bn": "বোদা",
            "upazila_en": "Boda"
          },
          {
            "upazila_bn": "দেবীগঞ্জ",
            "upazila_en": "Debiganj"
          },
          {
            "upazila_bn": "পঞ্চগড় সদর",
            "upazila_en": "Panchagarh Sadar"
          },
          {
            "upazila_bn": "তেতুলিয়া",
            "upazila_en": "Tetulia"
          }
        ]
      },
      {
        "district_bn": "রংপুর",
        "district_en": "Rangpur",
        "upazilas": [
          {
            "upazila_bn": "বদরগঞ্জ",
            "upazila_en": "Badarganj"
          },
          {
            "upazila_bn": "গঙ্গাচড়া",
            "upazila_en": "Gangachara"
          },
          {
            "upazila_bn": "কাউনিয়া",
            "upazila_en": "Kaunia"
          },
          {
            "upazila_bn": "মিঠাপুকুর",
            "upazila_en": "Mithapukur"
          },
          {
            "upazila_bn": "পীরগাছা",
            "upazila_en": "Pirgachha"
          },
          {
            "upazila_bn": "পীরগঞ্জ",
            "upazila_en": "Pirganj"
          },
          {
            "upazila_bn": "রংপুর সদর",
            "upazila_en": "Rangpur Sadar"
          },
          {
            "upazila_bn": "তারাগঞ্জ",
            "upazila_en": "Taraganj"
          }
        ]
      },
      {
        "district_bn": "ঠাকুরগাঁও",
        "district_en": "Thakurgaon",
        "upazilas": [
          {
            "upazila_bn": "বালিয়াডাঙ্গী",
            "upazila_en": "Baliadangi"
          },
          {
            "upazila_bn": "হরিপুর",
            "upazila_en": "Haripur"
          },
          {
            "upazila_bn": "পীরগঞ্জ",
            "upazila_en": "Pirganj"
          },
          {
            "upazila_bn": "রাণীশংকৈল",
            "upazila_en": "Ranisankail"
          },
          {
            "upazila_bn": "ঠাকুরগাঁও সদর",
            "upazila_en": "Thakurgaon Sadar"
          }
        ]
      }
    ]
  },
  {
    "division_bn": "ময়মনসিংহ",
    "division_en": "Mymensingh",
    "districts": [
      {
        "district_bn": "জামালপুর",
        "district_en": "Jamalpur",
        "upazilas": [
          {
            "upazila_bn": "বকশীগঞ্জ",
            "upazila_en": "Bakshiganj"
          },
          {
            "upazila_bn": "দেওয়ানগঞ্জ",
            "upazila_en": "Dewanganj"
          },
          {
            "upazila_bn": "ইসলামপুর",
            "upazila_en": "Islampur"
          },
          {
            "upazila_bn": "জামালপুর সদর",
            "upazila_en": "Jamalpur Sadar"
          },
          {
            "upazila_bn": "মাদারগঞ্জ",
            "upazila_en": "Madarganj"
          },
          {
            "upazila_bn": "মেলান্দহ",
            "upazila_en": "Melandaha"
          },
          {
            "upazila_bn": "সরিষাবাড়ী",
            "upazila_en": "Sarishabari"
          }
        ]
      },
      {
        "district_bn": "ময়মনসিংহ",
        "district_en": "Mymensingh",
        "upazilas": [
          {
            "upazila_bn": "ভালুকা",
            "upazila_en": "Bhaluka"
          },
          {
            "upazila_bn": "ধোবাউড়া",
            "upazila_en": "Dhobaura"
          },
          {
            "upazila_bn": "ফুলবাড়িয়া",
            "upazila_en": "Fulbaria"
          },
          {
            "upazila_bn": "গফরগাঁও",
            "upazila_en": "Gaffargaon"
          },
          {
            "upazila_bn": "গৌরীপুর",
            "upazila_en": "Gauripur"
          },
          {
            "upazila_bn": "হালুয়াঘাট",
            "upazila_en": "Haluaghat"
          },
          {
            "upazila_bn": "ঈশ্বরগঞ্জ",
            "upazila_en": "Ishwarganj"
          },
          {
            "upazila_bn": "মুক্তাগাছা",
            "upazila_en": "Muktagachha"
          },
          {
            "upazila_bn": "ময়মনসিংহ সদর",
            "upazila_en": "Mymensingh Sadar"
          },
          {
            "upazila_bn": "নান্দাইল",
            "upazila_en": "Nandail"
          },
          {
            "upazila_bn": "ফুলপুর",
            "upazila_en": "Phulpur"
          },
          {
            "upazila_bn": "ত্রিশাল",
            "upazila_en": "Trishal"
          }
        ]
      },
      {
        "district_bn": "নেত্রকোণা",
        "district_en": "Netrakona",
        "upazilas": [
          {
            "upazila_bn": "আটপাড়া",
            "upazila_en": "Atpara"
          },
          {
            "upazila_bn": "বরহাট্টা",
            "upazila_en": "Barhatta"
          },
          {
            "upazila_bn": "দুর্গাপুর",
            "upazila_en": "Durgapur"
          },
          {
            "upazila_bn": "কলমাকান্দা",
            "upazila_en": "Kalmakanda"
          },
          {
            "upazila_bn": "কেন্দুয়া",
            "upazila_en": "Kendua"
          },
          {
            "upazila_bn": "খালিয়াজুরী",
            "upazila_en": "Khaliajuri"
          },
          {
            "upazila_bn": "মদন",
            "upazila_en": "Madan"
          },
          {
            "upazila_bn": "মোহনগঞ্জ",
            "upazila_en": "Mohanganj"
          },
          {
            "upazila_bn": "নেত্রকোণা সদর",
            "upazila_en": "Netrakona Sadar"
          },
          {
            "upazila_bn": "পূর্বধলা",
            "upazila_en": "Purbadhala"
          }
        ]
      },
      {
        "district_bn": "শেরপুর",
        "district_en": "Sherpur",
        "upazilas": [
          {
            "upazila_bn": "ঝিনাইগাতী",
            "upazila_en": "Jhenaigati"
          },
          {
            "upazila_bn": "নকলা",
            "upazila_en": "Nakla"
          },
          {
            "upazila_bn": "নালিতাবাড়ী",
            "upazila_en": "Nalitabari"
          },
          {
            "upazila_bn": "শেরপুর সদর",
            "upazila_en": "Sherpur Sadar"
          },
          {
            "upazila_bn": "শ্রীবর্দী",
            "upazila_en": "Sreebardi"
          }
        ]
      }
    ]
  }
];

// Baseline default location
const DEFAULT_LOCATION = {
  division_bn: 'ঢাকা',
  division_en: 'Dhaka',
  district_bn: 'ঢাকা',
  district_en: 'Dhaka',
  upazila_bn: '',
  upazila_en: ''
};

// Helper: Get list of all divisions
function getAllDivisions() {
  return bdLocations.map(div => ({
    division_bn: div.division_bn,
    division_en: div.division_en,
    districtCount: div.districts.length
  }));
}

// Helper: Get districts by division (English or Bengali)
function getDistrictsByDivision(divisionName) {
  if (!divisionName) return [];
  const normalized = divisionName.trim().toLowerCase();
  const div = bdLocations.find(d => 
    d.division_en.toLowerCase() === normalized || 
    d.division_bn === divisionName.trim()
  );
  if (!div) return [];
  return div.districts.map(dst => ({
    district_bn: dst.district_bn,
    district_en: dst.district_en,
    upazilaCount: dst.upazilas.length
  }));
}

// Helper: Get upazilas by district (English or Bengali)
function getUpazilasByDistrict(districtName) {
  if (!districtName) return [];
  const normalized = districtName.trim().toLowerCase();
  for (const div of bdLocations) {
    const dst = div.districts.find(d => 
      d.district_en.toLowerCase() === normalized || 
      d.district_bn === districtName.trim()
    );
    if (dst) {
      return dst.upazilas;
    }
  }
  return [];
}

// Helper: Find full location details
function findLocation(divisionEn, districtEn, upazilaEn = '') {
  const div = bdLocations.find(d => d.division_en.toLowerCase() === (divisionEn || '').toLowerCase());
  if (!div) return null;
  const dst = div.districts.find(d => d.district_en.toLowerCase() === (districtEn || '').toLowerCase());
  if (!dst) return null;
  let upz = null;
  if (upazilaEn) {
    upz = dst.upazilas.find(u => u.upazila_en.toLowerCase() === upazilaEn.toLowerCase());
  }
  return {
    division_bn: div.division_bn,
    division_en: div.division_en,
    district_bn: dst.district_bn,
    district_en: dst.district_en,
    upazila_bn: upz ? upz.upazila_bn : '',
    upazila_en: upz ? upz.upazila_en : ''
  };
}

module.exports = {
  bdLocations,
  DEFAULT_LOCATION,
  getAllDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
  findLocation
};
