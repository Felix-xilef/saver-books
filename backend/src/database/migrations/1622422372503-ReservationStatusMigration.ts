import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ReservationStatusMigration1622422372503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'reservation_status',
            columns:[
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: 'description',
                    type: 'varchar',
                }
            ]
        }), true);

        await queryRunner.query('insert into reservation_status (description) values ("Aberto"), ("Atrasado"), ("Retirado"), ("Cancelado")');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('reservation_status');
    }

}
