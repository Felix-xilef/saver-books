import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddClientToReservation1633440429416 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "reservation",
      new TableColumn({
        name: "clientCpf",
        type: "varchar",
      }),
    );

    await queryRunner.createForeignKey(
      "reservation",
      new TableForeignKey({
        name: "FKReservationClient",
        columnNames: ["clientCpf"],
        referencedColumnNames: ["cpf"],
        referencedTableName: "client",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("reservation", "FKReservationClient");
    await queryRunner.dropColumn("reservation", "clientCpf");
  }
}
