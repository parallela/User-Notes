import { getJwtToken } from '../helpers/jwt';

export const isLogged = () => {
        const jwt_token = getJwtToken()
        if(!jwt_token){
        	return false;
        }
	return jwt_token;        
}