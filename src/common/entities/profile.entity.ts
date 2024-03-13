import { AbstractEntity } from "src/database/abstract.entity";
import { Column, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHERS = 'others',
}

export class Profile<T extends Profile<T>> extends AbstractEntity<T> {
  @Column({ name: 'first_name', length: 50, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', length: 0, nullable: false })
  lastName: string;

  @Column({
    name: 'gender',
    type: 'enum',
    enum: Gender,
    nullable: false,
  })
  gender: Gender;

  @Column('date', { name: 'date_of_birth', nullable: false })
  birthday: Date;

  @Column({ name: 'address', length: 255, nullable: true })
  address: string;

  @Column({ name: 'phone_number', length: 100, nullable: true })
  phoneNum: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}