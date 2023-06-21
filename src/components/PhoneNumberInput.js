import React, { useState } from "react";
import Endpoints from "../Endpoints";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./PhoneNumberInput.scss";

export default function PhoneNumberInput(props) {
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
		<div className="phoneNumberInput">
			<p>Get text message reminders about your court appointment!</p>
			<p>Enter your phone number down below:</p>
			<p>Example: 123-456-7890</p>

			<p className="userError">{phoneErrorMessage}</p>

			<div className="phoneWrapper">
				<PhoneInput
					id="phoneNumber"
					country={"us"}
					onlyCountries={["us"]}
					disableDropdown={true}
					disableCountryCode={true}
					onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
					value={phoneNumber}
					placeholder="(408) 123-4567"
				/>
			</div>
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
