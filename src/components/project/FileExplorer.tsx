
import React, { useState, useEffect } from 'react';
import { FileText, FolderOpen, Upload, Download, Trash2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useParams } from 'react-router-dom';

interface FileStructure {
  [key: string]: string[];
}

const FileExplorer: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [folderStructure, setFolderStructure] = useState<FileStructure>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  useEffect(() => {
    if (projectId) {
      fetchFiles();
    }
  }, [projectId]);
  
  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      
      const { data: files, error } = await supabase
        .storage
        .from('project_files')
        .list(`${projectId}`, {
          sortBy: { column: 'name', order: 'asc' },
        });

      if (error) throw error;
      
      // Group files by folder (using the first part of the path)
      const structure: FileStructure = {};
      
      if (files) {
        // Default folders if they don't exist yet
        structure['infra'] = [];
        structure['diagrams'] = [];
        structure['docs'] = [];
        structure['finops'] = [];
        
        files.forEach(file => {
          if (!file.name.includes('/')) {
            const folderName = file.name.split('.')[0];
            if (folderName && !structure[folderName]) {
              structure[folderName] = [];
            }
          } else {
            const [folder, fileName] = file.name.split('/', 2);
            if (!structure[folder]) {
              structure[folder] = [];
            }
            if (fileName) {
              structure[folder].push(fileName);
            }
          }
        });
      }
      
      setFolderStructure(structure);
    } catch (error) {
      console.error('Error fetching files:', error);
      toast({
        title: "Error",
        description: "Failed to load files",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFileUpload = async (folder: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !projectId) return;
      
      try {
        setIsUploading(true);
        
        // Upload to Supabase Storage
        const { error } = await supabase
          .storage
          .from('project_files')
          .upload(`${projectId}/${folder}/${file.name}`, file, {
            cacheControl: '3600',
            upsert: true,
          });
        
        if (error) throw error;
        
        await fetchFiles(); // Refresh the file list
        
        toast({
          title: "Upload successful",
          description: `${file.name} has been uploaded to ${folder}`,
        });
      } catch (error) {
        console.error('Error uploading file:', error);
        toast({
          title: "Error",
          description: "Failed to upload file",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    };
    
    input.click();
  };
  
  const handleDownloadFile = async (folder: string, file: string) => {
    if (!projectId) return;
    
    try {
      // Generate a download URL
      const { data, error } = await supabase
        .storage
        .from('project_files')
        .createSignedUrl(`${projectId}/${folder}/${file}`, 60);  // URL valid for 60 seconds
      
      if (error) throw error;
      
      if (data?.signedUrl) {
        // Create a temporary link and click it
        const a = document.createElement('a');
        a.href = data.signedUrl;
        a.download = file;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        toast({
          title: "Download started",
          description: `Downloading ${file}`,
        });
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteFile = async (folder: string, file: string) => {
    if (!projectId) return;
    
    try {
      const { error } = await supabase
        .storage
        .from('project_files')
        .remove([`${projectId}/${folder}/${file}`]);
      
      if (error) throw error;
      
      await fetchFiles(); // Refresh the file list
      
      toast({
        title: "File deleted",
        description: `${file} has been deleted from ${folder}`,
      });
    } catch (error) {
      console.error('Error deleting file:', error);
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">File Explorer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <p>Loading files...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">File Explorer</CardTitle>
        <div className="flex space-x-2">
          {selectedFolder && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleFileUpload(selectedFolder)}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Uploading..." : `Upload to ${selectedFolder}`}
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={fetchFiles}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.keys(folderStructure).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No files found. Upload a file to get started.</p>
            </div>
          ) : (
            Object.entries(folderStructure).map(([folder, files]) => (
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
                  {files.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500">
                      No files in this folder
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="ml-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFileUpload(folder);
                        }}
                      >
                        Upload a file
                      </Button>
                    </div>
                  ) : (
                    files.map(file => (
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
                    ))
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileExplorer;
