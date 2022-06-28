import { AiOutlineClose } from 'react-icons/ai';

interface CleanFieldButtonProps {
    onCleanField: () => void;
}

export function CleanFieldButton({ onCleanField }: CleanFieldButtonProps) {
    return (
        <button
            type='button'
            onClick={onCleanField}
        >
            <AiOutlineClose className='h-5 w-5 fill-zinc-500 font-bolder hover:fill-zinc-200 transition-colors' />
        </button>
    )
}