"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DeviceToggle from "@/components/DeviceToggle";
import PreviewHeader from "@/components/PreviewHeader";
import { replaceVariables } from "@/lib/replaceVariables"; // ✅ import

export default function TemplatePreview() {
  const params = useParams();
  const id = params?.id as string;

  const [template, setTemplate] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/templates/${id}`)
      .then((res) => res.json())
      .then((data) => setTemplate(data));
  }, [id]);

  if (!template) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading template...
      </p>
    );
  }

  // ✅ APPLY DEFAULT VALUES HERE
  const finalHTML = replaceVariables(
    template.html || "<h1>No Template</h1>",
    template.defaults || {
      brideName: "Bride",
      groomName: "Groom",
      date: "Wedding Date",
      venue: "Venue",
      color: "#fff0f5",
    }
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <PreviewHeader template={template} />

      {/* Toggle */}
      <div className="flex justify-center mt-4">
        <DeviceToggle isMobile={isMobile} setIsMobile={setIsMobile} />
      </div>

      {/* Preview */}
      <div className="flex justify-center mt-6 px-2">
        <div
          className={`border shadow-lg transition-all duration-300 bg-white ${
            isMobile
              ? "w-[375px] h-[700px] rounded-xl overflow-hidden"
              : "w-full h-[80vh] rounded-xl overflow-hidden"
          }`}
        >
          <iframe
            srcDoc={finalHTML}   
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}