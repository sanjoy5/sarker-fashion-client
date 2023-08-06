import { useQuery } from "@tanstack/react-query";



const useProducts = () => {


    // useEffect(() => {
    //     fetch('https://sarker-fashion-server.vercel.app/products')
    //         .then(res => res.json())
    //         .then(data => {
    //             setProducts(data)
    //             setLoading(false)
    //             // console.log(data);
    //         })
    // }, [])

    const { data: products = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch('https://sarker-fashion-server.vercel.app/products')
            return res.json()
        }

    })

    return [products, loading, refetch]
};

export default useProducts;