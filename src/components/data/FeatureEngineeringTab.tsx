
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FeaturesList } from "@/components/data/FeaturesList";

export const FeatureEngineeringTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Engineering</CardTitle>
        <CardDescription>Transform and generate new features</CardDescription>
      </CardHeader>
      <CardContent>
        <FeaturesList />
      </CardContent>
    </Card>
  );
};
