import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import ProgressBar from './../ProhgressBar/index'

export const SkillCard = ({ product, ...rest }) => (
    <Card
        sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}
        {...rest}
    >
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
                    src={product.media}
                    variant="square"
                />
            </Box>
            <Typography
                align="center"
                color="textPrimary"
                gutterBottom
                variant="h5"
            >
                {product.title}
            </Typography>
            <Typography
                align="center"
                color="textPrimary"
                variant="body1"
            >
                {product.description}
            </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 2 }}>
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
                    <Typography
                        color="textSecondary"
                        display="inline"
                        sx={{ pl: 1 }}
                        variant="body2"
                    >
                        Updated 2hr ago
                    </Typography>
                </Grid>
                <Grid
                    item
                    sx={{
                        alignItems: 'center',
                        display: 'flex'
                    }}
                    xs = {7}
                >
                    <ProgressBar/>
                </Grid>
            </Grid>
        </Box>
    </Card>
);

SkillCard.propTypes = {
    product: PropTypes.object.isRequired
};