import axios from "axios";

export const handler = async (event, context) => {

    // Cursed, but MVP lol
    // Slicing to get the actual url wanted
    const fetchedUrl = event.path.slice(event.path.indexOf("http")) 

    const data = await axios.get(fetchedUrl).then(response => response.data)

    console.log(fetchedUrl)
    console.log(data)

    return {
        statusCode: 200,
        data: JSON.stringify(data),
        body: JSON.stringify(data)
    }
};