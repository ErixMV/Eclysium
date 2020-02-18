import { Request, Response, NextFunction } from "express"

//! Change to helpers?
const arrNewUserRequiredKeys = ['email','pwd', 'pwdConfirmation']

export async function testNewUser( req: Request, res: Response, next: NextFunction) {

    const body = req.body
    const keys = Object.keys(req.body)

    // Checks if email, password and passwordConfirmation have been sent.
    if (!arrNewUserRequiredKeys.every(requiredKey => keys.includes(requiredKey)))
        return res.status(400).json({ error: "Required data missing" })

    // Checks if the required data are not empty
    if (!body.email || !body.pwd || !body.pwdConfirmation)
        return res.status(400).json({ error: "Required data missing" })

    if (body.pwd !== body.pwdConfirmation)
        return res.status(400).json({ error: "Error proccesing data" })
        
    next();
}