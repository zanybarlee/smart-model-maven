
import React, { useState } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Edit2, CheckSquare, ArrowRight, Copy, Trash, Info, Save } from "lucide-react";
import { NodeData } from '../types/flow-types';
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

export const DataEngineeringNode = ({ data, id }: { data: NodeData; id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [tempInputs, setTempInputs] = useState({
    dataSource: data.config.inputs?.dataSource || '',
    connectionString: data.config.inputs?.connectionString || '',
    output: data.config.outputs?.output || ''
  });
  const { toast } = useToast();
  const { setNodes, getNode, getNodes, setEdges, getEdges } = useReactFlow();

  const handleSave = () => {
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
          className="bg-white p-4 rounded-lg shadow-lg relative min-w-[300px] border border-gray-200" 
        >
          <div className="absolute right-2 top-2 flex gap-2">
            {isEditing ? (
              <Save 
                className="h-4 w-4 text-green-500 hover:text-green-600 cursor-pointer nodrag" 
                onClick={handleSave}
              />
            ) : (
              <>
                <Edit2 
                  className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer nodrag"
                  onClick={() => setIsEditing(true)}
                />
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
              </>
            )}
          </div>

          <Handle
            type="target"
            position={Position.Left}
            className="w-2 h-2 !bg-blue-400 border-2 border-white"
            style={{ left: -5, top: '50%' }}
            isConnectableStart={false}
          />
          
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-slate-100 rounded">
              <div className="w-4 h-4">⚡</div>
            </div>
            <div className="font-medium text-slate-900">{data.label}</div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs font-medium text-slate-700 mb-2">Inputs</div>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Data Source</div>
                  <div className="nodrag">
                    <Input 
                      placeholder="Data Source"
                      className="h-8 text-sm bg-white border border-gray-200"
                      value={isEditing ? tempInputs.dataSource : data.config.inputs?.dataSource || ''}
                      onChange={(e) => setTempInputs({ ...tempInputs, dataSource: e.target.value })}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Connection String</div>
                  <div className="nodrag">
                    <Input 
                      placeholder="Connection String"
                      className="h-8 text-sm bg-white border border-gray-200"
                      value={isEditing ? tempInputs.connectionString : data.config.inputs?.connectionString || ''}
                      onChange={(e) => setTempInputs({ ...tempInputs, connectionString: e.target.value })}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-700 mb-2">Output</div>
              <div className="nodrag">
                <Select 
                  defaultValue={data.config.outputs?.output || ''} 
                  onValueChange={(value) => setTempInputs({ ...tempInputs, output: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="h-8 text-sm bg-white border border-gray-200">
                    <SelectValue placeholder="Select output" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="output1">Output 1</SelectItem>
                    <SelectItem value="output2">Output 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Handle
            type="source"
            position={Position.Right}
            className="w-2 h-2 !bg-blue-400 border-2 border-white"
            style={{ right: -5, top: '50%' }}
            isConnectableEnd={false}
          />

          <Dialog open={showInfo} onOpenChange={setShowInfo}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{data.label} Information</DialogTitle>
                <DialogDescription>
                  <div className="space-y-4 mt-4">
                    <div>
                      <h4 className="font-semibold mb-2">Node Type</h4>
                      <p className="text-sm text-slate-600">{data.type || 'Default'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Configuration</h4>
                      <div className="text-sm text-slate-600 space-y-2">
                        <p>Data Source: {data.config.inputs?.dataSource || 'Not set'}</p>
                        <p>Connection: {data.config.inputs?.connectionString || 'Not set'}</p>
                        <p>Output Type: {data.config.outputs?.output || 'Not set'}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Status</h4>
                      <p className="text-sm text-slate-600">{String(data.status) || 'Not started'}</p>
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
