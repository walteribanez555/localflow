output "api_id" {
  value = aws_apigatewayv2_api.lambda.id
}

output "execution_arn" {
  value = aws_apigatewayv2_api.lambda.execution_arn
}
