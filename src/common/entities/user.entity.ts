import { AbstractEntity } from 'src/database/abstract.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  STUDENT = 'student',
  TEACHER = 'teacher'
}

@Entity('users')
export class User extends AbstractEntity<User> {
  @Column({ name: 'username', length: 100, nullable: false })
  username: string;

  @Column({ name: 'email', length: 100, nullable: false })
  email: string;

  @Column({ name: 'password', length: 100, nullable: false })
  password: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: Role,
    default: Role.STUDENT,
    nullable: false,
  })
  role: Role;
}