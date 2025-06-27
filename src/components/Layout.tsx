
import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex h-screen bg-background text-foreground">
      {!isMobile && <Sidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
