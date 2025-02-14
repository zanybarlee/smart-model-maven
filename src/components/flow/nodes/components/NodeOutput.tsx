
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NodeOutputProps {
  isEditing: boolean;
  output: string;
  onOutputChange: (value: string) => void;
}

export const NodeOutput = ({
  isEditing,
  output,
  onOutputChange
}: NodeOutputProps) => {
  return (
    <div>
      <div className="text-[10px] font-medium text-slate-700 mb-1">Output</div>
      <div className="nodrag">
        <Select 
          defaultValue={output} 
          onValueChange={onOutputChange}
          disabled={!isEditing}
        >
          <SelectTrigger className="h-5 text-[10px] bg-white border border-gray-200 px-1.5">
            <SelectValue placeholder="Select output" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="output1" className="text-[10px]">Output 1</SelectItem>
            <SelectItem value="output2" className="text-[10px]">Output 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
