import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* <Image src="/logo.png" alt="Logo" width={40} height={40} /> */}
          <span className="ml-2 text-xl font-bold text-foreground">
            InvisiBiz
          </span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </li>
            {/* <li>
              <Button variant="ghost" asChild>
                <Link href="/buy-credits">Comprar créditos</Link>
              </Button>
            </li> */}
            <li>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Configuración</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
