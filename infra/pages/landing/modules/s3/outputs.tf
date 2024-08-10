output "website_domain" {
  value = aws_s3_bucket.mybucket.bucket_regional_domain_name
}

output "bucket_name" {
  value = var.bucketname

}
output "bucket_id" {
  value = aws_s3_bucket.mybucket.id

}


