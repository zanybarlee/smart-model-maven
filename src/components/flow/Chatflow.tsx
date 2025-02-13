
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Chatflow = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chatflow Designer</CardTitle>
        <CardDescription>
          Design and manage your chat workflows using the external flow design tool
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[800px] p-0">
        <iframe 
          src="http://127.0.0.1:3001/"
          className="w-full h-full border-0"
          title="Chatflow Designer"
        />
      </CardContent>
    </Card>
  );
};
