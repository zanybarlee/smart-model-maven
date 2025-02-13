
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const DataSourceForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [dataSourceName, setDataSourceName] = useState('');
  const [sourceType, setSourceType] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDataSourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('data_sources')
        .insert([
          {
            name: dataSourceName,
            source_type: sourceType,
            connection_details: { file: uploadedFile?.name }
          }
        ]);

      if (error) throw error;

      toast({
        title: "Data source added successfully",
        description: "Your data source has been registered and is ready for processing."
      });

      setDataSourceName('');
      setSourceType('');
      setUploadedFile(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding data source",
        description: error.message
      });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleDataSourceSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          placeholder="Data Source Name"
          value={dataSourceName}
          onChange={(e) => setDataSourceName(e.target.value)}
        />
        <Input
          placeholder="Source Type (CSV, JSON, Database)"
          value={sourceType}
          onChange={(e) => setSourceType(e.target.value)}
        />
        <Input
          type="file"
          onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
        />
      </div>
      <Button type="submit" disabled={loading}>
        <Upload className="mr-2 h-4 w-4" />
        {loading ? 'Adding...' : 'Add Data Source'}
      </Button>
    </form>
  );
};
