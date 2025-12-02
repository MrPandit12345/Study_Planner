"use client";

import React from "react";

type CardProps = {
  title: string;
  subtitle?: string;
  value?: React.ReactNode;
  icon?: React.ReactElement;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
  children?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  value,
  icon,
  gradientFrom = "#3BD67D",
  gradientTo = "#18C46A",
  className = "",
  children,
}) => {
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
          <div className="text-sm opacity-90 font-medium">{title}</div>
        </div>
        {icon && (
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
            {icon}
          </div>
        )}
      </div>

      {value && (
        <div className="mt-4 text-4xl md:text-5xl font-bold leading-none">
          {value}
        </div>
      )}
      {subtitle && <div className="text-xs mt-2 text-white/90">{subtitle}</div>}

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default Card;
