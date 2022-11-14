import Link from "next/link";
import Logo from "../Logo";

const Header = () => {
    return (
        <header className="w-full absolute top-0 flex justify-center py-8 bg-fade-effect">
            <Link href="/" passHref>
                <a className="transition-all hover:opacity-50">
                    <Logo />
                </a>
            </Link>
        </header>
    )
}

export default Header