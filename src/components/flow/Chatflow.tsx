
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Maximize2, Minimize2 } from "lucide-react";

export const Chatflow = () => {
  const [isDetached, setIsDetached] = useState(false);

  const ChatflowContent = () => (
    <iframe 
      src="http://127.0.0.1:3001/"
      className="w-full h-full border-0"
      title="Chatflow Designer"
    />
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Chatflow Designer</CardTitle>
            <CardDescription>
              Design and manage your chat workflows using the external flow design tool
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDetached(true)}
            className="h-8 w-8"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="h-[800px] p-0">
          {!isDetached && <ChatflowContent />}
        </CardContent>
      </Card>

      <Dialog open={isDetached} onOpenChange={setIsDetached}>
        <DialogContent className="max-w-[90vw] h-[90vh]" onInteractOutside={(e) => e.preventDefault()}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Chatflow Designer</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDetached(false)}
              className="h-8 w-8"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 h-[calc(90vh-80px)]">
            <ChatflowContent />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
