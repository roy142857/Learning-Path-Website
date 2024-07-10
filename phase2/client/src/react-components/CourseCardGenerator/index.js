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
import {deleteCourse} from '../../actions/course'
import ENV from "../../config";

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        marginLeft: 50
    },
});

export default function CourseCardGenerator(props) {
    const classes = useStyles();
    const {course, dashboard, courseList, remove = false, modify = false} = props
    let buttonSection1;
    let buttonSection2;
    if (remove) {
        buttonSection1 =
            <Button onClick={() => deleteCourse(course._id, dashboard, courseList)} size="medium" color="primary">
                Remove
            </Button>
    }
    if (modify) {
        buttonSection2 = <Button href={`./../../modify/course/${course._id}`} size="medium" color="primary">
            Modify
        </Button>
    }
    return (
        <Card className={classes.root}>
            <a href={ENV.regular_host + "/course/" + course._id}>{/*// add skill hyperef*/}
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height = "140"
                        image={course.image}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
                            {course.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {course.overview}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {course.description}
                        </Typography>
                        <Typography variant="body2" color="Blue" component="p">
                            Suggested Time: {course.suggestedLearningTime} hours
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </a>
            <CardActions>
                {buttonSection1}
                {buttonSection2}
            </CardActions>
        </Card>
    );
}