import fs from "fs";
import path from "path";

export class ReportProcessor {
  constructor(private reportPath: string) {}

  private loadReport() {
    return JSON.parse(fs.readFileSync(this.reportPath, "utf-8"));
  }

  private saveReport(report: any, outputPath: string) { //TODO - add type
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  }

  attachScreenshots(urls: Record<string, string>): string {
    const report = this.loadReport();

    for (const file of report.results) {
      for (const test of file.tests) {
        if (test.screenshotPath) {
          const fileName = path.basename(test.screenshotPath);
          test.screenshotUrl = urls[fileName];
        }
      }
    }

    const outputPath = this.reportPath.replace(".json", "-with-screenshots.json");
    this.saveReport(report, outputPath);

    return outputPath;
  }
}
