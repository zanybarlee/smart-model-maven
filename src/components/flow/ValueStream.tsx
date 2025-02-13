
import React, { useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Ideation' },
    position: { x: 0, y: 100 },
  },
  {
    id: '2',
    data: { label: 'Planning' },
    position: { x: 200, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Development' },
    position: { x: 400, y: 100 },
  },
  {
    id: '4',
    data: { label: 'Testing' },
    position: { x: 600, y: 100 },
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'Deployment' },
    position: { x: 800, y: 100 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
];

export const ValueStream = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Value Stream Map</CardTitle>
        <CardDescription>
          Visualize and optimize your end-to-end delivery process
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[600px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </CardContent>
    </Card>
  );
};
