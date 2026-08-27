import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';

export const MyApexChart = ({ data, title, yAxisTitle, xAxisTitle }) => {
    const theme = useTheme();
    const series = data
    const options = {
        chart: {
            id: 'exChart',
            type: 'area',
            stacked: true,
            height: '100%',
            width: '100%',
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false,
            style: {
                fontSize: '10px',
                fontWeight: 'normal',
                colors: [theme.palette.text.primary],
            },
            background: {
                enabled: true,
                foreColor: theme.palette.background.default,
                borderRadius: 2,
                padding: 2,
                opacity: 0.6,
                borderWidth: 1,
                borderColor: theme.palette.divider,
            },
        },
        markers: {
            size: 0,
        },
        title: {
            text: title,
            align: 'left'
        },
        noData: {
            text: 'There is no data available in this selection. Please further modify your selection.'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
        yaxis: {
            labels: {
                formatter: (value) => {
                    if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + 'B';
                    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M';
                    if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
                    return value;
                }
            },
            title: {
                text: yAxisTitle
            },
        },
        xaxis: {
            type: 'datetime',
            title: {
                text: xAxisTitle
            }
        },
        tooltip: {
            shared: false,
            y: {
                formatter: function (val) {
                    return val;
                }
            },
            x: {
                formatter: function (val) {
                    return new Date(val).getFullYear();
                }
            }
        },
        colors: [theme.palette.primary.main]
    };

    return (
            <ReactApexChart options={options} series={series} type="area" />
    );
};

MyApexChart.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    yAxisTitle: PropTypes.string.isRequired,
    xAxisTitle: PropTypes.string.isRequired,
}
