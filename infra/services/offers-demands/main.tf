

# module "s3" {
#   source = "./modules/s3"
# }

module "api-gateway" {
  source = "./modules/api"
  
}



module "lambda" {
  source = "./modules/lambda"
  # lambda_bucket_id = module.s3.lambda_bucket_id
  # lambda_app_key = module.s3.lambda_app_key
  
}

module "cloudwatch" {
  source = "./modules/cloudwatch"
  lambda_function_name = module.lambda.lambda_function_name
}



resource "aws_apigatewayv2_integration" "app" {
  api_id             = module.api-gateway.api_id
  integration_uri    = module.lambda.invoke_arn
  integration_type   = "AWS_PROXY"
}

resource "aws_apigatewayv2_route" "any" {
  api_id = module.api-gateway.api_id
  route_key = "$default"
  target    = "integrations/${aws_apigatewayv2_integration.app.id}"
}

resource "aws_lambda_permission" "allow_apigw_invoke" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda.lambda_arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${module.api-gateway.execution_arn}/*/*"
}