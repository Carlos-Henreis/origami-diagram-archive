import './globals.css';



export const metadata = {
  title: 'Origami Diagram Archive',
  description:
    'A curated collection of remakes of classic and historical origami diagrams.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-neutral-200">
            <div className="max-w-6xl mx-auto px-6 py-6">
              <h1 className="text-2xl font-semibold">
                Origami Diagram Archive
              </h1>
              
            </div>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="border-t border-neutral-200 mt-16">
            <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-neutral-500">
              © {new Date().getFullYear()} – Remakes of classic origami diagrams.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}