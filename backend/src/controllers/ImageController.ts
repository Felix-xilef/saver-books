import { Request, Response } from "express";

export class ImageController {
  async postImage(request: Request, response: Response): Promise<Response> {

    console.log(request.body);

    return response;
  }
}