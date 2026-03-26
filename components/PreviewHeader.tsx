"use client";

import { useRouter } from "next/navigation";

export default function PreviewHeader({ template }: any) {
  const router = useRouter();

  const handleUseTemplate = () => {
    if (template.isFree) {
      router.push(`/editor/${template._id}`);
    } else {
      router.push(`/checkout/${template._id}`);
    }
  };

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-white shadow">
      <h1 className="text-lg font-semibold">{template.title}</h1>

      <button
        onClick={handleUseTemplate}
        className="bg-pink-500 text-white px-4 py-2 rounded"
      >
        {template.isFree ? "Use Free" : `Buy ₹${template.price}`}
      </button>
    </div>
  );
}