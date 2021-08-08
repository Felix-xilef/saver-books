import { Genre } from "../../entities/books/Genre";
import {getRepository, MigrationInterface, QueryRunner, Table} from "typeorm";

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

        await getRepository(Genre).insert([
            { description: 'Administração' },
            { description: 'Agropecuária' },
            { description: 'Artes' },
            { description: 'Autoajuda' },
            { description: 'Ciências Biológicas' },
            { description: 'Ciências Exatas' },
            { description: 'Ciências Humanas e Sociais' },
            { description: 'Contabilidade' },
            { description: 'Gastronomia' },
            { description: 'Cursos e Idiomas' },
            { description: 'Didáticos' },
            { description: 'Dicionários e Manuais de Conversação' },
            { description: 'Direito' },
            { description: 'Economia' },
            { description: 'Engenharia e Tecnologia' },
            { description: 'Esoterismo' },
            { description: 'Espiritismo' },
            { description: 'Esportes e Lazer' },
            { description: 'Geografia e Historia' },
            { description: 'Informática' },
            { description: 'Linguística' },
            { description: 'Literatura Infantojuvenil' },
            { description: 'Medicina' },
            { description: 'Psicologia e Psicanálise' },
            { description: 'Religião' },
            { description: 'Turismo' },
            { description: 'Biografias e Memórias' },
            { description: 'Ensaios' },
            { description: 'Ficção Científica e Fantasia' },
            { description: 'Humor' },
            { description: 'Poesia' },
            { description: 'Policial e Suspense' },
            { description: 'Romance' },
            { description: 'Terror' },
            { description: 'Contos e Crônicas' },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('genre');
    }

}
