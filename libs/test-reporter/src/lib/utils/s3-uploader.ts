import AWS from "aws-sdk";
import fs from "fs";
import path from "path";
import { s3Config } from "../config";

export class S3Uploader {
  private s3: AWS.S3;

  constructor() {
    const { accessKeyId, secretAccessKey, region } = s3Config;
    this.s3 = new AWS.S3({ accessKeyId, secretAccessKey, region });
  }

  private async uploadFile(localPath: string, s3Key: string): Promise<string> {
    await this.s3.putObject({
      Bucket: s3Config.bucket,
      Key: s3Key,
      Body: fs.readFileSync(localPath),
      ContentType: "image/png",
      ACL: "public-read",
    }).promise();

    return `https://${s3Config.bucket}/${s3Key}`;
  }

  private getS3Key(fileName: string, runId: string, serviceName: string, teamName: string) {
    return `runs/${teamName}/${serviceName}/${runId}/${fileName}`;
  }

  async uploadScreenshots(
    screenshotsDir: string | undefined,
    runId: string,
    serviceName: string,
    teamName: string
  ): Promise<Record<string, string>> {
    if (!screenshotsDir || !fs.existsSync(screenshotsDir)) return {};

    const files = fs.readdirSync(screenshotsDir);
    const urls: Record<string, string> = {};

    for (const file of files) {
      const filePath = path.join(screenshotsDir, file);
      const s3Key = this.getS3Key(file, runId, serviceName, teamName);
      urls[file] = await this.uploadFile(filePath, s3Key);
    }

    return urls;
  }
}
