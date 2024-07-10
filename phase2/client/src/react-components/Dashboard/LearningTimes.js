import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import {Label, Line, LineChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(day, time) {
    return {day, time};
}

const data = [
    createData('', 0),
    createData('S', 2),
    createData('M', 4),
    createData('T', 6),
    createData('W', 8),
    createData('T', 6),
    createData('F', 5),
    createData('S', 7),
];

export default function LearningTimesChart() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Title>This Week</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis
                        dataKey="day"
                        stroke={theme.palette.text.primary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        dataKey="time"
                        stroke={theme.palette.text.primary}
                        style={theme.typography.body2}
                    >
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}
                        >
                            Learning Time (hrs)
                        </Label>
                    </YAxis>
                    <Line
                        isAnimationActive={true}
                        type="monotone"
                        dataKey="time"
                        stroke={theme.palette.primary.dark}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}