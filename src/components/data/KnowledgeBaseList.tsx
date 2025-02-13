
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, RefreshCw } from "lucide-react";

interface KnowledgeBase {
  name: string;
  sourceType: string;
  lastSync: string;
  status: 'synced' | 'syncing' | 'error';
  documentCount: number;
  embeddingModel: string;
}

export const KnowledgeBaseList = () => {
  const knowledgeBases: KnowledgeBase[] = [
    {
      name: 'Technical Documentation',
      sourceType: 'PDF',
      lastSync: '2024-03-15',
      status: 'synced',
      documentCount: 150,
      embeddingModel: 'text-embedding-ada-002'
    },
    {
      name: 'API Documentation',
      sourceType: 'Markdown',
      lastSync: '2024-03-14',
      status: 'syncing',
      documentCount: 75,
      embeddingModel: 'text-embedding-ada-002'
    }
  ];

  return (
    <div className="space-y-4">
      {knowledgeBases.map((kb, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-medium">{kb.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{kb.sourceType}</span>
                  <span>•</span>
                  <span>{kb.documentCount} documents</span>
                </div>
              </div>
            </div>
            <Badge 
              variant={
                kb.status === 'synced' ? 'success' : 
                kb.status === 'syncing' ? 'warning' : 'destructive'
              }
            >
              {kb.status}
            </Badge>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <RefreshCw className="h-4 w-4" />
              <span>Last sync: {kb.lastSync}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <CheckCircle className="h-4 w-4" />
              <span>{kb.embeddingModel}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
