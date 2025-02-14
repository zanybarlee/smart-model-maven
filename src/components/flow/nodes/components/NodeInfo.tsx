
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { NodeData } from '../../types/flow-types';

interface NodeInfoProps {
  showInfo: boolean;
  onShowInfoChange: (show: boolean) => void;
  data: NodeData;
}

export const NodeInfo = ({ showInfo, onShowInfoChange, data }: NodeInfoProps) => {
  return (
    <Dialog open={showInfo} onOpenChange={onShowInfoChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data.label} Information</DialogTitle>
          <DialogDescription>
            <div className="space-y-4 mt-4">
              <div>
                <h4 className="font-semibold mb-2">Node Type</h4>
                <p className="text-sm text-slate-600">{data.type || 'Default'}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Configuration</h4>
                <div className="text-sm text-slate-600 space-y-2">
                  <p>Data Source: {data.config.inputs?.dataSource || 'Not set'}</p>
                  <p>Connection: {data.config.inputs?.connectionString || 'Not set'}</p>
                  <p>Output Type: {data.config.outputs?.output || 'Not set'}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Status</h4>
                <p className="text-sm text-slate-600">{String(data.status) || 'Not started'}</p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
