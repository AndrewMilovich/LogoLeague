import { MigrationInterface, QueryRunner } from "typeorm";

export class EditedMatchTable1700168953586 implements MigrationInterface {
    name = 'EditedMatchTable1700168953586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "kda"`);
        await queryRunner.query(`ALTER TABLE "match" ADD "kda" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match" DROP COLUMN "kda"`);
        await queryRunner.query(`ALTER TABLE "match" ADD "kda" integer NOT NULL`);
    }

}
