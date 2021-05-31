import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class BookMigration1622422355891 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'book',
            columns: [
                {
                    name: 'isbn',
                    type: 'varchar(14)',
                    isPrimary: true
                },
                {
                    name: 'language',
                    type: 'varchar'
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'author',
                    type: 'varchar'
                },
                {
                    name: 'publicDate',
                    type: 'date'
                },
                {
                    name: 'publisher',
                    type: 'varchar'
                },
                {
                    name: 'summary',
                    type: 'varchar'
                },
                {
                    name: 'availCopies',
                    type: 'integer'
                },
                {
                    name: 'unavailCopies',
                    type: 'integer'
                },
                {
                    name: 'genreId',
                    type: 'integer'
                }
            ],
            foreignKeys: [
                {
                    name: 'FKGenre',
                    columnNames: ['genreId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'genre'
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('book');
    }

}
