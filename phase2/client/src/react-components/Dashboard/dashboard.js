import * as React from 'react';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import {Box} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import {Toolbar} from '@mui/material';
import {List} from '@mui/material';
import {Typography} from '@mui/material';
import {Divider} from '@mui/material';
import {IconButton} from '@mui/material';
import {Container} from '@mui/material';
import {Grid} from '@mui/material';
import {Paper} from '@mui/material';
import {Link} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {ChevronLeft} from '@mui/icons-material';
import LearningTimesChart from './LearningTimes';
import Summary from './Summary';
import Title from './Title';
import {AccountCircle} from '@mui/icons-material';
import {products} from "./sampleSkills";
import {getSkillsByUserid} from "./../../actions/user";
import SkillCard from "./SkillCard";
import {ListItem} from '@mui/material';
import {ListItemIcon} from '@mui/material';
import {ListItemText} from '@mui/material';
import {ListSubheader} from '@mui/material';
import {Dashboard as DashboardIcon} from '@mui/icons-material';
import {ShoppingCart} from '@mui/icons-material';
import {People} from '@mui/icons-material';
import {Logout} from '@mui/icons-material';
import {logout} from "./../../actions/user"
import ENV from "../../config";
import {getUserSkills} from "./../../actions/skill"

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

async function getAllUserSkills(user, component) {
    const temp = await getUserSkills(user, component)
    return temp
}

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.props.history.push("/dashboard");
    }


    state = {
        open: true,
        skillList: [],
        skillListGot: false
    }
    static toggleDrawer() {
        const value = !this.state.open
        this.setState({open: value})
    }

    render() {
        const { app } = this.props;
        if (this.state.skillListGot === false) {
            getAllUserSkills(app.state.currentUser, this)
            this.setState({skillListGot: true})
        }
        return (
            <ThemeProvider theme={mdTheme}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <AppBar position="absolute" open={this.state.open}>
                        <Toolbar
                            variant="regular"
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
                                Dashboard
                            </Typography>
                            <Link href= {`/profile/${this.props.match.params.userid}`} color="inherit">
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
                                <ListItem button>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard" />
                                </ListItem>
                                <ListItem button onClick={() => (this.props.history.replace('/enrolled'))}>
                                    <ListItemIcon>
                                        <ShoppingCart />
                                    </ListItemIcon>
                                    <ListItemText primary="Enrolled"/>
                                </ListItem>

                                <ListItem button onClick={() => (this.props.history.replace('/profile'))}>
                                    <ListItemIcon>
                                        <People />
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
                                    logout(app),
                                    this.props.history.push('/login'))}>
                                    <ListItemIcon>
                                        <Logout />
                                    </ListItemIcon>
                                    <ListItemText primary="Log out" />
                                </ListItem>
                            </div>
                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar/>
                        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                            <Grid container spacing={3}>
                                {/* Chart */}
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 240,
                                        }}
                                    > <LearningTimesChart/>
                                    </Paper>
                                </Grid>
                                {/* Recent Deposits */}
                                <Grid item xs={12} md={4} lg={3}>
                                    <Summary/>
                                </Grid>
                                {/* Recent Orders */}
                                <Grid item xs={12}>
                                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                        <Title> Uncompleted Skills </Title>
                                        <Box sx={{pt: 3}}>
                                            <Grid
                                                container
                                                spacing={3}
                                            >
                                                {this.state.skillList.map((skill) => (
                                                    <Grid
                                                        item
                                                        key={skill.name}
                                                        lg={4}
                                                        md={6}
                                                        xs={12}
                                                    >
                                                        <SkillCard skill={skill}/>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }
}

export default Dashboard;