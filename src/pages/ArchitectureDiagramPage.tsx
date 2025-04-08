
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

const ArchitectureDiagramPage: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleZoomIn = () => {
    if (zoomLevel < 200) {
      setZoomLevel(zoomLevel + 25);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 50) {
      setZoomLevel(zoomLevel - 25);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-devopsgenie-text">Architecture Diagram</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleZoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="px-2 py-1 bg-gray-100 rounded-md text-sm font-medium">
            {zoomLevel}%
          </span>
          <Button variant="outline" onClick={handleZoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
            <RefreshCw className="w-4 h-4 mr-2" />
            Update Diagram
          </Button>
        </div>
      </div>

      <Tabs defaultValue="microservices">
        <TabsList className="mb-4">
          <TabsTrigger value="microservices">Microservices Architecture</TabsTrigger>
          <TabsTrigger value="network">Network Topology</TabsTrigger>
          <TabsTrigger value="data">Data Flow</TabsTrigger>
          <TabsTrigger value="deployment">Deployment Pipeline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="microservices">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Microservices Architecture Diagram</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-white" style={{ overflow: 'auto', height: '600px' }}>
                <div style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left', transition: 'transform 0.3s ease' }}>
                  <div className="flex flex-col items-center">
                    <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50 mb-8 w-64 text-center">
                      <h3 className="font-bold">API Gateway</h3>
                      <p className="text-sm">Route and load balance requests</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-8 mb-8">
                      <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50 w-64 text-center">
                        <h3 className="font-bold">User Service</h3>
                        <p className="text-sm">Authentication & user management</p>
                      </div>
                      <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50 w-64 text-center">
                        <h3 className="font-bold">Product Service</h3>
                        <p className="text-sm">Product catalog & inventory</p>
                      </div>
                      <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50 w-64 text-center">
                        <h3 className="font-bold">Order Service</h3>
                        <p className="text-sm">Order processing & history</p>
                      </div>
                    </div>
                    
                    <div className="border-2 border-purple-500 rounded-lg p-4 bg-purple-50 mb-8 w-64 text-center">
                      <h3 className="font-bold">Message Queue</h3>
                      <p className="text-sm">Async communication between services</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8">
                      <div className="border-2 border-orange-500 rounded-lg p-4 bg-orange-50 w-64 text-center">
                        <h3 className="font-bold">Product Database</h3>
                        <p className="text-sm">PostgreSQL</p>
                      </div>
                      <div className="border-2 border-orange-500 rounded-lg p-4 bg-orange-50 w-64 text-center">
                        <h3 className="font-bold">User Database</h3>
                        <p className="text-sm">MongoDB</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connector lines would be here with SVG paths */}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="network">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Network Topology Diagram</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-white" style={{ overflow: 'auto', height: '600px' }}>
                <div style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left', transition: 'transform 0.3s ease' }}>
                  <div className="flex flex-col items-center">
                    <div className="border-2 border-gray-500 rounded-lg p-4 bg-gray-50 mb-8 w-full max-w-2xl text-center">
                      <h3 className="font-bold">Internet</h3>
                    </div>
                    
                    <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50 mb-8 w-full max-w-2xl">
                      <h3 className="font-bold text-center mb-4">Public Subnet</h3>
                      <div className="flex justify-center space-x-8">
                        <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50 w-64 text-center">
                          <h3 className="font-bold">Load Balancer</h3>
                        </div>
                        <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50 w-64 text-center">
                          <h3 className="font-bold">API Gateway</h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-2 border-yellow-500 rounded-lg p-4 bg-yellow-50 mb-8 w-full max-w-2xl">
                      <h3 className="font-bold text-center mb-4">Private Subnet</h3>
                      <div className="flex justify-center space-x-8">
                        <div className="border-2 border-purple-500 rounded-lg p-4 bg-purple-50 w-64 text-center">
                          <h3 className="font-bold">Application Servers</h3>
                        </div>
                        <div className="border-2 border-purple-500 rounded-lg p-4 bg-purple-50 w-64 text-center">
                          <h3 className="font-bold">Cache Servers</h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-2 border-red-500 rounded-lg p-4 bg-red-50 w-full max-w-2xl">
                      <h3 className="font-bold text-center mb-4">Database Subnet</h3>
                      <div className="flex justify-center space-x-8">
                        <div className="border-2 border-orange-500 rounded-lg p-4 bg-orange-50 w-64 text-center">
                          <h3 className="font-bold">Primary DB</h3>
                        </div>
                        <div className="border-2 border-orange-500 rounded-lg p-4 bg-orange-50 w-64 text-center">
                          <h3 className="font-bold">Replica DB</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Data Flow Diagram</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-white" style={{ overflow: 'auto', height: '600px' }}>
                <div style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left', transition: 'transform 0.3s ease' }}>
                  <div className="flex flex-col items-center">
                    {/* Data flow diagram would be here */}
                    <p className="text-gray-500 italic">Data flow diagram content would be here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="deployment">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Deployment Pipeline Diagram</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-white" style={{ overflow: 'auto', height: '600px' }}>
                <div style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left', transition: 'transform 0.3s ease' }}>
                  <div className="flex flex-col items-center">
                    {/* Deployment pipeline diagram would be here */}
                    <p className="text-gray-500 italic">Deployment pipeline diagram content would be here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArchitectureDiagramPage;
