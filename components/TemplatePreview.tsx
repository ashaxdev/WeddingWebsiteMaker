"use client";

import { replaceVariables } from "@/lib/replaceVariables";

export default function TemplatePreview({ html, form }: any) {
  const finalHTML = replaceVariables(html, form);

  return (
    <iframe
      srcDoc={finalHTML}
      className="w-full h-[500px] border rounded"
    />
  );
}