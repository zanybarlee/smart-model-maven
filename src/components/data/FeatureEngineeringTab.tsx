
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIModelsList } from "@/components/data/AIModelsList";
import { FeatureStoreList } from "@/components/data/FeatureStoreList";
import { KnowledgeBaseList } from "@/components/data/KnowledgeBaseList";

export const FeatureEngineeringTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Models & Feature Engineering</CardTitle>
          <CardDescription>Manage AI models, feature stores, and knowledge bases</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="models" className="space-y-4">
            <TabsList>
              <TabsTrigger value="models">AI Models</TabsTrigger>
              <TabsTrigger value="features">Feature Store</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge Bases</TabsTrigger>
            </TabsList>

            <TabsContent value="models">
              <AIModelsList />
            </TabsContent>

            <TabsContent value="features">
              <FeatureStoreList />
            </TabsContent>

            <TabsContent value="knowledge">
              <KnowledgeBaseList />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
