import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Searchbar from "./Searchbar";
import endpoints from "./endpoints.json";

function App() {
	const [phoneNumber, setPhoneNumber] = useState("488");

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [clickedInsideSearchbar, setClickedInsideSearchbar] = useState(false);
	const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

	const [appearances, setAppearances] = useState([]);

	// Thanks to Ben Bud's answer for inspiration
	// Solution found at https://stackoverflow.com/a/42234988
	// Keeps track of whether user is inside searchbar or not

	const lastClickedClassName = useRef("");
	useEffect(() => {
		function handleClickOutside(event) {
			const isPrevClickInside = lastClickedClassName.current === "insideSearchbar";
			const isCurrentClickInside = event.target.className === "insideSearchbar";

			if (isPrevClickInside && !isCurrentClickInside) {
				console.log("click outside");
				setClickedInsideSearchbar(false);
			} else if (!isPrevClickInside && isCurrentClickInside) {
				console.log("Click inside");
				setClickedInsideSearchbar(true);
			}

			lastClickedClassName.current = event.target.className;
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	/**
	 * Handles a search by making an api request to get the appearances
	 * @param {String} firstName
	 * @param {String} lastName
	 */
	const handleSearch = (firstName, lastName) => {};

	/**
	 * Handles the submission of a phone number by making a request
	 * @param {String} uuid The unique user id of the selected person
	 * @param {String} phoneNumber The phone number to which reminders will be sent
	 */
	const handlePhoneNumberSubmit = async (uuid, phoneNumber) => {
		// A regex to check for the ###-###-#### phone format, and ONLY that dashed format
		const regexPattern = /^\d{3}-\d{3}-\d{4}$/;

		// Checking if the phone number does not match the expected pattern
		if (!regexPattern.test(phoneNumber)) {
			setPhoneErrorMessage("Invalid phone number format");
			return;
		}

		// Clearing past errors
		setPhoneErrorMessage("");

		const response = await fetch(endpoints.subNotifications, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		setAppearances(await response.json());
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

				<button onClick={handleSearch}>Search</button>

				<p>Get text message reminders about your court appointment!</p>
				<p>Enter your phone number down below:</p>
				<p>Example: 123-456-7890</p>

				<input
					id="phone number"
					type="text"
					placeholder="Last Name"
					value={lastName}
					onInput={(event) => setPhoneNumber(event.target.value)}
					autoComplete="off"
					className="insideSearchbar"
				/>

				<button onClick={handlePhoneNumberSubmit}>Get Text Messages</button>
			</body>
		</div>
	);
}

export default App;
