import "./globals.css";
import { HeaderNav } from "./components/HeaderNav";

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
<HeaderNav />
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