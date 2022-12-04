import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './Todolist/todo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { LoggerMiddleware } from './logger.middleware';
@Module({
  imports:
    [
      TodoModule,
      MongooseModule.forRoot(
        'mongodb+srv://duy:duy@cluster0.o5iue9h.mongodb.net/?retryWrites=true&w=majority'
      ),
      UserModule,
      AuthModule,
      JwtModule.register({
        secret: 'SECRET',
      })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'todo', method: RequestMethod.ALL });
  }
}
