import User from "../models/User.model"
import Following from "../models/Following.model"
import Follower from "../models/Follower.model"
import INewUser from "../interfaces/NewUser.interface"
import IUpdateUser from "../interfaces/UpdateUser.interface"

//* Repository of user's model
/**
 ** Contains the calls to database for the user's model
 */
export default class UserRepository {

    private readonly defaultUserFilter: Object = {
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
    public async getById(id: any): Promise<any> {
        return User.findById(id, this.defaultUserFilter);
    }

    // Create a new user
    public async setNewUser(dataBody: INewUser): Promise<any> {
        try {
            const { _id }: { _id: String } = await User.create(dataBody);
            return _id;
        } catch (err) {
            return false;
        }
    }

    // Create following data for a new user
    public async setNewFollowingData(newUserId: String): Promise<any> {
        try {
            await Following.create({ userId: newUserId, arrFollowing: [] });
            return true;
        } catch (err) {
            return false;
        }
    }

    //* Get following data for a new user
    public async getFollowingData(userId: String): Promise<any> {
        try {
            return Following.findOne({ userId: userId }, { _id: 0, arrFollowing: 1 });
        } catch (err) {
            return false;
        }
    }

    // Create following data for a new user
    public async setNewFollowersData(newUserId: String): Promise<any> {
        try {
            await Follower.create({ userId: newUserId, arrFollowers: [] });
            return true;
        } catch (err) {
            return false;
        }
    }

    //* Get following data for a new user
    public async getFollowersData(userId: String): Promise<any> {
        try {
            return Follower.findOne({ userId: userId }, { _id: 0, arrFollowers: 1 });
        } catch (err) {
            return false;
        }
    }

    // Returns one user, the parameters define the filter and the output
    public async filterUser(filter: Object, filterOutput: Object = this.defaultUserFilter): Promise<any> {
        return User.findOne(filter, filterOutput);
    }

    // Update user (only email and username)
    public async updateUser(id: String, data: IUpdateUser) {
        return User.updateOne({ _id: id }, { $set: data })
    }
}