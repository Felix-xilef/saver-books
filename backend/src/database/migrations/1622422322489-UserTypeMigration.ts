import { UserType } from "../../entities/users/UserType";
import { getRepository, MigrationInterface, QueryRunner, Table } from "typeorm";

export class UserTypeMigration1622422322489 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_type",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
          },
          {
            name: "description",
            type: "varchar",
          },
        ],
      }),
      true,
    );

    await getRepository(UserType).insert([
      {
        id: 1,
        description: "Gerente",
      },
      {
        id: 2,
        description: "Bibliotecário",
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_type");
  }
}
