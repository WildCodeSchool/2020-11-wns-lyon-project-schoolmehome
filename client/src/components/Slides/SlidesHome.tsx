import { gql, useQuery } from '@apollo/client';
import { Card, CardContent, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Presentation } from '../slideCreation/interfaces';

export const SlidesHome = () => {
    const GET_PRESENTATIONS = gql`
  query findAllPres {findAllPresentation {_id, title, slides{title, htmlContent}}}
`;

  const { loading, error, data } = useQuery(GET_PRESENTATIONS);
  const [presentation, setPresentation] = useState<Presentation[]>([])

  useEffect(() => {
    if (data) {
      if (data.findAllPresentation.length > 0) {
        setPresentation(data.findAllPresentation)
      }
    }
  }, [data])

    return(
        <div>
            <Link to="/slides/creation" className="link">Créer un cour</Link>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={4}
            >
            {
                presentation.map( p => {
                    return (
                      <Grid item xs={2}>
                        <Card elevation={3} className="blue" >
                            <CardContent>
                            {p.title}
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                })
            }  
            </Grid>
            
        </div>
    )
}