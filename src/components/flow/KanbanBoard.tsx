
import React from 'react';
import Board from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const board = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: "Add authentication",
          description: "Implement user authentication flow"
        },
        {
          id: 2,
          title: "Create API endpoints",
          description: "Design and implement REST API endpoints"
        }
      ]
    },
    {
      id: 2,
      title: "In Progress",
      cards: [
        {
          id: 3,
          title: "Update documentation",
          description: "Update API documentation with new endpoints"
        }
      ]
    },
    {
      id: 3,
      title: "Testing",
      cards: [
        {
          id: 4,
          title: "Unit tests",
          description: "Write unit tests for new features"
        }
      ]
    },
    {
      id: 4,
      title: "Done",
      cards: [
        {
          id: 5,
          title: "Setup project",
          description: "Initial project setup and configuration"
        }
      ]
    }
  ]
};

export const KanbanBoard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kanban Board</CardTitle>
        <CardDescription>
          Visualize and manage work items across different stages
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Board
          initialBoard={board}
          allowRemoveLane
          allowRenameLabel
          allowRemoveCard
          onLaneRemove={console.log}
          onCardRemove={console.log}
          onLaneRename={console.log}
          onCardDragEnd={console.log}
        />
      </CardContent>
    </Card>
  );
};
