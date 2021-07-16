import { MigrationInterface, QueryRunner } from 'typeorm';

export class test1626440946092 implements MigrationInterface {
  name = 'test1626440946092';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_e391949c5735c084dddcb6e6468"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_26785190e6785e3eb1fdd63b63a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_8149ef6edc077bb121ae704e3a8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP COLUMN "authorId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP COLUMN "recipientId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP COLUMN "status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP COLUMN "content"`,
    );
    await queryRunner.query(`ALTER TABLE "comment_entity" DROP COLUMN "likes"`);
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP COLUMN "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP COLUMN "postId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP CONSTRAINT "UQ_26785190e6785e3eb1fdd63b63a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP COLUMN "parentCommentId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "content" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "likes" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "userId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "postId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "parentCommentId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD CONSTRAINT "UQ_26785190e6785e3eb1fdd63b63a" UNIQUE ("parentCommentId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "authorId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "recipientId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "status" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD CONSTRAINT "FK_e391949c5735c084dddcb6e6468" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD CONSTRAINT "FK_8149ef6edc077bb121ae704e3a8" FOREIGN KEY ("postId") REFERENCES "post_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD CONSTRAINT "FK_26785190e6785e3eb1fdd63b63a" FOREIGN KEY ("parentCommentId") REFERENCES "comment_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_26785190e6785e3eb1fdd63b63a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_8149ef6edc077bb121ae704e3a8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP CONSTRAINT "FK_e391949c5735c084dddcb6e6468"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP COLUMN "status"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP COLUMN "recipientId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP COLUMN "authorId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP CONSTRAINT "UQ_26785190e6785e3eb1fdd63b63a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP COLUMN "parentCommentId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP COLUMN "postId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP COLUMN "userId"`,
    );
    await queryRunner.query(`ALTER TABLE "comment_entity" DROP COLUMN "likes"`);
    await queryRunner.query(
      `ALTER TABLE "comment_entity" DROP COLUMN "content"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "parentCommentId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD CONSTRAINT "UQ_26785190e6785e3eb1fdd63b63a" UNIQUE ("parentCommentId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "postId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "userId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "likes" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "content" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "status" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "recipientId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD "authorId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD CONSTRAINT "FK_8149ef6edc077bb121ae704e3a8" FOREIGN KEY ("postId") REFERENCES "post_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD CONSTRAINT "FK_26785190e6785e3eb1fdd63b63a" FOREIGN KEY ("parentCommentId") REFERENCES "comment_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_entity" ADD CONSTRAINT "FK_e391949c5735c084dddcb6e6468" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
