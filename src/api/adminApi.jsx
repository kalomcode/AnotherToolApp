import { base_url } from '../environment/global';

const getAllUsers = async (user, authTokens) => {
    const data = await fetch(base_url+'users',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }}) 
    return data;  
}

export default {
    getAllUsers,
};