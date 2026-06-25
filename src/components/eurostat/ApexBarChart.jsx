import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';

export const ApexBarChart = ({ data, categories }) => {
    const theme = useTheme();
    const series = [
        {
            data: data
        }
    ];

    const options = {
        chart: {
            type: 'bar',
            height: '100%',
            width: '100%'
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories,
            labels: {
                formatter: value => {
                    if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + 'B';
                    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M';
                    if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
                    return value;
                }
            }
        },
        noData: {
            text:
                'Nothing was found with the chosen parameters, try to increase number of products, change flow type, increase the interval or change reporter and/or partner'
        },
        colors: [theme.palette.primary.main]
    };

    return <ReactApexChart options={options} series={series} type="bar" />;
};

ApexBarChart.propTypes = {
    data: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired
};
