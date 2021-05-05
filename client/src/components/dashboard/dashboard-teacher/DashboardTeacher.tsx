import { CardActionArea, CardContent, CardMedia, createStyles } from '@material-ui/core';
import { Grid, makeStyles, Card, Theme } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import './DashboardTeacher.css'
import dashboardCours from '../../../image/dashboard-cours.png';
import dashboardPromo from '../../../image/dashboard-promo.png';
import dashboardNextCours from '../../../image/dashboard-nextCours.png';
import dashboardAdmin from '../../../image/dashboard-admin.png';


const DashboardTeacher = () => {
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

              <Link to="/visio/89489489456151" className="link">Prochain cour</Link>
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
}

export default DashboardTeacher