import { NextResponse, NextRequest } from "next/server";
import Template from "@/models/Template";
import { connectDB } from "@/lib/db";

connectDB();

export async function DELETE(req: NextRequest, context: any) {
  try {
    // support both Promise and direct object
    const id =
      typeof context.params?.id === "string"
        ? context.params.id
        : (await context.params)?.id;

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await Template.findByIdAndDelete(id);

    return NextResponse.json({ message: "Template deleted" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete template" }, { status: 500 });
  }
}