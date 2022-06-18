import { suggestion } from "../../types/suggestion";

interface SuggestionListProps {
    suggestions: suggestion[];
    isOnScreen: boolean;
    onHandleSuggestion: (suggestion: suggestion) => void;
}

export function SuggestionList({ suggestions, isOnScreen, onHandleSuggestion }: SuggestionListProps) {
    return (
        <ul
            role="list"
            className="w-full min-h-fit max-h-48 bg-zinc-800 rounded-b-lg overflow-y-scroll scrollbar scrollbar-thumb-brand-default scrollbar-track-transparent scrollbar-thin"
        >
            {isOnScreen &&
                suggestions.map((suggestion) => {
                    return (
                        <li
                            key={suggestion.id}
                            className="w-full p-1 h-16 flex flex-row justify-between gap-1 cursor-pointer hover:bg-zinc-600"
                            onClick={() => onHandleSuggestion(suggestion)}
                        >
                            <span>{suggestion.name}</span>
                            { suggestion.poster_path && <img src={`https://image.tmdb.org/t/p/original/${suggestion.poster_path}`} alt={suggestion.name} className="w-auto h-full" /> }
                        </li>
                    );
                })}
        </ul>
    );
}
