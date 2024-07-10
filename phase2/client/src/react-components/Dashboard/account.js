import {Avatar, Box, Card, CardContent, Divider, Typography} from '@mui/material';

export default function AccountProfile(props) {
    return (
        <Card {...props}>
            <CardContent>
                <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                    <Avatar src={props.avatar} sx={{height: 64, mb: 2, width: 64}}/>
                    <Typography color="textPrimary" gutterBottom variant="h5">
                        {props.name}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                        {props.email}
                    </Typography>
                </Box>
            </CardContent>
            <Divider/>
        </Card>
    )

};