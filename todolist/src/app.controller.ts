import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard'; 

@Controller('user')  
export class AppController {
  constructor(private readonly authService: AuthService) { } 

  @UseGuards(LocalAuthGuard)  
  @Post('login') 
  login(@Request() req): any {
    return this.authService.login(req.user); 
  }

 
}
