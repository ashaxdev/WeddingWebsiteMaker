"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import * as htmlToImage from "html-to-image";

export default function QRGenerator({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const [color, setColor] = useState("#000000");

  const downloadQR = async () => {
    if (!ref.current) return;

    const dataUrl = await htmlToImage.toPng(ref.current);

    const link = document.createElement("a");
    link.download = "invitation-qr.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="bg-white p-4 rounded shadow text-center space-y-4">
      <h2 className="font-semibold">QR Code</h2>

      {/* QR */}
      <div ref={ref} className="flex justify-center p-4 bg-white">
        <QRCodeCanvas value={url} size={200} fgColor={color} />
      </div>

      {/* Color Picker */}
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full h-10"
      />

      {/* Download */}
      <button
        onClick={downloadQR}
        className="w-full bg-black text-white py-2 rounded"
      >
        Download QR
      </button>
    </div>
  );
}