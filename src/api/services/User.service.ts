import AuthHelper from "../helpers/Auth.helper";
import BcryptHelper from "../helpers/Bcrypt.helper";
import INewuser from "../interfaces/NewUser.interface";
import ILoginData from "../interfaces/LoginData.interface";
import IUpdateUser from "../interfaces/UpdateUser.interface";
import UserRepository from "../repositories/User.repository";
import { OK, CREATED, BAD_REQUEST, getStatusText } from 'http-status-codes';
import IServiceData from "../interfaces/ServiceData.interface";

//* Service class for user's model
/**
 ** Contains the logic of the request based on user's model
 */
export default class UserService {

    //Instances created
    private authHelper = new AuthHelper();
    private bcryptHelper = new BcryptHelper();
    private userRepository = new UserRepository();

    private readonly errorsLogs = {
        EMAIL_DUPLICATED: "Email address is already in use.",
        BAD_LOGIN: "Incorrect email and/or password.",
        SERVER_ERROR: "There is an error from server.",
        PAGE_ERROR: "This page cannot be loaded. Data missing."
    }

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

    //* Get account data by jwt
    public async loggedUserData(token: String): Promise<any> {
        try {
            // Get ID from logged user
            const idFromLoggedUser = await this.authHelper.extractData(token);

            // Get user's data
            //TODO Falta limitar el envio del repository al service según se necesite.
            const dataFromLoggedUser = await this.userRepository.getById(idFromLoggedUser);
            const { arrFollowing } = await this.userRepository.getFollowingData(idFromLoggedUser);
            const { arrFollowers } = await this.userRepository.getFollowersData(idFromLoggedUser);

            return {
                code: OK,
                response: { account: dataFromLoggedUser, following: arrFollowing, followers: arrFollowers }
            };
        } catch (err) {
            console.log(err.message);

            return {
                code: BAD_REQUEST,
                response: { error: this.errorsLogs.PAGE_ERROR }
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

    //* Creates a new user
    public async createUser(newUser: INewuser): Promise<IServiceData> {

        try {
            // Encrypting new user password
            const { pwd } = newUser;
            newUser.pwd = await this.bcryptHelper.encrypt(pwd);

            // Create user
            const id = await this.userRepository.setNewUser(newUser);
            if (!id)
                throw new Error(this.errorsLogs.EMAIL_DUPLICATED);

            // Create following data
            if (!await this.userRepository.setNewFollowingData(id))
                throw new Error(this.errorsLogs.SERVER_ERROR);

            // Create followed data
            if (!await this.userRepository.setNewFollowersData(id))
                throw new Error(this.errorsLogs.SERVER_ERROR);

            return { code: CREATED, response: getStatusText(CREATED) };

        } catch (err) {
            return { code: BAD_REQUEST, response: err.message };
        }

    }

    // Login logic
    public async login(data: ILoginData): Promise<IServiceData> {

        try {

            // Checks if exists a user filter by email.
            const userFound: ILoginData = await this.userRepository.filterUser({ email: data.email }, { _id: 1, pwd: 1 });
            if (!userFound) throw new Error(this.errorsLogs.BAD_LOGIN);

            const { _id, pwd }: ILoginData = userFound;

            // Check if the password is correct
            const isValid: Boolean = await this.bcryptHelper.compareHash(data.pwd, pwd);
            if (!isValid) throw new Error(this.errorsLogs.BAD_LOGIN);

            // Creates a jwt that contains the user id
            const jwToken: String = await this.authHelper.jwtSign(_id);

            // Successful return
            return { code: OK, authToken: jwToken, response: getStatusText(OK) };

        } catch (err) {
            return { code: BAD_REQUEST, response: err.message };
        }

    }

    public async updateAccount(id: String, data: IUpdateUser) {

        try {

            // Update attempt
            let user = await this.userRepository.updateUser(id, data)

        } catch (err) { return { code: 400 } }

        return { code: 200 }
    }
}