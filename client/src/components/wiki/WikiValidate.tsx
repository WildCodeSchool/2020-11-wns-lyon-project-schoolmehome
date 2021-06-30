import { gql, useQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { WikiLineValid } from "./WikiLineValid";

export const ALL = gql`
    query getAllWiki {
        getAllWiki {
          _id
          createdAt
          title
          promo {
            name
          }
          author {
            firstName
            lastName
          }
          lastVersion {
            content
            isValid
            validatorTeacher{lastName}
          }
        }
      }
    `

export const WikiValidate = () => {

    

    const { loading, error, data } = useQuery(ALL, {fetchPolicy : "cache-and-network"});

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
            <div>Validation des Wikis</div>
            {
                wikis.map( wiki => 
                    wiki.lastVersion.isValid ?
                    '':
                    <WikiLineValid wiki={wiki}></WikiLineValid>
                )
            }
        </div>
        
    )
}