import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) { }
    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]
        try {
            if (this.jwtService.verifyAsync(token)) {
                next();
            }
        } catch (error) {
            console.log(error)
        }
    }
}
