import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQueueEntity1700219136916 implements MigrationInterface {
    name = 'CreateQueueEntity1700219136916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner" DROP CONSTRAINT "FK_79a1fad28c0e7ec7b15b67ddf18"`);
        await queryRunner.query(`ALTER TABLE "summoner" RENAME COLUMN "rankId" TO "summonerId"`);
        await queryRunner.query(`CREATE TABLE "queue_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "queueId" integer NOT NULL, "queueType" character varying NOT NULL, "tier" character varying NOT NULL, "rank" character varying NOT NULL, "leaguePoints" integer NOT NULL, "wins" integer NOT NULL, "losses" integer NOT NULL, "summonerId" uuid, CONSTRAINT "PK_696dbe6f9c24980720097214650" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "summoner" DROP COLUMN "summonerId"`);
        await queryRunner.query(`ALTER TABLE "summoner" ADD "summonerId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "queue_entity" ADD CONSTRAINT "FK_88545c29ae868579c0fe448f598" FOREIGN KEY ("summonerId") REFERENCES "summoner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "queue_entity" DROP CONSTRAINT "FK_88545c29ae868579c0fe448f598"`);
        await queryRunner.query(`ALTER TABLE "summoner" DROP COLUMN "summonerId"`);
        await queryRunner.query(`ALTER TABLE "summoner" ADD "summonerId" uuid`);
        await queryRunner.query(`DROP TABLE "queue_entity"`);
        await queryRunner.query(`ALTER TABLE "summoner" RENAME COLUMN "summonerId" TO "rankId"`);
        await queryRunner.query(`ALTER TABLE "summoner" ADD CONSTRAINT "FK_79a1fad28c0e7ec7b15b67ddf18" FOREIGN KEY ("rankId") REFERENCES "rank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
