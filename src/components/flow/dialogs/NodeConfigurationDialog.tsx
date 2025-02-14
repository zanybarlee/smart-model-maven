
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomNode } from '../types/custom-types';
import { NodeData } from '../types/flow-types';

interface NodeConfigurationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNode: CustomNode | null;
  onUpdateConfig: (config: Partial<NodeData['config']>) => void;
}

export const NodeConfigurationDialog = ({ isOpen, onClose, selectedNode, onUpdateConfig }: NodeConfigurationDialogProps) => {
  if (!selectedNode) return null;

  const renderConfig = () => {
    switch (selectedNode.data.type) {
      case 'dataIngestion':
        return (
          <div className="space-y-4">
            <div>
              <Label>Data Source</Label>
              <Select onValueChange={(value) => onUpdateConfig({ source: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="s3">S3 Bucket</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="api">REST API</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Connection String</Label>
              <Input placeholder="Enter connection string or URL" />
            </div>
          </div>
        );
      case 'dataCleaning':
        return (
          <div className="space-y-4">
            <div>
              <Label>Cleaning Rules</Label>
              <Select onValueChange={(value) => onUpdateConfig({ cleaningRules: [value] })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select cleaning rules" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="removeDuplicates">Remove Duplicates</SelectItem>
                  <SelectItem value="handleMissing">Handle Missing Values</SelectItem>
                  <SelectItem value="normalize">Normalize Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 'featureEngineering':
        return (
          <div className="space-y-4">
            <div>
              <Label>Feature Transformations</Label>
              <Select onValueChange={(value) => onUpdateConfig({ transformations: [value] })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transformations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scaling">Feature Scaling</SelectItem>
                  <SelectItem value="encoding">Label Encoding</SelectItem>
                  <SelectItem value="pca">PCA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedNode.data.label} Configuration</DialogTitle>
        </DialogHeader>
        {renderConfig()}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onUpdateConfig({})}>
            Save Configuration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
