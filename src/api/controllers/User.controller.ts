import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import User from "../models/User.model"
import UserService from "../services/User.service"
import { testNewUser } from "../middlewares/User.middleware"

//* Controller of user's model
/**
 ** Contains the calls to user requests in the api
 */
@Controller('api/users')
export class UserController {
    
    private userService = new UserService()

    // Return users' data
    @Get('')
    private async getUsers(req: Request, res: Response): Promise<any> {
        const result = await this.userService.allUsers()
        Logger.Info(result.code)

        return res.status(result.code).json(result.response)
    }

    // Get one user's data
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

    // Register new user
    @Post('')
    @Middleware([testNewUser])
    private async newUser(req: Request, res: Response): Promise<any> {
        const result = await this.userService.createUser(req.body)

        return res.status(result.code).json()
    }

    // Login method
    @Post("login")
    private async login(req: Request, res: Response): Promise<any> {

        const result = await this.userService.login(req.body)

        if (result.code == 200)
            res.set('EclysiumAuthToken', result.authToken)
        return res.status(result.code).json()
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