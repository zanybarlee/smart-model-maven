
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CleaningRulesList } from "@/components/data/CleaningRulesList";

export const DataCleaningTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Cleaning Rules</CardTitle>
        <CardDescription>Manage and monitor data cleaning processes</CardDescription>
      </CardHeader>
      <CardContent>
        <CleaningRulesList />
      </CardContent>
    </Card>
  );
};
