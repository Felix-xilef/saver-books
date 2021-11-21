import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ReservationMigration2622422379731 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "reservation",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "reservedDate",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "withdrawalDate",
            type: "timestamp",
          },
          {
            name: "bookIsbn",
            type: "varchar",
          },
          {
            name: "reservationStatusId",
            type: "integer",
          },
          {
            name: "clientCpf",
            type: "varchar",
          },
        ],
        foreignKeys: [
          {
            name: "FKBook",
            columnNames: ["bookIsbn"],
            referencedColumnNames: ["isbn"],
            referencedTableName: "book",
          },
          {
            name: "FKReservationStatus",
            columnNames: ["reservationStatusId"],
            referencedColumnNames: ["id"],
            referencedTableName: "reservation_status",
          },
          {
            name: "FKReservationClient",
            columnNames: ["clientCpf"],
            referencedColumnNames: ["cpf"],
            referencedTableName: "client",
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("reservation");
  }
}
