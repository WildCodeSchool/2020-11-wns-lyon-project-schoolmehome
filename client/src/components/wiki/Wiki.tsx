import { gql, useQuery } from "@apollo/client";
import { Card, Typography, CardContent } from "@material-ui/core";
import moment from "moment";

import React, { useEffect, useState } from "react";
import "./Wiki.css";

export const Wiki =  () => {

    const GET_WIKI = gql`
        query getArticles {getAllWiki{
            _id
            createdAt
            title
            promo{name}
            author{firstName, lastName}
            }}
    `;

    const { loading, error, data } = useQuery(GET_WIKI);
    const [wikis, setwikis] = useState<any[]>([])

    useEffect(() => {
        if (data) {
            if (data.getAllWiki.length > 0) {
                setwikis(data.getAllWiki)
            }
        }
    }, [data])

    return(
        <div>
            <h2>Wiki</h2>
            <div className="wikiList">
                {
                    wikis.map( (w, index) => {
                        return(
                            <Card elevation={3} className='darkblue wikicard' key={index}>
                                <CardContent>
                                    <Typography >{w.title}</Typography>
                                    <Typography variant="body2">Créé par {w.author.firstName} {w.author.lastName} le {moment(w.createdAt).format("DD/MM/YYYY") }</Typography>
                                </CardContent>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

