
import React from 'react';
import { FileText, FolderOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FileStructure {
  [key: string]: string[];
}

interface FileExplorerProps {
  folderStructure: FileStructure;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ folderStructure }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">File Explorer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(folderStructure).map(([folder, files]) => (
            <div key={folder} className="border rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 font-medium flex items-center">
                <FolderOpen className="w-4 h-4 mr-2 text-devopsgenie-primary" />
                {folder}
              </div>
              <div className="divide-y">
                {files.map(file => (
                  <div key={file} className="px-4 py-2 flex items-center hover:bg-gray-50">
                    <FileText className="w-4 h-4 mr-2 text-devopsgenie-text-secondary" />
                    {file}
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
