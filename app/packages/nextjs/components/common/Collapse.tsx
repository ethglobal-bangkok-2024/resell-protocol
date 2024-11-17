'use client';

import { useState } from "react";

interface CollapseProps {
  title: string;
  children: React.ReactNode;
}

const Collapse = ({ title, children }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-screen-sm mx-auto border-b border-gray-200">
      <div className="px-4">
        <button
          className="w-full py-4 flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-medium">{title}</span>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && <div className="pb-4">{children}</div>}
      </div>
    </div>
  );
};

export default Collapse;