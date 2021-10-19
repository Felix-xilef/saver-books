import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  constructor(id: number, description: string) {
    this.id = id;
    this.description = description;
  }
}
