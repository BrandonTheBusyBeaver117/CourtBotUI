import React, { useState } from "react";
import config from "./config.js";
import axios from "axios";

/** Component to take in and return names */
export default function NameInput(props) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	/**
	 * Handles a search by making an api request to get the appearances
	 * @param {String} firstName
	 * @param {String} lastName
	 */
	const handleSearch = async (firstName, lastName) => {
		// Making that api call to get appearances
		axios
			.get(config.getAppearances, {
				headers: {
					fname: firstName,
					lname: lastName,
				},
			})
			.then((response) => {
				console.log(response);
				// Checking for errors
				if (response.status !== 200) {
					alert("Something went wrong when trying to get appearances for this person.");
					return;
				}

				// Depending on json structure of the actual response, this key might be different
				// For now I assume the key "appearances" contains the list of appearance
				const key = "appearances";

				// Setting the court appearances
				props.setCourtAppearances(response.data[key]);
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
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

			<button
				onClick={() => {
					// If we want to use mock data, just use the mock appearances
					if (config.useMockData) {
						props.setCourtAppearances(config.mockAppearances);
						return;
					}

					// Otherwise, handle search normally
					handleSearch(firstName, lastName);
				}}
			>
				Search
			</button>
		</div>
	);
}
