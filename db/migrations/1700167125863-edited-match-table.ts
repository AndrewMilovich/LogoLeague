import { MigrationInterface, QueryRunner } from "typeorm";

export class EditedMatchTable1700167125863 implements MigrationInterface {
    name = 'EditedMatchTable1700167125863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "gameId"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "gameCreation"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "gameDuration"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "gameMode"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "gameName"`);
        await queryRunner.query(`ALTER TABLE "match" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "match" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "match" ADD "matchId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "match" ADD "visionScore" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "visionScore"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "matchId"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "match" ADD "gameName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "match" ADD "gameMode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "match" ADD "gameDuration" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "match" ADD "gameCreation" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "match" ADD "gameId" integer NOT NULL`);
    }

}
