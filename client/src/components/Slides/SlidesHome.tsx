import { gql, useQuery } from '@apollo/client';
import { Card, CardContent, Grid, Typography, CardActions } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Presentation } from '../slideCreation/interfaces';
import './SlidesHome.css';
import Button from '../global/button/Button';

export const SlidesHome = () => {
    const GET_PRESENTATIONS = gql`
  query findAllPres {findAllPresentation {_id, title, slides{title, htmlContent}}}
`;

  const { loading, error, data } = useQuery(GET_PRESENTATIONS);
  const [presentation, setPresentation] = useState<(Presentation & {_id : string})[]>([])
  const history = useHistory();

  useEffect(() => {
    if (data) {
      if (data.findAllPresentation.length > 0) {
        setPresentation(data.findAllPresentation)
      }
    }
  }, [data])

  const edit = (id : string) => (event : any) => {
    history.push(`/slides/edit/${id}`);
  }

    return(
        <div>
            <Link to="/slides/creation" className="link"><Button>+ Créer un cour</Button></Link>
            <div className="grid">
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
                            <Typography gutterBottom variant="h5" component="h3">{p.title}</Typography>
                          </CardContent>
                          <CardActions>
                            <button onClick={edit(p._id)}>Modifier</button>
                          </CardActions>
                        </Card>
                      </Grid>
                    )
                })
            }  
            </Grid>
            </div>
        </div>
    )
}

