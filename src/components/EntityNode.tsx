
import React from 'react';
import { Handle, Position } from 'reactflow';
import { Pencil, Trash2 } from "lucide-react";

interface EntityNodeProps {
  data: { 
    label: string; 
    attributes: string[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
  };
  id: string;
}

const EntityNode = ({ data, id }: EntityNodeProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200 min-w-[200px] relative">
      <Handle type="target" position={Position.Top} className="!bg-primary" />
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-primary">{data.label}</div>
        <div className="flex gap-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              data.onEdit(id);
            }}
            className="p-1 hover:bg-slate-100 rounded"
          >
            <Pencil className="h-4 w-4 text-slate-500" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              data.onDelete(id);
            }}
            className="p-1 hover:bg-slate-100 rounded"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
        </div>
      </div>
      <div className="text-sm text-slate-600">
        {data.attributes.map((attr, index) => (
          <div key={index} className="py-1 border-b border-slate-100 last:border-0">
            {attr}
          </div>
        ))}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    </div>
  );
};

export default EntityNode;
