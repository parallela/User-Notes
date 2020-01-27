import {decode} from 'jsonwebtoken';

export const getJwtToken = () => {
    const token = localStorage.getItem('token');
    var decodedToken = decode(token, {complete: true});

    if (decodedToken === null) {
        return false
    }

    return token;
}
