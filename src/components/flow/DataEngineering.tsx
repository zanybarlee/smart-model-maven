
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
} from '@xyflow/react';
import { Button } from "@/components/ui/button";
import { Plus, Search, Play, Wand2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { DataEngineeringNode } from './nodes/DataEngineeringNode';
import { NodeConfigurationDialog } from './dialogs/NodeConfigurationDialog';
import { TextToFlowDialog } from './dialogs/TextToFlowDialog';
import { initialNodes, initialEdges, createNodeConfig } from './types/flow-types';
import { CustomNode } from './types/custom-types';
import '@xyflow/react/dist/style.css';

export const DataEngineering = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isTextToFlowOpen, setIsTextToFlowOpen] = useState(false);
  const [flowDescription, setFlowDescription] = useState('');
  const { toast } = useToast();

  const nodeTypes = {
    dataIngestion: DataEngineeringNode,
    dataCleaning: DataEngineeringNode,
    featureEngineering: DataEngineeringNode,
    default: DataEngineeringNode,
    input: DataEngineeringNode,
  };

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const handleAddNode = (type: string) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type: 'default',
      data: createNodeConfig(type as any, type),
      position: { x: Math.random() * 500, y: Math.random() * 300 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleNodeClick = (event: React.MouseEvent, node: CustomNode) => {
    setSelectedNode(node);
    setIsConfigOpen(true);
  };

  const updateNodeConfig = (config: Partial<CustomNode['data']['config']>) => {
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

  const filteredNodeTypes = Object.entries({
    dataIngestion: { data: createNodeConfig('dataIngestion', 'Data Ingestion') },
    dataCleaning: { data: createNodeConfig('dataCleaning', 'Data Cleaning') },
    featureEngineering: { data: createNodeConfig('featureEngineering', 'Feature Engineering') },
  }).filter(([key]) => key.toLowerCase().includes(searchQuery.toLowerCase()));

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
            nodeTypes={nodeTypes}
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
        <TextToFlowDialog
          isOpen={isTextToFlowOpen}
          onClose={() => setIsTextToFlowOpen(false)}
          flowDescription={flowDescription}
          onFlowDescriptionChange={(value) => setFlowDescription(value)}
          onGenerate={handleGenerateFromText}
        />
        <NodeConfigurationDialog
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
          selectedNode={selectedNode}
          onUpdateConfig={updateNodeConfig}
        />
      </CardContent>
    </Card>
  );
};
