import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Client } from "../entities/clients/Client";
import { ClientJson } from "../interfaces/ClientJson";

const getJsonFromClient = (client: Client): ClientJson => {
  return {
    cpf: client.cpf,
    email: client.email,
    name: client.name,
    phone: client.phone,
    blockStart: client.blockStart,
    blockEnd: client.blockEnd,
  };
}

const getClientFromJson = (clientJson: ClientJson): Client => {
  return new Client(
    clientJson.cpf,
    clientJson.name,
    clientJson.phone,
    clientJson.email,
    clientJson?.blockStart,
    clientJson?.blockEnd,
  );
}

const clientRepository = getRepository(Client);

export class ClientController {
  async select(request: Request, response: Response): Promise<Response> {
    const cpf = String(request.query.cpf);

    if (cpf) {
      try {
        const client: Client = await clientRepository.findOne(cpf);
  
        if (client) {
          response.status(200).json(getJsonFromClient(client));
        } else {
          response.status(404).json({ "error": "Client not found" });
        }
      } catch (error) {
          response.status(500).json({ "error": error.message });
      }
    } else {
        response.status(400).json({ "error": "cpf can't be null or undefined" });
    }

    return response;
  }

  async selectAll(request: Request, response: Response): Promise<Response> {
    try {
        const clients: Client[] = await clientRepository.find();

        const clientsJson: ClientJson[] = [];

        clients.forEach((client) => {
            clientsJson.push(getJsonFromClient(client));
        });

        response.status(200).json(clientsJson)

    } catch (error) {
        response.status(500).json({ "error": error.message });;
    }

    return response;
  }

  async saveEntry(request: Request, response: Response): Promise<Response> {
    const requestClient = request.body;

    const clientExists = await clientRepository.findOne({where: {cpf: requestClient.cpf}});

    if (clientExists) {
      response.status(422).json({ "error": "client already exists"});
    } else {
        try {
          const client = clientRepository.create(getClientFromJson(requestClient));

          await clientRepository.save(client);

          response.status(201).json(getJsonFromClient(client));
        } catch (error) {
            response.status(500).json({ "error": error.message });
        }
    }

    return response;
  }

  async update(request: Request, response: Response): Promise<Response> {
    const requestClient = request.body;

    let client = await clientRepository.findOne({where: {cpf: requestClient.cpf}});

    if (!client) {
      response.status(404).json({ "error": "client not found"});
    } else {
        try {
          client = getClientFromJson(requestClient);

          await clientRepository.save(client);

          response.status(200).json(getJsonFromClient(client));
        } catch (error) {
          response.status(500).json({ "error": error.message })
        }
    }

    return response;
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const cpf = String(request.query.cpf);

    if (cpf) {
      try {
        const client: Client = await clientRepository.findOne(cpf);

        if (client) {
          clientRepository.remove(client);

          response.status(200).json(getJsonFromClient(client));
        }
      } catch (error) {
        response.status(500).json({ "error": error.message });
      }

    } else {
      response.status(400).json({ "error": "cpf can't be null of undefined" });
    }

    return response;
  }
}