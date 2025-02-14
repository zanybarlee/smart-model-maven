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
import { Plus, Search, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
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
          <Button onClick={runPipeline} className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            Run Pipeline
          </Button>
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
        <NodeConfigurationDialog />
      </CardContent>
    </Card>
  );
};
