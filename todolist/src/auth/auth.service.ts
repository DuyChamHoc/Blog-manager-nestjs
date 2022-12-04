import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private usersService: UserService) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if (user && bcrypt.compareSync(password, user.password as string)) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id, email: user.email };
        return {
            username: user.username,
            email:user.email,
            id: user.id,
            access_token: this.jwtService.sign(payload),
        }
    }
}
