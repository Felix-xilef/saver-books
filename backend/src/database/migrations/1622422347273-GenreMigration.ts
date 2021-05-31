import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class GenreMigration1622422347273 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'genre',
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

        await queryRunner.query('insert into genre (description) values ("Administração"), ("Agropecuária"), ("Artes"), ("Autoajuda"), ("Ciências Biológicas"), ("Ciências Exatas"), ("Ciências Humanas e Sociais"), ("Contabilidade"), ("Gastronomia"), ("Cursos e Idiomas"), ("Didáticos"), ("Dicionários e Manuais de Conversação"), ("Direito"), ("Economia"), ("Engenharia e Tecnologia"), ("Esoterismo"), ("Espiritismo"), ("Esportes e Lazer"), ("Geografia e Historia"), ("Informática"), ("Linguística"), ("Literatura Infantojuvenil"), ("Medicina"), ("Psicologia e Psicanálise"), ("Religião"), ("Turismo"), ("Audiolivro"), ("Biografias e Memórias"), ("Ensaios"), ("Ficção Científica e Fantasia"), ("Humor"), ("Poesia"), ("Policial e Suspense"), ("Romance"), ("Terror"), ("Contos e Crônicas")');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('genre');
    }

}

// Gêneros -> ("Administração"), ("Agropecuária"), ("Artes"), ("Autoajuda"), ("Ciências Biológicas"), ("Ciências Exatas"), ("Ciências Humanas e Sociais"), ("Contabilidade"), ("Gastronomia"), ("Cursos e Idiomas"), ("Didáticos"), ("Dicionários e Manuais de Conversação"), ("Direito"), ("Economia"), ("Engenharia e Tecnologia"), ("Esoterismo"), ("Espiritismo"), ("Esportes e Lazer"), ("Geografia e Historia"), ("Informática"), ("Linguística"), ("Literatura Infantojuvenil"), ("Medicina"), ("Psicologia e Psicanálise"), ("Religião"), ("Turismo"), ("Audiolivro"), ("Biografias e Memórias"), ("Ensaios"), ("Ficção Científica e Fantasia"), ("Humor"), ("Poesia"), ("Policial e Suspense"), ("Romance"), ("Terror"), ("Contos e Crônicas")
