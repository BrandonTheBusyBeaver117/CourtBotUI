import React, { useEffect, useRef } from "react";

export default function Searchbar(props) {
	// Thanks to Ben Bud's answer for inspiration
	// Solution found at https://stackoverflow.com/a/42234988

	const lastClickedClassName = useRef("");

	// Keeps track of whether user is inside searchbar or not
	useEffect(() => {
		function handleClickOutside(event) {
			const isPrevClickInside = lastClickedClassName.current === "insideSearchbar";
			const isCurrentClickInside = event.target.className === "insideSearchbar";

			if (isPrevClickInside && !isCurrentClickInside) {
				console.log("click outside");
				setClickedInsideSearchbar(false);
			} else if (!isPrevClickInside && isCurrentClickInside) {
				console.log("Click inside");
				setClickedInsideSearchbar(true);
			}

			lastClickedClassName.current = event.target.className;
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	/**
        
    */

	/**
	 * When there's a change to the searchbar, this function will work to filter through the names
	 * and return matches
	 * @param {String[]} names
	 * @param {String} inputValue
	 * @param {Boolean} isClickedInsideSearchbar
	 * @returns
	 */
	const handleChange = (names, inputValue, isClickedInsideSearchbar) => {
		//console.log(inputValue)

		// Is there a response? OR The user has clicked outside the searchbar
		if (inputValue.length < 1 || !isClickedInsideSearchbar) {
			// Show no results
			return [];
		}

		// All the names that match
		const results = [];

		// Makes sure that the searchbar input only has letters
		if (/^[a-z]+$/i.test(inputValue)) {
			// Were there any results found?
			let anyResultFound = false;

			// Traverses through all the names
			for (const name of names) {
				// .slice takes the length of the name to compare to the input value
				// If they are equal, then it's a match, and it's a possible result
				if (name.slice(0, inputValue.length) === inputValue) {
					// We did find a result
					anyResultFound = true;

					// Push the result
					results.push(
						<p
							key={name}
							// onClick={() => handleResultClick(teamNumber)}
							className="insideSearchbar"
						></p>
					);
				}
			}

			if (anyResultFound) {
				// If there's any results, return them
				return results;
			} else {
				//If there's no result found, then there will be this error message
				return <p className="insideSearchbar">No one found with that name</p>;
			}
		}
	};

	return (
		<div className="searchbar">
			<div className="results">{handleChange(props.teamInformation, searchbarValue, clickedInsideSearchbar)}</div>
		</div>
	);
}
