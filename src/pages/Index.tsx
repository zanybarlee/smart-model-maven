
import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Background, 
  Controls,
  Node,
  Edge,
  Connection,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import EntityNode from '@/components/EntityNode';
import DomainModelEditor from '@/components/DomainModelEditor';
import { Entity } from '@/types/domain';

const nodeTypes = {
  entity: EntityNode,
};

const Index = () => {
  const [modelDescription, setModelDescription] = useState('');
  const [entities, setEntities] = useState<Entity[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDuplicateEntity = (id: string) => {
    const entityToDuplicate = entities.find(e => e.id === id);
    if (entityToDuplicate) {
      const newEntity: Entity = {
        id: Date.now().toString(),
        name: `${entityToDuplicate.name} (Copy)`,
        attributes: [...entityToDuplicate.attributes]
      };

      setEntities([...entities, newEntity]);

      // Find the position of the original node
      const originalNode = nodes.find(node => node.id === id);
      const offset = 50; // Offset for the new node position

      setNodes([...nodes, {
        id: newEntity.id,
        type: 'entity',
        position: { 
          x: (originalNode?.position.x || 0) + offset, 
          y: (originalNode?.position.y || 0) + offset 
        },
        data: { 
          label: newEntity.name, 
          attributes: newEntity.attributes,
          onEdit: handleEditEntity,
          onDelete: handleDeleteEntity,
          onDuplicate: handleDuplicateEntity,
        },
        draggable: true
      }]);

      toast({
        title: "Entity Duplicated",
        description: "A copy of the entity has been created.",
      });
    }
  };

  const handleEditEntity = (id: string) => {
    const entity = entities.find(e => e.id === id);
    if (entity) {
      setSelectedEntity(entity);
      setDialogOpen(true);
    }
  };

  const handleDeleteEntity = (id: string) => {
    setEntities(entities.filter(e => e.id !== id));
    setNodes(nodes.filter(node => node.id !== id));
    setEdges(edges.filter(edge => edge.source !== id && edge.target !== id));
    toast({
      title: "Entity Deleted",
      description: "The entity has been removed from the model.",
    });
  };

  const handleGenerateModel = () => {
    if (!modelDescription.trim()) {
      toast({
        title: "Description Required",
        description: "Please enter a description of your domain model.",
        variant: "destructive",
      });
      return;
    }

    // Mock entities generation
    const mockEntities: Entity[] = [
      {
        id: '1',
        name: 'Customer',
        attributes: ['id', 'name', 'email', 'phoneNumber']
      },
      {
        id: '2',
        name: 'Order',
        attributes: ['id', 'orderDate', 'totalAmount', 'status']
      }
    ];

    setEntities(mockEntities);

    // Convert entities to flow nodes
    const flowNodes = mockEntities.map((entity, index) => ({
      id: entity.id,
      type: 'entity',
      position: { x: 250 * index, y: 100 },
      data: { 
        label: entity.name, 
        attributes: entity.attributes,
        onEdit: handleEditEntity,
        onDelete: handleDeleteEntity,
        onDuplicate: handleDuplicateEntity, // Added this line
      },
      draggable: true
    }));

    setNodes(flowNodes);
    toast({
      title: "Model Generated",
      description: "Your domain model has been generated successfully.",
    });
  };

  const handleSaveEntity = (entity: Entity) => {
    if (selectedEntity) {
      setEntities(entities.map(e => e.id === selectedEntity.id ? entity : e));
      setNodes(nodes.map(node => 
        node.id === selectedEntity.id 
          ? { 
              ...node, 
              data: { 
                label: entity.name, 
                attributes: entity.attributes,
                onEdit: handleEditEntity,
                onDelete: handleDeleteEntity,
                onDuplicate: handleDuplicateEntity,
              },
              draggable: true
            }
          : node
      ));
    } else {
      setEntities([...entities, entity]);
      setNodes([...nodes, {
        id: entity.id,
        type: 'entity',
        position: { x: Math.random() * 500, y: Math.random() * 300 },
        data: { 
          label: entity.name, 
          attributes: entity.attributes,
          onEdit: handleEditEntity,
          onDelete: handleDeleteEntity,
          onDuplicate: handleDuplicateEntity,
        },
        draggable: true
      }]);
    }

    setSelectedEntity(null);
    setDialogOpen(false);
  };

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onNodeDragStop = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Node dragged:', node);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/23e76822-ab3b-4e04-a807-dd20a35ff95c.png" 
              alt="CENS Logo" 
              className="h-20 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-slate-900">CENS Generative Domain Model</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Transform your business requirements into a comprehensive domain model using AI-powered analysis
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DomainModelEditor 
            modelDescription={modelDescription}
            onModelDescriptionChange={setModelDescription}
            onGenerateModel={handleGenerateModel}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            selectedEntity={selectedEntity}
            onSaveEntity={handleSaveEntity}
          />

          {/* Suggestions Panel */}
          <Card>
            <CardHeader>
              <CardTitle>AI Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-slate-600">
                <p>• Add validation rules for email addresses</p>
                <p>• Consider adding timestamps for auditing</p>
                <p>• Include soft delete functionality</p>
              </div>
            </CardContent>
          </Card>

          {/* Flow Diagram */}
          {nodes.length > 0 && (
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Domain Model Diagram</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ height: '500px' }}>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onConnect={onConnect}
                    onNodeDragStop={onNodeDragStop}
                    nodeTypes={nodeTypes}
                    fitView
                  >
                    <Background />
                    <Controls />
                  </ReactFlow>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
