
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
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  dataCollection: { type: 'input', data: { label: 'Data Collection' } },
  dataCleaning: { type: 'default', data: { label: 'Data Cleaning' } },
  dataLabeling: { type: 'default', data: { label: 'Data Labeling' } },
  featureEngineering: { type: 'default', data: { label: 'Feature Engineering' } },
  toolAgent: { type: 'output', data: { label: 'Tool Agent' } },
};

const initialNodes = [
  {
    id: 'datacollection',
    type: 'input',
    data: { 
      label: 'Data Collection',
      inputs: {
        workList: '',
        variableName: '',
      },
      outputs: ['output1']
    },
    position: { x: 100, y: 100 },
    className: 'light',
  },
  {
    id: 'datalabeling',
    type: 'default',
    data: { 
      label: 'Data Labeling',
      inputs: {
        workList: '',
        variableName: '',
      },
      outputs: ['output1']
    },
    position: { x: 400, y: 100 },
  },
  {
    id: 'featureengineering',
    type: 'default',
    data: { 
      label: 'Feature Engineering',
      inputs: {
        workList: '',
        variableName: '',
      },
      outputs: ['output1']
    },
    position: { x: 700, y: 100 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: 'datacollection', target: 'datalabeling', animated: true },
  { id: 'e2-3', source: 'datalabeling', target: 'featureengineering', animated: true },
];

export const DataEngineering = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [searchQuery, setSearchQuery] = useState('');

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const handleAddNode = (type: string) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type: 'default',
      data: { label: type },
      position: { x: Math.random() * 500, y: Math.random() * 300 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const filteredNodeTypes = Object.entries(nodeTypes).filter(([key]) =>
    key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="h-[800px]">
      <CardHeader>
        <CardTitle>Data Engineering Flow</CardTitle>
        <CardDescription>
          Design your data engineering pipeline using drag-and-drop components
        </CardDescription>
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
      </CardContent>
    </Card>
  );
};
