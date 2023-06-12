import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material'

import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale, Stack, DomainItems } from '@devexpress/dx-react-chart';

const data = [
    { argument: 1, value: 10 },
    { argument: 2, value: 20 },
    { argument: 3, value: 30 },
];
const modifyWattDomain = (domain: DomainItems) => [domain[0], 500]

const ChartPage = () => (
    <Box sx={{padding:'20px'}}>
        <Paper sx={{padding:'10px'}} >
            <Chart
                data={data}
            >
                <ArgumentAxis />
                <ValueScale name="price" modifyDomain={modifyWattDomain} />
                <ValueAxis />

                <LineSeries valueField="value" argumentField="argument" />
            </Chart>
        </Paper>
    </Box>
);
export default ChartPage