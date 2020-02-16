import UserRepository from "../repositories/User.repository"

export default class UserService {

    private userRepository = new UserRepository();

    public async allUsers(): Promise<any> {
        try {
            const users = await this.userRepository.getUsers();
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

    public async oneUser(id: String): Promise<any> {
        try {
            const user = await this.userRepository.getOneUser(id)
            return {
                code: 200,
                response: user
            };
        } catch (err) {
            return { 
                code: 400,
                response: { error: err.message }
            };
        }
    }

    public async createUser(dataBody: Object): Promise<any> {
        try {
            const user = await this.userRepository.setNewUser(dataBody)
            return {
                code: 200,
                response: user
            }
        } catch (err) {
            return {
                code: 400,
                response: { error: err.message }
            }
        }
    }
}