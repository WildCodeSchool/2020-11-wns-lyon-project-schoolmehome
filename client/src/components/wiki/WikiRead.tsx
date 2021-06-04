import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export const WikiRead = () => {

    let { id }: { id: string } = useParams();

    const GET_ARTICLE = gql`
        query getArticle($id: String!) {
        getArticlesById(_id: $id) {
            _id
            title
            author {
                firstName
                lastName
            }
            lastVersion {
                version
                isValid
                validatorTeacher {
                    firstName
                    lastName
                }
                content
                author {
                    firstName
                    lastName
                }
            }
            createdAt
            promo {
                _id
                name
            }
        }}
    `;

    const { loading, error, data } = useQuery(GET_ARTICLE, {variables : {id}});
    const [article, setarticle] = useState<any>()

    useEffect(() => {
        if (data) {
            if (data.getArticlesById) {
                console.log(data.getArticlesById)
                setarticle(data.getArticlesById)
            }
        }
    }, [data])

    if(article){
        return(
            <div className="wikiread">
                <h3 className='wikititle'>{article.title}</h3>
                <p className="created">Créé par {article.author.firstName} {article.author.lastName} / Promotion : {article.promo.name}</p>
                <div dangerouslySetInnerHTML={{__html: article.lastVersion.content}} />
            </div>
        )
    } else {
        return(
            <div>Loading...</div>
        )
    }
    
}

