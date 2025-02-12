
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EntityDialog from './EntityDialog';
import { Entity } from '@/types/domain';

interface DomainModelEditorProps {
  modelDescription: string;
  onModelDescriptionChange: (value: string) => void;
  onGenerateModel: () => void;
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  selectedEntity: Entity | null;
  onSaveEntity: (entity: Entity) => void;
}

const DomainModelEditor = ({
  modelDescription,
  onModelDescriptionChange,
  onGenerateModel,
  dialogOpen,
  setDialogOpen,
  selectedEntity,
  onSaveEntity
}: DomainModelEditorProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Describe Your Domain</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <textarea
            value={modelDescription}
            onChange={(e) => onModelDescriptionChange(e.target.value)}
            className="w-full h-40 p-4 border rounded-md bg-white/80 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Describe your business domain in natural language... 
            For example: I need a system to manage an online bookstore with customers, orders, and books."
          />
          <div className="flex gap-4">
            <Button 
              onClick={onGenerateModel}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Generate Domain Model
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Add Entity</Button>
              </DialogTrigger>
              <EntityDialog selectedEntity={selectedEntity} onSave={onSaveEntity} />
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DomainModelEditor;
