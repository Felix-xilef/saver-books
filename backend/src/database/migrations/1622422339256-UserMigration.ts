import { User } from "../../entities/users/User";
import { UserType } from "../../entities/users/UserType";
import { getRepository, MigrationInterface, QueryRunner, Table } from "typeorm";
import { hashSync } from "bcryptjs";

export class UserMigration1622422339256 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "cpf",
            type: "varchar(12)",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "birthDate",
            type: "date",
          },
          {
            name: "phone",
            type: "varchar(12)",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "userTypeId",
            type: "integer",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserType",
            columnNames: ["userTypeId"],
            referencedColumnNames: ["id"],
            referencedTableName: "user_type",
          },
        ],
      }),
      true,
    );

    await getRepository(User).insert({
      cpf: "50040030020",
      email: "dev@mail.com",
      password: hashSync("dev12345678"),
      name: "Dev User",
      userType: new UserType(1),
      birthDate: "",
      phone: "1150403020",
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
