import Image from "next/image"

const Logo = () => {
    return (
        <div className='flex items-center gap-2'>
            <Image src="/assets/logo.svg" alt="Logo" width={32} height={32} />
            <span className='text-4xl font-bold text-brand-400'>Randomify</span>
        </div>
    )
}

export default Logo