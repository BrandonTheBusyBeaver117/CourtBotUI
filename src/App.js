import React, {useContext } from "react";
import "./App.scss";
import { Context } from "./State";
import NameInput from "./components/NameInput";
import PhoneNumberInput from "./components/PhoneNumberInput";
import Submit from "./components/Submit";
import End from "./components/End";
import Back from "./components/Back";
import Next from "./components/Next";

function App() {
	const [state, ] = useContext(Context);

	const currentComponent = (() => {
		switch (state.mode) {
			case "Name":
				return <NameInput />;
			case "Phone":
				return <PhoneNumberInput />;
			case "Submit":
				return <Submit />;
			case "End":
				return <End />;
			default:
				<p>Invalid state, {state.mode}</p>;
		}
	})();

	return (
		<div className="App">
			<header className="App-header">
				<h1 id="App-title">CourtBot</h1>
				<h2 id="App-description">An open source tool to remind you of court appointments</h2>
			</header>
			<body>
				<div className="current-wrapper">{currentComponent}</div>
				<Back />
				<Next />
			</body>
		</div>
	);
}

export default App;
