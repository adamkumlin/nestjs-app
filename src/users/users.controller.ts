import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./schemas/user.schema";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(":name")
  async get(@Param("name") name: string): Promise<User> {
    return this.usersService.get(name);
  }

  // Update user info by name
  @Patch(":name")
  async update(@Param("name") name: string, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.update(name, updateUserDto);
  }

  @Delete(":name")
  async delete(@Param("name") name: string) {
    return this.usersService.delete(name);
  }
}