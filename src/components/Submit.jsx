import React, { useContext } from "react";
import Endpoints from "../Endpoints";
import axios from "axios";
import "./Submit.scss";
import { Context } from "../State";

export default function Submit() {
	const [state, dispatch] = useContext(Context);

	/**
	 * Handles the submission of a request
	 * Takes the uuid of the selected person and a phone number.
	 * Then makes a request to the api to send notifications.
	 * @param {String} stringifiedUuids The unique uuid of each event for the selected person, comma separated
	 * @param {String} phoneNumber The phone number to which reminders will be sent
	 */
	const handleSubmit = async (stringifiedUuids, phoneNumber) => {
		console.log(phoneNumber);
		// Making that api call to subscribe to notifications
		axios
			.get(`${Endpoints.subNotifications}?uuids=${stringifiedUuids}phone=${phoneNumber}email=${""}`
			// 	, {
			// 	headers: {
			// 		uuid: uuid,
			// 		phoneNumber: phoneNumber,
			// 	},
			// }
			)
			.then((response) => {
				if (response.status !== 200) {
					alert("Something went wrong when trying to subscribe to notifications, please try again");
				}
				dispatch({ type: "reset" });
			})
			.catch((error) => console.log(error));
	};



	return (
		<div className="submit input-component">
			<div className="text-confirm">
				<h2>Confirm your information</h2>
				
				{(state.firstName && state.lastName) && <p>First Name: {state.firstName}</p>}
				{(state.firstName && state.lastName) && <p>First Name: {state.lastName}</p>}

				{(state.parties.length > 0) && state.parties.map(party => <p>{party}</p>)}
				<p>Phone Number: {state.prettifiedPhoneNumber}</p>
			</div>
			<button
				onClick={() => {
					const uuids = (state.appearances.map((appearance) => appearance.uuid));

					// Adds all elements together in csv
					const stringifiedUuids = (uuids.reduce((previous, current) => previous + "," + current));

					//alert(stringifiedUuids)

					const formattedNumber = state.rawPhoneNumber.slice(0,3) + "-" + state.rawPhoneNumber.slice(3,6) + "-" + state.rawPhoneNumber.slice(6)

					handleSubmit(stringifiedUuids, formattedNumber);
				}}
			>
				Get text message reminders about your court appointment!
			</button>
		</div>
	);
}
