"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Hide global navbar and footer on admin and login pages
  const isHiddenRoute = pathname?.startsWith("/admin") || pathname === "/login";

  return (
    <>
      {!isHiddenRoute && <div className="mesh-bg" />}
      {!isHiddenRoute && <Navbar />}
      <main className={isHiddenRoute ? "w-full min-h-screen" : ""}>{children}</main>
      {!isHiddenRoute && <Footer />}
    </>
  );
}
