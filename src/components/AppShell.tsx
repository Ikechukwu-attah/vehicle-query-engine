"use client";
import { ReactNode, useState } from "react";
import { Navbar } from "./Navbar";

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

export const AppShell = ({ children, sidebar }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        menuButton={
          <button
            type="button"
            className="lg:hidden p-1 rounded text-gray-600 hover:text-gray-900"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle filters"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <rect y="3" width="20" height="2" rx="1" />
              <rect y="9" width="20" height="2" rx="1" />
              <rect y="15" width="20" height="2" rx="1" />
            </svg>
          </button>
        }
      />
      <div className="flex flex-1 overflow-hidden">
        <aside className={`${sidebarOpen ? "block" : "hidden"} lg:block w-72 lg:shrink-0 border-r border-gray-200 bg-gray-50 lg:h-[calc(100vh-3.5rem)] lg:sticky lg:top-14 lg:overflow-y-auto`}>
          {sidebar}
        </aside>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
