import ReactApexChart from "react-apexcharts";

export const ApexBarChart = ({ data, categories }) => {
    const series = [{
        data: data
    }]

    const options = {
        chart: {
            type: "bar",
            height: '100%',
            width: '100%',
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: "end",
                horizontal: true,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories
        },
        noData: {
            text: 'Nothing was found with the chosen parameters, try to increase number of products, change flow type, increase the interval or change reporter and/or partner'
        },
    };

    return (
        <ReactApexChart options={options} series={series} type="bar" height={350} />
    );
};
