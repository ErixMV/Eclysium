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
            console.log(error)
            return false;
        }
    }

    //! Method: Extract the data from payload
    public async extractData(authorization: String): Promise<any> {

        
        try {
            // Remove Bearer prefix
            const [ token ]  = authorization.split(' ').slice(-1);

            // Get user's id from jwt payload
            const { data } = await jwt.verify(token, process.env.JWT_SECRET);
            
            // Parsing id
            const id = data.replace(/"/g, '');
            return id;

        } catch (error) {
            return new Error(error.message)
        }
    }

    //? Create refresh token method?
}