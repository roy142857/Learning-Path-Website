import React from 'react'
import {Box, Button, Card, CardContent, CardHeader, Divider, TextField} from '@mui/material';
import {getSingleUser} from "../../actions/user";


async function getUser(trueId, component) {
    const temp = await getSingleUser(trueId, component)
    return temp
}

class AccountProfileDetails extends React.Component {
    state = {
        userList: [],
        userGot: false
    }

    // static handleChange = (event) => {
    //     setValues({
    //         ...values,
    //         [event.target.name]: event.target.value
    //     });
    // };


    render() {
        const { app } = this.props
        return (
            <form autoComplete="off" noValidate{...this.props}>
                <Card>
                    <CardHeader
                        subheader="The information can be edited"
                        title="Profile"
                    />
                    <Divider/>
                    <CardContent>
                        <div>
                            <TextField style={{margin: "10px"}} fullWidth label="First name" name="firstName"
                                       onChange={null} required defaultValue={app.state.currentUser.firstName} variant="outlined"/>
                            <TextField style={{margin: "10px"}} fullWidth label="Last name" name="lastName"
                                       onChange={null} required defaultValue={app.state.currentUser.lastName} variant="outlined"/>
                            <TextField style={{margin: "10px"}} fullWidth label="Email Address" name="email"
                                       onChange={null} required defaultValue={app.state.currentUser.email} variant="outlined"/>
                            <TextField style={{margin: "10px"}} fullWidth label="Bio" name="bio"
                                       onChange={null} required defaultValue={app.state.currentUser.description}
                                       variant="outlined"/>
                        </div>
                    </CardContent>
                    <Divider/>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end', p: 2}}>
                        <Button color="primary" variant="contained">OK</Button>
                    </Box>
                </Card>
            </form>
        );
    }
}

export default AccountProfileDetails;