import { Book } from "../../entities/books/Book";
import { Genre } from "../../entities/books/Genre";
import {getRepository, MigrationInterface, QueryRunner, Table} from "typeorm";

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
        
        await getRepository(Book).insert([
            {
                isbn: '9781465473615',
                language: 'Inglês',
                title: 'Coding Games in Python',
                author: 'DK',
                publicDate: '2018-07-03',
                publisher: 'DK - Children (US)',
                summary: "Build and play your own computer games, from creative quizzes to perplexing puzzles, by coding them in the Python programming language!\nWhether you're a seasoned programmer or a beginner hoping to learn Python, you'll find Coding Games in Python fun to read and easy to follow. Each chapter shows you how to construct a complete working game in simple numbered steps. Using freely available resources such as Pygame, Pygame Zero, and a downloadable pack of images and sounds, you can add animations, music, scrolling backgrounds, scenery, and other exciting professional touches.",
                availCopies: 5,
                unavailCopies: 0,
                genre: new Genre(20, 'Informática'),
            },
            {
                isbn: '9788543107165',
                language: 'Português',
                title: 'SCRUM: a arte de fazer o dobro do trabalho na metade do tempo',
                author: 'Jeff Sutherland',
                publicDate: '2019-02-18',
                publisher: 'Editora Sextante',
                summary: 'Conheça o método que está revolucionando a produtividade das empresas.\n“Repleto de histórias empolgantes e exemplos reais. O método de gerenciamento de projetos conhecido como Scrum deve ser a ferramenta de produtividade mais largamente empregada entre as empresas de alta tecnologia. Jeff Sutherland tem sido brilhantemente bem-sucedido em sua missão de pôr esse recurso nas mãos de mais negócios em todo o mundo.” – Eric Ries, autor de A startup enxuta',
                availCopies: 7,
                unavailCopies: 0,
                genre: new Genre(1, 'Administração'),
            },
            {
                isbn: '9791022603591',
                language: 'Português',
                title: 'Memórias póstumas de Brás Cubas',
                author: 'Joaquim Machado De Assis',
                publicDate: '2014-01-17',
                publisher: 'Livros Cotovia',
                summary: 'Memórias Póstumas de Brás Cubas é um romance escrito por Machado de Assis, desenvolvido em princípio como folhetim, de março a dezembro de 1880, na Revista Brasileira, para, no ano seguinte, ser publicado como livro, pela então Tipografia Nacional como Memorias Posthumas de Braz Cubas.',
                availCopies: 3,
                unavailCopies: 0,
                genre: new Genre(33, 'Romance'),
            },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('book');
    }

}
