import axios from "axios";

export const handler = async (event, context) => {

    // Cursed, but MVP lol
    const fetchedUrl = event.path.slice(event.path.indexOf("http")) 

    const data = await axios.get(fetchedUrl).then(response => response.data)

    return JSON.stringify(data)
};