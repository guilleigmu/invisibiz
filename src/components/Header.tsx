"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScanSearch } from "lucide-react"; // Add this import
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link className="flex items-center" href="/">
          <ScanSearch className="w-6 h-6 text-primary" />
          <span className="ml-2 text-xl font-bold text-primary">InvisiBiz</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Button
                variant="ghost"
                asChild
                className={
                  pathname === "/" || pathname.includes("search")
                    ? "font-bold"
                    : ""
                }
              >
                <Link href="/">Búsqueda</Link>
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                asChild
                className={pathname === "/history" ? "font-bold" : ""}
              >
                <Link href="/history">Historial</Link>
              </Button>
            </li>
            {/*             <li>
              <Button
                variant="ghost"
                asChild
                className={pathname === "/config" ? "font-bold" : ""}
              >
                <Link href="/config">Configuración</Link>
              </Button>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
