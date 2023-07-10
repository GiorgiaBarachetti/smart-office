import { Chart } from "react-google-charts";
import React, { useEffect, useState } from 'react';
import { Paper, Box, Button, LinearProgress, Typography } from '@mui/material';
import { SHADOWSTYLE } from "../../utils/const/Const";
import { baseURL, urlCoffee } from "../../utils/fetch/api";
import SnackbarGeneral from "../Snackbar/SnackbarGeneral";

interface ChartDataCoffee {
    data: {
        timestamp: number,
        value: number,
    }[]
}

const ChartCoffee = () => {
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        setMessage('')
    };

    const [CoffeeDatas, setCoffeeDatas] = useState<ChartDataCoffee[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    let [selectedDateRange, setSelectedDateRange] = useState('today');

    const handleDateRangeClick = (dateRange: string) => {
        setSelectedDateRange(dateRange);
        fetchCoffeeData(dateRange)
    }

    const fetchCoffeeData = async (range: string) => {
        try {
            setIsLoading(true);
            const currentDate = new Date();
            let startDate = '';
            let endDate = currentDate;

            switch (range) {
                case 'today':
                    startDate = currentDate.toISOString().split('T')[0];
                    break;
                case 'yesterday':
                    const yesterday = new Date(currentDate.getTime() - 48 * 60 * 60 * 1000);
                    startDate = yesterday.toISOString().split('T')[0];
                    break;
                case 'lastWeek':
                    const lastWeekStart = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
                    startDate = lastWeekStart.toISOString().split('T')[0];
                    break;
                case 'lastMonth':
                    const lastMonthStart = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
                    startDate = lastMonthStart.toISOString().split('T')[0];
                    break;
                default:
                    break;
            }
            const response = await fetch(`${baseURL}${urlCoffee}/data/watt?start=${startDate}T00:00:00&end=${endDate}`);
            const data = await response.json();
            setCoffeeDatas(Array.isArray(data) ? data : [data]);
            setIsLoading(false);
            if(response.ok){
                throw new Error
            }
        } catch (error) {
            setOpen(true)
            setMessage('Error fetching coffee data');
        }
    };

    useEffect(() => {
        fetchCoffeeData('today')
    }, []);

    const options = {
        hAxis: { title: "Time", titleTextStyle: { color: "#333" } }, gridlines: {
            count: -1,
            units: {
                days: { format: ['dd/MM/YY'] },
                hours: { format: ['HH'] },
                minutes: { format: ['HH'] },
            }
        },
        minorGridlines: {
            units: {
                days: { format: ['dd/MM/YY'] },
                hours: { format: ['HH'] },
                minutes: { format: ['HH'] },
            }
        },
        vAxis: { title: "Watt", minValue: 0 },
        chartArea: { width: "50%", height: "60%" },
    };

    return (
        <Box component='div' sx={{ padding: '20px', width: '90%', mx: 'auto' }}>
            <Paper>
                <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', pt: '20px' }}>
                    <Typography variant='h6' textAlign={'center'}>Select a data range</Typography>
                    <Box component='div' sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                        <Button sx={{ cursor: 'pointer', mx: '10px', ...SHADOWSTYLE }} variant={selectedDateRange === 'today' ? 'contained' : 'outlined'} onClick={() => handleDateRangeClick('today')}>
                            Today
                        </Button>
                        <Button sx={{ cursor: 'pointer', mx: '10px', ...SHADOWSTYLE }} variant={selectedDateRange === 'yesterday' ? 'contained' : 'outlined'} onClick={() => handleDateRangeClick('yesterday')}>
                            LAST 48 HOURS
                        </Button>
                        <Button sx={{ cursor: 'pointer', mx: '10px', ...SHADOWSTYLE }} variant={selectedDateRange === 'lastWeek' ? 'contained' : 'outlined'} onClick={() => handleDateRangeClick('lastWeek')}>
                            LAST WEEK
                        </Button>
                        <Button sx={{ cursor: 'pointer', mx: '10px', ...SHADOWSTYLE }} variant={selectedDateRange === 'lastMonth' ? 'contained' : 'outlined'} onClick={() => handleDateRangeClick('lastMonth')}>
                            LAST MONTH
                        </Button>
                    </Box>
                </Box>
                <Box component='div' sx={{ height: '260px' }}>
                    {isLoading ? (
                        <LinearProgress />
                    ) : (
                        <Chart
                            width={'100%'}
                            height={250}
                            chartType="LineChart"
                            data={[
                                ['timestamp', 'value'],
                                [
                                    new Date(new Date().setHours(0, 0, 0, 0)),
                                    0
                                ],
                                ...(CoffeeDatas[0]?.data || []).map(({ timestamp, value }) => {
                                    return ([new Date(timestamp), value]);
                                }),
                                [
                                    new Date(new Date()),
                                    0
                                ]
                            ]}
                            options={options}
                        />
                    )}
                </Box>
            </Paper >
            {message != '' ? <SnackbarGeneral openSnackbar={open} handleClose={() => handleClose()} message={message} /> : null}

        </Box >
    );
};

export default ChartCoffee;
