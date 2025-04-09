
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectSummaryProps {
  name: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  resourceCount: number;
  estimatedCost: string;
  cloudProvider: string;
  description: string;
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({
  name,
  createdAt,
  updatedAt,
  status,
  resourceCount,
  estimatedCost,
  cloudProvider,
  description,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Project Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2 text-devopsgenie-text">Project Details</h3>
            <p className="text-sm text-devopsgenie-text-secondary mb-1">
              <span className="font-medium">Name:</span> {name}
            </p>
            <p className="text-sm text-devopsgenie-text-secondary mb-1">
              <span className="font-medium">Created:</span> {createdAt}
            </p>
            <p className="text-sm text-devopsgenie-text-secondary mb-1">
              <span className="font-medium">Last Updated:</span> {updatedAt}
            </p>
            <p className="text-sm text-devopsgenie-text-secondary">
              <span className="font-medium">Status:</span> {status}
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2 text-devopsgenie-text">Infrastructure Overview</h3>
            <p className="text-sm text-devopsgenie-text-secondary mb-1">
              <span className="font-medium">Resources:</span> {resourceCount}
            </p>
            <p className="text-sm text-devopsgenie-text-secondary mb-1">
              <span className="font-medium">Estimated Cost:</span> {estimatedCost}
            </p>
            <p className="text-sm text-devopsgenie-text-secondary">
              <span className="font-medium">Cloud Provider:</span> {cloudProvider}
            </p>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2 text-devopsgenie-text">Description</h3>
          <p className="text-sm text-devopsgenie-text-secondary">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectSummary;
