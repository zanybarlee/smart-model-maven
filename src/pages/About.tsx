
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const About = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-4">
            <SidebarTrigger />
          </div>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-slate-900">About CENS Domain Modeler</h1>
                <p className="text-slate-600 mt-2">Learn more about our domain modeling tool</p>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About Us</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600">
                      CENS Domain Modeler is a powerful tool designed to help developers and architects create comprehensive domain models using AI-powered analysis.
                    </p>
                    <p className="text-slate-600">
                      Our mission is to simplify the domain modeling process and help teams create better software architectures.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li>AI-powered domain model generation</li>
                      <li>Interactive diagram editor</li>
                      <li>Real-time collaboration</li>
                      <li>Export capabilities</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default About;
