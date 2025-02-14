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

  const handleNodeConfigUpdate = (nodeId: string, config: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              config,
              status: 'configured'
            }
          };
        }
        return node;
      })
    );
    
    toast({
      title: "Node configured",
      description: "Node has been configured successfully."
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
    const newNodes = [] as CustomNode[];
    const newEdges: any[] = [];
    let positionX = 100;

    if (words.includes('csv') || words.includes('data') || words.includes('import')) {
      newNodes.push({
        id: `dataingestion-${Date.now()}`,
        type: 'input',
        data: createNodeConfig('dataIngestion', 'Data Ingestion'),
        position: { x: positionX, y: 100 },
      } as CustomNode);
      positionX += 200;
    }

    if (words.includes('clean') || words.includes('validate') || words.includes('process')) {
      const nodeId = `datacleaning-${Date.now()}`;
      newNodes.push({
        id: nodeId,
        type: 'default',
        data: createNodeConfig('dataCleaning', 'Data Cleaning'),
        position: { x: positionX, y: 100 },
      } as CustomNode);
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
      } as CustomNode);
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

  return (
    <div className="h-full">
      <div className="flex h-[800px]">
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
              onRunPipeline={runPipeline}
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
    </div>
  );
};
