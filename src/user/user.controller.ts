import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./schemas/user.schema";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(":name")
  async get(@Param("name") name: string): Promise<User> {
    return this.userService.get(name);
  }

  @Delete(":name")
  async delete(@Param("name") name: string) {
    return this.userService.delete(name);
  }
}