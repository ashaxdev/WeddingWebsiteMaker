import { connectDB } from "@/lib/db";
import Purchase from "@/models/Purchase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { purchaseId } = await req.json();

    const purchase = await Purchase.findByIdAndUpdate(
      purchaseId,
      { status: "paid" },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      redirect: `/editor/${purchase.templateId}`,
    });
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" });
  }
}