
import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Eye, Edit2, CheckSquare, ArrowRight, Copy, Trash, Info } from "lucide-react";
import { NodeData } from '../types/flow-types';
import { Handle, Position } from '@xyflow/react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const DataEngineeringNode = ({ data }: { data: NodeData }) => {
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
            <Copy className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer nodrag" />
            <Trash className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer nodrag" />
            <Info className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer nodrag" />
          </div>

          <Handle
            type="target"
            position={Position.Left}
            className="w-2 h-2 bg-blue-400 border-2 border-white !opacity-100"
            style={{ left: -5, top: '50%' }}
            isConnectableStart={false}
          />
          
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-slate-100 rounded">
              <div className="w-4 h-4">⚡</div>
            </div>
            <div className="font-medium">{data.label}</div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs font-medium mb-2">Inputs</div>
              <div className="space-y-2">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Work List</div>
                  <div className="nodrag">
                    <Input 
                      placeholder="Work List"
                      className="h-8 text-sm"
                      value={data.config.inputs?.workList || ''}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Variable Name *</div>
                  <div className="nodrag">
                    <Input 
                      placeholder="Variable Name"
                      className="h-8 text-sm"
                      value={data.config.inputs?.variableName || ''}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-medium mb-2">Output</div>
              <div className="nodrag">
                <Select defaultValue={data.config.outputs?.output || ''}>
                  <SelectTrigger className="h-8 text-sm">
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
            className="w-2 h-2 bg-blue-400 border-2 border-white !opacity-100"
            style={{ right: -5, top: '50%' }}
            isConnectableEnd={false}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </ContextMenuItem>
        <ContextMenuItem>
          <Edit2 className="mr-2 h-4 w-4" />
          Edit Node
        </ContextMenuItem>
        <ContextMenuItem>
          <CheckSquare className="mr-2 h-4 w-4" />
          Add Validation
        </ContextMenuItem>
        <ContextMenuItem>
          <ArrowRight className="mr-2 h-4 w-4" />
          Drill Down
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
