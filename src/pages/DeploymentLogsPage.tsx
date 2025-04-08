
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Search, RefreshCw, Filter, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

const DeploymentLogsPage: React.FC = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);

  const logs = [
    {
      id: 1,
      timestamp: '2025-04-08 09:12:34',
      message: 'Deployment of v2.1.3 started',
      service: 'API Gateway',
      severity: 'info',
      user: 'deploy-pipeline'
    },
    {
      id: 2,
      timestamp: '2025-04-08 09:14:22',
      message: 'Database migration completed successfully',
      service: 'Database',
      severity: 'info',
      user: 'deploy-pipeline'
    },
    {
      id: 3,
      timestamp: '2025-04-08 09:15:47',
      message: 'Error connecting to cache service',
      service: 'Product Service',
      severity: 'error',
      user: 'deploy-pipeline'
    },
    {
      id: 4,
      timestamp: '2025-04-08 09:16:03',
      message: 'Retry connection to cache service',
      service: 'Product Service',
      severity: 'warning',
      user: 'deploy-pipeline'
    },
    {
      id: 5,
      timestamp: '2025-04-08 09:16:18',
      message: 'Successfully connected to cache service',
      service: 'Product Service',
      severity: 'info',
      user: 'deploy-pipeline'
    },
    {
      id: 6,
      timestamp: '2025-04-08 09:17:30',
      message: 'API Gateway deployment completed',
      service: 'API Gateway',
      severity: 'info',
      user: 'deploy-pipeline'
    },
    {
      id: 7,
      timestamp: '2025-04-08 09:18:42',
      message: 'User service deployment failed',
      service: 'User Service',
      severity: 'error',
      user: 'deploy-pipeline'
    },
    {
      id: 8,
      timestamp: '2025-04-08 09:20:11',
      message: 'Rollback initiated for User Service',
      service: 'User Service',
      severity: 'warning',
      user: 'deploy-pipeline'
    },
    {
      id: 9,
      timestamp: '2025-04-08 09:22:03',
      message: 'Rollback completed successfully',
      service: 'User Service',
      severity: 'info',
      user: 'deploy-pipeline'
    },
    {
      id: 10,
      timestamp: '2025-04-08 09:25:47',
      message: 'Deployment completed with warnings',
      service: 'System',
      severity: 'warning',
      user: 'deploy-pipeline'
    }
  ];

  const filteredLogs = selectedSeverity 
    ? logs.filter(log => log.severity === selectedSeverity) 
    : logs;

  const renderSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const renderSeverityBadge = (severity: string) => {
    let badgeClass = '';
    
    switch (severity) {
      case 'info':
        badgeClass = 'bg-blue-100 text-blue-800';
        break;
      case 'warning':
        badgeClass = 'bg-yellow-100 text-yellow-800';
        break;
      case 'error':
        badgeClass = 'bg-red-100 text-red-800';
        break;
      default:
        badgeClass = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full ${badgeClass}`}>
        {severity}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-devopsgenie-text">Deployment Logs</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
          <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search logs..."
            className="pl-8"
          />
        </div>
        <div className="flex space-x-2">
          <Button 
            variant={selectedSeverity === 'error' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedSeverity(selectedSeverity === 'error' ? null : 'error')}
            className={selectedSeverity === 'error' ? 'bg-red-500 hover:bg-red-600' : ''}
          >
            <XCircle className="h-4 w-4 mr-1" />
            Errors
          </Button>
          <Button 
            variant={selectedSeverity === 'warning' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedSeverity(selectedSeverity === 'warning' ? null : 'warning')}
            className={selectedSeverity === 'warning' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
          >
            <AlertCircle className="h-4 w-4 mr-1" />
            Warnings
          </Button>
          <Button 
            variant={selectedSeverity === 'info' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedSeverity(selectedSeverity === 'info' ? null : 'info')}
            className={selectedSeverity === 'info' ? 'bg-blue-500 hover:bg-blue-600' : ''}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Info
          </Button>
          {selectedSeverity && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedSeverity(null)}
            >
              Clear Filter
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="recent">
        <TabsList className="mb-4">
          <TabsTrigger value="recent">Recent Deployments</TabsTrigger>
          <TabsTrigger value="ci">CI/CD Pipeline</TabsTrigger>
          <TabsTrigger value="infra">Infrastructure Changes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Deployment Logs</span>
                <span className="text-sm text-gray-500">Showing {filteredLogs.length} of {logs.length} logs</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 p-3 border-b flex items-center justify-between text-sm font-medium text-gray-700">
                  <div className="w-1/6">Timestamp</div>
                  <div className="w-1/12">Severity</div>
                  <div className="w-1/6">Service</div>
                  <div className="flex-1">Message</div>
                </div>
                <div className="max-h-[500px] overflow-y-auto">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="p-3 border-b last:border-b-0 flex items-center justify-between hover:bg-gray-50">
                      <div className="w-1/6 text-sm text-gray-500">{log.timestamp}</div>
                      <div className="w-1/12">
                        {renderSeverityBadge(log.severity)}
                      </div>
                      <div className="w-1/6 text-sm font-medium">{log.service}</div>
                      <div className="flex-1 text-sm">
                        <div className="flex items-center">
                          {renderSeverityIcon(log.severity)}
                          <span className="ml-1">{log.message}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ci">
          <Card>
            <CardHeader>
              <CardTitle>CI/CD Pipeline Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-gray-500 italic">CI/CD Pipeline logs will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="infra">
          <Card>
            <CardHeader>
              <CardTitle>Infrastructure Change Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-gray-500 italic">Infrastructure change logs will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeploymentLogsPage;
