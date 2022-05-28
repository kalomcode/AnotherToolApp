import {base_url} from '../environment/global';

const getAllEvents= async (user, authTokens)=>{
    const data = await fetch(base_url+"events/"+user.user_id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }})
    return data;    
}

const getNextEvents= async (user, authTokens)=>{
    const data = await fetch(base_url+"nextevents/"+user.user_id,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }})   
    return data;
}

const createEvent = async (id, event, user,authTokens) => {
    var url=''
    if(id === undefined){ 
            url = base_url+'createevent'}   
    else{   url = base_url+'updateevent/'+ user.user_id + '/' +id}
    const data = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        },
        body: JSON.stringify(event)
        })
    return data;
}
const deleteEvent = async (id, user, authTokens) => {
    const data = await fetch(base_url+'deleteevent/'+user.user_id+'/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ String(authTokens.access),
        }})
    data.noJson = true;
    return data; 
}


export default {
    getAllEvents,
    getNextEvents,
    createEvent,
    deleteEvent,
  };