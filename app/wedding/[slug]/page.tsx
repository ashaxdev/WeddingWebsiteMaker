import { connectDB } from "@/lib/db";
import QRGenerator from "@/components/QRGenerator";
import ShareButtons from "@/components/ShareButtons";
import Project from "@/models/Project";
import Template from "@/models/Template";
import { replaceVariables } from "@/lib/replaceVariables";

export async function generateMetadata({ params }: any) {
  const { slug } = await params;

  return {
    title: `${slug} Wedding Invitation`,
    description: "View beautiful wedding invitation",
  };
}

export default async function WeddingPage({ params }: any) {
  const { slug } = await params;

  await connectDB();

  const project = await Project.findOne({ slug });

  if (!project) {
    return <h1>Not Found</h1>;
  }

  const template = await Template.findById(project.templateId);

  const finalHTML = replaceVariables(
    template.html,
    project.toObject()
  );

  return (
    <div className="w-full h-screen">
      <iframe
        srcDoc={finalHTML}
        className="w-full h-full border-0"
      />
      {/* SHARE SECTION */}
<div className="mt-6 grid md:grid-cols-2 gap-4">
  <QRGenerator url={`https://yourdomain.com/wedding/${slug}`} />
  <ShareButtons url={`https://yourdomain.com/wedding/${slug}`} />
</div>
    </div>
  );
}