import PropTypes from 'prop-types';
import {Avatar, Box, Card, CardContent, Divider, Grid, Typography} from '@mui/material';
import ProgressBar from './../ProgressBar/index'

export default function SkillCard(props) {
    const {skill} = props
    return (
        <Card sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: 3
                    }}
                >
                    <Avatar
                        alt="Product"
                        src={skill.image}
                        variant="square"
                    />
                </Box>
                <Typography
                    align="center"
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    {skill.name}
                </Typography>
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="body1"
                >
                    {skill.description}
                </Typography>
            </CardContent>
            <Box sx={{flexGrow: 1}}/>
            <Divider/>
            <Box sx={{p: 2}}>
                <Grid
                    container
                    spacing={2}
                    // sx={{ justifyContent: 'space-between' }}
                >
                    <Grid
                        item
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                    </Grid>
                    <Grid
                        item
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                        xs={7}
                    >
                        <ProgressBar/>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    )

};