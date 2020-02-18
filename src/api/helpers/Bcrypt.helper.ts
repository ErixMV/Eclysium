import * as bcrypt from "bcryptjs"

//* Bcrypt class
/**
 ** Contains all the methods related to bcryptjs package. It is called by the services. 
 */
export default class BcryptHelper {
    
    // Number of rounds done to create the salt
    private readonly rounds = 10

    // Method: Returns an encrypted hash from a password string
    public async encrypt(pwd: String): Promise<any> {
        
        const salt = await bcrypt.genSaltSync(this.rounds)
        const pwdHash = await bcrypt.hashSync(pwd, salt)

        return pwdHash
    }

    // Method: Compare sent password and hash in database
    public async compareHash(pwd: String, pwdHash: String): Promise<any> {
        return bcrypt.compareSync(pwd, pwdHash)
    }
}