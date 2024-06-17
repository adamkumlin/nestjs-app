import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./schemas/user.schema";

@Controller({})
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        await this.userService.create(createUserDto);
    }

    @Get()
    async getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.userService.delete(id);
    }
    
}