
import React from 'react';
import { Input } from "@/components/ui/input";

interface NodeInputsProps {
  isEditing: boolean;
  dataSource: string;
  connectionString: string;
  onInputChange: (field: string, value: string) => void;
}

export const NodeInputs = ({
  isEditing,
  dataSource,
  connectionString,
  onInputChange
}: NodeInputsProps) => {
  return (
    <div>
      <div className="text-xs font-medium text-slate-700 mb-1">Inputs</div>
      <div className="space-y-2">
        <div>
          <div className="text-[10px] text-slate-500 mb-0.5">Data Source</div>
          <div className="nodrag">
            <Input 
              placeholder="Data Source"
              className="h-6 text-xs bg-white border border-gray-200 px-2"
              value={dataSource}
              onChange={(e) => onInputChange('dataSource', e.target.value)}
              readOnly={!isEditing}
            />
          </div>
        </div>
        <div>
          <div className="text-[10px] text-slate-500 mb-0.5">Connection String</div>
          <div className="nodrag">
            <Input 
              placeholder="Connection String"
              className="h-6 text-xs bg-white border border-gray-200 px-2"
              value={connectionString}
              onChange={(e) => onInputChange('connectionString', e.target.value)}
              readOnly={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
