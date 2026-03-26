import { connectDB } from "@/lib/db";
import Purchase from "@/models/Purchase";
import Template from "@/models/Template";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { templateId, email } = await req.json();

    const template = await Template.findById(templateId);

    if (!template) {
      return NextResponse.json({ error: "Template not found" });
    }

    // ✅ Free template → auto unlock
    if (template.isFree) {
      return NextResponse.json({
        success: true,
        redirect: `/editor/${templateId}`,
      });
    }

    // ✅ Paid template → create purchase
    const purchase = await Purchase.create({
      userEmail: email,
      templateId,
      amount: template.price,
      status: "pending",
    });

    return NextResponse.json({
      success: true,
      purchaseId: purchase._id,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" });
  }
}