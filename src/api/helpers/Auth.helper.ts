import * as jwt from "jsonwebtoken";

//* Json Web Token Class
/**
 ** Contains all the methods related to jsonwebtoken package. It is called by the services. 
 */
export default class AuthHelper {
    
    // Method: Creates a Json web token that contains the user id
    public async jwtSign(_id: Object): Promise<any> {

        const id = JSON.stringify(_id);

        const jwtToken = jwt.sign({
            data: id
        }, process.env.JWT_SECRET, { expiresIn: '1h' })

        return jwtToken;
    }

    // Method: Checks if the token is valid
    public async compareJwt(token: String): Promise<any> {
        try {
            await jwt.verify(token, process.env.JWT_SECRET);
            return true;
        } catch (error) {
            return false;
        }
    }

    //! Method: Extract the data from payload
    public async extractData(authorization: String): Promise<any> {

        const [ token ]  = authorization.split(' ').slice(-1);

        try {
            const { data } = await jwt.verify(token, process.env.JWT_SECRET);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    //? Create refresh token method?
}