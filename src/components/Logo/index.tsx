interface LogoProps {
    isFullLogo: boolean;
}

export function Logo({ isFullLogo }: LogoProps) {
    return isFullLogo ? (
        <div className="flex flex-row gap-2 items-center">
            <img src="/assets/logo.svg" alt="Randomify Logo" className="w-8 h-8" />
            <h1 className="font-bold text-brand-default text-[2rem]">Randomify</h1>
        </div>
    ) : (
        <div>
            <img src="/assets/logo.svg" alt="Randomify Logo" className="w-8 h-8" />
        </div>
    );
}
