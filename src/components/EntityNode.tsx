
import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Edit2, Copy, Trash2, Save } from "lucide-react";
import { Input } from "@/components/ui/input";

interface EntityNodeProps {
  data: { 
    label: string; 
    attributes: string[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
    onSave?: (id: string, newData: { label: string; attributes: string[] }) => void;
  };
  id: string;
}

const EntityNode = ({ data, id }: EntityNodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempLabel, setTempLabel] = useState(data.label);
  const [tempAttribute, setTempAttribute] = useState('');
  const [tempAttributes, setTempAttributes] = useState(data.attributes);

  const handleSave = () => {
    if (data.onSave) {
      data.onSave(id, {
        label: tempLabel,
        attributes: tempAttributes
      });
    }
    setIsEditing(false);
  };

  const handleAddAttribute = () => {
    if (tempAttribute.trim()) {
      setTempAttributes([...tempAttributes, tempAttribute.trim()]);
      setTempAttribute('');
    }
  };

  const handleRemoveAttribute = (index: number) => {
    setTempAttributes(tempAttributes.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddAttribute();
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="!bg-primary" />
      <div className="flex justify-between items-center mb-2">
        {isEditing ? (
          <div className="flex-1 nodrag">
            <Input
              value={tempLabel}
              onChange={(e) => setTempLabel(e.target.value)}
              className="font-semibold text-primary"
              placeholder="Entity name"
            />
          </div>
        ) : (
          <div className="font-semibold text-primary">{data.label}</div>
        )}
        <div className="flex gap-2 nodrag">
          {isEditing ? (
            <button 
              onClick={handleSave}
              className="p-1 hover:bg-slate-100 rounded nodrag"
              title="Save"
            >
              <Save className="h-4 w-4 text-green-500" />
            </button>
          ) : (
            <>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  data.onDuplicate(id);
                }}
                className="p-1 hover:bg-slate-100 rounded nodrag"
                title="Duplicate"
              >
                <Copy className="h-4 w-4 text-slate-500" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="p-1 hover:bg-slate-100 rounded nodrag"
                title="Edit"
              >
                <Edit2 className="h-4 w-4 text-slate-500" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  data.onDelete(id);
                }}
                className="p-1 hover:bg-slate-100 rounded nodrag"
                title="Delete"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="text-sm text-slate-600">
        {isEditing ? (
          <div className="space-y-2 nodrag">
            <div className="flex gap-2">
              <Input
                value={tempAttribute}
                onChange={(e) => setTempAttribute(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add attribute"
                className="text-sm"
              />
              <button
                onClick={handleAddAttribute}
                className="px-2 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90"
              >
                Add
              </button>
            </div>
            {tempAttributes.map((attr, index) => (
              <div key={index} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-0">
                <span>{attr}</span>
                <button
                  onClick={() => handleRemoveAttribute(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          tempAttributes.map((attr, index) => (
            <div key={index} className="py-1 border-b border-slate-100 last:border-0">
              {attr}
            </div>
          ))
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-primary" />
    </div>
  );
};

export default EntityNode;
