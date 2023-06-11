/* eslint-disable no-unused-vars */
export const baseUrl = "http://localhost:5000/api"

export const postRegister = async (url , body) => {
    const response = await fetch(url ,  {
        method:"POST",
        headers:{
            "content-Type" : "application/json",
        },
        body,
    });

    const data = await response.json();

    if(!response.ok){
        let message
        if(data?.message)
            message = data.message;
        else  
            message = data;  
        return {error : true , message}  
    }
    return data;
}