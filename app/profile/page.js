"use client";
import React from "react";
import DatePicker from "react-multi-date-picker";
import "react-date-object/locales/persian_fa";

export default function Profile() {
  return (
    <div>
      <DatePicker
        calendar={"persian"}
        locale={"persian_fa"}
        format="YYYY/MM/DD"
      />
    </div>
  );
}
