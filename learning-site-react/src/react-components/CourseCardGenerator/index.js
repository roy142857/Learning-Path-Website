import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card} from '@material-ui/core';
import {CardActionArea} from '@material-ui/core';
import {CardActions} from '@material-ui/core';
import {CardContent} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import {Button} from '@material-ui/core';
import {Typography}from '@material-ui/core';
import Course from "./../Course";
import './style.css';

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        marginLeft: 50
    },
});

export default function CourseCardGenerator(props) {
    const classes = useStyles();
    const course = Course.searchCourseFromID(props.courseID);
    if (course.courseOverview.length > 80) {
        course.courseOverview = course.courseOverview.slice(0, 80) + "..."
    }
    return (
        <Card className={classes.root}>
            <a href={`./../course/${course.courseId}`}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height = "140"
                        image={course.courseImage}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" color="textPrimary">
                            {course.courseName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {course.courseOverview}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </a>
        </Card>
    );
}