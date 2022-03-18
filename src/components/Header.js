import { useContext } from "react";
import { ThemeContext } from "../App";

export default function Header() {
    const { setTheme } = useContext(ThemeContext);
    return (
        <header className="App-header">
            Let's start
            <button onClick = {setTheme}>Change theme</button>
        </header>
    );
};