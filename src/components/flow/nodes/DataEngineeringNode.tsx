
import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Eye, Edit2, CheckSquare, ArrowRight } from "lucide-react";
import { NodeData } from '../types/flow-types';
import { Handle, Position } from '@xyflow/react';

export const DataEngineeringNode = ({ data }: { data: NodeData }) => {
  return (
    <div className="nodrag">
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200 relative">
            <Handle
              type="target"
              position={Position.Left}
              className="w-3 h-3 bg-slate-300 border-2 border-white !opacity-100"
              style={{ left: -6 }}
              isConnectableStart={false}
            />
            
            <div className="font-medium">{data.label}</div>
            <div className="text-sm text-slate-500">Status: {data.status}</div>
            
            <Handle
              type="source"
              position={Position.Right}
              className="w-3 h-3 bg-slate-300 border-2 border-white !opacity-100"
              style={{ right: -6 }}
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
    </div>
  );
};
