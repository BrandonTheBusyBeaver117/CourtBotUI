import React, { useState } from "react";
import "./App.scss";
import NameInput from "./NameInput";
import PhoneInput from "./PhoneInput";

function App() {
	const [courtAppearances, setCourtAppearances] = useState([]);

	return (
		<div className="App">
			<header className="App-header">
				<h1>CourtBot</h1>
				<h2>An open source tool to remind you of court appointments</h2>
			</header>
			<body>
				<NameInput setCourtAppearances={setCourtAppearances} />
				<PhoneInput courtAppearances={courtAppearances} />
			</body>
		</div>
	);
}

export default App;
