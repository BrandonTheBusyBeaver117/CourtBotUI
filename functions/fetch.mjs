import axios from "axios";

export const handler = async (event, context) => {

    console.log(event)

    // Cursed, but MVP lol
    const fetchedUrl = event.path.slice(event.path.indexOf("http")) 

    const data = await axios.get(fetchedUrl).then(response => { 
        console.log("regular response")
        console.log(response)

        console.log("json-ified response")
        console.log(JSON.parse(response))
        return response.json()
    })

    console.log("end data")
    console.log(data)

    return data
};