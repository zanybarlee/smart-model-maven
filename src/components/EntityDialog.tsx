
import React, { useState } from 'react';
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Entity } from '@/types/domain';

interface EntityDialogProps {
  selectedEntity: Entity | null;
  onSave: (entity: Entity) => void;
}

const EntityDialog = ({ selectedEntity, onSave }: EntityDialogProps) => {
  const [name, setName] = useState(selectedEntity?.name || '');
  const [attribute, setAttribute] = useState('');
  const [attributes, setAttributes] = useState<string[]>(selectedEntity?.attributes || []);
  const { toast } = useToast();

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for the entity.",
        variant: "destructive",
      });
      return;
    }

    onSave({
      id: selectedEntity?.id || Date.now().toString(),
      name,
      attributes
    });
  };

  const addAttribute = () => {
    if (attribute.trim()) {
      setAttributes([...attributes, attribute]);
      setAttribute('');
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{selectedEntity ? 'Edit Entity' : 'Add New Entity'}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 p-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Entity Name</label>
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter entity name"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Add Attribute</label>
          <div className="flex gap-2">
            <Input 
              value={attribute}
              onChange={(e) => setAttribute(e.target.value)}
              placeholder="Enter attribute name"
            />
            <Button onClick={addAttribute}>Add</Button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Attributes</label>
          <div className="space-y-2">
            {attributes.map((attr, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-50 p-2 rounded">
                <span>{attr}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAttributes(attributes.filter((_, i) => i !== index))}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>
        <Button className="w-full" onClick={handleSave}>
          {selectedEntity ? 'Update Entity' : 'Create Entity'}
        </Button>
      </div>
    </DialogContent>
  );
};

export default EntityDialog;
