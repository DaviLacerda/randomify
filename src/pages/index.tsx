import type { NextPage } from "next";
import Head from "next/head";
import { Logo } from "../components/Logo";
import { AiOutlineRight } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { suggestion } from "../types/suggestion";
import { SuggestionList } from "../components/SuggestionList";
import { useRouter } from "next/router";
import { api_key } from "../utils/apikey";
import { CleanFieldButton } from "../components/CleanFieldButton";

const Home: NextPage = () => {
    const [input, setInput] = useState<string>("");
    const [idSelected, setIdSelected] = useState<number | null>(null);
    const [suggestions, setSuggestions] = useState<suggestion[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const searchContent = async () => {
        setIsLoading(true);
        let time: any = null;

        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&page=1&query=${input}&include_adult=false`
            );
            let results = response.data.results;
            setSuggestions(results);
        } catch (error) {
            console.log(error);
        }
        clearTimeout(time);

        time = setTimeout(async () => {
            setIsLoading(false);
        }, 3000);
    };

    const handleSuggestion = (suggestion: suggestion) => {
        setIdSelected(suggestion.id);
        setInput(suggestion.name);
    };

    const cleanField = () => {
        setInput("");
        setIdSelected(null);
        setSuggestions([]);
    };

    useEffect(() => {
        if (input === "") {
            setIdSelected(0);
            setSuggestions([]);
        } else {
            searchContent();
        }
    }, [input]);

    return (
        <>
            <Head>
                <title>Randomify | Enjoy without knowing how</title>
            </Head>
            <div className="w-full min-h-screen h-full flex flex-col gap-4 items-center justify-center md:flex-row p-4">
                <div className="flex flex-col gap-4 max-w-sm">
                    <Logo isFullLogo />
                    <p>
                        Random Episodes Generator, for you to enjoy with fun but
                        without knowing how!
                    </p>
                </div>
                <div
                    className={`h-12 p-2 relative flex flex-row items-center bg-zinc-800 ${
                        input && !idSelected ? "rounded-t-lg" : "rounded-lg"
                    }`}
                >
                    <input
                        type="text"
                        className="bg-transparent outline-none placeholder:text-zinc-500 "
                        placeholder="Search series"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    {!!idSelected && (
                        <CleanFieldButton onCleanField={cleanField} />
                    )}
                    <div className="absolute top-full left-0 w-full h-fit border-red-500 flex flex-col items-center justify-center gap-2">
                        {/* {input && (
                            isLoading && !idSelected ? (
                                <div className="w-full bg-zinc-800 py-4 flex justify-center rounded-b">
                                    <FaSpinner className="h-4 w-4 fill-brand-default animate-spin" />
                                </div>
                            ) : (
                                <SuggestionList
                                    isOnScreen={!!suggestions && !idSelected}
                                    suggestions={suggestions}
                                    onHandleSuggestion={handleSuggestion}
                                />
                            )
                        )} */}
                        {isLoading ? (
                            <div className="w-full bg-zinc-800 py-4 flex justify-center rounded-b">
                                <FaSpinner className="h-4 w-4 fill-brand-default animate-spin" />
                            </div>
                        ) : (
                            input &&
                            (suggestions.length !== 0 ? (
                                <SuggestionList
                                    isOnScreen={!!suggestions && !idSelected}
                                    suggestions={suggestions}
                                    onHandleSuggestion={handleSuggestion}
                                />
                            ) : (
                                <div className="w-full bg-zinc-800 py-4 flex justify-center rounded-b">
                                    <span>Not found!</span>
                                </div>
                            ))
                        )}
                    </div>
                    <button
                        type="button"
                        disabled={!idSelected}
                        className="disabled:cursor-not-allowed group"
                        onClick={() => router.push(`/${idSelected}`)}
                    >
                        <AiOutlineRight className="fill-brand-default w-8 h-10 hover:brightness-90 group-disabled:brightness-50" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;
