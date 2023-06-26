import React, { useState, useContext } from "react";
import "./App.scss";
import { Context } from "./State";
import NameInput from "./components/NameInput";
import PhoneNumberInput from "./components/PhoneNumberInput";
import Confirm from "./components/Confirm";

function App() {
	const [state, dispatch] = useContext(Context);

	console.log(state.mode);
	const currentComponent = (() => {
		console.log(state.mode);
		switch (state.mode) {
			case "Name":
				return <NameInput></NameInput>;
			case "Phone":
				return <PhoneNumberInput></PhoneNumberInput>;
			case "Submit":
				return <Confirm></Confirm>;
			default:
				<p>Invalid state, something has gone terribly wrong</p>;
		}
	})();

	return (
		<div className="App">
			<header className="App-header">
				<h1 id="App-title">CourtBot</h1>
				<h2 id="App-description">An open source tool to remind you of court appointments</h2>
			</header>
			<body>{currentComponent}</body>
		</div>
	);
}

export default App;
