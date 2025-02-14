
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
import { ValueStreamNode } from './nodes/ValueStreamNode';

const nodeTypes = {
  default: ValueStreamNode,
  input: ValueStreamNode,
  output: ValueStreamNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { 
      label: 'Ideation',
      config: {
        inputs: {
          duration: '1 week',
          resources: 'Product Team'
        },
        outputs: {
          deliverable: 'documentation'
        }
      },
      status: 'completed'
    },
    position: { x: 0, y: 100 },
  },
  {
    id: '2',
    type: 'default',
    data: { 
      label: 'Planning',
      config: {
        inputs: {
          duration: '2 weeks',
          resources: 'Development Team'
        },
        outputs: {
          deliverable: 'design'
        }
      },
      status: 'in-progress'
    },
    position: { x: 200, y: 100 },
  },
  {
    id: '3',
    type: 'default',
    data: { 
      label: 'Development',
      config: {
        inputs: {
          duration: '4 weeks',
          resources: 'Engineering Team'
        },
        outputs: {
          deliverable: 'code'
        }
      },
      status: 'pending'
    },
    position: { x: 400, y: 100 },
  },
  {
    id: '4',
    type: 'default',
    data: { 
      label: 'Testing',
      config: {
        inputs: {
          duration: '2 weeks',
          resources: 'QA Team'
        },
        outputs: {
          deliverable: 'test'
        }
      },
      status: 'pending'
    },
    position: { x: 600, y: 100 },
  },
  {
    id: '5',
    type: 'output',
    data: { 
      label: 'Deployment',
      config: {
        inputs: {
          duration: '1 week',
          resources: 'DevOps Team'
        },
        outputs: {
          deliverable: 'code'
        }
      },
      status: 'pending'
    },
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
          nodeTypes={nodeTypes}
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
