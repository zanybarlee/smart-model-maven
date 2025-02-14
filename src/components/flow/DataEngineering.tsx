import React, { useCallback, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  Node,
  NodeProps,
} from '@xyflow/react';
import { Button } from "@/components/ui/button";
import { Plus, Search, Play, Wand2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import '@xyflow/react/dist/style.css';

type NodeType = 'dataIngestion' | 'dataCleaning' | 'featureEngineering';

interface NodeData {
  [key: string]: unknown;  // Add index signature to satisfy Record<string, unknown>
  label: string;
  type: NodeType;
  config: {
    source?: string;
    connectionString?: string;
    cleaningRules?: string[];
    features?: string[];
    transformations?: string[];
  };
  status: 'configured' | 'pending' | 'running' | 'completed' | 'error';
}

type CustomNode = Node<NodeData>;

const createNodeConfig = (type: NodeType, label: string): NodeData => ({
  label,
  type,
  config: {},
  status: 'pending'
});

const nodeTypes = {
  dataIngestion: { 
    type: 'input', 
    data: createNodeConfig('dataIngestion', 'Data Ingestion')
  },
  dataCleaning: { 
    type: 'default', 
    data: createNodeConfig('dataCleaning', 'Data Cleaning')
  },
  featureEngineering: { 
    type: 'default', 
    data: createNodeConfig('featureEngineering', 'Feature Engineering')
  }
};

const initialNodes: CustomNode[] = [
  {
    id: 'dataingestion-1',
    type: 'input',
    data: createNodeConfig('dataIngestion', 'Data Ingestion'),
    position: { x: 100, y: 100 },
  }
];

const initialEdges = [];

export const DataEngineering = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isTextToFlowOpen, setIsTextToFlowOpen] = useState(false);
  const [flowDescription, setFlowDescription] = useState('');
  const { toast } = useToast();

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const handleAddNode = (type: string) => {
    const nodeConfig = nodeTypes[type as keyof typeof nodeTypes];
    const newNode: CustomNode = {
      id: `${type}-${Date.now()}`,
      type: nodeConfig.type,
      data: nodeConfig.data,
      position: { x: Math.random() * 500, y: Math.random() * 300 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as CustomNode);
    setIsConfigOpen(true);
  };

  const updateNodeConfig = (config: Partial<NodeData['config']>) => {
    if (!selectedNode) return;
    
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              config: { ...node.data.config, ...config },
              status: 'configured'
            }
          };
        }
        return node;
      })
    );
    setIsConfigOpen(false);
    toast({
      title: "Node configured",
      description: `${selectedNode.data.label} has been configured successfully.`
    });
  };

  const runPipeline = () => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, status: 'running' }
      }))
    );

    // Simulate pipeline execution
    setTimeout(() => {
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          data: { ...node.data, status: 'completed' }
        }))
      );
      toast({
        title: "Pipeline completed",
        description: "All nodes have been processed successfully."
      });
    }, 2000);
  };

  const handleGenerateFromText = () => {
    if (!flowDescription.trim()) {
      toast({
        title: "Description required",
        description: "Please enter a description of your data flow.",
        variant: "destructive"
      });
      return;
    }

    // Example: Generate a simple flow based on keywords
    const words = flowDescription.toLowerCase();
    const newNodes: CustomNode[] = [];
    const newEdges: any[] = [];
    let positionX = 100;

    if (words.includes('csv') || words.includes('data') || words.includes('import')) {
      newNodes.push({
        id: `dataingestion-${Date.now()}`,
        type: 'input',
        data: createNodeConfig('dataIngestion', 'Data Ingestion'),
        position: { x: positionX, y: 100 },
      });
      positionX += 200;
    }

    if (words.includes('clean') || words.includes('validate') || words.includes('process')) {
      const nodeId = `datacleaning-${Date.now()}`;
      newNodes.push({
        id: nodeId,
        type: 'default',
        data: createNodeConfig('dataCleaning', 'Data Cleaning'),
        position: { x: positionX, y: 100 },
      });
      if (newNodes.length > 1) {
        newEdges.push({
          id: `e${newNodes[newNodes.length - 2].id}-${nodeId}`,
          source: newNodes[newNodes.length - 2].id,
          target: nodeId,
        });
      }
      positionX += 200;
    }

    if (words.includes('feature') || words.includes('transform') || words.includes('engineer')) {
      const nodeId = `featureengineering-${Date.now()}`;
      newNodes.push({
        id: nodeId,
        type: 'default',
        data: createNodeConfig('featureEngineering', 'Feature Engineering'),
        position: { x: positionX, y: 100 },
      });
      if (newNodes.length > 1) {
        newEdges.push({
          id: `e${newNodes[newNodes.length - 2].id}-${nodeId}`,
          source: newNodes[newNodes.length - 2].id,
          target: nodeId,
        });
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
    setIsTextToFlowOpen(false);
    
    toast({
      title: "Flow generated",
      description: "Your data flow has been generated based on the description.",
    });
  };

  const NodeConfigurationDialog = () => {
    if (!selectedNode) return null;

    const renderConfig = () => {
      switch (selectedNode.data.type) {
        case 'dataIngestion':
          return (
            <div className="space-y-4">
              <div>
                <Label>Data Source</Label>
                <Select onValueChange={(value) => updateNodeConfig({ source: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="s3">S3 Bucket</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="api">REST API</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Connection String</Label>
                <Input placeholder="Enter connection string or URL" />
              </div>
            </div>
          );
        case 'dataCleaning':
          return (
            <div className="space-y-4">
              <div>
                <Label>Cleaning Rules</Label>
                <Select onValueChange={(value) => updateNodeConfig({ cleaningRules: [value] })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cleaning rules" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="removeDuplicates">Remove Duplicates</SelectItem>
                    <SelectItem value="handleMissing">Handle Missing Values</SelectItem>
                    <SelectItem value="normalize">Normalize Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        case 'featureEngineering':
          return (
            <div className="space-y-4">
              <div>
                <Label>Feature Transformations</Label>
                <Select onValueChange={(value) => updateNodeConfig({ transformations: [value] })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transformations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scaling">Feature Scaling</SelectItem>
                    <SelectItem value="encoding">Label Encoding</SelectItem>
                    <SelectItem value="pca">PCA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <Dialog open={isConfigOpen} onOpenChange={setIsConfigOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedNode.data.label} Configuration</DialogTitle>
          </DialogHeader>
          {renderConfig()}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsConfigOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => updateNodeConfig({})}>
              Save Configuration
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const TextToFlowDialog = () => (
    <Dialog open={isTextToFlowOpen} onOpenChange={setIsTextToFlowOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Data Flow</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Describe your data flow (e.g., 'Import CSV data, clean it, and engineer features for machine learning')"
              value={flowDescription}
              onChange={(e) => setFlowDescription(e.target.value)}
              className="h-32"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsTextToFlowOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerateFromText}>
              Generate Flow
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const filteredNodeTypes = Object.entries(nodeTypes).filter(([key]) =>
    key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="h-[800px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Data Engineering Flow</CardTitle>
            <CardDescription>
              Design your data engineering pipeline using drag-and-drop components
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setIsTextToFlowOpen(true)}
              className="flex items-center gap-2"
            >
              <Wand2 className="h-4 w-4" />
              Generate from Text
            </Button>
            <Button onClick={runPipeline} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Run Pipeline
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex h-[calc(100%-85px)]">
        <div className="w-64 border-r pr-4 overflow-auto">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="space-y-2">
              {filteredNodeTypes.map(([key, value]) => (
                <Button
                  key={key}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAddNode(key)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {value.data.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background />
            <Panel position="top-right">
              <div className="bg-white p-2 rounded shadow-sm text-xs text-slate-500">
                Drag to pan, scroll to zoom
              </div>
            </Panel>
          </ReactFlow>
        </div>
        <TextToFlowDialog />
        <NodeConfigurationDialog />
      </CardContent>
    </Card>
  );
};
