
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FileUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const FileUploadModal = ({ open, onOpenChange, onSuccess }: FileUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('knowledge_base_files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create file record in database
      const { error: dbError } = await supabase
        .from('knowledge_base_files')
        .insert({
          filename: file.name,
          file_path: filePath,
          user_id: (await supabase.auth.getUser()).data.user?.id
        });

      if (dbError) throw dbError;

      toast({
        title: "File uploaded successfully",
        description: "Your file has been uploaded and will be processed shortly."
      });

      onSuccess?.();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFileUpload} className="space-y-4">
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            accept=".pdf,.doc,.docx,.txt"
          />
          <Button type="submit" disabled={!file || uploading} className="w-full">
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
