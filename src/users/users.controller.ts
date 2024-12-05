import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id ( use to update specific user field )
    DELETE /users/:id

    *** Note: NestJS matches routes from top to bottom within a controller.
    To ensure that /users/interns matches the static route (@Get('interns')) before the dynamic route (@Get(':id'))
  */

  constructor(private usersService: UsersService) {}

  @Get() // GET /users or /users?role=value
  findAll(
    @Req() _request?: Request,
    @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
  ) {
    return this.usersService.findAll(role);
  }

  @Get('interns') // GET /users/interns
  findAllInterns() {
    return [];
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    this.usersService.findOne(+id);
  }

  @Post() // POST /users
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string, @Body() userUpdate: object) {
    return this.usersService.update(+id, userUpdate);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
