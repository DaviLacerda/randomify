import Head from "next/head";
import LinkButton from "../../../components/Buttons/LinkButton";
import Header from "../../../components/Header";
import { api, api_key } from "../../../utils/api";
import { GetServerSideProps } from "next";
import { BiLinkExternal } from "react-icons/bi";
import ReloadPageButton from "../../../components/Buttons/ReloadPageButton";

type Data = {
    title: string;
    episode_name: string;
    still_path: string;
    overview: string;
    number_of_episode: number;
    number_of_season: number;
    backgroundPath: string;
    homepage: string;
}

interface NameProps {
    data: Data;
}

export default function Name({ data }: NameProps) {
    return (
        <>
            <Head>
                <title>{data.title} | Randomify</title>
            </Head>
            <div
                className="bg-no-repeat bg-cover bg-center min-h-screen w-full fixed top-0 -z-10 opacity-80 brightness-50"
                style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/original${data.backgroundPath}')`,
                }}
            />
            <div className="flex items-center justify-center min-h-screen">
                <Header />
                <div className="flex flex-col max-w-screen-lg gap-2 p-4">
                    <h1 className="text-2xl font-bold">{data.episode_name}</h1>
                    <span className="text-sm text-neutral-400">
                        {data.number_of_season}º Season -{" "}
                        {data.number_of_episode}º Episode
                    </span>
                    <p className="text-xl">{data.overview}</p>
                    <div className="grid gap-2 grid-rows-2 justify-between place-items-center self-center sm:grid-rows-none sm:grid-cols-2">
                        { data.homepage && (
                            <LinkButton icon={<BiLinkExternal />} href={data.homepage}>
                                Homepage
                            </LinkButton>
                        )}
                        <ReloadPageButton />
                    </div>
                    { data.still_path && (
                        <div className="flex justify-center w-full">
                            <img
                                src={`https://image.tmdb.org/t/p/original${data.still_path}`}
                                alt={data.title}
                                className="w-full max-w-xl mt-5 border-2 border-brand-400"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<{data: Data}> = async ({ params }) => {
    const { name }:any = params;

    const res = await api.get(
        `search/tv?api_key=${api_key}&query=${name}&include_adult=false`
    );

    const { results } = res.data;

    const matchedResult = results.find((result:any) => {
        return result.name.toLowerCase() === name.toLowerCase();
    });

    if (!matchedResult.first_air_date) {
        return {
            notFound: true,
        };
    }

    const infos = await api.get(`tv/${matchedResult.id}?api_key=${api_key}`);

    const { name: title, number_of_seasons, seasons, homepage } = infos.data;

    const randomSeason = Math.floor(Math.random() * number_of_seasons) + 1;
    const randomEpisode =
        Math.floor(Math.random() * seasons[randomSeason - 1].episode_count) + 1;

    const episode = await api.get(
        `tv/${matchedResult.id}/season/${randomSeason}/episode/${randomEpisode}?api_key=${api_key}`
    );

    const { name: episode_name, overview, still_path, runtime } = episode.data;

    if (!runtime) {
        return {
            redirect: {
                destination: `/search/${name}`,
                permanent: false,
            },
        };
    }

    const data = {
        title,
        episode_name,
        overview,
        still_path,
        number_of_episode: randomEpisode,
        number_of_season: randomSeason,
        backgroundPath: matchedResult.backdrop_path,
        homepage
    };

    return {
        props: {
            data,
        },
    };
}
