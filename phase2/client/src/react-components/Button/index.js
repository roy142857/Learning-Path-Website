import React from 'react';
import { makeStyles } from '@material-ui/core';
import {Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2)
        },
    },
}));


export default function NewButton(props) {
    const classes = useStyles();
    return (
        <div className={classes.margin}>
            <a href={props.link}>
                <Button fullWidth size='small' variant='contained' onClick={props.onClick} type={props.type} >
                    {props.buttonName}
                </Button>
            </a>
        </div>
    );
}
