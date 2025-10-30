import fs from "fs";
import fetch from "node-fetch";
import { graphqlConfig } from "../config";

export class ReportSender {
    private loadReport(reportPath: string) {
        return JSON.parse(fs.readFileSync(reportPath, "utf-8"));
    }

    private async send(report: any) { //TODO - add type
        const res = await fetch(graphqlConfig.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: `
          mutation UploadReport($report: JSON!) {
            uploadCypressReport(report: $report)
          }
        `,
                variables: { report }
            })
        });

        const data = await res.json();
        console.log("Report uploaded:", data);
    }

    async sendReport(reportPath: string) {
        const report = this.loadReport(reportPath);
        await this.send(report);
    }
}
