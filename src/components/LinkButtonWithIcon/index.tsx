import Link from "next/link";

interface ExternalLinkButtonProps {
    href: string;
    text: string;
    icon: React.ReactNode;
    target?: string;
}

export function LinkButtonWithIcon({ href, text, icon, target }: ExternalLinkButtonProps) {
    return (
        <Link href={href}>
            <a
                className="flex flex-row items-center gap-2 p-2 max-w-[250px] rounded-lg w-full justify-center bg-brand-default hover:brightness-75 transition-colors"
                target={target}
            >
                <span className="text-black">{text}</span>
                { icon }
            </a>
        </Link>
    )
}