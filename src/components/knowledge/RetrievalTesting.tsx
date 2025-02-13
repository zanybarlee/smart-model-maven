
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileText, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const RetrievalTesting = () => {
  const [similarityThreshold, setSimilarityThreshold] = useState([0.7]);
  const [keywordWeight, setKeywordWeight] = useState([0.5]);
  const [rerankModel, setRerankModel] = useState("");
  const [useKnowledgeGraph, setUseKnowledgeGraph] = useState(false);
  const [testText, setTestText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(0);

  const handleTest = () => {
    // Implement test logic here
    console.log({
      similarityThreshold,
      keywordWeight,
      rerankModel,
      useKnowledgeGraph,
      testText
    });
  };

  const InfoTooltip = ({ content }: { content: string }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Info className="h-4 w-4 text-gray-400" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Retrieval Testing</CardTitle>
            <CardDescription>
              Conduct a retrieval test to check if RAGFlow can recover the intended content for the LLM.
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <FileText className="h-4 w-4" />
            <span>{selectedFiles}/0 Files selected</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Similarity threshold</label>
              <InfoTooltip content="Minimum similarity score required for content to be considered relevant" />
            </div>
            <Slider
              value={similarityThreshold}
              onValueChange={setSimilarityThreshold}
              max={1}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Keywords similarity weight</label>
              <InfoTooltip content="Weight given to keyword-based similarity in the overall ranking" />
            </div>
            <Slider
              value={keywordWeight}
              onValueChange={setKeywordWeight}
              max={1}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Rerank model</label>
              <InfoTooltip content="Model used for reranking search results" />
            </div>
            <Select value={rerankModel} onValueChange={setRerankModel}>
              <SelectTrigger>
                <SelectValue placeholder="Please select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cross-encoder">Cross-Encoder</SelectItem>
                <SelectItem value="bi-encoder">Bi-Encoder</SelectItem>
                <SelectItem value="colbert">ColBERT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Use knowledge graph</label>
              <InfoTooltip content="Enable knowledge graph-based retrieval enhancement" />
            </div>
            <Switch
              checked={useKnowledgeGraph}
              onCheckedChange={setUseKnowledgeGraph}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Test text</label>
            <Textarea
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              placeholder="Enter your test query here..."
              className="h-32"
            />
          </div>

          <Button onClick={handleTest} className="w-full">
            Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
