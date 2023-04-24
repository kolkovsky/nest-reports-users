import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/create')
  createUser(@Body() body: UserDto) {
    const newUser = this.usersService.createUser(body);
    return newUser;
  }

  @Put('/update')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updatedUser) {
    return this.updateUser(id, updatedUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/list')
  getAllUsers() {
    return this.usersService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUsersByEmail(@Query('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Delete('/:id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.removeUser(id);
  }
}
