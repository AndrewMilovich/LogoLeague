import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLeaderboard1700232611463 implements MigrationInterface {
    name = 'CreateLeaderboard1700232611463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "leaderboard" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "summonerId" uuid, CONSTRAINT "REL_37ed1c4f28eacc9a75210beee7" UNIQUE ("summonerId"), CONSTRAINT "PK_76fd1d52cf44d209920f73f4608" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "leaderboard" ADD CONSTRAINT "FK_37ed1c4f28eacc9a75210beee79" FOREIGN KEY ("summonerId") REFERENCES "summoner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leaderboard" DROP CONSTRAINT "FK_37ed1c4f28eacc9a75210beee79"`);
        await queryRunner.query(`DROP TABLE "leaderboard"`);
    }

}
