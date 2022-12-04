import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist'
import { AuthService } from 'src/auth/auth.service';
import { UserController } from './user.controller';
import { UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule { }
