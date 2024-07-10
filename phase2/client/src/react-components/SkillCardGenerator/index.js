import React from 'react';
import {makeStyles} from '@material-ui/core';
import {Card} from '@material-ui/core';
import {CardActionArea} from '@material-ui/core';
import {CardActions} from '@material-ui/core';
import {CardContent} from '@material-ui/core';
import {Button} from '@material-ui/core';
import {Typography}from '@material-ui/core';
import {CardMedia} from '@material-ui/core';
import './style.css';
import {deleteSkill} from "../../actions/skill";
import ENV from "../../config";
import {enrollSkill} from "../../actions/user";

const useStyles = makeStyles({
    root: {
        maxWidth: 2000,
        width: 500,
        marginLeft: 50
    },
});

export default function SkillCardGenerator(props) {
    const classes = useStyles();
    const {skill, dashboard, skillList, remove = false, modify = false, enroll = false, currentUser = null} = props
    let buttonSection1;
    let buttonSection2;
    let buttonSection3;
    if (remove) {
        buttonSection1 =
            <Button onClick={() => deleteSkill(skill._id, dashboard, skillList)} size="medium" color="primary">
                Remove
            </Button>
    }
    if (modify) {
        buttonSection2 = <Button href={`./../../modify/skill/${skill._id}`} size="medium" color="primary">
            Modify
        </Button>
    }
    if (enroll) {
        buttonSection3 = <Button onClick={enrollSkill(currentUser, skill)} size="medium" color="primary">
            Modify
        </Button>
    }
    return (
        <Card className={classes.root}>
            <a href={ENV.regular_host + "/skill/" + skill._id}>{/*// add skill hyperef*/}
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height = "140"
                        image={skill.image}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
                            {skill.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {skill.overview}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {skill.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </a>
            <CardActions>
                {buttonSection1}
                {buttonSection2}
                {buttonSection3}
            </CardActions>
        </Card>
    );
}