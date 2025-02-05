'use client'
import Header from "./header";
import Sidebar from "./sidebar";


export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="w-60 min-h-screen">
        <Sidebar />
      </aside>
      <main className="flex-1 p-3">
        <Header />
        <div className="relative p-8">
          {children}
        </div>
      </main>
    </div>
  );
}