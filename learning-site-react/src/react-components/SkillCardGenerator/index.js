import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card} from '@material-ui/core';
import {CardActionArea} from '@material-ui/core';
import {CardActions} from '@material-ui/core';
import {CardContent} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import {Button} from '@material-ui/core';
import {Typography}from '@material-ui/core';
import Skill from "./../Skill";
import './style.css';

const useStyles = makeStyles({
    root: {
        maxWidth: 2000,
        width: 800,
        marginLeft: 50
    },
});

export default function SkillCardGenerator(props) {
    const classes = useStyles();
    const skill = Skill.searchSkillFromID(props.skillID);
    console.log(props.innerimage)
    return (
        <Card className={classes.root}>
            <a href={props.skill_link}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height = "140"
                        image={skill.innerimage}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
                            {skill.skillName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {skill.skillDescription}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </a>
            <CardActions>
                <Button size="medium" color="inherit">
                    Share
                </Button>
                <Button size="medium" color="inherit">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}