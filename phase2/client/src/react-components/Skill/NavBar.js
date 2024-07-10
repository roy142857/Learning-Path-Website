import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core';
import {Tabs} from '@material-ui/core';
import {Tab} from '@material-ui/core';
import {Typography}from '@material-ui/core';
import {Box} from '@material-ui/core';
import YoutubeFrame from "../YoutubeFrame";
import {Paper} from "@material-ui/core";
import {Button} from "@mui/material";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function NavTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Paper position="static" square={true} elevation={5}>
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    TabIndicatorProps={{style: {background: '#168cec'}}}
                >
                    <LinkTab label="Intro Video" href="/drafts" {...a11yProps(0)} />
                    <LinkTab label="Skill Info" href="/trash" {...a11yProps(1)} />
                    <LinkTab label="Related Courses" href="/spam" {...a11yProps(2)} />
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                <YoutubeFrame src={props.video_src}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <h4> Overview: </h4>
                <p> {props.skill_info.overview}</p>
                <br/>
                <h4> Description: </h4>
                <p> {props.skill_info.description} </p>
            </TabPanel>
            <TabPanel value={value} index={2}>
                {props.related_courses.map(courseid => (
                    <Button href={`./../../course/${courseid}`}>{`Course: ${courseid}`}</Button>
                ))}
            </TabPanel>
        </div>
    );
}