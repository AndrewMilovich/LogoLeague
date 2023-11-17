import { MigrationInterface, QueryRunner } from "typeorm";

export class EditedMatchTable1700167437461 implements MigrationInterface {
    name = 'EditedMatchTable1700167437461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "matchId"`);
        await queryRunner.query(`ALTER TABLE "match" ADD "matchId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "matchId"`);
        await queryRunner.query(`ALTER TABLE "match" ADD "matchId" integer NOT NULL`);
    }

}
