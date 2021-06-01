import { CardActionArea, CardContent, CardMedia, createStyles, Typography } from '@material-ui/core';
import { Grid, makeStyles, Card, Theme } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './DashboardTeacher.css'
import dashboardCours from '../../../image/dashboard-cours.png';
import dashboardPromo from '../../../image/dashboard-promo.png';
import dashboardNextCours from '../../../image/dashboard-nextCours.png';
import dashboardAdmin from '../../../image/dashboard-admin.png';
import useNextLesson from '../../../hooks/useNextLesson';
import moment from 'moment';



const DashboardTeacher = () => {

  const { nextLesson } = useNextLesson();

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
                  Prochain cours
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
                        Promo: {nextLesson.findNextlesson.promo}
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
          <Grid item xs={4}>
            <Card elevation={3} className="green">

              <CardContent>
                <CardMedia
                  component="img"
                  image={dashboardCours}
                  title="Créer un cours"
                  className="cours"
                />

                <Link to="/slides" className="link">Créer un cour</Link>
              </CardContent>

            </Card>
            <Card elevation={3} className="green promoCard">
              <CardContent>
                <CardMedia
                  component="img"
                  image={dashboardPromo}
                  title="Mes promotions"
                  className="promo"
                />
              Mes Promotions
            </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card elevation={3} className="blue">
              <CardContent>
                <CardMedia
                  component="img"
                  image={dashboardAdmin}
                  title="Administration"
                  className="admin"
                />

              Administration
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

export default DashboardTeacher;