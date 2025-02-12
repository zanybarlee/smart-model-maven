
import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Background, 
  Controls,
  Node,
  Edge,
  Connection,
  addEdge,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Entity {
  id: string;
  name: string;
  attributes: string[];
}

// Custom Node Component
const EntityNode = ({ data }: { data: { label: string; attributes: string[] } }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="!bg-primary" />
      <div className="font-semibold text-primary mb-2">{data.label}</div>
      <div className="text-sm text-slate-600">
        {data.attributes.map((attr, index) => (
          <div key={index} className="py-1 border-b border-slate-100 last:border-0">
            {attr}
          </div>
        ))}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    </div>
  );
};

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
      data: { label: entity.name, attributes: entity.attributes }
    }));

    setNodes(flowNodes);
    toast({
      title: "Model Generated",
      description: "Your domain model has been generated successfully.",
    });
  };

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onNodeDragStop = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Node dragged:', node);
  }, []);

  // Add/Edit Entity Dialog
  const EntityDialog = () => {
    const [name, setName] = useState(selectedEntity?.name || '');
    const [attribute, setAttribute] = useState('');
    const [attributes, setAttributes] = useState<string[]>(selectedEntity?.attributes || []);

    const handleSave = () => {
      const newEntity: Entity = {
        id: selectedEntity?.id || Date.now().toString(),
        name,
        attributes
      };

      if (selectedEntity) {
        setEntities(entities.map(e => e.id === selectedEntity.id ? newEntity : e));
        setNodes(nodes.map(node => 
          node.id === selectedEntity.id 
            ? { ...node, data: { label: name, attributes } }
            : node
        ));
      } else {
        setEntities([...entities, newEntity]);
        setNodes([...nodes, {
          id: newEntity.id,
          type: 'entity',
          position: { x: Math.random() * 500, y: Math.random() * 300 },
          data: { label: name, attributes }
        }]);
      }

      setSelectedEntity(null);
    };

    const addAttribute = () => {
      if (attribute.trim()) {
        setAttributes([...attributes, attribute]);
        setAttribute('');
      }
    };

    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedEntity ? 'Edit Entity' : 'Add New Entity'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Entity Name</label>
            <Input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter entity name"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Add Attribute</label>
            <div className="flex gap-2">
              <Input 
                value={attribute}
                onChange={(e) => setAttribute(e.target.value)}
                placeholder="Enter attribute name"
              />
              <Button onClick={addAttribute}>Add</Button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Attributes</label>
            <div className="space-y-2">
              {attributes.map((attr, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-50 p-2 rounded">
                  <span>{attr}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAttributes(attributes.filter((_, i) => i !== index))}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <Button className="w-full" onClick={handleSave}>
            {selectedEntity ? 'Update Entity' : 'Create Entity'}
          </Button>
        </div>
      </DialogContent>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">AI Domain Model Generator</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Transform your business requirements into a comprehensive domain model using AI-powered analysis
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Describe Your Domain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea
                  value={modelDescription}
                  onChange={(e) => setModelDescription(e.target.value)}
                  className="w-full h-40 p-4 border rounded-md bg-white/80 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe your business domain in natural language... 
                  For example: I need a system to manage an online bookstore with customers, orders, and books."
                />
                <div className="flex gap-4">
                  <Button 
                    onClick={handleGenerateModel}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Generate Domain Model
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Add Entity</Button>
                    </DialogTrigger>
                    <EntityDialog />
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

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
