import { IoIosRefresh } from 'react-icons/io';
import { useRouter } from 'next/router';

export function RefreshButton(){
    const router = useRouter();
    
    return (
        <button
            type="button"
            className="flex flex-row items-center gap-2 p-2 rounded-lg w-full max-w-[250px] justify-center bg-brand-default hover:brightness-75 transition-colors"
            onClick={() => router.reload()}
        >
            <span className='text-black'>Try again!</span>
            <IoIosRefresh className="fill-black w-8 h-10" />
        </button>
    )
}