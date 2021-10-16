import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddClientToLoan1633441131252 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "loan",
      new TableColumn({
        name: "clientCpf",
        type: "varchar",
      }),
    );

    await queryRunner.createForeignKey(
      "loan",
      new TableForeignKey({
        name: "FKLoanClient",
        columnNames: ["clientCpf"],
        referencedColumnNames: ["cpf"],
        referencedTableName: "client",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("loan", "FKLoanClient");
    await queryRunner.dropColumn("loan", "clientCpf");
  }
}
