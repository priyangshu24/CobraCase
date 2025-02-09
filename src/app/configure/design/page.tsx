interface pageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
    
}
const page = async ({ searchParams }: pageProps) => {
    const { id } = searchParams
    return <p>{id}</p>
}

export default page