import { Container, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    text: {
        fontSize: 80,
        color: "#43B0F1"
    },
    textTwo: {
        font2: 30,
        color:"#43B0F1"
    }
})

export default function Unauthorized() {
    const classes = useStyles()
    return (
        <Container>
            <Typography>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '80vh' }}
                >

                    <Grid>
                        <h1 className={classes.text}> Unauthorized route</h1>
                        <h3>
                            <Link className={classes.textTwo} to="/">
                            Go Home
                            </Link>
                        </h3>
                    </Grid>

                </Grid>
            </Typography>
        </Container>
    )
}