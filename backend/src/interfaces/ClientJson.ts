import { Client } from "../entities/clients/Client";

export interface ClientJson {
  cpf: string;

  name: string;

  phone: string;

  email: string;

  blockStart?: Date;

  blockEnd?: Date;
}

export function clientToJson(clientObject: Client): ClientJson {
  return {
    cpf: clientObject.cpf,
    email: clientObject.email,
    name: clientObject.name,
    phone: clientObject.phone,
    blockStart: clientObject.blockStart,
    blockEnd: clientObject.blockEnd
  };
}

export function jsonToClient(clientJson: ClientJson): Client {
  return new Client(
    clientJson.cpf,
    clientJson.name,
    clientJson.phone,
    clientJson.email,
    clientJson.blockStart,
    clientJson.blockEnd
  );
}