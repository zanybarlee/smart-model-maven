
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import DomainModelEditor from "@/components/DomainModelEditor";
import { useEffect, useState } from "react";
import { Entity } from "@/types/domain";
import ReactFlow, { 
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';
import EntityNode from "@/components/EntityNode";

const nodeTypes = {
  entity: EntityNode,
};

const Domain = () => {
  const [modelDescription, setModelDescription] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  const handleModelDescriptionChange = (value: string) => {
    setModelDescription(value);
  };

  const handleGenerateModel = () => {
    // Here you would integrate with an AI service to generate the model
    console.log('Generating model from:', modelDescription);
  };

  const handleSaveEntity = (entity: Entity) => {
    if (selectedEntity) {
      // Update existing node
      setNodes(nodes.map(node => 
        node.id === selectedEntity.id 
          ? {
              ...node,
              data: { 
                ...node.data,
                label: entity.name,
                attributes: entity.attributes,
              }
            }
          : node
      ));
    } else {
      // Add new node
      const position = {
        x: Math.random() * 500,
        y: Math.random() * 300
      };

      setNodes([
        ...nodes,
        {
          id: entity.id,
          type: 'entity',
          position,
          data: { 
            label: entity.name,
            attributes: entity.attributes,
            onEdit: (id: string) => {
              const node = nodes.find(n => n.id === id);
              if (node) {
                setSelectedEntity({
                  id: node.id,
                  name: node.data.label,
                  attributes: node.data.attributes
                });
                setDialogOpen(true);
              }
            },
            onDelete: (id: string) => {
              setNodes(nodes.filter(n => n.id !== id));
            },
            onDuplicate: (id: string) => {
              const node = nodes.find(n => n.id === id);
              if (node) {
                const newId = Date.now().toString();
                const newPosition = {
                  x: node.position.x + 50,
                  y: node.position.y + 50
                };

                setNodes([
                  ...nodes,
                  {
                    ...node,
                    id: newId,
                    position: newPosition,
                    data: {
                      ...node.data,
                      onEdit: node.data.onEdit,
                      onDelete: node.data.onDelete,
                      onDuplicate: node.data.onDuplicate
                    }
                  }
                ]);
              }
            }
          }
        }
      ]);
    }
    setSelectedEntity(null);
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
                onGenerateModel={handleGenerateModel}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                selectedEntity={selectedEntity}
                onSaveEntity={handleSaveEntity}
              />
              <div className="lg:col-span-2 bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  nodeTypes={nodeTypes}
                  fitView
                >
                  <Background />
                  <Controls />
                  <Panel position="top-right">
                    <div className="bg-white p-2 rounded shadow-sm text-xs text-slate-500">
                      Drag to pan, scroll to zoom
                    </div>
                  </Panel>
                </ReactFlow>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Domain;
