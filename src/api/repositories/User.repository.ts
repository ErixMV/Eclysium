import User from "../models/User.model"

export default class UserRepository {

    public async getUsers(): Promise<any> {
        return await User.find({})
    }

    public async getOneUser(id: String): Promise<any> {
        return await User.findById(id)
    }

    public async setNewUser(dataBody: Object): Promise<any> {
        return await User.create(dataBody)
    }
}