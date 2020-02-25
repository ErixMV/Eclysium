import AuthHelper from "../helpers/Auth.helper"
import BcryptHelper from "../helpers/Bcrypt.helper"
import INewuser from "../interfaces/NewUser.interface"
import ILoginData from "../interfaces/LoginData.interface"
import IUpdateUser from "../interfaces/UpdateUser.interface"
import UserRepository from "../repositories/User.repository"

//* Service class for user's model
/**
 ** Contains the logic of the request based on user's model
 */
export default class UserService {

    //Instances created
    private authHelper = new AuthHelper()
    private bcryptHelper = new BcryptHelper()
    private userRepository = new UserRepository()

    // Get all users
    // TODO: Falta especificar el proposito de este método y cambiar la llamada al repositorio
    public async allUsers(): Promise<any> {
        try {
            const users = await this.userRepository.getUsers()
            return {
                code: 200,
                response: users
            };
        } catch (err) {
            return { 
                code: 400,
                response: { error: err.message }
            };
        }
    }

    // Get one user by id
    // TODO: Falta especificar el proposito de este método y cambiar la llamada al repositorio
    public async oneUser(id: String): Promise<any> {        
        try {
            const user = await this.userRepository.getById(id)
            return { code: 200 };
        } catch (err) {
            return { 
                code: 400,
                response: { error: err.message }
            };
        }
    }

    // Creates a new user
    public async createUser(dataBody: INewuser): Promise<any> {
        
        try {

            // Encrypting new user password 
            dataBody.pwd = await this.bcryptHelper.encrypt(dataBody.pwd)

            // Create user
            await this.userRepository.setNewUser(dataBody)

            return { code: 201 }

        } catch (err) { return { code: 400 } }
    }

    // Login logic
    public async login(data: ILoginData): Promise<any> {

        try {

            // Checks if exists a user filter by email
            const userFound: ILoginData = await this.userRepository.filterUser({ email: data.email }, {_id: 1, pwd: 1})
            
            // Check if the password is correct
            const isValid: Boolean = await this.bcryptHelper.compareHash(data.pwd, userFound.pwd)

            if (!isValid) return { code: 400 }
            
            // Creates a jwt that contains the user id
            const jwToken: String = await this.authHelper.jwtSign(userFound._id)
            
            // Return of http code and token
            return { code: 200, authToken: jwToken }

        } catch (err) { return { code: 400 } }
    }

    public async updateAccount(id: String, data: IUpdateUser) {

        try {

            // Update attempt
            let user = await this.userRepository.updateUser(id, data)

        } catch (err) { return { code: 400 } }

        return { code: 200 }
    }
}