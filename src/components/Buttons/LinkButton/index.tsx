import Link from "next/link";

interface LinkButtonProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    href: string;
}

const LinkButton = ({ children, icon, href, ...rest }: LinkButtonProps) => {
    if (icon) {
        return (
            <Link href={href}>
                <a
                    className="flex items-center justify-center gap-4 border-2 border-white max-w-[275px] py-2 px-4 fill-white font-bold text-2xl transition-all duration-300 hover:bg-brand-400 hover:border-brand-400 hover:text-black hover:fill-black"
                    {...rest}
                    target="_blank"
                >
                    {icon}
                    {children}
                </a>
            </Link>
        );
    }

    return (
        <Link href={href}>
            <a
                className="border-2 border-white max-w-[275px] py-2 font-bold text-2xl transition-all duration-300 hover:bg-brand-400 hover:border-brand-400 hover:text-black"
                {...rest}
                target="_blank"
            >
                {children}
            </a>
        </Link>
    );
};

export default LinkButton;
