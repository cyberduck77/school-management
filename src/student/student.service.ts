import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/common/entities/student.entity';
import { Repository } from 'typeorm';
import { User } from 'src/common/entities/user.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(_user: any, createStudentDto: CreateStudentDto) {
    const user = await this.usersRepository.findOne({
      where: { id: _user.id },
    });
    if (user) {
      const profile = new Student({ ...createStudentDto, user });
      await this.studentsRepository.save(profile);
    }
  }

  findAll() {
    return `This action returns all student`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
