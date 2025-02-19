interface pageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
    
}
const page = async ({ searchParams }: pageProps) => {
    const { id } = searchParams
    // make db call
    return <p>{id}</p>
}

export default page