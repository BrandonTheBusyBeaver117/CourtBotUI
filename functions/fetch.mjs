import axios from "axios";

export const handler = async (event, context) => {

    console.log(event)

    // Cursed, but MVP lol
    const fetchedUrl = event.path.slice(event.path.indexOf("http")) 

    return axios.get(fetchedUrl)
};