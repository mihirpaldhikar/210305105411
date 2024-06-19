import {JSX} from "react";

export default function Navbar(): JSX.Element {
    return (
        <header
            className={
                "fixed z-50 flex h-16 w-full items-center justify-between border-b border-b-gray-300 bg-white/70 px-5 py-3 backdrop-blur-3xl"
            }
        >
            <a href="/" className={"flex items-center"}>
                <h1
                    className={"dancing-font pl-5 text-3xl font-black text-fuchsia-950"}
                >
                    <span className={"text-orange-500"}>E</span> Comm
                </h1>
            </a>
        </header>
    );
}
