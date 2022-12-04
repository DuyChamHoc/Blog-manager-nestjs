import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model } from "mongoose";
import { Todo } from "./todo.model";

@Injectable()
export class TodoService {
    constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {

    }

    async getTodos(user: any) {
        const todos = await this.todoModel.find({ user: user.id }).populate("user", ["username", "email"]).exec();
        return todos;
    }

    async addTodo(user: any, title: string, desc: string, status: string, time: string) {
        const newTodo = new this.todoModel({
            title,
            description: desc,
            status: status || 'Pending',
            time,
            user: user.id,
        });
        const result = await newTodo.save();
        return result.id as string;
    }

    async getSingleTodo(todId: string, user: any) {
        const todo = await this.todoModel.find({ _id: todId, user: user.id });
        return todo;
    }

    async updateTodo(todId: string, title: string, description: string, status: string, time: string) {
        const updatedTodo = await this.findTodo(todId);
        if (title) {
            updatedTodo.title = title;
        }
        if (description) {
            updatedTodo.description = description;
        }
        if (status) {
            updatedTodo.status = status;
        }
        if (time) {
            updatedTodo.time = time;
        }
        await updatedTodo.save();
        return updatedTodo;
    }

    async updateStatus(todId: string, status: string) {
        const doc = await this.todoModel.findById(todId);
        doc.status = status;
        await doc.save();
        return doc;
    }

    async deleteTodo(todId: string) {
        const result = await this.todoModel.deleteOne({ _id: todId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find product.');
        }
        const todos = await this.todoModel.find().exec();
        return todos;
    }

    async search(searchDate: string, user: any) {
        const todosearch = await this.todoModel.find({ time: searchDate, user: user.id }).exec();
        return todosearch;
    }

    private async findTodo(id: string): Promise<Todo> {
        let todo;
        try {
            todo = await this.todoModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find todo.');
        }
        if (!todo) {
            throw new NotFoundException('Could not find todo.');
        }
        return todo;
    }

}