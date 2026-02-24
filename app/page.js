"use client";

import TorsComponent from "@/components/main/torsComponent";
import { useState } from "react";
import { DatePicker } from "zaman";

export default function Home() {
  const [change, setChange] = useState();
  const [changeDate, setChangeDate] = useState();

  return (
    <main>
      <header></header>
      <article>
        <h3>
          بگزار کننده بهترین تور های داخلی و خارجی<span>تورینو</span>
        </h3>
        <TorsComponent />
      </article>
    </main>
  );
}
