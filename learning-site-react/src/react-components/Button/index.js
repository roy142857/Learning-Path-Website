import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1)
        },
    },
}));

export default function NewButton(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <a href={props.link}>
                <Button variant="contained" color="primary" onClick={props.onClick}>
                    {props.buttonName}
                </Button>
            </a>
        </div>
    );
}