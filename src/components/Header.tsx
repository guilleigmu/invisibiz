import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScanSearch } from "lucide-react"; // Add this import

export default function Header() {
  return (
    <header className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <ScanSearch className="w-6 h-6 text-primary" />
          <span className="ml-2 text-xl font-bold text-primary">InvisiBiz</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link href="/history">Historial</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link href="/config">Configuración</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
