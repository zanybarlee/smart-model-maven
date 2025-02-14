
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextToFlowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  flowDescription: string;
  onFlowDescriptionChange: (value: string) => void;
  onGenerate: () => void;
}

export const TextToFlowDialog = ({
  isOpen,
  onClose,
  flowDescription,
  onFlowDescriptionChange,
  onGenerate,
}: TextToFlowDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Data Flow</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Description</Label>
            <Textarea
              placeholder="Describe your data flow (e.g., 'Import CSV data, clean it, and engineer features for machine learning')"
              value={flowDescription}
              onChange={(e) => onFlowDescriptionChange(e.target.value)}
              className="h-32"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onGenerate}>
              Generate Flow
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
