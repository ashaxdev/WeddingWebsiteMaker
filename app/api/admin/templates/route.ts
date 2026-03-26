import { NextResponse } from "next/server";
import Template from "@/models/Template";
import { connectDB } from "@/lib/db";

connectDB();

export async function GET() {
  try {
    const templates = await Template.find();
    return NextResponse.json(templates);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("POST data received:", data); // 🔍 check what is coming
    const template = await Template.create(data);
    return NextResponse.json(template, { status: 201 });
  } catch (err) {
    console.error("Error saving template:", err);
    return NextResponse.json({ error: "Failed to create template" }, { status: 500 });
  }
}