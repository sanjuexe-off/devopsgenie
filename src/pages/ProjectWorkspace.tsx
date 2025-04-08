
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { 
  Code, LineChart, FileText, BarChart, 
  Download, RefreshCw, Share2, MessageSquare
} from 'lucide-react';

const ProjectWorkspace: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [promptValue, setPromptValue] = useState('');
  
  // Mock project data
  const project = {
    name: projectId === '1' 
      ? 'E-commerce Platform' 
      : projectId === '2' 
        ? 'Microservices Backend' 
        : 'Serverless API',
    description: 'A scalable cloud infrastructure for supporting a high-traffic e-commerce application with microservices architecture.',
    status: 'Active',
    createdAt: 'April 2, 2023',
    updatedAt: 'April 8, 2023',
    cloudProvider: 'AWS',
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would trigger the AI processing in a real app
    console.log("Processing prompt:", promptValue);
    // Reset the input field
    setPromptValue('');
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-devopsgenie-text">{project.name}</h1>
          <p className="text-devopsgenie-text-secondary">{project.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="bg-devopsgenie-primary hover:bg-opacity-90">
            <RefreshCw className="mr-2 h-4 w-4" />
            Update Project
          </Button>
        </div>
      </div>
      
      {/* Project Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-devopsgenie-text-secondary">
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="font-medium">{project.status}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-devopsgenie-text-secondary">
              Cloud Provider
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-medium">{project.cloudProvider}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-devopsgenie-text-secondary">
              Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-medium">{project.createdAt}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-devopsgenie-text-secondary">
              Last Updated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-medium">{project.updatedAt}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Project Prompt Input */}
      <Card>
        <CardHeader>
          <CardTitle>Update Project</CardTitle>
          <CardDescription>
            Refine your deployment strategy by providing additional requirements or changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePromptSubmit} className="space-y-4">
            <div className="flex flex-col">
              <Input
                placeholder="e.g., Add Redis caching layer, Implement auto-scaling for the API service..."
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
                className="min-h-[100px] p-4"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-devopsgenie-primary hover:bg-opacity-90">
                <MessageSquare className="mr-2 h-4 w-4" />
                Process Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Project Details Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="infra-code">Infrastructure Code</TabsTrigger>
          <TabsTrigger value="architecture">Architecture Diagram</TabsTrigger>
          <TabsTrigger value="finops">FinOps</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
              <CardDescription>Generated infrastructure components and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-devopsgenie-background-alt p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Code className="h-5 w-5 mr-2 text-devopsgenie-primary" />
                    Infrastructure Components
                  </h3>
                  <ul className="space-y-2 text-devopsgenie-text-secondary">
                    <li>• 2 VPC Networks</li>
                    <li>• 4 Subnets</li>
                    <li>• 3 Security Groups</li>
                    <li>• 2 Load Balancers</li>
                    <li>• 6 EC2 Instances</li>
                    <li>• 1 RDS Database</li>
                  </ul>
                </div>
                
                <div className="bg-devopsgenie-background-alt p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <LineChart className="h-5 w-5 mr-2 text-devopsgenie-primary" />
                    Services
                  </h3>
                  <ul className="space-y-2 text-devopsgenie-text-secondary">
                    <li>• API Gateway</li>
                    <li>• ECS Cluster</li>
                    <li>• ElastiCache</li>
                    <li>• S3 Storage</li>
                    <li>• CloudFront CDN</li>
                    <li>• Route53</li>
                  </ul>
                </div>
                
                <div className="bg-devopsgenie-background-alt p-4 rounded-lg">
                  <h3 className="font-medium mb-2 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-devopsgenie-primary" />
                    Generated Files
                  </h3>
                  <ul className="space-y-2 text-devopsgenie-text-secondary">
                    <li>• main.tf</li>
                    <li>• variables.tf</li>
                    <li>• outputs.tf</li>
                    <li>• modules/ (6 modules)</li>
                    <li>• README.md</li>
                    <li>• architecture.png</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Estimate</CardTitle>
                <CardDescription>Monthly cloud spending projection</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-devopsgenie-text-secondary">Total Estimated Cost</span>
                    <span className="text-2xl font-bold">$1,240.00</span>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Compute (EC2)</span>
                      <span className="font-medium">$620.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Database (RDS)</span>
                      <span className="font-medium">$280.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage (S3)</span>
                      <span className="font-medium">$95.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CDN (CloudFront)</span>
                      <span className="font-medium">$120.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Services</span>
                      <span className="font-medium">$125.00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Activity items */}
                  <div className="flex items-start gap-4">
                    <div className="bg-devopsgenie-primary/10 p-2 rounded-full">
                      <RefreshCw className="h-4 w-4 text-devopsgenie-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Updated infrastructure code</p>
                      <p className="text-sm text-devopsgenie-text-secondary">1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <BarChart className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Generated new FinOps report</p>
                      <p className="text-sm text-devopsgenie-text-secondary">2 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <LineChart className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Updated architecture diagram</p>
                      <p className="text-sm text-devopsgenie-text-secondary">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Infrastructure Code Tab */}
        <TabsContent value="infra-code">
          <Card>
            <CardHeader>
              <CardTitle>Infrastructure as Code</CardTitle>
              <CardDescription>
                Generated Terraform files for your cloud infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto max-h-[600px]">
                {/* This would contain actual code in a real app */}
                <pre className="font-mono text-sm">
                  {`# main.tf
provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "./modules/vpc"
  
  vpc_cidr_block = var.vpc_cidr_block
  public_subnet_cidrs = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  availability_zones = var.availability_zones
}

module "security_groups" {
  source = "./modules/security"
  
  vpc_id = module.vpc.vpc_id
  ingress_cidr_blocks = var.ingress_cidr_blocks
}

module "load_balancer" {
  source = "./modules/alb"
  
  vpc_id = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnet_ids
  security_group_id = module.security_groups.alb_sg_id
  certificate_arn = var.certificate_arn
}

module "database" {
  source = "./modules/rds"
  
  engine = "postgres"
  engine_version = "13.4"
  instance_class = "db.t3.large"
  allocated_storage = 100
  subnet_ids = module.vpc.private_subnet_ids
  security_group_id = module.security_groups.db_sg_id
  database_name = var.database_name
  database_username = var.database_username
  database_password = var.database_password
}

# ... more infrastructure code ...`}
                </pre>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Code
                </Button>
                <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Architecture Diagram Tab */}
        <TabsContent value="architecture">
          <Card>
            <CardHeader>
              <CardTitle>Architecture Diagram</CardTitle>
              <CardDescription>Visual representation of your cloud infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 flex items-center justify-center bg-gray-50">
                {/* This would be an actual architecture diagram in a real app */}
                <div className="text-center">
                  <LineChart className="h-32 w-32 mx-auto text-devopsgenie-text-secondary opacity-50" />
                  <p className="mt-4 text-devopsgenie-text-secondary">
                    Architecture diagram would be displayed here
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Diagram
                </Button>
                <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate Diagram
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* FinOps Tab */}
        <TabsContent value="finops">
          <Card>
            <CardHeader>
              <CardTitle>FinOps Report</CardTitle>
              <CardDescription>Cost analysis and optimization recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cost Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Cost Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center">
                        <BarChart className="h-16 w-16 text-devopsgenie-text-secondary opacity-50" />
                        <span className="ml-4 text-devopsgenie-text-secondary">
                          Cost breakdown chart would appear here
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Monthly Forecast */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Monthly Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center">
                        <LineChart className="h-16 w-16 text-devopsgenie-text-secondary opacity-50" />
                        <span className="ml-4 text-devopsgenie-text-secondary">
                          Monthly forecast chart would appear here
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Optimization Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Optimization Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-700 mb-1">Right-size EC2 Instances</h4>
                        <p className="text-blue-600 text-sm">
                          Our analysis shows that your t3.large instances are underutilized. 
                          Switching to t3.medium could save $180/month.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-medium text-green-700 mb-1">Reserved Instances Opportunity</h4>
                        <p className="text-green-600 text-sm">
                          Converting your on-demand instances to 1-year Reserved Instances 
                          could save $450/month (36% reduction).
                        </p>
                      </div>
                      
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-medium text-yellow-700 mb-1">S3 Lifecycle Policies</h4>
                        <p className="text-yellow-600 text-sm">
                          Implementing S3 lifecycle policies to move infrequently accessed data 
                          to S3 IA could save $65/month.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Documentation Tab */}
        <TabsContent value="docs">
          <Card>
            <CardHeader>
              <CardTitle>Project Documentation</CardTitle>
              <CardDescription>Auto-generated documentation for your infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <h2>E-commerce Platform Infrastructure</h2>
                <p>This documentation provides an overview of the cloud infrastructure created for the E-commerce Platform project.</p>
                
                <h3>Architecture Overview</h3>
                <p>
                  The infrastructure is deployed on AWS and follows a multi-tier architecture pattern with separate 
                  environments for production and staging. The application is containerized and runs on ECS with 
                  auto-scaling capabilities.
                </p>
                
                <h3>Network Configuration</h3>
                <ul>
                  <li><strong>VPC:</strong> A dedicated VPC with CIDR block 10.0.0.0/16</li>
                  <li><strong>Public Subnets:</strong> 2 public subnets across different availability zones</li>
                  <li><strong>Private Subnets:</strong> 4 private subnets (2 for application tier, 2 for database tier)</li>
                </ul>
                
                <h3>Security</h3>
                <p>
                  Security is implemented at multiple levels:
                </p>
                <ul>
                  <li>Network ACLs and security groups restrict traffic flow</li>
                  <li>SSL/TLS termination at the load balancer</li>
                  <li>Private subnets for sensitive components</li>
                  <li>IAM roles and policies follow the principle of least privilege</li>
                </ul>
                
                <h3>Deployment Instructions</h3>
                <ol>
                  <li>Configure AWS credentials</li>
                  <li>Update the variables.tf file with your specific values</li>
                  <li>Run <code>terraform init</code> to initialize the project</li>
                  <li>Run <code>terraform plan</code> to preview changes</li>
                  <li>Run <code>terraform apply</code> to create the infrastructure</li>
                </ol>
                
                <h3>Maintenance Procedures</h3>
                <p>
                  Regular maintenance should include:
                </p>
                <ul>
                  <li>Applying security patches to EC2 instances</li>
                  <li>Reviewing and optimizing database performance</li>
                  <li>Monitoring CloudWatch metrics and alarms</li>
                  <li>Updating infrastructure code as needed</li>
                </ul>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export as PDF
                </Button>
                <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Update Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectWorkspace;
