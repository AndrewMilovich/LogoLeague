import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSummonerEntity1700228943160 implements MigrationInterface {
    name = 'UpdateSummonerEntity1700228943160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner" DROP COLUMN "leaguePoints"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner" ADD "leaguePoints" integer`);
    }

}
