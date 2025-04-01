import React, { useEffect, useRef, useState } from 'react';
import { Autocomplete, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { MyApexChart } from './ApexChart';
import { EurostatGeoEntities } from './static/EurostatGeoEntities';
import { colorStyled } from '../../styledComponents/styledColor';

const indicators = [
    {
        label: 'Production value - million euro',
        value: 'V12120',
        id: 1
    },
    {
        label: 'Total purchases of goods and services - million euro',
        value: 'V13110',
        id: 2
    }
];

const gdpUnits = [
    {
        label: 'Chain linked volumes, percentage change on previous period',
        value: 'CLV_PCH_PRE',
        id: 1
    },
    {
        label: 'Chain linked volumes, percentage change on previous period, per capita',
        value: 'CLV_PCH_PRE_HAB',
        id: 2
    }
];

const soldUnits = [
    {
        label: 'Sold production value',
        value: 'PRODVAL',
        id: 1
    },
    {
        label: 'Exports quantity',
        value: 'EXPQNT',
        id: 2
    },
    {
        label: 'Imports value',
        value: 'IMPVAL',
        id: 2
    }
];

export const BullWhipEffect = () => {
    //related to Annual enterprise
    const [annualGeos, setAnnualGeos] = useState([]);
    const [annualGeoFocused, setAnnualGeoFocused] = useState(false);
    const [annualGeo, setAnnualGeo] = useState(null);
    const [annualIndicator, setAnnualIndicator] = useState(null);

    //related to real GDP growth
    const [gdpGeos, setGdpGeos] = useState([]);
    const [gdpGeoFocused, setGdpGeoFocused] = useState(false);
    const [gdpGeo, setGdpGeo] = useState(null);
    const [gdpIndicator, setGdpIndicator] = useState(null);

    //related to sold production
    const [reporters, setReporters] = useState([]);
    const [soldFocused, setSoldFocused] = useState(false);
    const [reporter, setReporter] = useState(null);
    const [soldUnit, setSoldUnit] = useState(null);

    const [submitted, setSubmitted] = useState(false);
    const [annualData, setAnnualData] = useState(null);
    const [gdpData, setGDPData] = useState(null);
    const [soldData, setSoldData] = useState(null);

    const hasFetched = useRef(false);

    useEffect(() => {
        if (!annualGeoFocused) return;

        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_TIVA_BACKEND_URL}/api/tiva/eurostat/annualEnterprise/geos`);
            const data = await response.json();
            setAnnualGeos(EurostatGeoEntities.transform(data));
        };

        fetchData();
    }, [annualGeoFocused]);

    useEffect(() => {
        if (!gdpGeoFocused) return;

        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_TIVA_BACKEND_URL}/api/tiva/eurostat/gdp/geos`);
            const data = await response.json();
            setGdpGeos(EurostatGeoEntities.transform(data));
        };

        fetchData();
    }, [gdpGeoFocused]);

    useEffect(() => {
        if (!soldFocused) return;

        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_TIVA_BACKEND_URL}/api/tiva/eurostat/soldProduction/decl`);
            const data = await response.json();
            setReporters(EurostatGeoEntities.transform(data));
        };

        fetchData();
    }, [soldFocused]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (annualGeo !== null && annualIndicator !== null) {
                    const resAnnualEnterprise = await fetch(
                        `${process.env.REACT_APP_TIVA_BACKEND_URL}/api/tiva/eurostat/annualEnterprise?geos=${annualGeo.code}&indicator=${annualIndicator.value}`
                    );
                    let dataAnnual = await resAnnualEnterprise.json();
                    dataAnnual = Array.from(dataAnnual).sort((a, b) => new Date(a.x) - new Date(b.x));
                    setAnnualData([{ name: 'value', data: dataAnnual }]);
                }
                if (reporter !== null && soldUnit !== null) {
                    const resSoldProduction = await fetch(
                        `${process.env.REACT_APP_TIVA_BACKEND_URL}/api/tiva/eurostat/soldProduction?declaredEntities=${reporter.decl}&indicator=${soldUnit.value}`
                    );
                    let dataSold = await resSoldProduction.json();
                    dataSold = Array.from(dataSold).sort((a, b) => new Date(a.x) - new Date(b.x));
                    setSoldData(dataSold !== null ? [{ name: 'value', data: dataSold }] : []);
                }
                if (gdpGeo !== null && gdpIndicator !== null) {
                    const resRealGDPGrowthRate = await fetch(
                        `${process.env.REACT_APP_TIVA_BACKEND_URL}/api/tiva/eurostat/gdp?geos=${gdpGeo.code}&unit=${gdpIndicator.value}`
                    );
                    let dataGDP = await resRealGDPGrowthRate.json();
                    dataGDP = Array.from(dataGDP).sort((a, b) => new Date(a.x) - new Date(b.x));
                    setGDPData(dataGDP !== null ? [{ name: 'value', data: dataGDP }] : []);
                }
            } catch (e) {
                console.error('Error', e);
            } finally {
                setSubmitted(false);
            }
        };

        if (submitted && !hasFetched.current) {
            fetchData();
            hasFetched.current = true;
        }
    }, [submitted]);

    const handleSubmit = () => {
        setSubmitted(true);
        hasFetched.current = false;
    };

    return (
        <div style={{ height: 'calc(100vh - 100px)', overflowY: 'auto' }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={11}>
                    <Typography variant="h5" gutterBottom textAlign="center">
                        Bullwhip Effect
                    </Typography>
                    <Typography>
                        This application is intended to study and find possible bullwhip effect in supply chain networks. For this purpose several
                        datasets from Eurostat were used:
                        <ol>
                            <li>
                                Annual enterprise statistics for special aggregates of NACE Rev.2 activities (2005-2020).
                                <br />
                                <i>
                                    Covers all activities of the business economy with the exception of agricultural activities and personal services
                                    and the data are provided by all EU Member States, Iceland, Norway and Switzerland, some candidate and potential
                                    candidate countries.
                                    <br />
                                    The data are collected by domain of activity (Services, Industry, Trade and Constructions).
                                </i>
                                Link to the dataset:{' '}
                                <Link href="https://ec.europa.eu/eurostat/databrowser/view/sbs_na_sca_r2/default/table?lang=en">sbs_na_sca_r2</Link>
                            </li>
                            <li>
                                Sold production, exports and imports.
                                <br />
                                <i>
                                    Contains statistics on production of manufactured goods together with related external trade data. The purpose of
                                    the statistics is to report, for each product, how much has been produced in the reporting country during the
                                    reference period.
                                </i>
                                Link to the dataset:{' '}
                                <Link href="https://ec.europa.eu/eurostat/databrowser/view/ds-056120/default/table?lang=en">ds-056120</Link>
                            </li>
                            <li>
                                Real GDP growth rate - volume.
                                <br />
                                <i>
                                    National accounts are a coherent and consistent set of macroeconomic indicators, which provide an overall picture
                                    of the economic situation and are widely used for economic analysis and forecasting, policy design and policy
                                    making.
                                </i>
                                Link to the dataset:{' '}
                                <Link href="https://ec.europa.eu/eurostat/databrowser/view/tec00115/default/table?lang=en">tec00115</Link>
                            </li>
                        </ol>
                    </Typography>
                </Grid>
                <Grid container item xs={10.7} spacing={2}>
                    <Grid item xs={11}>
                        <Typography variant="h6">Annual enterprise parameters</Typography>
                    </Grid>
                    <Grid container xs={8} columnSpacing={1} sx={{ p: 1.5, border: '1px dashed grey', mb: 1 }}>
                        <Grid item xs={3}>
                            <Autocomplete
                                id="geo"
                                options={annualGeos}
                                renderInput={params => <TextField {...params} label="Geopolitical entity*" />}
                                onFocus={event => setAnnualGeoFocused(true)}
                                onChange={(event, value) => {
                                    setAnnualGeo(value);
                                }}
                            ></Autocomplete>
                        </Grid>
                        <Grid item xs={9}>
                            <Autocomplete
                                id="unit"
                                options={indicators}
                                renderInput={params => <TextField {...params} label="Unit of measure*" />}
                                onChange={(event, value) => {
                                    console.log(value);
                                    setAnnualIndicator(value);
                                }}
                            ></Autocomplete>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={12}>
                        <Typography variant="h6">Sold production parameters</Typography>
                    </Grid>
                    <Grid container xs={8} columnSpacing={1} sx={{ p: 1.5, border: '1px dashed grey', mb: 1 }}>
                        <Grid item xs={3}>
                            <Autocomplete
                                options={reporters}
                                renderInput={params => <TextField {...params} label="Countries*" />}
                                onFocus={event => setSoldFocused(true)}
                                onChange={(event, value) => {
                                    setReporter(value);
                                }}
                            ></Autocomplete>
                        </Grid>
                        <Grid item xs={9}>
                            <Autocomplete
                                id="unit"
                                options={soldUnits}
                                renderInput={params => <TextField {...params} label="Indicator of measure*" />}
                                onChange={(event, value) => {
                                    console.log(value);
                                    setSoldUnit(value);
                                }}
                            ></Autocomplete>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={12}>
                        <Typography variant="h6">Real GDP growth rate parameters</Typography>
                    </Grid>
                    <Grid container xs={8} columnSpacing={1} sx={{ p: 1.5, border: '1px dashed grey', mb: 1 }}>
                        <Grid item xs={3}>
                            <Autocomplete
                                options={gdpGeos}
                                renderInput={params => <TextField {...params} label="Geopolitical entities*" />}
                                onFocus={event => setGdpGeoFocused(true)}
                                onChange={(event, value) => {
                                    setGdpGeo(value);
                                }}
                            ></Autocomplete>
                        </Grid>
                        <Grid item xs={9}>
                            <Autocomplete
                                id="unit"
                                options={gdpUnits}
                                renderInput={params => <TextField {...params} label="Unit of measure*" />}
                                onChange={(event, value) => {
                                    console.log(value);
                                    setGdpIndicator(value);
                                }}
                            ></Autocomplete>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" style={{ backgroundColor: colorStyled.SECONDARY.dark }} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    {annualData && (
                        <MyApexChart
                            data={annualData}
                            title="Annual enterprise statistics for special aggregates of NACE Rev.2 activities (2005-2020)"
                            yAxisTitle="Millions, Euro"
                            xAxisTitle="Date"
                        />
                    )}
                </Grid>
                <Grid item xs={6}>
                    {gdpData && <MyApexChart data={gdpData} title="Real GDP growth rate" yAxisTitle="Percent" xAxisTitle="Date" />}
                </Grid>
                <Grid item xs={12}>
                    {soldData && (
                        <MyApexChart data={soldData} title="Sold production, exports and imports" yAxisTitle="Thousdans, Euro" xAxisTitle="Date" />
                    )}
                </Grid>
            </Grid>
        </div>
    );
};
