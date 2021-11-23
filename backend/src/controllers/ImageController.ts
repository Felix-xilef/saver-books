import { Request, Response } from "express";
import { rename } from "fs";
import { resolve } from "path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const formidable = require("formidable");

const IMAGES_FOLDER = "./public/images/";

export class ImageController {
  async postImage(request: Request, response: Response): Promise<Response> {
    const form = new formidable.IncomingForm();

    form.parse(request, (err, fields, files) => {
      rename(
        files.bookCover.path,
        IMAGES_FOLDER + fields.bookCoverName,
        (err) => {
          return response.status(500).json({ error: err });
        },
      );
    });

    return response.status(201);
  }

  getImage(request: Request, response: Response): Response {
    const fileName = String(request.query.fileName);

    if (fileName) {
      response.status(200).sendFile(resolve(IMAGES_FOLDER + fileName));
    } else
      response.status(400).json({ error: "isbn can't be null or undefined" });

    return response;
  }
}
