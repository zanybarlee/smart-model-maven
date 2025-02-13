
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, GitBranch, CheckCircle, AlertCircle } from "lucide-react";

interface AIModel {
  name: string;
  type: 'rag' | 'classification' | 'generation' | 'embedding';
  version: string;
  status: 'active' | 'inactive' | 'validating';
  lastValidation?: {
    date: string;
    status: 'passed' | 'failed' | 'pending';
  };
}

export const AIModelsList = () => {
  const models: AIModel[] = [
    {
      name: 'RAG Pipeline Model',
      type: 'rag',
      version: '1.0.0',
      status: 'active',
      lastValidation: {
        date: '2024-03-15',
        status: 'passed'
      }
    },
    {
      name: 'Classification Model',
      type: 'classification',
      version: '2.1.0',
      status: 'validating',
      lastValidation: {
        date: '2024-03-14',
        status: 'pending'
      }
    }
  ];

  const getModelIcon = (type: string) => {
    switch (type) {
      case 'rag':
        return <Brain className="h-5 w-5 text-purple-500" />;
      default:
        return <Brain className="h-5 w-5 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'validating':
        return <Badge variant="warning">Validating</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {models.map((model, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getModelIcon(model.type)}
              <div>
                <h3 className="font-medium">{model.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <GitBranch className="h-4 w-4" />
                  <span>v{model.version}</span>
                </div>
              </div>
            </div>
            {getStatusBadge(model.status)}
          </div>
          {model.lastValidation && (
            <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
              {model.lastValidation.status === 'passed' ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              )}
              <span>Last validated: {model.lastValidation.date}</span>
              <Badge variant={model.lastValidation.status === 'passed' ? 'success' : 'warning'}>
                {model.lastValidation.status}
              </Badge>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};
