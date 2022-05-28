import { base_url } from '../environment/global';

const getAllClients = async (user, authTokens) => {
    const data = await fetch(base_url+'clients/'+user.user_id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }}) 
    return data;  
}

const deleteClient = async (id, user, authTokens) => {
    const data = await fetch(base_url+'deleteclient/'+user.user_id+'/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }}) 
    data.noJson = true;
    return data;
}

const createClient = async (client, clientToCreate, user,authTokens) => {
    var url=''
    if(client === undefined){ 
            url = base_url+'createclient'}   
    else{   url = base_url+'updateclient/'+ user.user_id + '/' + client.id}
    const data = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        },
        body: JSON.stringify(clientToCreate)
    })
    return data;
}

export default {
    getAllClients,
    deleteClient,
    createClient
};