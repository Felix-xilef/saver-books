import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Client {
  @PrimaryColumn()
  cpf: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ type: "timestamp", nullable: true })
  blockStart?: Date;

  @Column({ type: "timestamp", nullable: true })
  blockEnd?: Date;

  constructor(
    cpf: string,
    name: string,
    phone: string,
    email: string,
    blockStart: Date,
    blockEnd: Date,
  ) {
    this.cpf = cpf;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.blockStart = blockStart;
    this.blockEnd = blockEnd;
  }
}
