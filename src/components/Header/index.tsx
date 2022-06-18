import { Logo } from "../Logo";
import Link from "next/link";

export function Header() {
    return (
        <header className="w-full h-auto py-4 absolute top-0 left-0 flex justify-center">
            <Link href="/">
                <a className="transition-all hover:brightness-75 hover:cursor-pointer">
                    <Logo isFullLogo />
                </a>
            </Link>
        </header>
    );
}
