"use client";

import { useState } from "react";

export default function ShareButtons({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  const whatsappShare = () => {
    const text = encodeURIComponent(
      `You're invited! 💍\n${url}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="space-y-3">
      <button
        onClick={whatsappShare}
        className="w-full bg-green-500 text-white py-2 rounded"
      >
        Share on WhatsApp
      </button>

      <button
        onClick={copyLink}
        className="w-full bg-gray-800 text-white py-2 rounded"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}