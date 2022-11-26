import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import SearchInput from "../components/SearchInput";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Randomify | Enjoy without knowing how!</title>
            </Head>
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
            <Footer />
        </>
    );
};

export default Home;
