import React, { useContext } from "react";
import Endpoints from "../Endpoints";
import axios from "axios";
import "./Submit.scss";
import { Context } from "../State";
import Back from "./Back";
import Next from "./Next";

export default function Submit() {
	const [state, dispatch] = useContext(Context);

	/**
	 * Handles the submission of a request
	 * Takes the uuid of the selected person and a phone number.
	 * Then makes a request to the api to send notifications.
	 * @param {String} uuid The unique user id of the selected person
	 * @param {String} phoneNumber The phone number to which reminders will be sent
	 */
	const handleSubmit = async (uuid, phoneNumber) => {
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
					alert("Something went wrong when trying to subscribe to notifications, please try again");
				}
				dispatch({ type: "reset" });
			})
			.catch((error) => console.log(error));
	};
	return (
		<div className="Submit">
			<p>Name: {state.name}</p>
			<p>Phone-Number: {state.phoneNumber}</p>
			<button
				onClick={() => {
					const uuids = state.appearances.map((appearance) => appearance.uuid);
					handleSubmit(uuids, state.phoneNumber);
				}}
			>
				Get text message reminders about your court appointment!
			</button>
		</div>
	);
}