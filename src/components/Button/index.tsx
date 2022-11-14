interface ButtonProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
}

const Button = ({ children, icon, ...rest }: ButtonProps) => {
    if (icon) {
        return (
            <button
                className="flex items-center justify-center gap-4 border-2 border-white max-w-[275px] py-2 fill-white font-bold text-2xl transition-all duration-300 hover:bg-brand-400 hover:border-brand-400 hover:text-black hover:fill-black"
                {...rest}
            >
                {icon}
                {children}
            </button>
        );
    }

    return (
        <button
            className="border-2 border-white max-w-[275px] py-2 font-bold text-2xl transition-all duration-300 hover:bg-brand-400 hover:border-brand-400 hover:text-black"
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
