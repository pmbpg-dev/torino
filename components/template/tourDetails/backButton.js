"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <>
      <ArrowLeft
        className="mt-3 ml-4 cursor-pointer"
        onClick={() => router.back()}
      />
    </>
  );
}
