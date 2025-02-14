
import React, { useState } from 'react';
import Board from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { KanbanCard as KanbanCardComponent } from './components/KanbanCard';
import { useKanbanBoard } from './hooks/useKanbanBoard';
import { KanbanCard, Priority } from './types/kanban-types';
import { BoardHeader } from './components/BoardHeader';
import { AddCardDialog } from './components/AddCardDialog';
import { CommentsDialog } from './components/CommentsDialog';

export const KanbanBoard = () => {
  const { board, setBoard, labels, saveBoard } = useKanbanBoard();
  const [newCard, setNewCard] = useState<{
    title: string;
    description: string;
    priority: Priority;
    assignees: string;
    labels: typeof labels;
  }>({ 
    title: "", 
    description: "", 
    priority: "medium", 
    assignees: "",
    labels: []
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const handleCardAdd = (columnId: number) => {
    setSelectedColumn(columnId);
    setNewCard({ 
      title: "", 
      description: "", 
      priority: "medium", 
      assignees: "",
      labels: []
    });
    setIsDialogOpen(true);
  };

  const handleCardSubmit = () => {
    if (!newCard.title) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }

    const newBoard = {
      ...board,
      columns: board.columns.map(column => {
        if (column.id === selectedColumn) {
          return {
            ...column,
            cards: [...column.cards, {
              id: Date.now().toString(),
              title: newCard.title,
              description: newCard.description,
              priority: newCard.priority,
              assignees: newCard.assignees.split(',').map(a => a.trim()).filter(a => a),
              labels: newCard.labels,
              comments: []
            }]
          };
        }
        return column;
      })
    };

    setBoard(newBoard);
    saveBoard(newBoard);
    setIsDialogOpen(false);
    toast({
      title: "Card added",
      description: "A new card has been added to the board"
    });
  };

  const handleCommentAdd = async () => {
    if (!selectedCard || !newComment.trim()) return;

    try {
      const updatedBoard = {
        ...board,
        columns: board.columns.map(column => ({
          ...column,
          cards: column.cards.map(card => 
            card.id === selectedCard.id
              ? {
                  ...card,
                  comments: [...(card.comments || []), {
                    id: Date.now().toString(),
                    comment: newComment,
                    created_at: new Date().toISOString(),
                    user_id: 'current-user'
                  }]
                }
              : card
          )
        }))
      };

      setBoard(updatedBoard);
      saveBoard(updatedBoard);
      setNewComment("");
      setIsCommentDialogOpen(false);
      toast({
        title: "Comment added",
        description: "Your comment has been added to the card"
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive"
      });
    }
  };

  const handleDragEnd = (card: KanbanCard, source: any, destination: any) => {
    if (!destination) {
      return;
    }

    const updatedBoard = {
      ...board,
      columns: board.columns.map(column => {
        if (column.id === source.fromColumnId) {
          return {
            ...column,
            cards: column.cards.filter(c => c.id !== card.id)
          };
        }
        if (column.id === destination.toColumnId) {
          const destinationCards = [...column.cards];
          destinationCards.splice(destination.toPosition, 0, card);
          return {
            ...column,
            cards: destinationCards
          };
        }
        return column;
      })
    };

    setBoard(updatedBoard);
    saveBoard(updatedBoard);
    toast({
      title: "Card moved",
      description: "The card has been moved to a new position"
    });
  };

  const handleAddColumn = () => {
    const newColumn = {
      id: Date.now(),
      title: "New Column",
      cards: []
    };
    const newBoard = {
      ...board,
      columns: [...board.columns, newColumn]
    };
    setBoard(newBoard);
    saveBoard(newBoard);
    toast({
      title: "Column added",
      description: "A new column has been added to the board"
    });
  };

  // Ensure board data is properly structured for the library
  const initialBoard = {
    columns: board?.columns || []
  };

  return (
    <Card>
      <BoardHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddColumn={handleAddColumn}
      />
      <CardContent className="overflow-x-auto">
        <Board
          initialBoard={initialBoard}
          disableColumnDrag
          allowRemoveLane
          allowRenameLabel
          allowRemoveCard
          onLaneRemove={console.log}
          onCardRemove={console.log}
          onLaneRename={console.log}
          onCardDragEnd={handleDragEnd}
          renderCard={(props: KanbanCard) => (
            <KanbanCardComponent
              {...props}
              onCommentClick={() => {
                setSelectedCard(props);
                setIsCommentDialogOpen(true);
              }}
            />
          )}
          renderColumnHeader={({ title, id }) => (
            <div className="flex items-center justify-between p-2">
              <span className="font-medium">{title}</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleCardAdd(id)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        />

        <AddCardDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          newCard={newCard}
          setNewCard={setNewCard}
          onSubmit={handleCardSubmit}
          labels={labels}
        />

        <CommentsDialog
          isOpen={isCommentDialogOpen}
          onOpenChange={setIsCommentDialogOpen}
          card={selectedCard}
          newComment={newComment}
          setNewComment={setNewComment}
          onAddComment={handleCommentAdd}
        />
      </CardContent>
    </Card>
  );
};
