import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonBase, Typography, Grid, Container } from '@material-ui/core'
import useStyles from './Home.styles'

const images = [
    {
        url: 'https://www.cloudstudio.mx/blog/wp-content/uploads/2019/01/js.png',
        title: 'M1',
    },
    {
        url: 'https://thedevcouple.com/wp-content/uploads/2017/10/Interview-React-2.jpg',
        title: 'M2',
    },
    {
        url: 'https://i.ytimg.com/vi/45dAt9Gz8rE/maxresdefault.jpg',
        title: 'M3',
    },
    {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJECsXGkOPiCyLF5lhN0pRbhw_UnFcOkhyZQ&usqp=CAU',
        title: 'M4',
    }
];

export default function Home() {
    const classes = useStyles();

    return (
        <Container >
            <Grid className={classes.contenedor} container spacing={3}>
                {images.map((image) => (
                    <Grid item key={image} xs={8} sm={10} md={5}>
                        {/* OJO QUE EL LINK ESTA HARDCODEADO */}
                        <Link style={{ textDecoration: 'none' }} to={`/modulo/${image.title}`} modulo={image.modulo} >
                            <ButtonBase key={image.title} className={classes.image} focusVisibleClassName={classes.focusVisible}>
                                <span
                                    className={classes.imageSrc}
                                    style={{
                                        backgroundImage: `url(${image.url})`,
                                    }}
                                />
                                <span className={classes.imageBackdrop} />
                                <span className={classes.imageButton}>
                                    <Typography
                                        component="span"
                                        variant="h2"
                                        color="inherit"
                                        className={classes.imageTitle}
                                    >
                                        {image.title}
                                        <span className={classes.imageMarked} />
                                    </Typography>
                                </span>
                            </ButtonBase>
                        </Link>
                    </Grid>

                ))}
            </Grid>
        </Container >
    );
}