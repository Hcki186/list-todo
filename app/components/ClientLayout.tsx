"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex pt-16">
      {pathname !== "/" && <Sidebar />}
      <main className={pathname !== "/" ? "flex-1 p-8 ml-64" : "flex-1 p-8"}>
        {children}
      </main>
    </div>
  );
}