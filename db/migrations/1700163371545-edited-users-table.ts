import { MigrationInterface, QueryRunner } from "typeorm";

export class EditedUsersTable1700163371545 implements MigrationInterface {
    name = 'EditedUsersTable1700163371545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner" DROP COLUMN "revisionDate"`);
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "profileIconId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "summonerLevel" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "leaguePoints" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "wins" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "losses" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "kda" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "averageCSPM" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "averageVisionScore" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "averageVisionScore" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "averageCSPM" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "kda" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "losses" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "wins" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "leaguePoints" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "summonerLevel" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner" ALTER COLUMN "profileIconId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "summoner" ADD "revisionDate" integer NOT NULL`);
    }

}
