import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const useWikis = () => {
    const GET_WIKI = gql`
        query getArticles {getAllWiki{
            _id
            createdAt
            title
            promo{name}
            author{firstName, lastName}
            }}
    `;

    const { loading, error, data } = useQuery(GET_WIKI, {fetchPolicy : "cache-and-network"});

    useEffect(() => {
        if(error) console.log(JSON.stringify(error))
        if(data) console.log(data)
    }, [data, error])

    return { loading, error, wikis: data?.getAllWiki }
}

export default useWikis;