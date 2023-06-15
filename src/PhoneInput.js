import React, { useState } from "react";
import Endpoints from "./Endpoints";
import axios from "axios";

export default function PhoneInput(props) {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

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
		axios
			.get(Endpoints.subNotifications, {
				headers: {
					uuid: uuid,
					phoneNumber: phoneNumber,
				},
			})
			.then((response) => {
				if (response.status !== 200) {
					alert("Something went wrong when trying to subscribe to notifications");
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<p>Get text message reminders about your court appointment!</p>
			<p>Enter your phone number down below:</p>
			<p>Example: 123-456-7890</p>

			<p className="userError">{phoneErrorMessage}</p>

			<input
				id="phone number"
				type="tel"
				placeholder="123-456-7890"
				value={phoneNumber}
				onInput={(event) => setPhoneNumber(event.target.value)}
				autoComplete="off"
				className="insideSearchbar"
			/>

			<button
				onClick={() => {
					const uuids = props.courtAppearances.map((appearance) => appearance.uuid);
					handlePhoneNumberSubmit(uuids, phoneNumber);
				}}
			>
				Get Text Messages
			</button>
		</div>
	);
}
