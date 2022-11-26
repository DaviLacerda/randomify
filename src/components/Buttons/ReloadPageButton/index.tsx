import { BiRefresh } from "react-icons/bi";

const ReloadPageButton = () => {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <button
            onClick={handleReload}
            className="flex items-center justify-center gap-4 border-2 border-white max-w-[275px] py-2 px-4 fill-white font-bold text-2xl transition-all duration-300 hover:bg-brand-400 hover:border-brand-400 hover:text-black hover:fill-black"
        >
            <BiRefresh size={32} />
            <span>Reload</span>
        </button>
    );
};

export default ReloadPageButton;
