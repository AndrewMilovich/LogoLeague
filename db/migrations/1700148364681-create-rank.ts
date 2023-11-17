import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRank1700148364681 implements MigrationInterface {
    name = 'CreateRank1700148364681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rank" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_a5dfd2e605e5e4fb8578caec083" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "summoner" ADD "rankId" uuid`);
        await queryRunner.query(`ALTER TABLE "summoner" ADD CONSTRAINT "FK_79a1fad28c0e7ec7b15b67ddf18" FOREIGN KEY ("rankId") REFERENCES "rank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner" DROP CONSTRAINT "FK_79a1fad28c0e7ec7b15b67ddf18"`);
        await queryRunner.query(`ALTER TABLE "summoner" DROP COLUMN "rankId"`);
        await queryRunner.query(`DROP TABLE "rank"`);
    }

}
