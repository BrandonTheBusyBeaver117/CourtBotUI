const Endpoints = {
	/** The endpoint for getting the court appearances of a person */
	getAppearances: "/getAppearances",

	/** The key in the getAppearances response containing the appearance data */
	appearanceKey: "appearances",

	/** The endpoint for getting all the peoples' names on file */
	getAllNames: "/getAllNames",

	/** The key in the getAllNames response containing the all the name data */
	allNamesKey: "allNames",

	/** The endpoint for subscribing to notifications */
	subNotifications: "/subNotifications",
};

export default Endpoints;
