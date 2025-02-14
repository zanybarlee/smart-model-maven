
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Maximize2, Minimize2 } from "lucide-react";

export const TextToApp = () => {
  const [isDetached, setIsDetached] = useState(false);

  const TextToAppContent = () => (
    <iframe 
      src="https://lovable.dev/"
      className="w-full h-full border-0"
      title="AI Coder Assistant"
    />
  );

  return (
    <>
      <Card className="bg-black border-gray-800">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="text-white">Text to App (AI Coder)</CardTitle>
            <CardDescription className="text-gray-400">
              Transform your text descriptions into fully functional applications using AI
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDetached(true)}
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="h-[800px] p-0">
          {!isDetached && <TextToAppContent />}
        </CardContent>
      </Card>

      <Dialog open={isDetached} onOpenChange={setIsDetached}>
        <DialogContent className="max-w-[100vw] w-full h-[100vh] p-4 bg-black" onInteractOutside={(e) => e.preventDefault()}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Text to App (AI Coder)</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDetached(false)}
              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 h-[calc(100vh-64px)]">
            <TextToAppContent />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
