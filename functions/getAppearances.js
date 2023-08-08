import axios from "axios";

export const handler = async (event, context) => {

    console.log(event)
    console.log(event.body)
    console.log(JSON.stringify(event.body))
    return axios.get("http://50.116.13.181:8080/courtbot/getRandom")
   
};