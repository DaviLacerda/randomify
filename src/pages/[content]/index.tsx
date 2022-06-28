import axios from "axios";
import { GetServerSideProps } from "next";
import styles from "../../styles/twitchEffect.module.css";
import Head from "next/head";
import { Header } from "../../components/Header";
import { RefreshButton } from "../../components/RefreshButton";
import { ExternalLinkButton } from "../../components/ExternalLinkButton";
import { network } from "../../types/network";
import { api_key } from "../../utils/apikey";

interface IdProps {
    data: {
        title: string;
        description: string;
        homepage: string;
        details: {
            title: string;
            description: string;
            season: number;
            episode: number;
            img: string | null;
        };
        networks: network[];
    };
}

export default function Content({ data }: IdProps) {
    return (
        <>
            <Head>
                <title>{data.title} | Randomify</title>
            </Head>
            <div className="w-full min-h-screen h-full flex flex-col items-center justify-center p-4 py-12">
                <Header />
                <div className={`flex flex-col gap-4 ${data.details.img ? "lg:flex-row" : "lg:flex-col"} items-center max-w-screen-xl py-12`}>
                    <div className="flex flex-col max-w-md lg:max-w-xl">
                        <h1 className="text-2xl font-bold w-full">
                            {data.details.title}
                        </h1>
                        <small className="w-full text-base text-zinc-400 italic">
                            {data.details.season}º Season -{" "}
                            {data.details.episode}º Episode
                        </small>
                        <p className="w-full text-xl mb-8 leading-relaxed text-zinc-300">
                            {data.details.description}
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {data.details.img && (
                            <div className={styles.container}>
                                <img
                                    src={data.details.img}
                                    alt={data.details.title}
                                    className="w-full max-w-lg transition-all"
                                />
                            </div>
                        )}
                        {data.networks && (
                            <div className="flex flex-row flex-wrap gap-3 items-center">
                                <h3>Available in:</h3>
                                {data.networks.map(
                                    (network) =>
                                        network.img && (
                                            <img
                                                src={network.img}
                                                alt={network.name}
                                                key={network.name}
                                                className="h-8 w-auto"
                                            />
                                        )
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full flex-wrap sm:flex-nowrap flex flex-row justify-center gap-4 items-center translate-y-4">
                    <RefreshButton />
                    { data.homepage && <ExternalLinkButton href={data.homepage} text="Check it out!" /> }
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { content } = params as any;

    const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${content}?api_key=${api_key}`
    );

    if(!data.first_air_date){
        return {
            redirect: {
                destination: `/404/${content}`,
                permanent: false,
            }
        }
    }

    let randomSeason = Math.floor(Math.random() * data.number_of_seasons) + 1;
    let randomEpisode =
        Math.floor(
            Math.random() * data.seasons[randomSeason - 1].episode_count
        ) + 1;

    const { data: episode } = await axios.get(
        `https://api.themoviedb.org/3/tv/${content}/season/${randomSeason}/episode/${randomEpisode}?api_key=${api_key}`
    );

    if (episode.overwiew === null || episode.overview === "") {
        return {
            redirect: {
                destination: `/404/${content}`,
                permanent: false,
            },
        };
    }

    const img = episode.still_path
        ? `https://image.tmdb.org/t/p/original${episode.still_path}`
        : null;

    const networks = data.networks.map((network:network) => {
        return {
            name: network.name,
            img: network.logo_path
                ? `https://image.tmdb.org/t/p/original${network.logo_path}`
                : null,
        };
    });

    return {
        props: {
            data: {
                title: data.name,
                description: data.overview,
                homepage: data.homepage,
                details: {
                    title: episode.name,
                    description: episode.overview,
                    season: episode.season_number,
                    episode: episode.episode_number,
                    img,
                },
                networks,
            },
        },
    };
};
