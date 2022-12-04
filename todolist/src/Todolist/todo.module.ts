import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";
import { MongooseModule } from "@nestjs/mongoose/dist";
import { TodoSchema } from "./todo.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule { }