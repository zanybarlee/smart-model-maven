
import React from 'react';
import { Edit2, Save, Copy, Trash, Info } from "lucide-react";

interface NodeHeaderProps {
  label: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onInfo: () => void;
}

export const NodeHeader = ({
  label,
  isEditing,
  onEdit,
  onSave,
  onDuplicate,
  onDelete,
  onInfo
}: NodeHeaderProps) => {
  return (
    <>
      <div className="absolute right-1 top-1 flex gap-1">
        {isEditing ? (
          <Save 
            className="h-3 w-3 text-green-500 hover:text-green-600 cursor-pointer nodrag" 
            onClick={onSave}
          />
        ) : (
          <>
            <Edit2 
              className="h-3 w-3 text-slate-400 hover:text-slate-600 cursor-pointer nodrag"
              onClick={onEdit}
            />
            <Copy 
              className="h-3 w-3 text-slate-400 hover:text-slate-600 cursor-pointer nodrag" 
              onClick={onDuplicate}
            />
            <Trash 
              className="h-3 w-3 text-slate-400 hover:text-slate-600 cursor-pointer nodrag" 
              onClick={onDelete}
            />
            <Info 
              className="h-3 w-3 text-slate-400 hover:text-slate-600 cursor-pointer nodrag" 
              onClick={onInfo}
            />
          </>
        )}
      </div>
      
      <div className="flex items-center gap-1.5 mb-2">
        <div className="p-1 bg-slate-100 rounded">
          <div className="w-3 h-3">⚡</div>
        </div>
        <div className="font-medium text-xs text-slate-900">{label}</div>
      </div>
    </>
  );
};
