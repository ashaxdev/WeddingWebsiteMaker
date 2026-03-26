import Link from "next/link";
import Image from "next/image";

// ✅ SEO Metadata
export const metadata = {
  title: "Wedding Invitation Website Maker | Digital Invitations",
  description:
    "Browse beautiful wedding invitation templates. Create your own wedding website and share via link or QR code.",
  keywords: [
    "wedding invitation website",
    "digital invitation",
    "online wedding card",
    "wedding website builder",
  ],
};

// ✅ Server-side fetch (SEO friendly)
async function getTemplates() {
  const res = await fetch("https://wedding-website-maker.vercel.app/api/templates", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function Home() {
  const templates = await getTemplates();

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      
      {/* HERO */}
      <section className="text-center py-12 px-4">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Wedding Invitation Website Maker 💍
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Create stunning wedding invitation websites. Customize templates,
          share via link or QR code instantly.
        </p>
      </section>

      {/* TEMPLATE GRID */}
      <section className="px-4 md:px-10 pb-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">
          Browse Templates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {templates.map((template: any) => (
            <article
              key={template._id}
              className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 overflow-hidden"
            >
              
              {/* IMAGE */}
              <div className="relative">
                <Image
                  src={
                    template.thumbnail ||
                    "https://via.placeholder.com/400x250"
                  }
                  alt={`${template.title} wedding invitation template`}
                  width={400}
                  height={250}
                  className="w-full h-52 object-cover"
                />

                {/* PRICE BADGE */}
                <div className="absolute top-2 right-2">
                  {template.isFree ? (
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      Free
                    </span>
                  ) : (
                    <span className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full">
                      ₹{template.price}
                    </span>
                  )}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">
                  {template.title}
                </h3>

                {/* BUTTONS */}
                <div className="flex gap-2 mt-4">
                  
                  <Link
                    href={`/templates/${template._id}`}
                    className="flex-1 text-center border border-gray-300 py-2 rounded-lg text-sm hover:bg-gray-100"
                  >
                    Preview
                  </Link>

                  <Link
                    href={`/editor/${template._id}`}
                    className="flex-1 text-center bg-[#800000] text-white py-2 rounded-lg text-sm hover:opacity-90"
                  >
                    Use
                  </Link>

                </div>
              </div>

            </article>
          ))}

        </div>
      </section>

    </main>
  );
}