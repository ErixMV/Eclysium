import { Request, Response, NextFunction } from "express"

//! Change to helpers?
const arrNewUserRequiredKeys = ['email','pwd']

export function testNewUser( req: Request, res: Response, next: NextFunction) {

    const keys = Object.keys(req.body)
    if (keys.length < 2)
        return res.status(400).json({ error: "Error: Required data missing" })

    arrNewUserRequiredKeys.forEach(requiredKey => {
        if (!keys.includes(requiredKey)) {
            return res.status(400).json({ error: "Error: Required data missing" })
        }
    })

    next();
}