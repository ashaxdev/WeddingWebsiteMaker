"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { id } = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/templates/${id}`)
      .then((res) => res.json())
      .then(setTemplate);
  }, [id]);

  const handlePayment = async () => {
    const res = await fetch("/api/purchase", {
      method: "POST",
      body: JSON.stringify({
        templateId: id,
        email: "test@gmail.com",
      }),
    });

    const data = await res.json();

    // Mock payment success
    const verify = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({
        purchaseId: data.purchaseId,
      }),
    });

    const result = await verify.json();

    router.push(result.redirect);
  };

  if (!template) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">{template.title}</h1>

        <p className="mb-4 text-gray-600">
          Price: ₹{template.price}
        </p>

        <button
          onClick={handlePayment}
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}