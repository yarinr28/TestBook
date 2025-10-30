interface S3Config {
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
  region?: string;
}

interface GraphqlConfig {
  url: string;
}

export const s3Config: S3Config = {
  bucket: process.env.S3_BUCKET_NAME || 'bucket',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'access-key',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'secret-key',
  region: process.env.AWS_REGION || 'us-east-1',
};

export const graphqlConfig: GraphqlConfig = {
  url: process.env.GRAPHQL_URL || 'http://yarinr.com',
}
