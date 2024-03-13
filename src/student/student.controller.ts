import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import { Request } from 'express';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('profile')
  @UseGuards(JwtGuard)
  async create(
    @Req() req: Request,
    @Body() createProfileDto: CreateStudentDto,
  ) {
    const { user } = req;
    return this.studentService.create(user, createProfileDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
