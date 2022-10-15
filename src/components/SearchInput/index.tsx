import { AiOutlineRight } from 'react-icons/ai'

const SearchInput = () => {
    return (
        <div className='flex items-center justify-between bg-neutral-800 w-full max-w-sm h-12 p-4 rounded-lg'>
            <input
                type="text"
                className='w-full sm:w-3/4 bg-transparent font-semibold outline-none placeholder:text-[#73737350]'
                placeholder='Type your favorite series here..'
            />
            <AiOutlineRight className='w-6 h-6 text-brand-400' />
        </div>
    )
}

export default SearchInput