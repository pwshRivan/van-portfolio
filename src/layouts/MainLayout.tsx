import type { ReactNode } from "react";
import { ScrollToTop } from "@/components/index";
import { Navbar, Footer } from "@/layouts/index";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />

      <main className="grow relative z-1">
        <div className="min-h-screen relative overflow-hidden">{children}</div>

        <Footer />
      </main>

      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
