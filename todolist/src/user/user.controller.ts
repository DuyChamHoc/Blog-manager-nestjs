import { Controller, Post, Body, Get, Param, Patch, Delete, Query, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { UserService } from "./user.service"; 

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { } 
 
    @Post('register')
    async registerUser(
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) { 
        const generatedId = await this.userService.registerUser(
            username,
            email,
            password,
        );
        return { User: generatedId }
    }

}