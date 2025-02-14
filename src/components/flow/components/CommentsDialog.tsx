
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KanbanCard } from '../types/kanban-types';

interface CommentsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  card: KanbanCard | null;
  newComment: string;
  setNewComment: (comment: string) => void;
  onAddComment: () => void;
}

export const CommentsDialog: React.FC<CommentsDialogProps> = ({
  isOpen,
  onOpenChange,
  card,
  newComment,
  setNewComment,
  onAddComment
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{card?.title} - Comments</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="max-h-60 overflow-y-auto space-y-2">
            {card?.comments?.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm">{comment.comment}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onAddComment();
                }
              }}
            />
            <Button onClick={onAddComment}>
              Add
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
