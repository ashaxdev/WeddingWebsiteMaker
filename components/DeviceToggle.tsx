export default function DeviceToggle({
  isMobile,
  setIsMobile,
}: {
  isMobile: boolean;
  setIsMobile: (val: boolean) => void;
}) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => setIsMobile(false)}
        className={`px-4 py-2 rounded ${
          !isMobile ? "bg-black text-white" : "bg-gray-200"
        }`}
      >
        Desktop 💻
      </button>

      <button
        onClick={() => setIsMobile(true)}
        className={`px-4 py-2 rounded ${
          isMobile ? "bg-black text-white" : "bg-gray-200"
        }`}
      >
        Mobile 📱
      </button>
    </div>
  );
}