import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import User from "../models/User.model"
import UserService from "../services/User.service"
import { testNewUser } from "../middlewares/User.middleware"


@Controller('api/users')
export class UserController {
    
    private userService = new UserService()

    @Get('')
    private async getUsers(req: Request, res: Response): Promise<any> {
        const result = await this.userService.allUsers()
        Logger.Info(result.code)

        return res.status(result.code).json(result.response)
    }

    @Get(':id')
    private async getUser(req: Request, res: Response): Promise<any> {
        const result = await this.userService.oneUser(req.params.id)

        return res.status(result.code).json(result.response)
    }


    
    // @Put(':msg')
    // private putMessage(req: Request, res: Response) {
    //     Logger.Info(req.params.msg);
    //     return res.status(400).json({
    //         error: req.params.msg,
    //     });
    // }

    @Post('')
    @Middleware([testNewUser])
    private async newUser(req: Request, res: Response): Promise<any> {
        const result = await this.userService.createUser(req.body)
        Logger.Info(result.code)

        return res.status(result.code).json(result.response)
    }

    // @Delete('')
    // private delMessage(req: Request, res: Response) {
    //     try {
    //         throw new Error(req.params.msg);
    //     } catch (err) {
    //         Logger.Err(err, true);
    //         return res.status(400).json({
    //             error: req.params.msg,
    //         });
    //     }
    // }
}