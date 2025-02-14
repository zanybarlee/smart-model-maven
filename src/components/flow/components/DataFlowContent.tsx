
import React from 'react';
import { ReactFlow, MiniMap, Controls, Background } from '@xyflow/react';
import { FlowSidebar } from './FlowSidebar';
import { FlowToolbar } from './FlowToolbar';
import { TextToFlowDialog } from '../dialogs/TextToFlowDialog';

interface DataFlowContentProps {
  nodes: any[];
  edges: any[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: any) => void;
  nodeTypes: Record<string, React.ComponentType<any>>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddNode: (type: string) => void;
  isTextToFlowOpen: boolean;
  setIsTextToFlowOpen: (isOpen: boolean) => void;
  flowDescription: string;
  onFlowDescriptionChange: (value: string) => void;
  onGenerateFromText: () => void;
}

export const DataFlowContent = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  nodeTypes,
  searchQuery,
  onSearchChange,
  onAddNode,
  isTextToFlowOpen,
  setIsTextToFlowOpen,
  flowDescription,
  onFlowDescriptionChange,
  onGenerateFromText,
}: DataFlowContentProps) => {
  return (
    <div className="flex h-full">
      <FlowSidebar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onAddNode={onAddNode}
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
        onFlowDescriptionChange={onFlowDescriptionChange}
        onGenerate={onGenerateFromText}
      />
    </div>
  );
};
