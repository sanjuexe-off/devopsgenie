
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Copy, RefreshCw, Eye } from 'lucide-react';

const InfrastructureCodePage: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const mainTfCode = `# main.tf - Terraform configuration for the project
provider "aws" {
  region = var.aws_region
}

module "networking" {
  source        = "./modules/networking"
  vpc_cidr      = var.vpc_cidr
  subnet_count  = var.subnet_count
}

module "compute" {
  source        = "./modules/compute"
  vpc_id        = module.networking.vpc_id
  subnet_ids    = module.networking.subnet_ids
  instance_type = var.instance_type
  key_name      = var.key_name
}

module "database" {
  source        = "./modules/database"
  vpc_id        = module.networking.vpc_id
  subnet_ids    = module.networking.subnet_ids
}`;

  const networkingTfCode = `# modules/networking/main.tf
resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
  
  tags = {
    Name = "main-vpc"
  }
}

resource "aws_subnet" "public" {
  count             = var.subnet_count
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]
  
  tags = {
    Name = "public-subnet-\${count.index}"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "main-igw"
  }
}`;

  const computeTfCode = `# modules/compute/main.tf
resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Security group for web servers"
  vpc_id      = var.vpc_id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web" {
  count         = var.instance_count
  ami           = data.aws_ami.amazon_linux.id
  instance_type = var.instance_type
  subnet_id     = var.subnet_ids[count.index % length(var.subnet_ids)]
  key_name      = var.key_name
  
  tags = {
    Name = "web-server-\${count.index}"
  }
}`;

  const databaseTfCode = `# modules/database/main.tf
resource "aws_security_group" "db" {
  name        = "db-sg"
  description = "Security group for database instances"
  vpc_id      = var.vpc_id
  
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [var.web_security_group_id]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_subnet_group" "main" {
  name       = "main"
  subnet_ids = var.subnet_ids
  
  tags = {
    Name = "main-db-subnet-group"
  }
}

resource "aws_db_instance" "main" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "13.4"
  instance_class       = "db.t3.micro"
  name                 = "mydb"
  username             = var.db_username
  password             = var.db_password
  db_subnet_group_name = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.db.id]
  skip_final_snapshot  = true
}`;

  const variablesTfCode = `# variables.tf
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "subnet_count" {
  description = "Number of subnets"
  type        = number
  default     = 2
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "SSH key name"
  type        = string
}

variable "db_username" {
  description = "Database username"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}`;

  const handleCopyCode = (code: string, fileName: string) => {
    navigator.clipboard.writeText(code);
    setCopySuccess(fileName);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-devopsgenie-text">Infrastructure Code</h1>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
          <Button className="bg-devopsgenie-primary hover:bg-opacity-90">
            <RefreshCw className="w-4 h-4 mr-2" />
            Update Infrastructure
          </Button>
        </div>
      </div>

      <Tabs defaultValue="main">
        <TabsList className="mb-4">
          <TabsTrigger value="main">main.tf</TabsTrigger>
          <TabsTrigger value="networking">networking.tf</TabsTrigger>
          <TabsTrigger value="compute">compute.tf</TabsTrigger>
          <TabsTrigger value="database">database.tf</TabsTrigger>
          <TabsTrigger value="variables">variables.tf</TabsTrigger>
        </TabsList>
        
        <TabsContent value="main">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>main.tf</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopyCode(mainTfCode, "main.tf")}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  {copySuccess === "main.tf" ? "Copied!" : "Copy"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto font-mono text-sm">
                {mainTfCode}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="networking">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>modules/networking/main.tf</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopyCode(networkingTfCode, "networking.tf")}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  {copySuccess === "networking.tf" ? "Copied!" : "Copy"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto font-mono text-sm">
                {networkingTfCode}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compute">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>modules/compute/main.tf</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopyCode(computeTfCode, "compute.tf")}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  {copySuccess === "compute.tf" ? "Copied!" : "Copy"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto font-mono text-sm">
                {computeTfCode}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="database">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>modules/database/main.tf</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopyCode(databaseTfCode, "database.tf")}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  {copySuccess === "database.tf" ? "Copied!" : "Copy"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto font-mono text-sm">
                {databaseTfCode}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="variables">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>variables.tf</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleCopyCode(variablesTfCode, "variables.tf")}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  {copySuccess === "variables.tf" ? "Copied!" : "Copy"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto font-mono text-sm">
                {variablesTfCode}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InfrastructureCodePage;
