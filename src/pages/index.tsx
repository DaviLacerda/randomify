import type { NextPage } from "next";
import Logo from "../components/Logo";
import SearchInput from "../components/SearchInput";

const Home: NextPage = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 min-h-screen p-4">
            <aside className="flex items-left flex-col gap-3 max-w-sm">
                <Logo />
                <p className="font-semibold font-sans">
                    Random Episodes Generator, for you to enjoy with fun but
                    without knowing how!
                </p>
            </aside>
            <SearchInput />
        </div>
    );
};

export default Home;
