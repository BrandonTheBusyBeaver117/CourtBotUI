import React, { useState, useEffect } from "react";
import { Endpoints, MockData } from "../config.js";
import axios from "axios";
import Select from "react-select";
//import { SearchSettings } from "./config";
import "./NameInput.scss";

/** Component to take in and return names */
export default function NameInput(props) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	/** List of all names in a {value, label} format*/
	const [allNames, setAllNames] = useState([]);

	/** Grabs names when component is mounted */
	useEffect(() => {
		/**
		 * Creates a list all names in a {value, label} format by iterating over
		 * the array and creating objects based on each value
		 * @param {String[]} names A list of names
		 */
		const createSelectObjects = (names) => {
			return names.map((name) => ({ value: name, label: name }));
		};

		if (MockData.useMockData) {
			setAllNames(createSelectObjects(MockData.mockNames));
		} else {
			(async () => {
				axios
					.get(Endpoints.getAllNames)
					.then((response) => {
						console.log(response);
						// Checking for errors
						if (response.status !== 200) {
							alert("Something went wrong when trying to get names");
							return;
						}
						setAllNames(createSelectObjects(response.data[Endpoints.allNamesKey]));
					})
					.catch((error) => console.log(error));
			})();
		}
	}, []);

	/**
	 * Handles a search by making an api request to get the appearances
	 * @param {String} firstName
	 * @param {String} lastName
	 */
	const handleSearch = async (firstName, lastName) => {
		// Making that api call to get appearances
		axios
			.get(Endpoints.getAppearances, {
				headers: {
					fname: firstName,
					lname: lastName,
				},
			})
			.then((response) => {
				console.log(response);
				// Checking for errors
				if (response.status !== 200) {
					alert("Something went wrong when trying to get appearances for this person.");
					return;
				}

				// Setting the court appearances
				props.setCourtAppearances(response.data[Endpoints.appearanceKey]);
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<p>Enter your name here</p>
			<div className="results">
				<Select
					className="insideSearchbar"
					options={allNames}
					onChange={(name) => {
						console.log(name);
						const [fName, lName] = name.value.split(" ");
						setFirstName(fName);
						setLastName(lName);
					}}
					isSearchable={true}
					placeholder="FirstName LastName"
					noOptionsMessage={() => "Nobody found with that name"}
				/>
			</div>

			<button
				onClick={() => {
					// If we want to use mock data, just use the mock appearances
					if (MockData.useMockData) {
						props.setCourtAppearances(MockData.mockAppearances);
						return;
					}

					// Otherwise, handle search normally
					handleSearch(firstName, lastName);
				}}
			>
				Search
			</button>
		</div>
	);
}
