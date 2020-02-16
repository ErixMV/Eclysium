import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import User from "../models/User.model"
import UserService from "../services/User.service"
import { Connection } from "../../config/Connection"


@Controller('api/users')
export class UserController {
    
    private userService = new UserService()

    @Get('')
    private async getUsers(req: Request, res: Response): Promise<any> {
        const result = await this.userService.allUsers()

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
    private async newUser(req: Request, res: Response): Promise<any> {
        // Logger.Info(req.body);
        const result = await this.userService.setNewUser(req.body)
        return res.send(req.body);
        try {
            const newUser = await User.create(req.body)
            return res.status(201).json({success: newUser})
        } catch (err) {
            return res.status(400).json({ error: err.message})
        }
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