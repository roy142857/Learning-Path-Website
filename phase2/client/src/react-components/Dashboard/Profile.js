import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import {Box} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import {Toolbar} from '@mui/material';
import {List} from '@mui/material';
import {Typography} from '@mui/material';
import {Divider} from '@mui/material';
import {IconButton} from '@mui/material';
import Badge from '@mui/material/Badge';
import {Container} from '@mui/material';
import {Grid} from '@mui/material';
import {Paper} from '@mui/material';
import {Link} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {ChevronLeft} from '@mui/icons-material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LearningTimesChart from './LearningTimes';
import Summary from './Summary';
import Title from './Title';
import {AccountCircle} from '@mui/icons-material';
import SkillCardGenerator from './../SkillCardGenerator/index';
import Skill from "../Skill";
import AccountProfile from "./account";
import AccountProfileDetails from "./accountDetails";
import {ListItem} from '@mui/material';
import {ListItemIcon} from '@mui/material';
import {ListItemText} from '@mui/material';
import {ListSubheader} from '@mui/material';
import {Dashboard as DashboardIcon} from '@mui/icons-material';
import {ShoppingCart} from '@mui/icons-material';
import {People} from '@mui/icons-material';
import {Logout} from '@mui/icons-material';
import {logout} from "./../../actions/user"

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme({
    palette: {
        primary: {
            main: '#2a2924',
        },
        secondary: {
            main: '#aabef1',
        },
    },
});

class ProfileContent extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        // this.props.history.push("/profile");
    }

    state = {
        open: true,
    }
    static toggleDrawer() {
        const value = !this.state.open
        this.setState({open: value})
    }

    render() {
        const {app} = this.props;
        console.log(app)

        return (
            <ThemeProvider theme={mdTheme}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <AppBar position="absolute" open={this.state.open}>
                        <Toolbar
                            sx={{
                                pr: '24px', // keep right padding when drawer closed
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(this.state.open && {display: 'none'}),
                                }}
                            >
                                <Menu/>
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{flexGrow: 1}}
                            >
                                Profile
                            </Typography>
                            <Link href='/profile' color="inherit">
                                <IconButton color='inherit'>
                                    <AccountCircle/>
                                </IconButton>
                            </Link>

                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={this.state.open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={this.toggleDrawer}>
                                <ChevronLeft/>
                            </IconButton>
                        </Toolbar>
                        <Divider/>
                        <List>
                            <div>
                                <ListItem button onClick={() => (this.props.history.replace('/dashboard'))}>
                                    <ListItemIcon>
                                        <DashboardIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard"/>
                                </ListItem>
                                <ListItem button onClick={() => (this.props.history.replace('/enrolled'))}>
                                    <ListItemIcon>
                                        <ShoppingCart/>
                                    </ListItemIcon>
                                    <ListItemText primary="Enrolled"/>
                                </ListItem>

                                <ListItem button >
                                    <ListItemIcon>
                                        <People/>
                                    </ListItemIcon>
                                    <ListItemText primary="Profile"/>
                                </ListItem>
                                <ListItem button onClick={() => (this.props.history.replace("/skill"))}>
                                    <ListItemIcon>
                                        <People />
                                    </ListItemIcon>
                                    <ListItemText primary="Skills"/>
                                </ListItem>

                                <ListItem button onClick={() => (this.props.history.replace('/course'))}>
                                    <ListItemIcon>
                                        <People />
                                    </ListItemIcon>
                                    <ListItemText primary="Courses"/>
                                </ListItem>
                            </div>
                        </List>
                        <Divider/>
                        <List>
                            <div>
                                <ListItem button onClick={() => (
                                    logout(app), this.props.history.push('/login'))}>
                                    <ListItemIcon>
                                        <Logout/>
                                    </ListItemIcon>
                                    <ListItemText primary="Log out"/>
                                </ListItem>
                            </div>
                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            py: 15
                        }}
                    >
                        <Container maxWidth="lg">
                            <Typography
                                sx={{mb: 3}}
                                variant="h4"
                            >
                                Account
                            </Typography>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    lg={4}
                                    md={6}
                                    xs={12}
                                >
                                    <AccountProfile name={app.state.currentUser.firstName}
                                                    avatar={app.state.currentUser.avatar}
                                                    email={app.state.currentUser.email}/>
                                </Grid>
                                <Grid
                                    item
                                    lg={8}
                                    md={6}
                                    xs={12}
                                >
                                    <AccountProfileDetails app={app}/>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }
}

export default ProfileContent;