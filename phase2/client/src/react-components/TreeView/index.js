import React from 'react';
import {makeStyles} from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Course from "../Course";

const useStyles = makeStyles({
    root: {
        height: 300,
        flexGrow: 1,
        Width: 60,
        marginLeft: 0,
        marginTop: 50,
    },
});


export default function CustomizedTreeView(props) {
    const classes = useStyles();
    let counter = 1;
    return (
        <TreeView className={classes.root}
                  defaultCollapseIcon={<ExpandMoreIcon/>}
                  defaultExpandIcon={<ChevronRightIcon/>}
        >
            <TreeItem nodeId={`${counter}`}
                      label={`${Course.searchCourseFromID(props.courses[0].courseId).courseName}`}>
                <TreeItem nodeId={`2`} label={`${Course.searchCourseFromID(props.courses[1].courseId).courseName}`}/>
            </TreeItem>
        </TreeView>
    );
}
