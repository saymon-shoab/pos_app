import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTableProducts1748856196701 implements MigrationInterface {
    name = 'AddTableProducts1748856196701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sales" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "items" jsonb NOT NULL, "totalAmount" numeric NOT NULL, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sales"`);
    }

}
