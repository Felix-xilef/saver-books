import { ReservationStatus } from "../../entities/operations/ReservationStatus";
import { getRepository, MigrationInterface, QueryRunner, Table } from "typeorm";

export class ReservationStatusMigration1622422372503
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "reservation_status",
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

    await getRepository(ReservationStatus).insert([
      {
        id: 1,
        description: "Aberto",
      },
      {
        id: 2,
        description: "Atrasado",
      },
      {
        id: 3,
        description: "Retirado",
      },
      {
        id: 4,
        description: "Cancelado",
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("reservation_status");
  }
}
