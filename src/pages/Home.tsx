
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Domain Modeler",
      description: "AI-powered domain modeling for your application",
      route: "/domain",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    },
    {
      title: "Design & Planning",
      description: "AI-assisted requirements and architecture planning",
      route: "/design",
      imageUrl: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d"
    },
    {
      title: "Code Generation",
      description: "Automated code generation with AI optimization",
      route: "/code",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-4">
            <SidebarTrigger />
          </div>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-slate-900">Welcome to CENS GenAI</h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Your comprehensive AI-powered platform for application development lifecycle management
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <Card 
                    key={feature.title} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(feature.route)}
                  >
                    <CardHeader>
                      <img 
                        src={feature.imageUrl}
                        alt={feature.title}
                        className="h-40 w-full object-cover rounded-t-lg"
                      />
                      <CardTitle className="mt-4">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">Get Started</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Home;
