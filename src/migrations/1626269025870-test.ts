import {MigrationInterface, QueryRunner} from "typeorm";

export class test1626269025870 implements MigrationInterface {
    name = 'test1626269025870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post_entity" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_58a149c4e88bf49036bc4c8c79f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment_entity" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "userId" integer, "postId" integer, "parentCommentId" integer, CONSTRAINT "REL_26785190e6785e3eb1fdd63b63" UNIQUE ("parentCommentId"), CONSTRAINT "PK_5a439a16c76d63e046765cdb84f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post_entity" ADD CONSTRAINT "FK_5e32998d7ac08f573cde04fbfa5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_entity" ADD CONSTRAINT "FK_e391949c5735c084dddcb6e6468" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_entity" ADD CONSTRAINT "FK_8149ef6edc077bb121ae704e3a8" FOREIGN KEY ("postId") REFERENCES "post_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment_entity" ADD CONSTRAINT "FK_26785190e6785e3eb1fdd63b63a" FOREIGN KEY ("parentCommentId") REFERENCES "comment_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_26785190e6785e3eb1fdd63b63a"`);
        await queryRunner.query(`ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_8149ef6edc077bb121ae704e3a8"`);
        await queryRunner.query(`ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_e391949c5735c084dddcb6e6468"`);
        await queryRunner.query(`ALTER TABLE "post_entity" DROP CONSTRAINT "FK_5e32998d7ac08f573cde04fbfa5"`);
        await queryRunner.query(`DROP TABLE "comment_entity"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "post_entity"`);
    }

}
