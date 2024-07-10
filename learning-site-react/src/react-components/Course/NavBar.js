import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Tabs} from '@material-ui/core';
import {Tab} from '@material-ui/core';
import {Typography}from '@material-ui/core';
import {Box} from '@material-ui/core';
import YoutubeFrame from "../YoutubeFrame";
import {Paper} from "@material-ui/core";
import SkillCardGenerator from "../SkillCardGenerator";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

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
                    TabIndicatorProps={{style: {background:'#168cec'}}}
                >
                    <LinkTab label="Intro Video" href="/drafts" {...a11yProps(0)} />
                    <LinkTab label="Course Info" href="/trash" {...a11yProps(1)} />
                    <LinkTab label="Related Skills" href="/spam" {...a11yProps(2)} />
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                <YoutubeFrame src={props.video_src}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <h3> {props.course_info} </h3>
            </TabPanel>
            <TabPanel value={value} index={2}>
                    {props.related_skills.map(skill => (
                        <SkillCardGenerator skillID={skill.skillId} skill_link={`./../skill/${skill.skillId}`}/>
                        ))}
            </TabPanel>
        </div>
    );
}
