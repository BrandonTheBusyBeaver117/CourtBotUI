const proxyUrl = ".netlify/functions/fetch/"

const Endpoints = {

	/** The endpoint for getting the court appearances of a person */
	getAppearances: proxyUrl + "http://50.116.13.181:8080/courtbot/getAppearances",

	/** The endpoint for subscribing to notifications */
	subNotifications: proxyUrl + "http://50.116.13.181:8080/courtbot/register",

	getRandom: proxyUrl + "http://50.116.13.181:8080/courtbot/getRandom",
};

export default Endpoints;
