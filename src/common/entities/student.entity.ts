import { Column, Entity, ManyToMany } from 'typeorm';
import { Profile } from './profile.entity';

@Entity('students')
export class Student extends Profile<Student> {
  // @ManyToMany(() => Course, { cascade: true})
  // @JoinTable()
  // course: Course[];
}
