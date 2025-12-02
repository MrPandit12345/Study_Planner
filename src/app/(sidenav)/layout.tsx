"use client";
import React from "react";
import SidePanel from "../_component/SidePanel";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-screen flex flex-row overflow-hidden">
      <div className="flex-none sticky top-0 h-screen">
        <SidePanel />
      </div>
      <div className="flex-1 h-full bg-gray-50 overflow-auto">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
