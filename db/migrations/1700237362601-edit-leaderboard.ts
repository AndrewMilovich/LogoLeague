import { MigrationInterface, QueryRunner } from "typeorm";

export class EditLeaderboard1700237362601 implements MigrationInterface {
    name = 'EditLeaderboard1700237362601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leaderboard" ADD "leaguePoints" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "leaderboard" ADD "winRate" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leaderboard" DROP COLUMN "winRate"`);
        await queryRunner.query(`ALTER TABLE "leaderboard" DROP COLUMN "leaguePoints"`);
    }

}
