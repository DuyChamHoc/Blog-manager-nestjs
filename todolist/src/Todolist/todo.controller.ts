import { Controller, Post, Body, Get, Param, Patch, Delete, Query, UseGuards, Request } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addTodo(
        @Request() req,
        @Body('title') todTitle: string,
        @Body('description') todDesc: string,
        @Body('status') todStatus: string,
        @Body('time') todTime: string,
    ) {
        const generatedId = await this.todoService.addTodo(
            req.user,
            todTitle,
            todDesc,
            todStatus,
            todTime
        );
        return {
            _id: generatedId,
            title: todTitle,
            description: todDesc,
            status: "Pending",
            time: todTime,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('/search')
    async searchTodoByDate(
        @Query('searchDate') searchDate: string,
        @Request() req,
    ) {
        return await this.todoService.search(searchDate, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getTodos(
        @Request() req,
    ) {
        const todos = await this.todoService.getTodos(req.user);
        return todos;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getTodo(
        @Request() req,
        @Param('id') todId: string,
    ) {
        return await this.todoService.getSingleTodo(todId, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateTodo(
        @Request() req,
        @Param('id') todId: string,
        @Body('title') todTitle: string,
        @Body('description') todDesc: string,
        @Body('status') todStatus: string,
        @Body('time') todTime: string,
    ) {
        return await this.todoService.updateTodo(todId, todTitle, todDesc, todStatus, todTime);
    }

    
 
    @UseGuards(JwtAuthGuard)
    @Patch('/updateStatus/:id') 
    async updateStatus(
        @Param('id') todId: string,
        @Body('status') todStatus: string) {
        return await this.todoService.updateStatus(todId, todStatus);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeTodo(
        @Request() req,
        @Param('id') todId: string,
    ) {
        return await this.todoService.deleteTodo(todId);
    }


}