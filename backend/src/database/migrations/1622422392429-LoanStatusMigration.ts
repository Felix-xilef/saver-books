import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class LoanStatusMigration1622422392429 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'loan_status',
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

        await queryRunner.query('insert into loan_status (description) values ("Retirado"), ("Atrasado"), ("Devolvido")');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('loan_status');
    }

}
