import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiKeyAuth } from 'src/decorators/apiKey.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserDocument } from 'src/users/schemas/user.schema';
import { User } from 'src/users/types/user';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/logIn.dto';
import { ApiAuthGuard } from './guard/api-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('auth')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: LogInDto,
    examples: {
      emaple2: {
        summary: 'becze',
        description: 'auth credentials for becze',
        value: {
          username: 'becze',
          password: 'StrongPass123-',
        },
      },
      emaple3: {
        summary: 'seres',
        description: 'auth credentials for seres',
        value: {
          username: 'seres',
          password: 'StrongPass123-',
        },
      },
    },
  })
  @ApiKeyAuth()
  @UseGuards(LocalAuthGuard)
  @UseGuards(ApiAuthGuard)
  @Post('/log-in')
  async logIn(@CurrentUser() user: User) {
    return await this.authService.logIn(user);
  }
}
