import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSummonerEntity1700227629265 implements MigrationInterface {
    name = 'UpdateSummonerEntity1700227629265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner" DROP COLUMN "kda"`);
        await queryRunner.query(`ALTER TABLE "summoner" ADD "kda" double precision`);
        await queryRunner.query(`ALTER TABLE "summoner" DROP COLUMN "averageCSPM"`);
        await queryRunner.query(`ALTER TABLE "summoner" ADD "averageCSPM" double precision`);
        await queryRunner.query(`ALTER TABLE "summoner" DROP COLUMN "averageVisionScore"`);
        await queryRunner.query(`ALTER TABLE "summoner" ADD "averageVisionScore" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner" DROP COLUMN "averageVisionScore"`);
        await queryRunner.query(`ALTER TABLE "summoner" ADD "averageVisionScore" integer`);
        await queryRunner.query(`ALTER TABLE "summoner" DROP COLUMN "averageCSPM"`);
        await queryRunner.query(`ALTER TABLE "summoner" ADD "averageCSPM" integer`);
        await queryRunner.query(`ALTER TABLE "summoner" DROP COLUMN "kda"`);
        await queryRunner.query(`ALTER TABLE "summoner" ADD "kda" integer`);
    }

}
