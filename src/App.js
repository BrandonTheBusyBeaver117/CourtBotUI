import React, { useState } from "react";
import "./App.scss";
import config from "./config.js";

function App() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [courtAppearances, setCourtAppearances] = useState([]);

	const [phoneNumber, setPhoneNumber] = useState("");
	const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

	/**
	 * Handles a search by making an api request to get the appearances
	 * @param {String} firstName
	 * @param {String} lastName
	 */
	const handleSearch = async (firstName, lastName) => {
		// Making that api call to get appearances
		fetch(config.getAppearances, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				fname: firstName,
				lname: lastName,
			},
		}).then(async (response) => {
			if (response.status !== 200) {
				alert("Something went wrong when trying to get appearances for this person.");
				return;
			}

			// Converting the response into an actual javascript object
			const objectResponse = JSON.parse(await response.json());

			// Depending on json structure of the actual response, this key might be different
			// For now I assume the key "appearances" contains the list of appearance
			const key = "appearances";

			setCourtAppearances(await objectResponse[key]);
		});
	};

	/**
	 * Handles the submission of a phone number.
	 * Takes the uuid of the selected person and a phone number.
	 * Then makes a request to the api to send notifications.
	 * @param {String} uuid The unique user id of the selected person
	 * @param {String} phoneNumber The phone number to which reminders will be sent
	 */
	const handlePhoneNumberSubmit = async (uuid, phoneNumber) => {
		// A regex pattern to check for the ###-###-#### phone format, and ONLY that dashed format
		const regexPattern = /^\d{3}-\d{3}-\d{4}$/;

		// Checking if the phone number does not match the expected pattern
		if (!regexPattern.test(phoneNumber)) {
			setPhoneErrorMessage("Invalid phone number format");
			return;
		}

		// Clearing past errors
		setPhoneErrorMessage("");

		// Making that api call to subscribe to notifications
		fetch(config.subNotifications, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				uuid: uuid,
				phoneNumber: phoneNumber,
			},
		}).then((response) => {
			if (response.status !== 200) {
				alert("Something went wrong when trying to subscribe to notifications");
			}
		});
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>CourtBot</h1>
				<h2>An open source tool to remind you of court appointments</h2>
			</header>
			<body>
				{/* <Searchbar setName={setName}></Searchbar> */}

				<input
					id="firstName"
					type="text"
					placeholder="First Name"
					value={firstName}
					onInput={(event) => setFirstName(event.target.value)}
					autoComplete="off"
					className="insideSearchbar"
				/>

				<input
					id="lastName"
					type="text"
					placeholder="Last Name"
					value={lastName}
					onInput={(event) => setLastName(event.target.value)}
					autoComplete="off"
					className="insideSearchbar"
				/>

				<button onClick={() => handleSearch(firstName, lastName)}>Search</button>

				<p>Get text message reminders about your court appointment!</p>
				<p>Enter your phone number down below:</p>
				<p>Example: 123-456-7890</p>

				<p class="userError">{phoneErrorMessage}</p>

				<input
					id="phone number"
					type="text"
					placeholder="123-456-7890"
					value={phoneNumber}
					onInput={(event) => setPhoneNumber(event.target.value)}
					autoComplete="off"
					className="insideSearchbar"
				/>

				<button
					onClick={() => {
						const uuids = courtAppearances.map((appearance) => appearance.uuid);
						handlePhoneNumberSubmit(uuids, phoneNumber);
					}}
				>
					Get Text Messages
				</button>
			</body>
		</div>
	);
}

export default App;
