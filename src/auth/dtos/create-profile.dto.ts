import { Gender } from 'src/common/entities/profile.entity';

export class CreateProfileDto {
  firstName: string;

  lastName: string;

  gender: Gender;

  birthday: Date;

  address: string;

  phoneNum: string;
}
