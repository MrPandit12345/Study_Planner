"use client";

import React from "react";
import { HiOutlineViewGrid } from "react-icons/hi";

type ProgressCardProps = {
  title?: string;
  subtitle?: string;
  completed: number;
  total: number;
  icon?: React.ReactElement;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
};

const ProgressCard: React.FC<ProgressCardProps> = ({
  title = "Today's Progress",
  subtitle = "Sessions completed",
  completed,
  total,
  icon = <HiOutlineViewGrid />,
  gradientFrom = "#4D90F8",
  gradientTo = "#2F80ED",
  className = "",
}) => {
  const safeTotal = total > 0 ? total : 0;
  const percent =
    safeTotal === 0
      ? 0
      : Math.min(100, Math.max(0, Math.round((completed / safeTotal) * 100)));
  const progressStr = `${completed}/${safeTotal}`;

  const style = {
    background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
  };

  return (
    <div
      className={`rounded-xl overflow-hidden p-6 shadow-lg text-white min-h-[200px] ${className}`}
      style={style}
      role="region"
      aria-label={title}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm opacity-90 mb-2">{title}</div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
          {icon}
        </div>
      </div>

      <div className="mt-2">
        <div className="text-4xl font-bold leading-none">{progressStr}</div>
        <div className="text-xs text-white/80 mb-4">{subtitle}</div>

        <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/70 rounded-full transition-[width] duration-300"
            style={{ width: `${percent}%` }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-label="Progress"
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
