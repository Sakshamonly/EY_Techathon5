"use client";

import { useState } from "react";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Sidebar from "./(route)/_components/Sidebar";
import { TopBar } from "./(route)/_components/TopBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Choose the weights you need
});

export default function RootLayout({ children }) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("Reservations"); // State for active section name

  // Update active section when sidebar button is clicked
  const handleSidebarClick = (sectionName) => {
    setActiveSection(sectionName);
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} antialiased`}
      >
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="relative z-20">
            <Sidebar
              isCollapsed={isSidebarCollapsed}
              setIsCollapsed={setSidebarCollapsed}
              onSidebarClick={handleSidebarClick} // Pass the click handler to Sidebar
            />
          </div>

          {/* Main Content */}
          <div
            className={`flex-1 flex flex-col transition-all duration-300 ${
              isSidebarCollapsed ? "" : ""
            }`}
          >
            {/* TopBar */}
            <div className="bg-gray-900 h-16 sticky top-0 z-10">
              <TopBar activeSection={activeSection} /> {/* Pass active section to TopBar */}
            </div>

            {/* Scrollable Center Content */}
            <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
