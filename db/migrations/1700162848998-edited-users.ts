import { MigrationInterface, QueryRunner } from "typeorm";

export class EditedUsers1700162848998 implements MigrationInterface {
    name = 'EditedUsers1700162848998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "summoner" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "summoner" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "summoner" DROP COLUMN "created_at"`);
    }

}
