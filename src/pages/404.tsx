import { useRouter } from "next/router";
import { Header } from "../components/Header";
import { LinkButtonWithIcon } from "../components/LinkButtonWithIcon";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosRefresh } from 'react-icons/io';


export default function Custom404() {
    const router = useRouter();
    let { asPath } = router;
    let id = asPath.split("/")[2];
    
    return (
        <div className="w-full min-h-screen flex items-center justify-center flex-col p-4">
            <Header />
            <div className="flex flex-col gap-1 max-w-screen-2xl">
                <h1 className="text-2xl">Error with TMDB API</h1>
                <h2 className="text-xl">Please, go home or try again</h2>
                <small className="text-brand-default underline underline-offset-3 mb-3">advice: sometimes, error appears because have empty episodes in API</small>
                <div className="flex flex-row gap-2">
                    <LinkButtonWithIcon href="/" text="Go home" icon={<AiOutlineHome className="fill-black w-8 h-10"/>} />
                    <LinkButtonWithIcon href={`/${id}`} text="Try again!" icon={<IoIosRefresh className="fill-black w-8 h-10"/>} />
                </div>
            </div>
        </div>
    );
}