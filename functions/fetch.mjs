import axios from "axios";

export const handler = async (event, context) => {

    console.log(event)

    // Cursed, but MVP lol
    const fetchedUrl = event.path.slice(event.path.indexOf("http")) 

    const data = await axios.get(fetchedUrl).then(response => response)

    console.log("end data")
    console.log(data)

    return data
};