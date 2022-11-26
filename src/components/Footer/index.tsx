import Link from "next/link";

const Footer = () => {
    return (
        <footer className="fixed bottom-0 flex justify-center py-8 w-full bg-neutral-800">
            <p>
                Made with ♥ by{" "}
                <Link href="https://github.com/davilacerda">
                    <a 
                        className="hover:text-brand-400 hover:underline underline-offset-2"
                        target="_blank"
                    >Davi Lacerda</a>
                </Link>
            </p>
        </footer>
    );
};

export default Footer;
