import { Autocomplete, Button, Grid, Link, TextField, Typography, Chip } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MyApexChart } from './ApexChart';
import { Tab, Tabs, Box } from '@mui/material/';
import { ApexBarChart } from './ApexBarChart';
import { colorStyled } from '../../styledComponents/styledColor';
import PropTypes from 'prop-types';

const wordLinks = {
    application: 'https://terminology.tib.eu/ts/ontologies/dr/terms?iri=http%3A%2F%2Fwww.w3id.org%2Fecsel-dr%23Application&obsoletes=false&lang=en',
    measure: 'https://terminology.tib.eu/ts/ontologies/dr/terms?iri=http%3A%2F%2Fwww.w3id.org%2Fecsel-dr-RAMI40%23Measure&obsoletes=false&lang=en',
    property: 'https://terminology.tib.eu/ts/ontologies/dr/terms?iri=http%3A%2F%2Fwww.w3.org%2Fns%2Fssn%2FProperty&obsoletes=false&lang=en',
    electricity:
        'https://terminology.tib.eu/ts/ontologies/dr/terms?iri=http%253A%252F%252Fwww.w3id.org%252Fecsel-dr-CO2Savings%2523Electricity&obsoletes=false&lang=en',
    source: 'https://terminology.tib.eu/ts/ontologies/dr/terms?iri=http%3A%2F%2Fwww.w3id.org%2Fecsel-dr-PWR%23Source&obsoletes=false&lang=en',
    semiconductors:
        'https://terminology.tib.eu/ts/ontologies/dr/terms?iri=http%3A%2F%2Fwww.w3id.org%2Fecsel-dr-PWR%23Semiconductors&obsoletes=false&lang=en',
    products: 'https://terminology.tib.eu/ts/ontologies/dr/terms?iri=http%253A%252F%252Fwww.w3id.org%252Fecsel-dr-OOSMP%2523Product&obsoletes=false',
    System: 'https://terminology.tib.eu/ts/ontologies/dr/terms?iri=http%3A%2F%2Fwww.w3.org%2Fns%2Fssn%2FSystem&obsoletes=false&lang=en',
    ontology: 'https://terminology.tib.eu/ts/ontologies/dr/terms?iri=http%3A%2F%2Fwww.w3id.org%2Fecsel-dr-AT%23Ontology&obsoletes=false&lang=en'
};

export const EurostatPortal = () => {
    const [reporters, setReporters] = useState([]);
    const [partners, setPartners] = useState([]);
    const [products, setProducts] = useState([]);
    const [flows, setFlows] = useState([]);
    const [years, setYears] = useState([]);

    const [reporter, setReporter] = useState(null);
    const [partner, setPartner] = useState(null);
    const [flow, setFlow] = useState(null);
    const [year, setYear] = useState(`1`);
    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);
    const [product, setProduct] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [lineData, setLineData] = useState(null);
    const [productData, setProductData] = useState(null);
    const [fieldVal, setFieldVal] = useState(null);
    const [value, setValue] = useState(0);
    const [errors, setErrors] = useState({});

    const hasFetched = useRef(false);

    useEffect(() => {
        if (!fieldVal) return;

        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_TIVA_BACKEND_URL}/api/tiva/eurostat?${fieldVal}=submitted`);
            const data = await response.json();
            if (data !== null) {
                switch (fieldVal) {
                    case 'reporter':
                        setReporters(data);
                        break;
                    case 'partner':
                        setPartners(data);
                        break;
                    case 'product':
                        setProducts(transformProducts(data));
                        break;
                    case 'flow':
                        setFlows(transformFlows(data));
                        break;
                    case 'year':
                        setYears(data);
                        break;
                    default:
                        console.error('Unkown param sent {}', fieldVal);
                }
            } else {
                console.log('Empty data returned ');
            }
        };

        fetchData();
    }, [fieldVal]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_TIVA_BACKEND_URL
                    }/api/tiva/eurostat/euroYearRange?reporters=${reporter}&start=${startYear.getFullYear()}-01-01&end=${endYear.getFullYear()}-12-31&partners=${partner}&flow=${flow.value
                    }&products=${product.map(i => i.value)}`
                );
                const responseProduct = await fetch(
                    `${process.env.REACT_APP_TIVA_BACKEND_URL
                    }/api/tiva/eurostat/euroRepParProd?reporters=${reporter}&start=${startYear.getFullYear()}-01-01&end=${endYear.getFullYear()}-12-31&partners=${partner}&flow=${flow.value
                    }&products=${product.map(i => i.value)}`
                );

                const data = await response.json();
                const dataProduct = await responseProduct.json();
                const result = transformFetchedData(data);

                setLineData(result);
                setProductData(dataProduct);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setSubmitted(false);
            }
        };

        if (submitted && !hasFetched.current) {
            fetchData();
            hasFetched.current = true;
        }
    }, [submitted]);

    const validateFields = () => {
        const newErrors = {};
        if (!reporter) newErrors.reporter = 'Reporter is required.';
        if (!partner) newErrors.partner = 'Partner is required.';
        if (!flow) newErrors.flow = 'Flow is required.';
        if (!startYear || !endYear) newErrors.date = 'Start and End year are required.';
        if (!product || product.length === 0) newErrors.product = 'At least one product is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateFields()) {
            return;
        }

        setSubmitted(true);
        hasFetched.current = false;
    };

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const transformFlows = flows => {
        return flows.map(flow => {
            switch (flow.trim()) {
                case '1^^xsd:integer':
                    return {
                        value: flow.trim().substring(0, flow.trim().indexOf('^')),
                        label: 'Import'
                    };
                case '2^^xsd:integer':
                    return {
                        value: flow.trim().substring(0, flow.trim().indexOf('^')),
                        label: 'Export'
                    };
                default:
                    return {
                        value: flow.trim().substring(0, flow.trim().indexOf('^')),
                        label: flow
                    };
            }
        });
    };

    const transformProducts = products => {
        return products.map(product => {
            switch (product.split('/').pop()) {
                case '85414099':
                    return {
                        value: product.split('/').pop(),
                        label:
                            product.split('/').pop() +
                            ' - Photosensitive semiconductor devices (excl. photodiodes, phototransistors, photothyristors, photocouples and solar cells)'
                    };
                case '854149':
                    return {
                        value: product.split('/').pop(),
                        label: product.split('/').pop() + ' -  Photosensitive semiconductor devices (excl. photovoltaic generators and cells)'
                    };
                case '85415900':
                    return {
                        value: product.split('/').pop(),
                        label: product.split('/').pop() + ' - Photosensitive semiconductor devices (excl. photovoltaic generators and cells)'
                    };
                case '854150':
                    return {
                        value: product.split('/').pop(),
                        label: product.split('/').pop() + ' - Semiconductor devices, n.e.s.'
                    };
                case '85415000':
                    return {
                        value: product.split('/').pop(),
                        label: product.split('/').pop() + ' - Semiconductor devices, n.e.s.'
                    };
                case '85415010':
                    return {
                        value: product.split('/').pop(),
                        label: product.split('/').pop() + ' - Semiconductor devices n.e.s., in wafers not yet cut into chips'
                    };
                case '85415090':
                    return {
                        value: product.split('/').pop(),
                        label: product.split('/').pop() + ' - Semiconductor devices n.e.s.'
                    };
                case '854151':
                    return {
                        value: product.split('/').pop(),
                        label: product.split('/').pop() + ' - Semiconductor-based transducers (excl. photosensitive)'
                    };
                case '85415100':
                    return {
                        value: product.split('/').pop(),
                        label: product.split('/').pop() + ' - Semiconductor-based transducers (excl. photosensitive)'
                    };
                case '854159':
                    return {
                        value: product.split('/').pop(),
                        label: product.split('/').pop() + ' - Semiconductor devices, n.e.s.'
                    };

                case '85414900':
                    return {
                        value: product.split('/').pop(),
                        label: product.split('/').pop() + ' - Semiconductor devices, n.e.s.'
                    };

                default:
                    return {
                        value: product.split('/').pop(),
                        label: product.split('/').pop()
                    };
            }
        });
    };

    function transformFetchedData(data) {
        return Object.keys(data).map(key => ({
            name: key,
            data: Array.from(data[key]).sort((a, b) => new Date(a.x) - new Date(b.x))
        }));
    }

    const fieldOpened = event => {
        setFieldVal(event.target.id);
    };

    const handleYearSelect = ([newStartYear, newEndYear]) => {
        setStartYear(newStartYear);
        setEndYear(newEndYear);
        setYear(newStartYear.getFullYear());
    };

    const CustomInput = ({ value, onClick }) => <TextField value={value} onClick={onClick} label="Select Year*" readOnly />;

    CustomInput.propTypes = {
        value: PropTypes.number,
        onClick: PropTypes.func,
    }

    return (
        <Grid container justifyContent="center" sx={{ overflow: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
            <Grid item xs={11} md={11}>
                <Grid container justifyContent="center" sx={{ mb: 2 }}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom textAlign="center">
                            EU trade data since 1988
                        </Typography>
                        <Typography>
                            This{' '}
                            <Link href={wordLinks.application} style={{ color: '#607D8B' }}>
                                application
                            </Link>{' '}
                            is a standardised way of querying and visualising data from the EUROSTAT database{' '}
                            <Link
                                href="https://ec.europa.eu/eurostat/databrowser/view/ds-045409$defaultview/default/table?lang=en"
                                style={{ color: '#607D8B' }}
                            >
                                ds-045409
                            </Link>
                            . EUROSTAT describes the content of the database as:{' '}
                            <i>
                                „International trade in goods statistics (ITGS) published by Eurostat{' '}
                                <Link href={wordLinks.measure} style={{ color: '#607D8B' }}>
                                    measure
                                </Link>{' '}
                                the value and quantity of goods traded between the EU Member States (intra-EU trade) and goods traded by the EU Member
                                States with non-EU countries (extra-EU trade). ‘Goods’ means all movable{' '}
                                <Link href={wordLinks.property} style={{ color: '#607D8B' }}>
                                    property
                                </Link>{' '}
                                including{' '}
                                <Link href={wordLinks.electricity} style={{ color: '#607D8B' }}>
                                    electricity
                                </Link>
                                . ‘European’ means that the statistics are compiled on the basis of the concepts and definitions set out in EU
                                legislation. ‘National’ statistics, i.e. statistics published at national level by the Member States, are compiled on the
                                basis of national rules which may differ from EU rules. European ITGS are the official harmonised{' '}
                                <Link href={wordLinks.source} style={{ color: '#607D8B' }}>
                                    source
                                </Link>{' '}
                                of information about exports, imports and the trade balances of the EU, its Member States and the euro area.“
                            </i>
                        </Typography>
                        <br />
                        <Typography>
                            We have reduced the data to those relating to the trade in{' '}
                            <Link href={wordLinks.semiconductors} style={{ color: '#607D8B' }}>
                                semiconductors
                            </Link>
                            . The{' '}
                            <Link href={wordLinks.products} style={{ color: '#607D8B' }}>
                                products
                            </Link>{' '}
                            are described via the Harmonized{' '}
                            <Link href="https://www.trade.gov/harmonized-system-hs-codes" style={{ color: '#607D8B' }}>
                                System (HS) Code
                            </Link>
                            . This data was first mapped in the{' '}
                            <Link href="https://gitlab.com/coypu-project/coy-ontology" style={{ color: '#607D8B' }}>
                                COY ontology
                            </Link>{' '}
                            and converted into a knowledge graph. The knowledge graph forms the basis for all queries that can be visualised
                            interactively. This enables us to quickly combine, query and visualise the available data for interactive exploration.
                        </Typography>
                        <br />
                        <Typography>
                            In next steps we will enrich these data by further databases as like the{' '}
                            <Link href="https://www.cepii.fr/DATA_DOWNLOAD/baci/doc/DescriptionBACI.html" style={{ color: '#607D8B' }}>
                                BACI
                            </Link>
                            .
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Autocomplete
                            id="reporter"
                            options={reporters}
                            renderInput={params => (
                                <TextField {...params} label="Reporter*" error={!!errors.reporter} helperText={errors.reporter} />
                            )}
                            onFocus={event => fieldOpened(event)}
                            onChange={(event, value) => {
                                setReporter(value);
                                setErrors(prev => ({ ...prev, reporter: null }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Autocomplete
                            id="partner"
                            options={partners}
                            renderInput={params => (
                                <TextField {...params} label="Partner*" error={!!errors.partner} helperText={errors.partner} />
                            )}
                            onFocus={event => fieldOpened(event)}
                            onChange={(event, value) => {
                                setPartner(value);
                                setErrors(prev => ({ ...prev, partner: null }));
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} />

                    <Grid item xs={12} sm={6} md={4}>
                        <Autocomplete
                            id="flow"
                            options={flows}
                            renderInput={params => (
                                <TextField {...params} label="Select flow*" error={!!errors.flow} helperText={errors.flow} />
                            )}
                            onFocus={event => fieldOpened(event)}
                            onChange={(event, value) => {
                                setFlow(value);
                                setErrors(prev => ({ ...prev, flow: null }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <DatePicker
                            selected={startYear}
                            onChange={handleYearSelect}
                            selectsRange
                            startDate={startYear}
                            endDate={endYear}
                            dateFormat="yyyy"
                            showYearPicker
                            customInput={<CustomInput />}
                            required
                        />
                        {errors.date && <div style={{ color: 'red' }}>{errors.date}</div>}
                    </Grid>

                    <Grid item xs={12} />

                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            multiple
                            id="product"
                            options={products}
                            limitTags={1}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        label={option.label.slice(0, 40)}
                                        title={option.label}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            renderInput={params => (
                                <TextField {...params} label="Product*" error={!!errors.product} helperText={errors.product}
                                />
                            )}
                            onFocus={event => fieldOpened(event)}
                            onChange={(event, value) => {
                                setProduct(value);
                                setErrors(prev => ({ ...prev, product: null }));
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} />

                    <Grid item xs={12} sm={3} md={2}>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: colorStyled.old.darkSecondary }}
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>

                {lineData && productData && (
                    <Grid item xs={12}>
                        <Tabs value={value} onChange={handleTabChange} TabIndicatorProps={{ style: { display: 'none' } }}>
                            <Tab label="Line" />
                            <Tab label="Bar" />
                        </Tabs>
                        <Box>
                            {value === 0 && <MyApexChart data={lineData} title="Trade value between reporter and partner" />}
                            {value === 1 && <ApexBarChart data={Object.values(productData)} categories={Object.keys(productData)} />}
                        </Box>
                    </Grid>
                )}

            </Grid>
        </Grid>
    );
};
