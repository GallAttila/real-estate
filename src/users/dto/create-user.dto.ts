import { SignUpDto } from 'src/auth/dto/signUp.dto';
import { UserRole } from 'src/constants';

export class CreateUserDto extends SignUpDto {
  role: UserRole;
}
