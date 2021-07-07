import { gql, useQuery } from "@apollo/client";
import { Card, Typography, CardContent } from "@material-ui/core";
import moment from "moment";

import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./Wiki.css";

export const Wiki =  () => {

    const u = useUser();

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
            <div  style={{display : 'flex', justifyContent : 'space-between', alignItems : 'baseline'}}>
                <h2>Wiki</h2>
                { u.user?.getOne.promo[0]._id ? 
                    <Link className='button' to={`/wiki/new`}>Nouveau wiki</Link>
                    : ''
                }
                
            </div>
            
            <div className="wikiList">
                {
                    wikis.map( (w, index) => {
                        return(
                            <NavLink className="listWiki" to={`/wiki/${w._id}`}>
                                <Card elevation={3} className='wikicard' key={index} style={{marginBottom : '32px'}}>
                                    <CardContent>
                                        <Typography >{w.title}</Typography>
                                        <Typography variant="body2">Créé par {w.author.firstName} {w.author.lastName} le {moment(w.createdAt).format("DD/MM/YYYY") }</Typography>
                                    </CardContent>
                                </Card>
                            </NavLink>
                        )
                    })
                }
            </div>
        </div>
    )
}

