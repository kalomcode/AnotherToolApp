import {base_url} from '../environment/global';


const getAllServices=(user, authTokens)=>(
    fetch(base_url+"services/"+user.user_id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }})   
    )

const deleteService = async (id, user, authTokens) => {
    const data = await fetch(base_url+'deleteservice/'+user.user_id+'/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }}) 
    data.noJson = true;
    return data;
}

const createService = async (service, serviceToCreate, user,authTokens) => {
    var url=''
    if(service === undefined){ 
            url = base_url+'createservice'}   
    else{   url = base_url+'updateservice/'+ user.user_id + '/' + service.id}
    const data = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        },
        body: JSON.stringify(serviceToCreate)
    })
    return data;
}



export default {
    getAllServices,
    deleteService,
    createService
    
  };