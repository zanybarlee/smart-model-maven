
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Tags } from "lucide-react";

interface LabelingTask {
  name: string;
  progress: number;
}

export const LabelingTasksList = () => {
  const labelingTasks: LabelingTask[] = [
    { name: 'Sentiment Analysis', progress: 75 },
    { name: 'Image Classification', progress: 45 },
    { name: 'Text Categorization', progress: 90 }
  ];

  return (
    <div className="space-y-6">
      {labelingTasks.map((task, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Tags className="h-5 w-5 mr-2 text-blue-500" />
              <span className="font-medium">{task.name}</span>
            </div>
            <span className="text-sm text-gray-500">{task.progress}%</span>
          </div>
          <Progress value={task.progress} />
        </div>
      ))}
    </div>
  );
};
