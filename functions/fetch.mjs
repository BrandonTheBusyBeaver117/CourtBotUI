import axios from "axios";

export const handler = async (event, context) => {

    // Cursed, but MVP lol
    // Slicing to get the actual url wanted
    let fetchedUrl = event.path.slice(event.path.indexOf("http")) 

    let firstIteration = true;

    Object.entries(event.queryStringParameters).forEach((entry) => {

        if(firstIteration){
            fetchedUrl += "?"
            firstIteration = false;
        } else {
            fetchedUrl += "&"
        }

        const [key, value] = entry
        fetchedUrl += key + "=" + value
    })

    const data = await axios.get(fetchedUrl).then(response => response.data)

    console.log("Event:" + event)
    console.log("raw url??" + event.url)
    console.log("raw path: " + event.path)
    console.log("query parameters path: " + JSON.stringify(event.queryStringParameters))
    console.log("fetchedurl: " + fetchedUrl)
    console.log(data)

    return {
        statusCode: 200,
        data: JSON.stringify(data),
        body: JSON.stringify(data)
    }
};