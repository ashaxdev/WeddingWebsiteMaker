"use client";

export default function EditorForm({ form, setForm, fields }: any) {
  // handle file input change
  const handleFileChange = (key: string, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, [key]: reader.result }); // store base64
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {fields.map((field: any) => {
        if (field.type === "image") {
          return (
            <div key={field.key} className="flex flex-col">
              <label className="mb-1 font-medium">{field.placeholder}</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange(field.key, e.target.files?.[0] || null)
                }
                className="w-full border p-2 rounded"
              />
              {form[field.key] && (
                <img
                  src={form[field.key]}
                  alt="preview"
                  className="mt-2 max-h-40 object-contain"
                />
              )}
            </div>
          );
        }

        // default input types (text, date, color, etc)
        return (
          <input
            key={field.key}
            type={field.type || "text"}
            placeholder={field.placeholder || ""}
            className={`w-full border p-2 rounded ${
              field.type === "color" ? "h-10" : ""
            }`}
            value={form[field.key] || ""}
            onChange={(e) =>
              setForm({ ...form, [field.key]: e.target.value })
            }
          />
        );
      })}
    </div>
  );
}