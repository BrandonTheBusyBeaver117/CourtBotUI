import React, { useContext } from "react";
import "./End.scss";
import { Context } from "../State";

const End = () => {
	const [state, dispatch] = useContext(Context);

	return (
		<div className="end input-component">
			<div className="text-end">
				<p>Success!</p>
				<p>Your text reminders will begin shortly</p>
				<p>Thanks for taking the time to use CourtBot!</p>
			</div>
			<button onClick={() => dispatch({ type: "reset" })}>Get reminders for another person</button>
		</div>
	);
};

export default End;
