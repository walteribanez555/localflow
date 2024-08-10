terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket = "s3-tr-localflow-lambda"
    region = "us-east-1"
    key = "dev/terraform.tfstate"
  }
}

# Configure the AWS Provider
provider "aws" {
    region = "us-east-1"


}