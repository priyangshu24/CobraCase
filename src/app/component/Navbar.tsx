import Link from 'next/link';
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';

const Navbar = () => {
    const user = undefined // TODO: get user from context
    const isAdmin = false // TODO: get isAdmin from context
    return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b
    border-gray-200 bg-white/45 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
            <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                <Link href="/" className='flex z-40 font-semibold'>
                  case<span className='text-green-600'>Cobra</span>
                </Link>

                <div className='h-full flex items-center space-x-4'>
                    {user ?(
                        <>
                            <Link href='/api/auth/logout' className={buttonVariants({
                                size :'sm', 
                                variant:'ghost'})}>
                                    Sign Out
                                </Link>
                            {isAdmin ? <Link href='/api/auth/logout' className={buttonVariants({
                                size :'sm', 
                                variant:'ghost'})}>
                                    Dashboard ✨
                                </Link> : null}
                                </Link>
                            <Link href='/configure/upload' className={buttonVariants({
                                size :'sm', 
                                className:'hidden sm:flex item-center gap-1'})}>
                                    Create case 
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link> 
                        </>
                    ):(
                        <></>
                    )}
                </div>
            </div>
        </MaxWidthWrapper>
    </nav>
    );
}
export default Navbar