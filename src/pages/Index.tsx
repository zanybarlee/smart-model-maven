
import React, { useState } from 'react';
import 'reactflow/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Maximize2, Minimize2 } from "lucide-react";
import DomainModelEditor from '@/components/DomainModelEditor';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import DomainFlowDiagram from '@/components/DomainFlowDiagram';
import AISuggestions from '@/components/AISuggestions';
import { useDomainFlow } from '@/hooks/useDomainFlow';

const Index = () => {
  const [modelDescription, setModelDescription] = useState('');
  const [isDetached, setIsDetached] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    nodes,
    edges,
    selectedEntity,
    setSelectedEntity,
    handleSaveEntity,
    handleGenerateModel,
    onConnect,
    onNodeDragStop
  } = useDomainFlow();

  const FlowDiagram = () => (
    <DomainFlowDiagram
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
      style={{ height: isDetached ? '100%' : '500px' }}
    />
  );

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
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="flex justify-center mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                    alt="Domain Model Logo" 
                    className="h-20 object-contain rounded-lg shadow-md"
                  />
                </div>
                <h1 className="text-4xl font-bold text-slate-900">Generative Domain Modeler</h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Transform your business requirements into a comprehensive domain model using AI-powered analysis
                </p>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <DomainModelEditor 
                  modelDescription={modelDescription}
                  onModelDescriptionChange={setModelDescription}
                  onGenerateModel={() => handleGenerateModel(modelDescription)}
                  dialogOpen={dialogOpen}
                  setDialogOpen={setDialogOpen}
                  selectedEntity={selectedEntity}
                  onSaveEntity={handleSaveEntity}
                />

                <AISuggestions />

                {/* Flow Diagram */}
                {nodes.length > 0 && (
                  <Card className="lg:col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Domain Model Diagram</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsDetached(true)}
                        className="h-8 w-8"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {!isDetached && <FlowDiagram />}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Dialog open={isDetached} onOpenChange={setIsDetached}>
        <DialogContent className="max-w-[100vw] w-full h-[100vh] p-4" onInteractOutside={(e) => e.preventDefault()}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Domain Model Diagram</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDetached(false)}
              className="h-8 w-8"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 h-[calc(100vh-64px)]">
            <FlowDiagram />
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default Index;
