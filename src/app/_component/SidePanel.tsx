"use client";

import React, { useState } from "react";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { AiOutlineCalendar, AiOutlineBarChart } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { AiOutlineRead } from "react-icons/ai";
import { useRouter, usePathname } from "next/navigation";

type Tab = {
  id: string;
  label: string;
  icon: React.ReactElement;
  path?: string;
};

const tabs: Tab[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <HiOutlineViewGrid size={20} />,
    path: "/dashboard",
  },
  {
    id: "planner",
    label: "Planner",
    icon: <AiOutlineCalendar size={18} />,
    path: "/planner",
  },
  {
    id: "progress",
    label: "Progress",
    icon: <AiOutlineBarChart size={18} />,
    path: "/progress",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <FiSettings size={18} />,
    path: "/settings",
  },
];

type SidePanelProps = {
  open?: boolean;
};

const SidePanel: React.FC<SidePanelProps> = ({ open = true }) => {
  const router = useRouter();
  const [active, setActive] = useState<string>("dashboard");
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const pathname = usePathname();
  const derivedActive = React.useMemo(() => {
    if (!pathname) return null;
    if (pathname === "/dashboard" || pathname === "") return "dashboard";
    if (pathname.includes("planner")) return "planner";
    if (pathname.includes("progress")) return "progress";
    if (pathname.includes("settings")) return "settings";
    return null;
  }, [pathname]);

  const currentActive = derivedActive || active;

  if (!open) return null;

  const onClickTab = (tab: Tab) => {
    setActive(tab.id);
    if (tab.path) router.push(tab.path);
  };

  return (
    <aside
      className={`h-screen flex flex-col gap-6 p-4 shadow-md transition-all duration-200 bg-white ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-[#2F80ED] flex items-center justify-center text-white">
          <AiOutlineRead size={22} />
        </div>
        <div className={`${collapsed ? "hidden" : ""}`}>
          <h3 className="font-semibold text-lg">StudyPlan</h3>
          <p className="text-sm text-gray-500">Your study companion</p>
        </div>
      </div>

      {/* Tabs container is scrollable while the collapse button remains static */}
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
        {tabs.map((tab) => {
          const isActive = currentActive === tab.id;
          return (
            <button
              key={tab.id}
              aria-pressed={isActive}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onClickTab(tab)}
              className={`flex items-center ${
                collapsed ? "justify-center" : "justify-start"
              } gap-3 w-full text-left px-3 py-2 transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-100 ${
                isActive
                  ? "bg-[#2F80ED] text-white rounded-lg"
                  : "text-gray-600 hover:bg-gray-100 rounded-lg"
              }`}
              title={tab.label}
            >
              <span
                className={`flex items-center justify-center ${
                  isActive ? "text-white" : "text-gray-500"
                }`}
              >
                {tab.icon}
              </span>
              {!collapsed && <span className="font-medium">{tab.label}</span>}
            </button>
          );
        })}
      </div>

      {/* Collapse button sits outside the scrollable container so it never scrolls */}
      <div className="mt-auto flex items-center justify-center">
        <button
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
        >
          {collapsed ? (
            <HiChevronDoubleRight size={18} />
          ) : (
            <HiChevronDoubleLeft size={18} />
          )}
        </button>
      </div>
    </aside>
  );
};

export default SidePanel;
