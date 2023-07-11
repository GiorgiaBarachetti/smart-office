import { Chart } from "react-google-charts";
import React, { useEffect, useState } from 'react';
import { Box, Button, LinearProgress, Typography, Paper } from '@mui/material';
import { SHADOWSTYLE } from "../../utils/const/Const";
import { baseURL, urlAlhpa } from "../../utils/fetch/api";
import SnackbarGeneral from "../Snackbar/SnackbarGeneral";
interface ChartData {
    power: {
        timestamp: string;
        power: number
    }[];
}
interface ChartDataKwh {
    power: {
        timestamp: number;
        average: number
    }[];
}

const ChartEnergy = () => {
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false);
    const [EnergyDatas, setEnergyDatas] = useState<ChartData[]>([]);
    const [EnergyDatasKwh, setEnergyDatasKwh] = useState<ChartDataKwh[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDateRange, setSelectedDateRange] = useState('today');

    const handleClose = () => {
        setOpen(false);
        setMessage('')
    };

    const handleDateRangeClick = (dateRange: string) => {
        setSelectedDateRange(dateRange);
        fetchEnergyData(dateRange)
        fetchEnergyKwH(dateRange)
    }
    
    const chartData = EnergyDatas[0]?.power || [];
    const chartItems = chartData.map(({ timestamp, power }) => [
        new Date(timestamp),
        power
    ]);

    const secondChartData = EnergyDatasKwh[0]?.power || [];
    const secondChartItems = secondChartData.map(({ timestamp, average }) => [
        new Date(timestamp),
        average
    ]);

    const fetchEnergyData = async (range: string) => {
        try {
            setIsLoading(true);
            const currentDate = new Date();
            let startDate = '';
            const endDate = currentDate;
            switch (range) {
                case 'today':
                    startDate = currentDate.toISOString().split('T')[0];
                    break;
                case 'yesterday': {
                    const yesterday = new Date(currentDate.getTime() - 48 * 60 * 60 * 1000);
                    startDate = yesterday.toISOString().split('T')[0];
                    break;
                }
                case 'lastWeek': {
                    const lastWeekStart = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
                    startDate = lastWeekStart.toISOString().split('T')[0];
                    break;
                }
                case 'lastMonth': {
                    const lastMonthStart = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
                    startDate = lastMonthStart.toISOString().split('T')[0];
                    break;
                }
                default:
                    break;
            }
            const response = await fetch(`${baseURL}${urlAlhpa}/data/instant?start=${startDate}T00:00:00&end=${endDate}`);
            const data = await response.json();
            setEnergyDatas(Array.isArray(data) ? data : [data]);
            setIsLoading(false);
            if (!response.ok) {
                throw new Error
            }
        } catch (error) {
            setOpen(true)
            setMessage('Error fetching energy data');
        }
    };

    const fetchEnergyKwH = async (range: string) => {
        try {
            setIsLoading(true);
            const currentDate = new Date();
            let startDate = '';
            const endDate = currentDate;
            switch (range) {
                case 'today':
                    startDate = currentDate.toISOString().split('T')[0];
                    break;
                case 'yesterday': {
                    const yesterday = new Date(currentDate.getTime() - 48 * 60 * 60 * 1000);
                    startDate = yesterday.toISOString().split('T')[0];
                    break;
                }
                case 'lastWeek': {
                    const lastWeekStart = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
                    startDate = lastWeekStart.toISOString().split('T')[0];
                    break;
                }
                case 'lastMonth': {
                    const lastMonthStart = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
                    startDate = lastMonthStart.toISOString().split('T')[0];
                    break;
                }
                default:
                    break;
            }
            const response = await fetch(`${baseURL}${urlAlhpa}/data/hourlyAverage?start=${startDate}T00:00:00&end=${endDate}`);
            const data = await response.json();
            setEnergyDatasKwh(Array.isArray(data) ? data : [data]);
            setIsLoading(false);
            console.log(data)
            if (!response.ok) {
                throw new Error
            }
        } catch (error) {
            setOpen(true)
            setMessage('Error fetching energy data');
        }
    };

    useEffect(() => {
        fetchEnergyData('today')
        fetchEnergyKwH('today')
    }, []);

    return (
        <Box component='div' sx={{ padding: '20px', width: '100%', mx: 'auto' }}>
            <Paper>
                <Box component='div' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', pt: '20px' }}>
                    <Typography variant='h6' textAlign={'center'}>Select a data range</Typography>
                    <Box component='div' sx={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                        <Button sx={{ cursor: 'pointer', mx: '10px', ...SHADOWSTYLE }} variant={selectedDateRange === 'today' ? 'contained' : 'outlined'} onClick={() => handleDateRangeClick('today')}>
                            TODAY
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
                <Box sx={{ height: '260px' }}>
                    {isLoading ? (
                        <LinearProgress />
                    ) : (
                        <Chart
                            width={'100%'}
                            height={250}
                            chartType="LineChart"
                            data={[
                                ['timestamp', 'watt'],
                                ...chartItems
                            ]}

                            options={{
                                hAxis: { title: "Time", titleTextStyle: { color: "#333" } },
                                gridlines: {
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
                                colors: ['#71c810'],
                                legend: 'none',
                            }}
                        />
                    )}
                </Box>
                <Box sx={{ height: '260px' }}>
                {isLoading ? (
                        <LinearProgress />
                    ) : (
                    <Chart
                            width={'100%'}
                            height={250}
                            chartType="ColumnChart"
                            data={[
                                ['timestamp', 'watt'],
                                ...secondChartItems
                            ]}
                            options={{
                                hAxis: { title: "Time", titleTextStyle: { color: "#333" } },
                                gridlines: {
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
                                vAxis: { title: "Watt/Hour", minValue: 0 },
                                chartArea: { width: "50%", height: "60%" },
                                colors: ['#71c810'],
                                legend: 'none',
                                bar: {groupWidth: "100%"},
                            }}
                        />
                    )}
                </Box>
            </Paper>
            {message != '' ? <SnackbarGeneral openSnackbar={open} handleClose={() => handleClose()} message={message} /> : null}
        </Box>
    );
};

export default ChartEnergy;