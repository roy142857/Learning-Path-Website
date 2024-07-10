import {Avatar, Box, Card, CardContent, Grid, Typography} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

export default function Summary(props) {
    return (
        <Card
            sx={{height: '100%'}}
            {...props}
        >
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{justifyContent: 'space-between'}}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="overline"
                        >
                            Learning Time
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            32 Hrs
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor: 'error.main',
                                height: 56,
                                width: 56
                            }}
                        >
                            <LocalLibraryIcon/>
                        </Avatar>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        pt: 2,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <ArrowDownwardIcon color="error"/>
                    <Typography
                        color="error"
                        sx={{
                            mr: 1
                        }}
                        variant="body2"
                    >
                        12%
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="caption"
                    >
                        Since last month
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )

};