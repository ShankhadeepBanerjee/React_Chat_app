// components
import Nav1 from "../macroComponents/Nav1";
import Screen1Body from "../macroComponents/Screen1Body";
import Screen1_1 from "../macroComponents/Screen1_1";
// hooks, functions and states
// css
import "./Screen1.css";

export default function Screen1() {
	return (
		<div className="screen1">
			<Screen1_1 />
			<Nav1 />
			<Screen1Body />
		</div>
	);
}
