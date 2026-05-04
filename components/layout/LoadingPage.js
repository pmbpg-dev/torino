import { LucideLoader } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] px-8 w-full md:w-4/6">
      <div className="flex gap-2">
        <LucideLoader className=" size-6 animate-spin" />
        <p>درحال بارگذاری...</p>
      </div>
    </div>
  );
}
