import axios from "axios";

export const handler = async (event, context) => {

    // Cursed, but MVP lol
    // Slicing to get the actual url wanted
    // Ignoring the path
    let fetchedUrl = event.rawUrl.slice(event.rawUrl.indexOf("http", 9)) 

    const data = await axios.get(fetchedUrl).then(response => response.data)

    console.log("fetched url: " + fetchedUrl)
    console.log(data)

    return {
        statusCode: 200,
        data: JSON.stringify(data),
        body: JSON.stringify(data)
    }
};