
import React, { useState } from 'react';
import { FileText, FolderOpen, Upload, Download, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FileStructure {
  [key: string]: string[];
}

interface FileExplorerProps {
  folderStructure: FileStructure;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ folderStructure }) => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  
  const handleFileUpload = async (folder: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      try {
        // In a real implementation, you'd upload to Supabase Storage
        // For now, we'll just show a success message
        toast({
          title: "Upload successful",
          description: `${file.name} has been uploaded to ${folder}`,
        });
        
        // Simulate adding the file to our folder structure
        // In a real implementation, you'd refresh the list from Supabase
        // folderStructure[folder] = [...folderStructure[folder], file.name];
      } catch (error) {
        console.error('Error uploading file:', error);
        toast({
          title: "Error",
          description: "Failed to upload file",
          variant: "destructive",
        });
      }
    };
    
    input.click();
  };
  
  const handleDownloadFile = (folder: string, file: string) => {
    // In a real implementation, you'd download from Supabase Storage
    toast({
      title: "Download started",
      description: `Downloading ${file} from ${folder}`,
    });
  };
  
  const handleDeleteFile = (folder: string, file: string) => {
    // In a real implementation, you'd delete from Supabase Storage
    toast({
      title: "File deleted",
      description: `${file} has been deleted from ${folder}`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">File Explorer</CardTitle>
        {selectedFolder && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleFileUpload(selectedFolder)}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload to {selectedFolder}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(folderStructure).map(([folder, files]) => (
            <div key={folder} className="border rounded-lg overflow-hidden">
              <div 
                className="bg-gray-50 px-4 py-2 font-medium flex items-center justify-between cursor-pointer"
                onClick={() => setSelectedFolder(selectedFolder === folder ? null : folder)}
              >
                <div className="flex items-center">
                  <FolderOpen className="w-4 h-4 mr-2 text-devopsgenie-primary" />
                  {folder}
                </div>
                <span className="text-xs text-gray-500">{files.length} files</span>
              </div>
              <div className="divide-y">
                {files.map(file => (
                  <div 
                    key={file} 
                    className={`px-4 py-2 flex items-center justify-between hover:bg-gray-50 ${selectedFile === file ? 'bg-gray-100' : ''}`}
                    onClick={() => setSelectedFile(file)}
                  >
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2 text-devopsgenie-text-secondary" />
                      {file}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadFile(folder, file);
                        }}
                      >
                        <Download className="w-4 h-4 text-gray-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(folder, file);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-gray-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileExplorer;
