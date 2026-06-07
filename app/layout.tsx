import "./globals.css";
import { HeaderNav } from "./components/HeaderNav";

export const metadata = {
  title: "Origami Diagram Archive",
  description:
    "A curated collection of remakes of classic and historical origami diagrams.",
};

const themeInitScript = `
  (() => {
    const storedTheme = window.localStorage.getItem("origami-diagram-archive-theme");
    document.documentElement.dataset.theme = storedTheme === "light" ? "light" : "dark";
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
              <h1 className="text-2xl font-semibold">
                Origami Diagram Archive
              </h1>
              <HeaderNav />
            </div>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="mt-16 border-t border-zinc-800">
            <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-zinc-500">
              © {new Date().getFullYear()} – Remakes of classic origami diagrams.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
