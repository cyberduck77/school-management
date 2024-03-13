import { Injectable } from '@nestjs/common';
import { RequestLoginDto } from './dtos/request-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { Student } from 'src/common/entities/student.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: RequestLoginDto) {
    const user = await this.usersRepository.findOneBy({ username });
    if (user && password === user.password) {
      const { password, ..._user } = user;
      return this.jwtService.signAsync(_user);
    }
    return null;
  }

  // async studentProfile({ user }: ProfileDto) {
  //   const profile = await this.usersRepository.findOneBy({ user })
  // }

  async createProfile(id: number, createProfileDto: CreateProfileDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      const profile = new Student({ ...createProfileDto, user });
      await this.studentsRepository.save(profile);
    }
  }
}
