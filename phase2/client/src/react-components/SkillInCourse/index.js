import React from "react";
import "./style.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";


class SkillInCourse extends React.Component {

    state = {}

    render() {
        const {skills} = this.props;

        return (
            <div>
                <Table className="skill-list">
                    <TableBody>
                        {skills.map(skill => (
                            <span className="skill">Temp {skill.skillName}<br/></span>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default SkillInCourse;