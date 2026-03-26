import Template from "@/models/Template";

export async function seedTemplates() {
  try {
    const count = await Template.countDocuments();

    // ✅ Avoid duplicate insert
    if (count > 0) {
      console.log("⚡ Templates already exist");
      return;
    }

    await Template.insertMany([
      {
        title: "Royal Wedding",
        thumbnail: "https://via.placeholder.com/400x250",
        price: 499,
        isFree: false,
        html: "<html><body><h1>💍 {{brideName}} ❤️ {{groomName}}</h1><p>📅 {{date}}</p><p>📍 {{venue}}</p></body></html>",
        defaults: {
    "brideName": "Asha",
    "groomName": "Jaison",
    "date": "2026-05-28",
    "venue": "Chennai",
    "color": "#fff0f5"
  },

      },
      {
        title: "Floral Love",
        thumbnail: "https://via.placeholder.com/400x250",
        price: 0,
        isFree: true,
        html: "<html><body><h1>💍 {{brideName}} ❤️ {{groomName}}</h1><p>📅 {{date}}</p><p>📍 {{venue}}</p></body></html>",
        defaults: {
    "brideName": "Asha",
    "groomName": "Jaison",
    "date": "2026-05-28",
    "venue": "Chennai",
    "color": "#fff0f5"
  },
      },
      {
        title: "Classic Elegance",
        thumbnail: "https://via.placeholder.com/400x250",
        price: 299,
        isFree: false,
        html: "<html><body><h1>💍 {{brideName}} ❤️ {{groomName}}</h1><p>📅 {{date}}</p><p>📍 {{venue}}</p></body></html>",
        defaults: {
    "brideName": "Asha",
    "groomName": "Jaison",
    "date": "2026-05-28",
    "venue": "Chennai",
    "color": "#fff0f5"
  },
      },
    ]);

    console.log("✅ Dummy templates inserted");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
}