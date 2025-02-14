
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { KanbanBoard, defaultBoard, Label } from '../types/kanban-types';
import type { Json } from '@/integrations/supabase/types';
import debounce from 'lodash/debounce';

export const useKanbanBoard = () => {
  const [board, setBoard] = useState<KanbanBoard>(defaultBoard);
  const [boardId, setBoardId] = useState<string | null>(null);
  const [labels, setLabels] = useState<Label[]>([]);
  const { toast } = useToast();

  const loadLabels = async () => {
    try {
      const { data, error } = await supabase
        .from('card_labels')
        .select('*');

      if (error) throw error;
      if (data) {
        setLabels(data);
      }
    } catch (error) {
      console.error('Error loading labels:', error);
    }
  };

  const loadBoard = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('No authenticated user');
      }

      const { data: boards, error } = await supabase
        .from('kanban_boards')
        .select('*')
        .eq('user_id', user.id)
        .limit(1);

      if (error) throw error;

      if (boards && boards.length > 0) {
        setBoardId(boards[0].id);
        setBoard(boards[0].board_data as unknown as KanbanBoard);
      } else {
        const { data, error: insertError } = await supabase
          .from('kanban_boards')
          .insert({
            title: 'Main Board',
            board_data: defaultBoard as unknown as Json,
            user_id: user.id
          })
          .select()
          .single();

        if (insertError) throw insertError;
        if (data) {
          setBoardId(data.id);
          setBoard(data.board_data as unknown as KanbanBoard);
        }
      }
    } catch (error) {
      console.error('Error loading board:', error);
      toast({
        title: "Error",
        description: "Failed to load board data. Please make sure you're logged in.",
        variant: "destructive"
      });
    }
  };

  const saveBoard = debounce(async (newBoard: KanbanBoard) => {
    if (!boardId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('No authenticated user');
      }

      const { error } = await supabase
        .from('kanban_boards')
        .update({ 
          board_data: newBoard as unknown as Json
        })
        .eq('id', boardId)
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving board:', error);
      toast({
        title: "Error",
        description: "Failed to save board changes. Please make sure you're logged in.",
        variant: "destructive"
      });
    }
  }, 1000);

  useEffect(() => {
    loadBoard();
    loadLabels();
  }, []);

  return {
    board,
    setBoard,
    boardId,
    labels,
    saveBoard
  };
};
