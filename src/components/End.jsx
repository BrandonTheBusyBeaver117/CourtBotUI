import React, { useContext } from "react";
import Back from "./Back";
import Next from "./Next";
import { Context } from "../State";

const End = () => {
	const [state, dispatch] = useContext(Context);

	return (
		<div classname="End">
			<p>Success!</p>
			<p>Your text reminders will begin shortly</p>
			<p>Thanks for taking the time to use CourtBot!</p>
			<button onClick={() => dispatch({ type: "reset" })}>Get reminders for another person</button>
		</div>
	);
};

export default End;
