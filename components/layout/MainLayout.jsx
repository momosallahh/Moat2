'use client';

import Header from './Header';
import Sidebar from './Sidebar';

export default function MainLayout({ children, userName }) {
  return (
    <div className="min-h-screen bg-dark">
      <Sidebar />
      <div className="md:ml-64">
        <Header userName={userName} />
        <main className="container mx-auto px-6 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
