import { SearchX } from "lucide-react";

export default function Empty() {
  return (
    <div className="flex items-center justify-center w-full h-full gap-2">
      <SearchX />
      <p>موردی یافت نشد!</p>
    </div>
  );
}
