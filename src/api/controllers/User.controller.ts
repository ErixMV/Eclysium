import { Request, Response } from 'express';
import { ClassMiddleware, Controller, Middleware, Get, Put, Post, Delete, Patch } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import User from "../models/User.model"
import UserService from "../services/User.service"
import { testNewUser, testAuthorization } from "../middlewares/User.middleware"
import IServiceData from "../interfaces/ServiceData.interface"
// import * as cors from "cors"

//* Controller of user's model
/**
 ** Contains the calls to user requests in the api
 */
@Controller('api/users')
// @ClassMiddleware([cors()])
export class UserController {
    private userService = new UserService()

    // Return users' data
    @Get('')
    private async getUsers(req: Request, res: Response): Promise<any> {
        const result = await this.userService.allUsers()
        Logger.Info(result.code)

        return res.status(result.code).json(result.response)
    }

    // Get logged user's data for account page
    @Get('account')
    @Middleware([testAuthorization])
    private async getAccountData(req: Request, res: Response): Promise<any> {
        try {
            const result = await this.userService.loggedUserData(req.headers.authorization)
            return res.status(result.code).json(result.response)
        } catch (err) {
            console.log(err)
        }

        // return res.send()
    }

    // Get one user's data
    @Get(':id')
    private async getUser(req: Request, res: Response): Promise<any> {
        const result = await this.userService.oneUser(req.params.id)

        return res.status(result.code).json(result.response)
    }

    // Login method
    @Post("login")
    private async login(req: Request, res: Response): Promise<any> {

        const { code, response, ...result }: IServiceData = await this.userService.login(req.body);

        if (code === 200) {
            res.setHeader("Access-Control-Allow-Headers", "Authorization");
            res.setHeader("Authorization", `Bearer ${result.authToken}`);
        }

        Logger.Info(`Login: ${code}`);

        return res.status(code).json(response);
    }

    // Register new user
    @Post('/')
    @Middleware([testNewUser])
    private async newUser(req: Request, res: Response): Promise<any> {

        const result = await this.userService.createUser(req.body);

        return res.status(result.code).json(result.response);
    }




    // @Put(':msg')
    // private putMessage(req: Request, res: Response) {
    //     Logger.Info(req.params.msg);
    //     return res.status(400).json({
    //         error: req.params.msg,
    //     });
    // }



    //User update method
    @Patch(":id")
    private async update(req: Request, res: Response) {

        const result = await this.userService.updateAccount(req.params.id, req.body)

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