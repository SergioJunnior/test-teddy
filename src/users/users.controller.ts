import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    const existingUser = await this.usersService.findUserByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      return { message: 'E-mail already registered' };
    }

    await this.usersService.createUser({
      email: createUserDto.email,
      password: createUserDto.password,
    });

    return { message: 'User registered successfully' };
  }
}
