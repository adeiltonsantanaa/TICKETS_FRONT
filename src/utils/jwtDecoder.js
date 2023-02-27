import jwt_decode from 'jwt-decode';

export const rolesOfDecodedToken = () => {
    const token = localStorage.getItem("accessToken");
    const token2 = jwt_decode(token);
    return token2.roles[0];
}