
import React from 'react';
import { Button } from "@/components/ui/button";
import { Wand2, Play } from "lucide-react";
import { Panel } from '@xyflow/react';

interface FlowToolbarProps {
  onOpenTextToFlow: () => void;
  onRunPipeline: () => void;
}

export const FlowToolbar = ({ onOpenTextToFlow, onRunPipeline }: FlowToolbarProps) => {
  return (
    <Panel position="top-right">
      <div className="flex gap-2">
        <Button 
          variant="outline"
          onClick={onOpenTextToFlow}
          className="flex items-center gap-2"
        >
          <Wand2 className="h-4 w-4" />
          Generate from Text
        </Button>
        <Button onClick={onRunPipeline} className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          Run Pipeline
        </Button>
      </div>
    </Panel>
  );
};
