import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1693937139151 implements MigrationInterface {
  name = 'CreateUserTable1693937139151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "auth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying, "username" character varying, "phone" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."auth_role_enum" NOT NULL DEFAULT 'USER', "refreshToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_366ebf23d8f3781bb7bb37abbd1" UNIQUE ("username"), CONSTRAINT "UQ_bed5ff7f50dae39532b8c99a2bb" UNIQUE ("phone"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "auth"`);
  }
}
