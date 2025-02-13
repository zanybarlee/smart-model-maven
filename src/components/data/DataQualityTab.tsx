
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataContractsList } from "@/components/data/DataContractsList";
import { SchemaDriftMonitor } from "@/components/data/SchemaDriftMonitor";
import { DataLineageView } from "@/components/data/DataLineageView";

export const DataQualityTab = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Data Contracts</CardTitle>
          <CardDescription>Schema and quality requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <DataContractsList />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schema Drift Monitoring</CardTitle>
          <CardDescription>Track and detect schema changes</CardDescription>
        </CardHeader>
        <CardContent>
          <SchemaDriftMonitor />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Data Lineage</CardTitle>
          <CardDescription>Track data transformations and dependencies</CardDescription>
        </CardHeader>
        <CardContent>
          <DataLineageView />
        </CardContent>
      </Card>
    </div>
  );
};
