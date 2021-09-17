import { Request, Response } from "express";
import { rename } from "fs";

const formidable = require('formidable');

const IMAGES_FOLDER = './src/images/';

export class ImageController {
  async postImage(request: Request, response: Response): Promise<Response> {
    const form = new formidable.IncomingForm();

    form.parse(request, (err, fields, files) => {
      rename(files.bookCover.path, IMAGES_FOLDER + fields.bookCoverName, err => {
				return response.status(500).json({ "error": err.message })
      });
    });

    return response.status(201);
  }

	getImage(request: Request, response: Response): Response {
		const fileName = String(request.query.fileName);

		if (fileName) {
			response.status(200).sendFile(IMAGES_FOLDER + fileName);

		} else response.status(400).json({ "error": "isbn can't be null or undefined" });

		return response;
	}
}
