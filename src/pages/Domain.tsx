
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import DomainModelEditor from "@/components/DomainModelEditor";
import { useEffect, useState } from "react";
import { Entity } from "@/types/domain";
import { ReactFlow, 
  Controls,
  Background,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import EntityNode from "@/components/EntityNode";
import DomainFlowDiagram from "@/components/DomainFlowDiagram";
import { useDomainFlow } from "@/hooks/useDomainFlow";

const Domain = () => {
  const [modelDescription, setModelDescription] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    nodes,
    edges,
    selectedEntity,
    handleSaveEntity,
    handleGenerateModel,
    onConnect,
    onNodeDragStop
  } = useDomainFlow();

  const handleModelDescriptionChange = (value: string) => {
    setModelDescription(value);
  };

  const handleSaveEntityWrapper = (entity: Entity) => {
    handleSaveEntity(entity);
    setDialogOpen(false);
  };

  return (
    <SidebarProvider>
      <div className="grid lg:grid-cols-[280px_1fr] h-screen">
        <AppSidebar />
        <main className="p-6">
          <div className="h-full flex flex-col gap-6">
            <div className="flex-none">
              <h1 className="text-3xl font-bold mb-4">Domain Modeler</h1>
              <p className="text-gray-600">
                Design your domain model using AI assistance
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 flex-1">
              <DomainModelEditor
                modelDescription={modelDescription}
                onModelDescriptionChange={handleModelDescriptionChange}
                onGenerateModel={() => handleGenerateModel(modelDescription)}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                selectedEntity={selectedEntity}
                onSaveEntity={handleSaveEntityWrapper}
              />
              <div className="lg:col-span-2 h-[600px]">
                <DomainFlowDiagram
                  nodes={nodes}
                  edges={edges}
                  onConnect={onConnect}
                  onNodeDragStop={onNodeDragStop}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Domain;
