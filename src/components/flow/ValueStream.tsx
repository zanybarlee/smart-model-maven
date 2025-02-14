
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
} from '@xyflow/react';
import { ValueStreamNode } from './nodes/ValueStreamNode';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [isDetached, setIsDetached] = useState(false);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const FlowContent = () => (
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
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Value Stream Map</CardTitle>
            <CardDescription>
              Visualize and optimize your end-to-end delivery process
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
        <CardContent className="h-[600px]">
          {!isDetached && <FlowContent />}
        </CardContent>
      </Card>

      <Dialog open={isDetached} onOpenChange={setIsDetached}>
        <DialogContent className="max-w-[100vw] w-full h-[100vh] p-4" onInteractOutside={(e) => e.preventDefault()}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Value Stream Map</h2>
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
            <FlowContent />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
