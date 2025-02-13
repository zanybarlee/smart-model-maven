
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Info, Upload } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const KnowledgeBaseConfig = () => {
  const [config, setConfig] = useState({
    name: 'RAGflow',
    description: '',
    documentLanguage: 'English',
    permissions: 'private',
    embeddingModel: '',
    chunkMethod: 'General',
    pageRank: [0],
    autoKeyword: [0],
    autoQuestion: [0],
    chunkTokenNumber: [128],
    delimiters: '\\n!?;。；！？',
    layoutRecognition: false,
    excelToHtml: false,
    useRaptor: false,
    extractKnowledgeGraph: false,
    tagSet: ''
  });

  const handleSave = () => {
    console.log('Saving configuration:', config);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
        <CardDescription>
          Update your knowledge base configuration here, particularly the chunk method.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Knowledge base name</label>
            <Input 
              value={config.name}
              onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Knowledge base photo</label>
            <div className="mt-1 flex items-center space-x-4">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea 
              value={config.description}
              onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Document language</label>
            <Select 
              value={config.documentLanguage}
              onValueChange={(value) => setConfig(prev => ({ ...prev, documentLanguage: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Chinese">Chinese</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Permissions</label>
            <Select 
              value={config.permissions}
              onValueChange={(value) => setConfig(prev => ({ ...prev, permissions: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select permissions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Only me</SelectItem>
                <SelectItem value="team">Team</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Embedding model</label>
            <Select 
              value={config.embeddingModel}
              onValueChange={(value) => setConfig(prev => ({ ...prev, embeddingModel: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ada">OpenAI Ada</SelectItem>
                <SelectItem value="bge">BGE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Page rank</label>
              <Slider
                value={config.pageRank}
                onValueChange={(value) => setConfig(prev => ({ ...prev, pageRank: value }))}
                max={10}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Auto-keyword</label>
              <Slider
                value={config.autoKeyword}
                onValueChange={(value) => setConfig(prev => ({ ...prev, autoKeyword: value }))}
                max={10}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Auto-question</label>
              <Slider
                value={config.autoQuestion}
                onValueChange={(value) => setConfig(prev => ({ ...prev, autoQuestion: value }))}
                max={10}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Chunk token number</label>
              <Slider
                value={config.chunkTokenNumber}
                onValueChange={(value) => setConfig(prev => ({ ...prev, chunkTokenNumber: value }))}
                max={512}
                step={8}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Delimiters</label>
            <Input 
              value={config.delimiters}
              onChange={(e) => setConfig(prev => ({ ...prev, delimiters: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Layout recognition & OCR</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enable layout recognition and OCR for better document understanding</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Switch
                checked={config.layoutRecognition}
                onCheckedChange={(checked) => setConfig(prev => ({ ...prev, layoutRecognition: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Excel to HTML</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Convert Excel files to HTML format</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Switch
                checked={config.excelToHtml}
                onCheckedChange={(checked) => setConfig(prev => ({ ...prev, excelToHtml: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Use RAPTOR to enhance retrieval</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enable RAPTOR for enhanced retrieval capabilities</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Switch
                checked={config.useRaptor}
                onCheckedChange={(checked) => setConfig(prev => ({ ...prev, useRaptor: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Extract knowledge graph</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Automatically extract and build knowledge graphs</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Switch
                checked={config.extractKnowledgeGraph}
                onCheckedChange={(checked) => setConfig(prev => ({ ...prev, extractKnowledgeGraph: checked }))}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Tag set</label>
            <Select 
              value={config.tagSet}
              onValueChange={(value) => setConfig(prev => ({ ...prev, tagSet: value }))}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Please select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6">
            <CardDescription className="mb-4">
              <h3 className="text-lg font-semibold mb-2">"General" Chunk method description</h3>
              <p>Supported file formats are DOCX, EXCEL, PPT, IMAGE, PDF, TXT, MD, JSON, EML, HTML.</p>
              <p className="mt-2">This method chunks files using a 'naive' method:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Use vision detection model to split the texts into smaller segments.</li>
                <li>Then, combine adjacent segments until the token count exceeds the threshold specified by 'Chunk token number', at which point a chunk is created.</li>
              </ul>
            </CardDescription>
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
