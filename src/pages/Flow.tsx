
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Flow = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Flow Engineering</h1>
            <p className="text-gray-600">Visual flow engineering workspace</p>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Flow;
