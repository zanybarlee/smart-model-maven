
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataSourceForm } from "@/components/data/DataSourceForm";
import { DataSourceList } from "@/components/data/DataSourceList";

export const DataCollectionTab = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Add New Data Source</CardTitle>
          <CardDescription>Register a new data source for processing</CardDescription>
        </CardHeader>
        <CardContent>
          <DataSourceForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Sources</CardTitle>
          <CardDescription>Currently registered data sources</CardDescription>
        </CardHeader>
        <CardContent>
          <DataSourceList />
        </CardContent>
      </Card>
    </div>
  );
};
