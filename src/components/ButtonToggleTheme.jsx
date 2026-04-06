import { useState } from "react";

export default function ButtonToggleTheme() {
    const [isLight, setIsLight] = useState(
        document.body.className === "light" ? true : false
    );

    const svg_path_lightOn =
        "M7 130 L41 108 M75 135 L60 172 M125 135 L140 172 M193 130 L159 108 M193 130 L159 108";
    const svg_path_lightOff =
        "M-178 249 L-76 183 M25 264 L-20 375 M174 264 L220 375 M378 249 L276 184 M100 20 L100 120";

    function handleClick(event) {
        event.preventDefault();
        setIsLight((prev) => {
            console.log(`Current theme: ${document.body.className} is ${prev}`);
            if (prev) {
                document.body.className = "dark";
            } else {
                document.body.className = "light";
            }
            return !prev;
        });
    }

    return (
        <button
            className="btn-theme-toggle"
            title="Toggle light/dark modes"
            onClick={handleClick}
        >
            <svg
                className="btn-theme-toggle-svg"
                viewBox="0 0 200 200"
                width="200"
                height="200"
            >
                <circle
                    cx="100"
                    cy="70"
                    r="50"
                    fill="none"
                    stroke="black"
                    strokeWidth="20"
                />
                <path
                    d={isLight ? svg_path_lightOn : svg_path_lightOff}
                    fill="none"
                    stroke="black"
                    strokeWidth="20"
                />
            </svg>
        </button>
    );
}
