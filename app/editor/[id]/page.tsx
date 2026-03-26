"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import EditorForm from "@/components/EditorForm";
import TemplatePreview from "@/components/TemplatePreview";

export default function EditorPage() {
  const { id } = useParams();
  const [template, setTemplate] = useState<any>(null);
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/templates/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTemplate(data);
        setForm(data.defaults || {}); // starts empty if admin hasn't set defaults
      });
  }, [id]);

  if (!template || !form) return <p>Loading...</p>;

  const handleSave = async () => {
    const res = await fetch("/api/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, templateId: id }),
    });
    const data = await res.json();
    if (data.slug) {
      alert("Saved successfully!");
      window.location.href = `/wedding/${data.slug}`;
    }
  };

  // ✅ Admin-defined fields only — no defaults in code
  const fields = template.fields || [];

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-xl font-bold text-center mb-4">
        Customize Your Invitation
      </h1>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <EditorForm form={form} setForm={setForm} fields={fields} />
          <button
            onClick={handleSave}
            className="w-full bg-green-500 text-white py-2 rounded mt-4"
          >
            Save Invitation 💾
          </button>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <TemplatePreview html={template.html} form={form} />
        </div>
      </div>
    </div>
  );
}