import { Request, Response } from "express";
import { S3, config } from "aws-sdk";

export class ImageController {

  constructor() {
    config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async getS3Url(request: Request, response: Response): Promise<Response> {
    const fileName = String(request.query.fileName);

    if (fileName && fileName.length > 0) {
      try {
        const url = await (new S3({
          apiVersion: "2006-03-01",
          signatureVersion: "v4",
        })).getSignedUrlPromise(
          "putObject",
          {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Expires: 60
          }
        );
        
        response.status(200).json({ url });

      } catch (error) {
        response.status(500).json({ error });
      }

    } else response.status(400).send("fileName is required");

    return response;
  }
}
