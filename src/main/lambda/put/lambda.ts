const logger = require('pino')()
import * as AWS from "aws-sdk";
const textract = new AWS.Textract({ region: "us-west-2" });
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || "";

// TOOD - replace `any` with correct event type
export const handler = async (event: any = {}): Promise<any> => {
    // Logs starting message + event
    logger.info("send-pdf-to-textract -> start");
    logger.info(JSON.stringify(event, null, 4));

    // Pulls filename from event
    const filename = event["Records"][0]["s3"]["object"]["key"];

    // Short-circuit if filename isn't defined
    if (!filename) {
        logger.info("ERROR - no filename found in S3 event");
        return;
    }

    // Logs filename
    logger.info("filename: " + filename);

    // Defines params for Textract API call
    const params: AWS.Textract.StartDocumentAnalysisRequest = {
        DocumentLocation: {
            S3Object: {
                Bucket: S3_BUCKET_NAME,
                Name: filename
            }
        },
        FeatureTypes: ["FORMS","TABLES"],
    };

    // Log startDocumentAnalysis param
    logger.info("startDocumentAnalysis params");
    logger.info(params);

    // Invoke Textract.startDocumentAnalysis
    await new Promise(resolve => {
        return textract.startDocumentAnalysis(params, function(err, data) {
            // Logs error state
            logger.info("startDocumentAnalysis - err");
            logger.info(err);

            // Logs success state
            logger.info("startDocumentAnalysis - data");
            logger.info(data);

            // Resolves with data
            resolve(data);
        });
    });

    // Logs shutdown message
    logger.info("send-pdf-to-textract -> shutdown");
    return;
};
