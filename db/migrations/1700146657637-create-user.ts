import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1700146657637 implements MigrationInterface {
    name = 'CreateUser1700146657637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "summoner" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountId" character varying NOT NULL, "puuid" character varying NOT NULL, "name" character varying NOT NULL, "profileIconId" integer NOT NULL, "revisionDate" integer NOT NULL, "summonerLevel" integer NOT NULL, "leaguePoints" integer NOT NULL, "wins" integer NOT NULL, "losses" integer NOT NULL, "kda" integer NOT NULL, "averageCSPM" integer NOT NULL, "averageVisionScore" integer NOT NULL, CONSTRAINT "PK_7c746c00ef539c0d32371637edd" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "summoner"`);
    }

}
