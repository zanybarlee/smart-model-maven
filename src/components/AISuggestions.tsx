
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AISuggestions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm text-slate-600">
          <p>• Add validation rules for email addresses</p>
          <p>• Consider adding timestamps for auditing</p>
          <p>• Include soft delete functionality</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISuggestions;
