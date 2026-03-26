"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTemplate() {
  const router = useRouter();

  const [form, setForm] = useState<any>({
    title: "",
    html: "",
    isFree: true,
    price: 0,
    fields: [],
    defaults: {},
    themes: [],
  });

  const handleSubmit = async () => {
    await fetch("/api/admin/templates", {
      method: "POST",
      body: JSON.stringify(form),
    });

    router.push("/admin/templates");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">Create Template</h1>

      <input
        placeholder="Title"
        className="w-full border p-2"
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      {/* HTML INPUT */}
      <textarea
        placeholder="Paste HTML Template"
        className="w-full border p-2 h-40"
        onChange={(e) =>
          setForm({ ...form, html: e.target.value })
        }
      />

      {/* PRICE */}
      <input
        type="number"
        placeholder="Price"
        className="w-full border p-2"
        onChange={(e) =>
          setForm({ ...form, price: Number(e.target.value) })
        }
      />

      {/* FREE TOGGLE */}
      <label className="flex gap-2">
        <input
          type="checkbox"
          onChange={(e) =>
            setForm({ ...form, isFree: e.target.checked })
          }
        />
        Free Template
      </label>

      {/* DEFAULTS JSON */}
      <textarea
        placeholder='Defaults JSON {"brideName":"Asha"}'
        className="w-full border p-2"
        onChange={(e) =>
          setForm({
            ...form,
            defaults: JSON.parse(e.target.value || "{}"),
          })
        }
      />

      {/* FIELDS CONFIG */}
      <textarea
        placeholder='Fields JSON [{"key":"brideName","type":"text"}]'
        className="w-full border p-2"
        onChange={(e) =>
          setForm({
            ...form,
            fields: JSON.parse(e.target.value || "[]"),
          })
        }
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2"
      >
        Save Template
      </button>
    </div>
  );
}