
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LabelingTasksList } from "@/components/data/LabelingTasksList";

export const DataLabelingTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Labeling Tasks</CardTitle>
        <CardDescription>Track data labeling progress</CardDescription>
      </CardHeader>
      <CardContent>
        <LabelingTasksList />
      </CardContent>
    </Card>
  );
};
