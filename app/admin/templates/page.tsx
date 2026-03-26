"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface Field {
  key: string;
  type: string;
}

interface Template {
  _id: string;
  title: string;
  html: string;
  fields: Field[];
  defaults: Record<string, string>;
  themes: string[];
  isFree: boolean;
  price: number;
  discount: number;
}

export default function AdminTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [title, setTitle] = useState("");
  const [html, setHtml] = useState("");
  const [price, setPrice] = useState(0);
  const [isFree, setIsFree] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [fields, setFields] = useState<Field[]>([]);
  const [defaults, setDefaults] = useState<Record<string, string>>({});

  // ✅ Fetch templates
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await fetch("/api/admin/templates");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTemplates(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Delete template
  const deleteTemplate = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/templates/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setTemplates((prev) => prev.filter((t) => t._id !== id));
      toast.success("Template deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  // ✅ File upload for HTML
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setHtml(reader.result as string);
    reader.readAsText(file);
  };

  // ✅ Add field dynamically
  const addField = () => setFields([...fields, { key: "", type: "text" }]);

  // ✅ Save template
  const saveTemplate = async () => {
    if (!title || !html) return toast.error("Title and HTML are required");
    try {
      const res = await fetch("/api/admin/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, html, price, isFree, discount, fields, defaults }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const data = await res.json();
      setTemplates([data, ...templates]);
      toast.success("Template saved");
      // reset form
      setTitle("");
      setHtml("");
      setFields([]);
      setDefaults({});
      setPrice(0);
      setDiscount(0);
      setIsFree(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save template");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Templates</h1>

      {/* ➕ Create Template */}
      <div className="border p-4 rounded mb-6 shadow-sm bg-white">
        <h2 className="text-lg font-semibold mb-2">Create Template</h2>
        <input
          type="text"
          placeholder="Template Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        <textarea
          placeholder="Paste HTML here"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          className="border p-2 w-full h-32 mb-2 rounded"
        />

        <input type="file" accept=".html" onChange={handleFileUpload} className="mb-2" />

        <div className="flex gap-2 mb-2">
          <label>
            <input
              type="checkbox"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
            />{" "}
            Free
          </label>
          {!isFree && (
            <>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="border p-1 rounded w-24"
              />
              <input
                type="number"
                placeholder="Discount %"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="border p-1 rounded w-24"
              />
            </>
          )}
        </div>

        {/* Dynamic fields */}
        <div className="mb-2">
          <h3 className="font-semibold">Editable Fields</h3>
          {fields.map((f, idx) => (
            <div key={idx} className="flex gap-2 mb-1 items-center">
              <input
                placeholder="Field Key"
                value={f.key}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[idx].key = e.target.value;
                  setFields(newFields);
                }}
                className="border p-1 rounded"
              />
              <select
                value={f.type}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[idx].type = e.target.value;
                  setFields(newFields);
                }}
                className="border p-1 rounded"
              >
                <option value="text">Text</option>
                <option value="date">Date</option>
                <option value="image">Image</option>
                <option value="color">Color</option>
              </select>
              <input
                placeholder="Default value"
                value={defaults[f.key] || ""}
                onChange={(e) =>
                  setDefaults((prev) => ({ ...prev, [f.key]: e.target.value }))
                }
                className="border p-1 rounded"
              />
            </div>
          ))}
          <button onClick={addField} className="text-blue-500 mt-1">
            + Add Field
          </button>
        </div>

        <button onClick={saveTemplate} className="bg-green-500 text-white px-4 py-2 rounded">
          Save Template
        </button>
      </div>

      {/* ➖ Templates List */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {templates.map((t) => (
          <div key={t._id} className="p-4 border rounded shadow-sm bg-white">
            <h2 className="font-semibold">{t.title}</h2>
            <p>{t.isFree ? "Free" : `₹${t.price} (${t.discount}% off)`}</p>
            <button
              onClick={() => deleteTemplate(t._id)}
              className="text-red-500 mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}