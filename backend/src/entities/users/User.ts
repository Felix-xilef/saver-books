import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { hashSync } from "bcryptjs";
import { UserType } from "./UserType";

@Entity()
export class User {
  @PrimaryColumn()
  cpf: string;

  @Column()
  name: string;

  @Column()
  birthDate: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  userTypeId: number;
  @ManyToOne(() => UserType)
  userType: UserType;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = hashSync(this.password);
  }

  constructor(
    cpf: string,
    name: string,
    birthDate: string,
    phone: string,
    email: string,
    password: string,
    userType: UserType,
  ) {
    this.cpf = cpf;
    this.name = name;
    this.birthDate = birthDate;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.userType = userType;
  }
}
