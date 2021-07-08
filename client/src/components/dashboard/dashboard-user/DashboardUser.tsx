import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useNextLesson from '../../../hooks/useNextLesson';
import './DashboardUser.css';
import dashboardNextCours from '../../../image/dashboard-nextCours.png';
import {ACTIVITIES_DATA} from '../../../utils/activities';
import useWikis from '../../../hooks/useWikis';

export const DashboardUser = () => {
  const { nextLesson } = useNextLesson();
  const {wikis} = useWikis();

  if(nextLesson) {
    return (
      <div >
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
          spacing={4}
        >
          <Grid item xs={4}>
            <Card elevation={3} className="blue" >
              <CardContent>
                <CardMedia
                  component="img"
                  image={dashboardNextCours}
                  title="Prochain cours"
                  className="nextcours"
                />
                <Typography>
                  Mes Prochain cours
                </Typography>

                {nextLesson.findNextlesson ? <Link to={`/visio/${nextLesson.findNextlesson._id}`} className="link">
                  <Card elevation={3} className='red lessonCard' >
                    <CardContent>
                      <Typography >
                        Le {moment(nextLesson.findNextlesson.start).format('DD/MM/YYYY')} à {moment(nextLesson.findNextlesson.start).format('HH:mm')}
                      </Typography>
                      <Typography >
                        Sujet: {nextLesson.findNextlesson.subject.name}
                      </Typography>
                      <Typography >
                        Promo: {nextLesson.findNextlesson.promo.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link> :
                  <Card elevation={3} className='red lessonCard' >
                    <CardContent>
                      <Typography >
                        Pas de cours prochainement
                        </Typography>
                    </CardContent>
                  </Card>
                }

              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card elevation={3} className="green">

              <CardContent>
                <Typography>Mes wiki</Typography>
                </CardContent>
                <CardContent  className="wiki-list">
                { wikis ?
                wikis.slice(0, 5).map((wiki : any, index : any) => (
                  
                    <Card elevation={3} className='blue wikicard' key={index}>
                      <Link to={`/wiki/${wiki._id}`} style={{color: 'black'}}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {wiki.title}
                        </Typography>
                        <Typography variant="body2">
                          Créé par {wiki.author.firstName} {wiki.author.lastName}
                        </Typography>
                        <Typography variant="body2">
                          Créé le {moment(wiki.createdAt).format("DD/MM/YYYY")}
                        </Typography>
                      </CardContent>
                      </Link>
                    </Card>
                  
                )) : <Typography>Pas de wiki</Typography>
                }  
              </CardContent>
            </Card>

            <Card elevation={3} className="green activities">
              <CardContent>
              Activités extra-scolaires
            </CardContent>
            <CardContent  className="wiki-list">
                {ACTIVITIES_DATA.map((wiki, index) => (
                  <Card elevation={3} className='darkblue wikicard' key={index}>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="100"
                      image={wiki.imageUrl}
                      title={wiki.title}
                      className="wiki-img"
                    />
                    <CardContent>
                      <Typography >
                        {wiki.title}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}  
              </CardContent>
            </Card>

          </Grid>
          

        </Grid>

      </div>
    )
    
  } else {
    return <p>Loading...</p>
  }

}
