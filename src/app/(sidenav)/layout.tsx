"use client";
import React, { useState } from "react";
import SidePanel from "../_component/SidePanel";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [showSidePanel, setShowSidePanel] = useState<boolean>(true);

  return (
    <div className="w-full min-h-screen flex flex-row">
      <div
        className={`transition-all duration-200 ${
          showSidePanel ? "" : "hidden"
        }`}
      >
        <SidePanel open={showSidePanel} />
      </div>

      <div className="flex-1 min-h-screen bg-gray-50">
        <div className="px-6 pt-6">
          <button
            aria-label={showSidePanel ? "Hide sidebar" : "Show sidebar"}
            onClick={() => setShowSidePanel((s) => !s)}
            className="inline-flex items-center justify-center rounded-md p-2 bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <TbLayoutSidebarRightCollapse size={20} />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
