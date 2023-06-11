const config = {
	// Endpoints
	/** The endpoint for getting the court appearances of a person */
	getAppearances: "/getAppearances",

	/** The endpoint for subscribing to notifications */
	subNotifications: "/subNotifications",

	// dev-mode, allows for direct toggling between features
	devMode: true,

	// Mock data
	/**
	 * Setting 'useMockData' this on means that the website won't send requests, and
	 * instead use the mock data defined below
	 */
	useMockData: true,

	// Not really used, but a list of random names
	mockNames: ["John", "Adam", "Apple", "Joe", "Bob", "Zach", "Ted", "Mark", "Yee", "Richard", "Mall"],

	/**
	 * An array of 'appearance' object literals
	 */
	mockAppearances: [
		{
			uuid: "hfjkshdfksfdhj-yydsfjh-fgjhsdjgdfs",
			datetime: "2023-07-15 12:30 PST",
			parties: ["Bob Smith", "State of California"],
			location: "Santa Clara County Main Courthouse",
			department: "25J",
		},
		{
			uuid: "6a8e9ca0-081d-11ee-be56-0242ac120002",
			datetime: "2023-08-15 2:30 PST",
			parties: ["Bob Smith", "State of California"],
			location: "Santa Clara County Main Courthouse",
			department: "27C",
		},
		{
			uuid: "6a8e9f34-081d-11ee-be56-0242ac120002",
			datetime: "2023-09-15 4:30 PST",
			parties: ["Bob Smith", "State of California"],
			location: "Santa Clara County Main Courthouse",
			department: "29K",
		},
	],
};

export default config;
