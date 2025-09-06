import { S3Uploader } from "./utils/s3-uploader";
import { ReportProcessor } from "./utils/report-processor";
import { ReportSender } from "./utils/report-sender";

export interface UploadOptions {
  runId: string;
  serviceName: string;
  teamName: string;
  reportPath: string;
  graphqlEndpoint: string;
  screenshotsDir?: string; // optional
}

export async function uploadReport(options: UploadOptions): Promise<string> {
  const { runId, serviceName, teamName, screenshotsDir, reportPath } = options;

  let updatedReportPath = reportPath;

  const uploader = new S3Uploader();
  const urls = await uploader.uploadScreenshots(screenshotsDir, runId, serviceName, teamName);

  if (Object.keys(urls).length > 0) {
    const processor = new ReportProcessor(reportPath);
    updatedReportPath = processor.attachScreenshots(urls);
  }

  const sender = new ReportSender();
  await sender.sendReport(updatedReportPath);

  return updatedReportPath;
}
