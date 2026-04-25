import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Origami Diagram Archive",
  description:
    "A curated collection of remakes of classic and historical origami diagrams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-zinc-800">
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h1 className="text-2xl font-semibold">Origami Diagram Archive</h1>
              <nav className="flex items-center gap-2">
                <Link
                  href="/"
                  className="rounded-full px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white transition"
                >
                  Diagramas
                </Link>
                <Link
                  href="/gallery"
                  className="rounded-full px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white transition"
                >
                  Galeria
                </Link>
              </nav>
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-zinc-800 mt-16">
            <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-zinc-500">
              © {new Date().getFullYear()} – Remakes of classic origami diagrams.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
