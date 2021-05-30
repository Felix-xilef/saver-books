import {MigrationInterface, QueryRunner} from "typeorm";

export class MainMigration1622404317588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "genre" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "book" ("isbn" varchar PRIMARY KEY NOT NULL, "language" varchar NOT NULL, "title" varchar NOT NULL, "author" varchar NOT NULL, "publicDate" date NOT NULL, "publisher" varchar NOT NULL, "summary" varchar NOT NULL, "availCopies" integer NOT NULL, "unavailCopies" integer NOT NULL, "genreId" integer)`);
        await queryRunner.query(`CREATE TABLE "loan_status" ("id" integer PRIMARY KEY NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "loan" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "cpf" varchar NOT NULL, "name" varchar NOT NULL, "phone" varchar NOT NULL, "email" varchar NOT NULL, "withdrawalDate" datetime NOT NULL, "returnDate" datetime NOT NULL, "bookIsbn" varchar, "loanStatusId" integer)`);
        await queryRunner.query(`CREATE TABLE "reservation_status" ("id" integer PRIMARY KEY NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "reservation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "cpf" varchar NOT NULL, "name" varchar NOT NULL, "phone" varchar NOT NULL, "email" varchar NOT NULL, "reservedDate" datetime NOT NULL, "withdrawalDate" datetime NOT NULL, "bookIsbn" varchar, "reservationStatusId" integer)`);
        await queryRunner.query(`CREATE TABLE "user_type" ("id" integer PRIMARY KEY NOT NULL, "description" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("cpf" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "birthDate" varchar NOT NULL, "phone" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "userTypeId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_book" ("isbn" varchar PRIMARY KEY NOT NULL, "language" varchar NOT NULL, "title" varchar NOT NULL, "author" varchar NOT NULL, "publicDate" date NOT NULL, "publisher" varchar NOT NULL, "summary" varchar NOT NULL, "availCopies" integer NOT NULL, "unavailCopies" integer NOT NULL, "genreId" integer, CONSTRAINT "FK_6ee57fcf22c96838179e5b46b2d" FOREIGN KEY ("genreId") REFERENCES "genre" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_book"("isbn", "language", "title", "author", "publicDate", "publisher", "summary", "availCopies", "unavailCopies", "genreId") SELECT "isbn", "language", "title", "author", "publicDate", "publisher", "summary", "availCopies", "unavailCopies", "genreId" FROM "book"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`ALTER TABLE "temporary_book" RENAME TO "book"`);
        await queryRunner.query(`CREATE TABLE "temporary_loan" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "cpf" varchar NOT NULL, "name" varchar NOT NULL, "phone" varchar NOT NULL, "email" varchar NOT NULL, "withdrawalDate" datetime NOT NULL, "returnDate" datetime NOT NULL, "bookIsbn" varchar, "loanStatusId" integer, CONSTRAINT "FK_27483cf8c21378e7190c60be573" FOREIGN KEY ("bookIsbn") REFERENCES "book" ("isbn") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_12f41d3815b6ab33c67678a91a4" FOREIGN KEY ("loanStatusId") REFERENCES "loan_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_loan"("id", "cpf", "name", "phone", "email", "withdrawalDate", "returnDate", "bookIsbn", "loanStatusId") SELECT "id", "cpf", "name", "phone", "email", "withdrawalDate", "returnDate", "bookIsbn", "loanStatusId" FROM "loan"`);
        await queryRunner.query(`DROP TABLE "loan"`);
        await queryRunner.query(`ALTER TABLE "temporary_loan" RENAME TO "loan"`);
        await queryRunner.query(`CREATE TABLE "temporary_reservation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "cpf" varchar NOT NULL, "name" varchar NOT NULL, "phone" varchar NOT NULL, "email" varchar NOT NULL, "reservedDate" datetime NOT NULL, "withdrawalDate" datetime NOT NULL, "bookIsbn" varchar, "reservationStatusId" integer, CONSTRAINT "FK_e96ebdaac6bb4888c06c6bd27fa" FOREIGN KEY ("bookIsbn") REFERENCES "book" ("isbn") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_81d656b1468f0b532ec58e7b885" FOREIGN KEY ("reservationStatusId") REFERENCES "reservation_status" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_reservation"("id", "cpf", "name", "phone", "email", "reservedDate", "withdrawalDate", "bookIsbn", "reservationStatusId") SELECT "id", "cpf", "name", "phone", "email", "reservedDate", "withdrawalDate", "bookIsbn", "reservationStatusId" FROM "reservation"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`ALTER TABLE "temporary_reservation" RENAME TO "reservation"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("cpf" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "birthDate" varchar NOT NULL, "phone" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "userTypeId" integer, CONSTRAINT "FK_29f29dffce2845a1abc901d4e85" FOREIGN KEY ("userTypeId") REFERENCES "user_type" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("cpf", "name", "birthDate", "phone", "email", "password", "userTypeId") SELECT "cpf", "name", "birthDate", "phone", "email", "password", "userTypeId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("cpf" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "birthDate" varchar NOT NULL, "phone" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "userTypeId" integer)`);
        await queryRunner.query(`INSERT INTO "user"("cpf", "name", "birthDate", "phone", "email", "password", "userTypeId") SELECT "cpf", "name", "birthDate", "phone", "email", "password", "userTypeId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "reservation" RENAME TO "temporary_reservation"`);
        await queryRunner.query(`CREATE TABLE "reservation" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "cpf" varchar NOT NULL, "name" varchar NOT NULL, "phone" varchar NOT NULL, "email" varchar NOT NULL, "reservedDate" datetime NOT NULL, "withdrawalDate" datetime NOT NULL, "bookIsbn" varchar, "reservationStatusId" integer)`);
        await queryRunner.query(`INSERT INTO "reservation"("id", "cpf", "name", "phone", "email", "reservedDate", "withdrawalDate", "bookIsbn", "reservationStatusId") SELECT "id", "cpf", "name", "phone", "email", "reservedDate", "withdrawalDate", "bookIsbn", "reservationStatusId" FROM "temporary_reservation"`);
        await queryRunner.query(`DROP TABLE "temporary_reservation"`);
        await queryRunner.query(`ALTER TABLE "loan" RENAME TO "temporary_loan"`);
        await queryRunner.query(`CREATE TABLE "loan" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "cpf" varchar NOT NULL, "name" varchar NOT NULL, "phone" varchar NOT NULL, "email" varchar NOT NULL, "withdrawalDate" datetime NOT NULL, "returnDate" datetime NOT NULL, "bookIsbn" varchar, "loanStatusId" integer)`);
        await queryRunner.query(`INSERT INTO "loan"("id", "cpf", "name", "phone", "email", "withdrawalDate", "returnDate", "bookIsbn", "loanStatusId") SELECT "id", "cpf", "name", "phone", "email", "withdrawalDate", "returnDate", "bookIsbn", "loanStatusId" FROM "temporary_loan"`);
        await queryRunner.query(`DROP TABLE "temporary_loan"`);
        await queryRunner.query(`ALTER TABLE "book" RENAME TO "temporary_book"`);
        await queryRunner.query(`CREATE TABLE "book" ("isbn" varchar PRIMARY KEY NOT NULL, "language" varchar NOT NULL, "title" varchar NOT NULL, "author" varchar NOT NULL, "publicDate" date NOT NULL, "publisher" varchar NOT NULL, "summary" varchar NOT NULL, "availCopies" integer NOT NULL, "unavailCopies" integer NOT NULL, "genreId" integer)`);
        await queryRunner.query(`INSERT INTO "book"("isbn", "language", "title", "author", "publicDate", "publisher", "summary", "availCopies", "unavailCopies", "genreId") SELECT "isbn", "language", "title", "author", "publicDate", "publisher", "summary", "availCopies", "unavailCopies", "genreId" FROM "temporary_book"`);
        await queryRunner.query(`DROP TABLE "temporary_book"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_type"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TABLE "reservation_status"`);
        await queryRunner.query(`DROP TABLE "loan"`);
        await queryRunner.query(`DROP TABLE "loan_status"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TABLE "genre"`);
    }

}
