import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Maximize2, Minimize2 } from "lucide-react";
import { DataEngineeringNode } from './nodes/DataEngineeringNode';
import { TextToFlowDialog } from './dialogs/TextToFlowDialog';
import { initialNodes, initialEdges, createNodeConfig } from './types/flow-types';
import { FlowSidebar } from './components/FlowSidebar';
import { FlowToolbar } from './components/FlowToolbar';
import '@xyflow/react/dist/style.css';

export const DataEngineering = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTextToFlowOpen, setIsTextToFlowOpen] = useState(false);
  const [flowDescription, setFlowDescription] = useState('');
  const [isDetached, setIsDetached] = useState(false);
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
      type: 'default' as const,
      data: createNodeConfig(type as any, type),
      position: { x: Math.random() * 500, y: Math.random() * 300 },
    };
    setNodes((nds) => [...nds, newNode]);
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
    const newNodes = [];
    const newEdges = [];
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

    setNodes(newNodes as any);
    setEdges(newEdges);
    setIsTextToFlowOpen(false);
    
    toast({
      title: "Flow generated",
      description: "Your data flow has been generated based on the description.",
    });
  };

  const DataEngineeringContent = () => (
    <div className="flex h-full">
      <FlowSidebar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddNode={handleAddNode}
      />
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background />
          <FlowToolbar
            onOpenTextToFlow={() => setIsTextToFlowOpen(true)}
            onRunPipeline={() => {}}
          />
        </ReactFlow>
      </div>
      <TextToFlowDialog
        isOpen={isTextToFlowOpen}
        onClose={() => setIsTextToFlowOpen(false)}
        flowDescription={flowDescription}
        onFlowDescriptionChange={(value) => setFlowDescription(value)}
        onGenerate={handleGenerateFromText}
      />
    </div>
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Dataflow Designer</CardTitle>
            <CardDescription>
              Design and manage your data engineering workflows
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDetached(true)}
            className="h-8 w-8"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="h-[800px] p-0">
          {!isDetached && <DataEngineeringContent />}
        </CardContent>
      </Card>

      <Dialog open={isDetached} onOpenChange={setIsDetached}>
        <DialogContent className="max-w-[100vw] w-full h-[100vh] p-4" onInteractOutside={(e) => e.preventDefault()}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Dataflow Designer</h2>
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
            <DataEngineeringContent />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
