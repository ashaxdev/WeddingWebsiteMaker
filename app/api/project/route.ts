import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { slugify } from "@/lib/slugify";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // ✅ Generate slug
    const baseSlug = slugify(
      `${body.brideName}-${body.groomName}-wedding`
    );

    let slug = baseSlug;
    let counter = 1;

    // ✅ Ensure unique slug
    while (await Project.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }

    const project = await Project.create({
      ...body,
      slug,
    });

    return NextResponse.json({
      success: true,
      slug,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save" });
  }
}