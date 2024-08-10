variable "lambda_name" {
  description = "name of lambda function"
  type = string
  default = "lambda-localflow"
}

variable "lambda_log_retention" {
  description = "lambda log retention in days"
  type = number
  default = 7
}

# variable "lambda_bucket_id"{
#     description = "bucket s3"
#     type = string
# }


# variable "lambda_app_key"{
#     description = "lambda app key"
#     type = string
# }
