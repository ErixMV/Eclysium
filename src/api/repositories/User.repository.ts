import User from "../models/User.model"
import INewUser from "../interfaces/NewUser.interface"

//* Repository of user's model
/**
 ** Contains the calls to database for the user's model
 */
export default class UserRepository {

    private readonly defaultUserFilter: Object= {
        _id: 1,
        name: 1,
        email: 1,
        role: 1,
        pwd: 1,
        createdAt: 1,
        updatedAt: 1,
    }

    // All users
    // TODO: Falta cambiar este método por uno que permita mediante parámetros cambiar el filter y output (Ver filterUser como ejemplo)
    public async getUsers(): Promise<any> {
        return User.find({})
    }

    // User by id
    public async getOneUser(id: String): Promise<any> {
        return User.findById(id)
    }

    // Create a new user
    public async setNewUser(dataBody: INewUser): Promise<any> {
        return User.create(dataBody)
    }

    // Returns one user, the parameters define the filter and the output
    public async filterUser(filter: Object, filterOutput: Object = this.defaultUserFilter): Promise<any> {
        return User.findOne(filter, filterOutput)
    }
}