export function replaceVariables(html: string, data: any) {
  let updatedHTML = html;

  Object.keys(data).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    updatedHTML = updatedHTML.replace(
  regex,
  data[key] || "Your Text"
);
  });

  return updatedHTML;
}