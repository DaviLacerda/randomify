import Turnstone from "turnstone";
import { api, api_key } from "../../utils/api";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

type Item = {
    item: {
        id: number;
        name: string;
        poster_path: string;
    };
};

const styles = {
    query: "placeholder:text-[#73737350]",
    input: "bg-neutral-800 w-full max-w-sm h-12 p-4 transition-colors border-2 border-transparent duration-300 text-ellipsis",
    typeahead: "text-neutral-600",
    inputFocus:
        "bg-neutral-800 w-full max-w-sm h-12 p-4 outline-none border-brand-400 border-2",
    listbox: "bg-neutral-800 w-full max-w-sm",
    noItems: "w-full h-16 px-4 py-1 bg-neutral-800 flex items-center",
    highlightedItem: "bg-neutral-700",
    clearButton:
        "absolute w-6 h-12 inset-y-0 right-0 text-2xl items-center justify-center z-10 text-white inline-flex transition-colors hover:text-neutral-600",
};

const listbox = {
    displayField: "name",
    data: async (query: string) => {
        const res = await api.get(
            `search/tv?api_key=${api_key}&page=1&query=${query}&include_adult=false`
        );
        const { results } = res.data;
        return results;
    },
    searchType: "contains",
};

const SearchInput = () => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleRedirect = (event: FormEvent) => {
        event.preventDefault();
        router.push(`/search/${query}`);
    };

    const Item = ({ item }: Item) => {
        const { name, poster_path } = item;
        return (
            <div className="w-full px-4 py-1 h-16 flex flex-row justify-between items-center cursor-pointer">
                <span className="font-semibold text-white">{name}</span>
                { poster_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        alt={name}
                        className="h-full w-10"
                    />
                ) }
            </div>
        );
    };

    return (
        <div className="w-full max-w-sm">
            <form onSubmit={handleRedirect} className="flex items-center gap-2">
                <div className="w-full">
                    <Turnstone
                        id="search"
                        clearButton
                        styles={styles}
                        listbox={listbox}
                        noItemsMessage="No results found"
                        placeholder="Type your favorite series here.."
                        Item={Item}
                        maxItems={5}
                        debounceWait={500}
                        onChange={(value:string) => setQuery(value)}
                    />
                </div>
                <button
                    disabled={query === ""}
                    type="submit"
                    className="group flex items-center h-12 border-2 border-transparent p-2 focus:border-2 focus:border-brand-400 outline-none rounded transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed"
                >
                    <AiOutlineArrowRight className="fill-brand-400 h-8 w-8 transition-colors duration-200 group-disabled:opacity-50" />
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
