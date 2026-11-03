const mongoose = require("mongoose");
const Tour = require("./src/models/tourmodels");
const dbConnection = require("./src/config/db");   // 👈 db.js se connection

const data = [
  {
    image: "pushkar.png", title: "Pushkar", location: "Rajasthan",
    price: "₹4,999", rating: "4.8", category: "Temples",
    description: "Pushkar is one of the oldest cities in India. Famous for its sacred Pushkar Lake and Brahma Temple.",
    color: 0xFFFF6B35, reviews: 1240, duration: "3 Days",
  },
  {
    image: "ahmedabad.png", title: "Ahmedabad", location: "Gujarat",
    price: "₹3,499", rating: "4.6", category: "Heritage",
    description: "Ahmedabad is a vibrant city known for its rich history and Sabarmati Ashram.",
    color: 0xFF2196F3, reviews: 980, duration: "2 Days",
  },
  {
    image: "indore.png", title: "Indore", location: "Madhya Pradesh",
    price: "₹2,999", rating: "4.7", category: "Heritage",
    description: "Indore is the cleanest city in India, known for its culinary heritage.",
    color: 0xFF4CAF50, reviews: 850, duration: "2 Days",
  },
  {
    image: "osian.png", title: "Osian", location: "Rajasthan",
    price: "₹3,999", rating: "4.5", category: "Deserts",
    description: "Osian is a beautiful desert town known for its ancient temples and sand dunes.",
    color: 0xFFFF9800, reviews: 720, duration: "2 Days",
  },
  {
    image: "kumbhalgarh.png", title: "Kumbhalgarh", location: "Rajasthan",
    price: "₹5,499", rating: "4.9", category: "Palaces",
    description: "Kumbhalgarh Fort is a UNESCO World Heritage Site known for its massive walls.",
    color: 0xFF9C27B0, reviews: 1560, duration: "3 Days",
  },
  {
    image: "bikaner.png", title: "Bikaner", location: "Rajasthan",
    price: "₹3,299", rating: "4.4", category: "Palaces",
    description: "Bikaner is a royal city known for its beautiful palaces and Junagarh Fort.",
    color: 0xFFE91E63, reviews: 680, duration: "2 Days",
  },
  {
    image: "umaidpalace.webp", title: "Umaid Palace", location: "Jodhpur",
    price: "₹6,999", rating: "4.9", category: "Palaces",
    description: "Umaid Bhawan Palace is one of the largest private residences in the world.",
    color: 0xFF3F51B5, reviews: 2100, duration: "2 Days",
  },
  {
    image: "surat.png", title: "Surat", location: "Gujarat",
    price: "₹2,499", rating: "4.3", category: "Heritage",
    description: "Surat is a vibrant city known for its diamond and textile industries.",
    color: 0xFF795548, reviews: 590, duration: "2 Days",
  },
  {
    image: "kasmir.png", title: "Kashmir", location: "Jammu & Kashmir",
    price: "₹8,499", rating: "4.9", category: "Hill Stations",
    description: "Kashmir is called 'Paradise on Earth' with beautiful Dal Lake and snow mountains.",
    color: 0xFF00BCD4, reviews: 2850, duration: "5 Days",
  },
  {
    image: "manali.png", title: "Manali", location: "Himachal Pradesh",
    price: "₹5,999", rating: "4.7", category: "Hill Stations",
    description: "Manali is a beautiful hill station nestled in the Himalayas.",
    color: 0xFF8BC34A, reviews: 1950, duration: "4 Days",
  },
  {
    image: "goanew.png", title: "Goa", location: "Goa",
    price: "₹6,499", rating: "4.8", category: "Beaches",
    description: "Goa is India's party capital with stunning beaches and vibrant nightlife.",
    color: 0xFFFF5722, reviews: 3200, duration: "4 Days",
  },
  {
    image: "jaipur.png", title: "Jaipur", location: "Rajasthan",
    price: "₹4,499", rating: "4.7", category: "Palaces",
    description: "Jaipur, the Pink City, famous for Hawa Mahal and Amber Fort.",
    color: 0xFFE91E63, reviews: 2100, duration: "3 Days",
  },
  {
    image: "haridwar.png", title: "Haridwar", location: "Uttar Pradesh",
    price: "₹3,999", rating: "4.6", category: "Temples",
    description: "Haridwar is a holy city on the banks of the Ganges.",
    color: 0xFFFF9800, reviews: 1650, duration: "3 Days",
  },
  {
    image: "kedarnath.png", title: "Kedarnath", location: "Uttarakhand",
    price: "₹4,299", rating: "4.5", category: "Hill Stations",
    description: "Kedarnath is a sacred town in the Himalayas.",
    color: 0xFF4CAF50, reviews: 890, duration: "3 Days",
  },
  {
    image: "amritsar.png", title: "Amritsar", location: "Punjab",
    price: "₹3,799", rating: "4.8", category: "Heritage",
    description: "Amritsar is home to the Golden Temple, the holiest shrine in Sikhism.",
    color: 0xFFFFD54F, reviews: 1780, duration: "2 Days",
  },
  {
    image: "jasalmar.png", title: "Jaisalmer", location: "Rajasthan",
    price: "₹5,299", rating: "4.6", category: "Deserts",
    description: "Jaisalmer is a golden city in the heart of the Thar Desert.",
    color: 0xFFFF6B35, reviews: 1250, duration: "3 Days",
  },
  {
    image: "darjling.png", title: "Darjeeling", location: "West Bengal",
    price: "₹4,899", rating: "4.4", category: "Hill Stations",
    description: "Darjeeling is famous for its tea gardens and the Himalayan toy train.",
    color: 0xFF9C27B0, reviews: 980, duration: "4 Days",
  },
];

(async () => {
  try {
    await dbConnection;   // 👈 db.js ka connection ready hone ka wait

    await Tour.deleteMany();
    await Tour.insertMany(data);
    console.log("✅ Data seeded: " + data.length + " tours");

    await mongoose.connection.close();
    process.exit();
  } catch (err) {
    console.log("❌ Seed error:", err);
    process.exit(1);
  }
})();