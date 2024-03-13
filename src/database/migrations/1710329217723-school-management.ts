import { MigrationInterface, QueryRunner } from "typeorm";

export class SchoolManagement1710329217723 implements MigrationInterface {
    name = 'SchoolManagement1710329217723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, \`role\` enum ('admin', 'student', 'teacher') NOT NULL DEFAULT 'student', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`students\` (\`id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(50) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`gender\` enum ('male', 'female', 'others') NOT NULL, \`date_of_birth\` date NOT NULL, \`address\` varchar(255) NULL, \`phone_number\` varchar(100) NULL, \`user_id\` int NULL, UNIQUE INDEX \`REL_fb3eff90b11bddf7285f9b4e28\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`students\` ADD CONSTRAINT \`FK_fb3eff90b11bddf7285f9b4e281\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`students\` DROP FOREIGN KEY \`FK_fb3eff90b11bddf7285f9b4e281\``);
        await queryRunner.query(`DROP INDEX \`REL_fb3eff90b11bddf7285f9b4e28\` ON \`students\``);
        await queryRunner.query(`DROP TABLE \`students\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
