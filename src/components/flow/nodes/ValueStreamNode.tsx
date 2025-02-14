
import React, { useState } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Edit2, CheckSquare, Copy, Trash, Info, Save } from "lucide-react";
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ValueStreamNodeData {
  label: string;
  config?: {
    inputs?: {
      duration: string;
      resources: string;
    };
    outputs?: {
      deliverable: string;
    };
  };
  status?: string;
}

export const ValueStreamNode = ({ data, id }: { data: ValueStreamNodeData; id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [tempInputs, setTempInputs] = useState({
    duration: data.config?.inputs?.duration || '',
    resources: data.config?.inputs?.resources || '',
    deliverable: data.config?.outputs?.deliverable || ''
  });
  const { toast } = useToast();
  const { setNodes, getNode, getNodes, setEdges, getEdges } = useReactFlow();

  const handleSave = () => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              config: {
                inputs: {
                  duration: tempInputs.duration,
                  resources: tempInputs.resources,
                },
                outputs: {
                  deliverable: tempInputs.deliverable,
                },
              },
            },
          };
        }
        return node;
      })
    );
    setIsEditing(false);
    toast({
      title: "Changes saved",
      description: "Node configuration has been updated.",
    });
  };

  const handleDuplicate = () => {
    const node = getNode(id);
    if (node) {
      const position = {
        x: node.position.x + 50,
        y: node.position.y + 50,
      };

      const newNode = {
        ...node,
        id: `${node.type}-${Date.now()}`,
        position,
        data: {
          ...node.data,
          label: `${node.data.label} (Copy)`,
        },
      };

      setNodes(getNodes().concat(newNode));
      toast({
        title: "Node duplicated",
        description: "A copy of the node has been created.",
      });
    }
  };

  const handleDelete = () => {
    setNodes(getNodes().filter(node => node.id !== id));
    setEdges(getEdges().filter(edge => edge.source !== id && edge.target !== id));
    toast({
      title: "Node deleted",
      description: "The node has been removed from the flow.",
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div 
          className="bg-white p-4 rounded-lg shadow-lg relative min-w-[300px]" 
          style={{ 
            border: '1px solid #fff',
            outline: 'none',
            ['--xy-node-border-default' as string]: '#fff',
            ['--xy-node-border-selected' as string]: '#fff',
            ['--xy-node-border-hover' as string]: '#fff'
          } as React.CSSProperties}
        >
          <div className="absolute right-2 top-2 flex gap-2">
            {isEditing ? (
              <Save 
                className="h-4 w-4 text-green-500 hover:text-green-600 cursor-pointer nodrag" 
                onClick={handleSave}
              />
            ) : (
              <Edit2 
                className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer nodrag"
                onClick={() => setIsEditing(true)}
              />
            )}
            <Copy 
              className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer nodrag" 
              onClick={handleDuplicate}
            />
            <Trash 
              className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer nodrag" 
              onClick={handleDelete}
            />
            <Info 
              className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer nodrag" 
              onClick={() => setShowInfo(true)}
            />
          </div>

          <Handle
            type="target"
            position={Position.Left}
            className="w-2 h-2 bg-blue-400 border-2 border-white !opacity-100"
            style={{ left: -5, top: '50%' }}
          />
          
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-slate-100 rounded">
              <div className="w-4 h-4">⚡</div>
            </div>
            <div className="font-medium">{data.label}</div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs font-medium mb-2">Process Details</div>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Duration</div>
                  <div className="nodrag">
                    <Input 
                      placeholder="Duration (e.g., 2 days)"
                      className="h-8 text-sm"
                      value={isEditing ? tempInputs.duration : data.config?.inputs?.duration || ''}
                      onChange={(e) => setTempInputs({ ...tempInputs, duration: e.target.value })}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Resources</div>
                  <div className="nodrag">
                    <Input 
                      placeholder="Required resources"
                      className="h-8 text-sm"
                      value={isEditing ? tempInputs.resources : data.config?.inputs?.resources || ''}
                      onChange={(e) => setTempInputs({ ...tempInputs, resources: e.target.value })}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-medium mb-2">Deliverable</div>
              <div className="nodrag">
                <Select 
                  defaultValue={data.config?.outputs?.deliverable || ''} 
                  onValueChange={(value) => setTempInputs({ ...tempInputs, deliverable: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select deliverable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="documentation">Documentation</SelectItem>
                    <SelectItem value="code">Code</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="test">Test Results</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Handle
            type="source"
            position={Position.Right}
            className="w-2 h-2 bg-blue-400 border-2 border-white !opacity-100"
            style={{ right: -5, top: '50%' }}
          />

          <Dialog open={showInfo} onOpenChange={setShowInfo}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{data.label} Information</DialogTitle>
                <DialogDescription>
                  <div className="space-y-4 mt-4">
                    <div>
                      <h4 className="font-semibold mb-2">Process Stage</h4>
                      <p className="text-sm text-slate-600">{data.label}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Configuration</h4>
                      <div className="text-sm text-slate-600 space-y-2">
                        <p>Duration: {data.config?.inputs?.duration || 'Not set'}</p>
                        <p>Resources: {data.config?.inputs?.resources || 'Not set'}</p>
                        <p>Deliverable: {data.config?.outputs?.deliverable || 'Not set'}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Status</h4>
                      <p className="text-sm text-slate-600">{data.status || 'Not started'}</p>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleDuplicate}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate Node
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete}>
          <Trash className="mr-2 h-4 w-4" />
          Delete Node
        </ContextMenuItem>
        <ContextMenuItem onClick={() => setShowInfo(true)}>
          <Info className="mr-2 h-4 w-4" />
          View Details
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
