
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Search, FileText, Edit, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';

const DocumentationPage: React.FC = () => {
  const documents = [
    {
      id: 1,
      title: 'System Architecture Overview',
      description: 'Comprehensive overview of the system architecture, including components, interfaces, and data flow.',
      lastUpdated: '2025-04-05',
      author: 'Alex Johnson',
      category: 'Architecture'
    },
    {
      id: 2,
      title: 'Deployment Guide',
      description: 'Step-by-step instructions for deploying the application in various environments.',
      lastUpdated: '2025-04-07',
      author: 'Maria Garcia',
      category: 'Operations'
    },
    {
      id: 3,
      title: 'API Documentation',
      description: 'Detailed documentation of all API endpoints, request/response formats, and authentication mechanisms.',
      lastUpdated: '2025-04-01',
      author: 'David Chen',
      category: 'Development'
    },
    {
      id: 4,
      title: 'Database Schema',
      description: 'Documentation of database tables, relationships, and indexing strategies.',
      lastUpdated: '2025-03-28',
      author: 'Sarah Kim',
      category: 'Development'
    },
    {
      id: 5,
      title: 'Scaling & Performance Considerations',
      description: 'Guidelines and best practices for scaling the application and optimizing performance.',
      lastUpdated: '2025-03-25',
      author: 'Alex Johnson',
      category: 'Operations'
    },
    {
      id: 6,
      title: 'Monitoring & Alerting Setup',
      description: 'Configuration details for monitoring tools and alerting thresholds.',
      lastUpdated: '2025-03-20',
      author: 'Maria Garcia',
      category: 'Operations'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-devopsgenie-text">Documentation</h1>
        <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
          <FileText className="w-4 h-4 mr-2" />
          New Document
        </Button>
      </div>

      <div className="flex">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search documentation..."
            className="pl-8"
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-lg">{doc.title}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    {doc.category}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-devopsgenie-text mb-4">{doc.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-devopsgenie-text-secondary">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Updated: {doc.lastUpdated} by {doc.author}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" className="bg-devopsgenie-primary hover:bg-opacity-90">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="architecture" className="space-y-4">
          {documents.filter(doc => doc.category === 'Architecture').map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-lg">{doc.title}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    {doc.category}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-devopsgenie-text mb-4">{doc.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-devopsgenie-text-secondary">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Updated: {doc.lastUpdated} by {doc.author}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" className="bg-devopsgenie-primary hover:bg-opacity-90">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="development" className="space-y-4">
          {documents.filter(doc => doc.category === 'Development').map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-lg">{doc.title}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    {doc.category}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-devopsgenie-text mb-4">{doc.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-devopsgenie-text-secondary">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Updated: {doc.lastUpdated} by {doc.author}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" className="bg-devopsgenie-primary hover:bg-opacity-90">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="operations" className="space-y-4">
          {documents.filter(doc => doc.category === 'Operations').map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                  <span className="text-lg">{doc.title}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                    {doc.category}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-devopsgenie-text mb-4">{doc.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-devopsgenie-text-secondary">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Updated: {doc.lastUpdated} by {doc.author}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" className="bg-devopsgenie-primary hover:bg-opacity-90">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentationPage;
