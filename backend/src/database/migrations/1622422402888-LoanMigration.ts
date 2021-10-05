import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class LoanMigration1622422402888 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'loan',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'withdrawalDate',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'returnDate',
                    type: 'timestamp'
                },
                {
                    name: 'bookIsbn',
                    type: 'varchar'
                },
                {
                    name: 'loanStatusId',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'FKBook',
                    columnNames: ['bookIsbn'],
                    referencedColumnNames: ['isbn'],
                    referencedTableName: 'book'
                },
                {
                    name: 'FKLoanStatus',
                    columnNames: ['loanStatusId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'loan_status'
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('loan');
    }

}
