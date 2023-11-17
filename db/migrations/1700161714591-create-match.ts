import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMatch1700161714591 implements MigrationInterface {
    name = 'CreateMatch1700161714591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gameId" integer NOT NULL, "gameCreation" integer NOT NULL, "gameDuration" integer NOT NULL, "gameMode" character varying NOT NULL, "gameName" character varying NOT NULL, "queueId" integer NOT NULL, "kda" integer NOT NULL, "championName" character varying NOT NULL, "champLevel" integer NOT NULL, "csPerMin" integer NOT NULL, "goldEarned" integer NOT NULL, "lane" character varying NOT NULL, "role" character varying NOT NULL, "totalPlayerScore" integer NOT NULL, "win" boolean NOT NULL, "summonerId" uuid, CONSTRAINT "PK_92b6c3a6631dd5b24a67c69f69d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "match" ADD CONSTRAINT "FK_80aeb1b4bc0216b1e37d1c41322" FOREIGN KEY ("summonerId") REFERENCES "summoner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP CONSTRAINT "FK_80aeb1b4bc0216b1e37d1c41322"`);
        await queryRunner.query(`DROP TABLE "match"`);
    }

}
