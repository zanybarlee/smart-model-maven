
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, RefreshCw, Plus, FileText } from "lucide-react";
import { FileUploadModal } from "./FileUploadModal";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface KnowledgeBaseFile {
  id: string;
  filename: string;
  upload_date: string;
  parsing_status: string;
  enabled: boolean;
}

export const KnowledgeBaseList = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [files, setFiles] = useState<KnowledgeBaseFile[]>([]);
  const { toast } = useToast();

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('knowledge_base_files')
        .select('*')
        .order('upload_date', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching files",
        description: error.message
      });
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Knowledge Base Files</h2>
        <Button onClick={() => setIsUploadModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add File
        </Button>
      </div>

      <div className="grid gap-4">
        {files.map((file) => (
          <Card key={file.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-blue-500" />
                <div>
                  <h3 className="font-medium">{file.filename}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Uploaded on {new Date(file.upload_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <Badge 
                variant={
                  file.parsing_status === 'Parsed' ? 'success' : 
                  file.parsing_status === 'Processing' ? 'warning' : 'default'
                }
              >
                {file.parsing_status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      <FileUploadModal 
        open={isUploadModalOpen} 
        onOpenChange={setIsUploadModalOpen}
        onSuccess={fetchFiles}
      />
    </div>
  );
};
