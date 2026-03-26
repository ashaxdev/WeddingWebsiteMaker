import { connectDB } from "@/lib/db";
import Template from "@/models/Template";
import { seedTemplates } from "@/lib/seed";

export async function GET() {
  try {
    await connectDB();

    // // ✅ Auto insert dummy data
    // await seedTemplates();

    const templates = await Template.find().sort({ createdAt: -1 });

    return Response.json(templates);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}