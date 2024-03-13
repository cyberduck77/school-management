import { Injectable } from '@nestjs/common';
import { RequestLoginDto } from './dtos/request-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Student } from 'src/common/entities/student.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
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
}
