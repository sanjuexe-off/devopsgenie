
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, RefreshCw, AlertCircle, TrendingDown, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const FinOpsReportPage: React.FC = () => {
  const monthlyData = [
    { name: 'Jan', compute: 4000, storage: 2400, network: 1200, total: 7600 },
    { name: 'Feb', compute: 4200, storage: 2800, network: 1400, total: 8400 },
    { name: 'Mar', compute: 5000, storage: 3000, network: 1600, total: 9600 },
    { name: 'Apr', compute: 4800, storage: 3200, network: 1800, total: 9800 },
    { name: 'May', compute: 5500, storage: 3400, network: 2000, total: 10900 },
    { name: 'Jun', compute: 5200, storage: 3600, network: 2200, total: 11000 },
  ];

  const serviceBreakdown = [
    { name: 'EC2 Instances', value: 3500 },
    { name: 'RDS Database', value: 2000 },
    { name: 'S3 Storage', value: 1200 },
    { name: 'CloudFront CDN', value: 800 },
    { name: 'Lambda Functions', value: 500 },
    { name: 'Other Services', value: 300 },
  ];

  const optimizationOpportunities = [
    { 
      id: 1, 
      title: 'Right-size underutilized EC2 instances', 
      description: 'Several EC2 instances are running at less than 20% CPU utilization.',
      potentialSavings: 850,
      effort: 'Medium'
    },
    { 
      id: 2, 
      title: 'Use Reserved Instances for stable workloads', 
      description: 'Convert on-demand instances to reserved instances for predictable workloads.',
      potentialSavings: 1200,
      effort: 'Low'
    },
    { 
      id: 3, 
      title: 'Implement lifecycle policies for S3', 
      description: 'Move infrequently accessed data to lower-cost storage tiers.',
      potentialSavings: 400,
      effort: 'Low'
    },
    { 
      id: 4, 
      title: 'Optimize database provisioning', 
      description: 'Current RDS instances are overprovisioned for the workload.',
      potentialSavings: 650,
      effort: 'High'
    },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-devopsgenie-text">FinOps Report</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Cost</CardTitle>
            <CardDescription>Current billing cycle</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-3xl font-bold text-devopsgenie-primary">$8,300</div>
            <div className="flex items-center text-sm text-green-600 mt-2">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span>5% lower than last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Projected Annual Cost</CardTitle>
            <CardDescription>Based on current usage</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-3xl font-bold text-devopsgenie-primary">$99,600</div>
            <div className="flex items-center text-sm text-red-600 mt-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>12% higher than last year</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Potential Savings</CardTitle>
            <CardDescription>Based on recommendations</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="text-3xl font-bold text-devopsgenie-primary">$3,100</div>
            <div className="flex items-center text-sm text-blue-600 mt-2">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>26% of current spending</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Cost Overview</TabsTrigger>
          <TabsTrigger value="breakdown">Service Breakdown</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Spending Trend</CardTitle>
              <CardDescription>
                Breakdown of infrastructure costs over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Bar dataKey="compute" stackId="a" name="Compute" fill="#8884d8" />
                    <Bar dataKey="storage" stackId="a" name="Storage" fill="#82ca9d" />
                    <Bar dataKey="network" stackId="a" name="Network" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="breakdown">
          <Card>
            <CardHeader>
              <CardTitle>Service Cost Breakdown</CardTitle>
              <CardDescription>
                Distribution of costs across different AWS services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={serviceBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {serviceBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Cost Details</h3>
                  <div className="space-y-4">
                    {serviceBreakdown.map((service, index) => (
                      <div key={service.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          <span>{service.name}</span>
                        </div>
                        <span className="font-medium">${service.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="optimization">
          <Card>
            <CardHeader>
              <CardTitle>Cost Optimization Opportunities</CardTitle>
              <CardDescription>
                Recommendations to reduce infrastructure costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {optimizationOpportunities.map((opportunity) => (
                  <div key={opportunity.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{opportunity.title}</h3>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        ${opportunity.potentialSavings} savings
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{opportunity.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Effort: {opportunity.effort}</span>
                      <Button variant="outline" size="sm">Implement</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forecast">
          <Card>
            <CardHeader>
              <CardTitle>Cost Forecast</CardTitle>
              <CardDescription>
                Projected costs for the next 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      ...monthlyData,
                      { name: 'Jul', total: 11200 },
                      { name: 'Aug', total: 11400 },
                      { name: 'Sep', total: 11600 },
                      { name: 'Oct', total: 11800 },
                      { name: 'Nov', total: 12000 },
                      { name: 'Dec', total: 12200 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <Line type="monotone" dataKey="total" name="Total Cost" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Forecast Notes</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                  <li>Forecast based on current usage patterns and resource allocation</li>
                  <li>Growth rate of 2% month-over-month anticipated</li>
                  <li>Seasonal variations not accounted for in this projection</li>
                  <li>Implementing all optimization recommendations could reduce forecast by up to 25%</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinOpsReportPage;
