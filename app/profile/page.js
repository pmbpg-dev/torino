"use client";
import React from "react";
import "react-date-object/locales/persian_fa";
import { DatePicker } from "zaman";

export default function Profile() {
  return (
    <div>
      <DatePicker
        accentColor="#28a745"
        onChange={(e) => console.log(e.value.toISOString().split("T")[0])}
        customShowDateFormat="YYYY/MM/DD"
      />
    </div>
  );
}
