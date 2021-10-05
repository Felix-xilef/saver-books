import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ClientMigration1633400492450 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'client',
            columns: [
                {
                    name: 'cpf',
                    type: 'varchar(12)',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'phone',
                    type: 'varchar(12)'
                },
                {
                    name: 'email',
                    type: 'varchar'
                },
                {
                    name: 'blockStart',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'blockEnd',
                    type: 'timestamp',
                    isNullable: true
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('client');
    }

}
