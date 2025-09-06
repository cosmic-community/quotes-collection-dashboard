import { ReactNode } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        <Navigation />
        
        <main className="flex-1 lg:pl-64">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}