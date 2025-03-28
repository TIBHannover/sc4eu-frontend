export const EurostatGeoEntities = Object.freeze({
    France: { decl: "001", label: "France", code: "FR" },
    Netherlands: { decl: "003", label: "Netherlands", code: "NL" },
    Germany: { decl: "004", label: "Germany", code: "DE" },
    Italy: { decl: "005", label: "Italy", code: "IT" },
    United_Kingdom: { decl: "006", label: "United Kingdom", code: "UK" },
    Ireland: { decl: "007", label: "Ireland", code: "IE" },
    Denmark: { decl: "008", label: "Denmark", code: "DK" },
    Greece: { decl: "009", label: "Greece", code: "EL" },
    Portugal: { decl: "010", label: "Portugal", code: "PT" },
    Spain: { decl: "011", label: "Spain", code: "ES" },
    Belgium: { decl: "017", label: "Belgium", code: "BE" },
    Luxembourg: { decl: "018", label: "Luxembourg", code: "LU" },
    Iceland: { decl: "024", label: "Iceland", code: "IS" },
    Norway: { decl: "028", label: "Norway", code: "NO" },
    Sweden: { decl: "030", label: "Sweden", code: "SE" },
    Finland: { decl: "032", label: "Finland", code: "FI" },
    Austria: { decl: "038", label: "Austria", code: "AT" },
    Malta: { decl: "046", label: "Malta", code: "MT" },
    Tuerkiye: { decl: "052", label: "Türkiye", code: "TR" },
    Estonia: { decl: "053", label: "Estonia", code: "EE" },
    Latvia: { decl: "054", label: "Latvia", code: "LV" },
    Lithuania: { decl: "055", label: "Lithuania", code: "LT" },
    Poland: { decl: "060", label: "Poland", code: "PL" },
    Czechia: { decl: "061", label: "Czechia", code: "CZ" },
    Slovakia: { decl: "063", label: "Slovakia", code: "SK" },
    Hungary: { decl: "064", label: "Hungary", code: "HU" },
    Romania: { decl: "066", label: "Romania", code: "RO" },
    Bulgaria: { decl: "068", label: "Bulgaria", code: "BG" },
    Albania: { decl: "070", label: "Albania", code: "AL" },
    Slovenia: { decl: "091", label: "Slovenia", code: "SI" },
    Croatia: { decl: "092", label: "Croatia", code: "HR" },
    Bosnia_and_Herzegovina: {
        decl: "093",
        label: "Bosnia and Herzegovina",
        code: "BA",
    },
    North_Macedonia: { decl: "096", label: "North Macedonia", code: "MK" },
    Montenegro: { decl: "097", label: "Montenegro", code: "ME" },
    Serbia: { decl: "098", label: "Serbia", code: "RS" },
    EU15TOTALS: { decl: "1110", label: "EU15 Total", code: "EU15TOTALS" },
    EU25TOTALS: { decl: "1111", label: "EU25 Total", code: "EU25TOTALS" },
    EU27TOTALS_2007: {
        decl: "1112",
        label: "EU27 Total (2007)",
        code: "EU27_2007",
    },
    EU27TOTALS_2020: {
        decl: "2027",
        label: "EU27 Total (2020)",
        code: "EU27_2020",
    },
    EUROPEAN_UNION: { decl: "2028", label: "European Union", code: "EU28" },
    Cyprus: { decl: "600", label: "Cyprus", code: "CY" },

    Switzerland: {decl: '-1', label: "Switzerland", code: "CH" },
    Kosovo: { decl: '-1', label: "Kosovo", code: "XK" },

    transform: (reporters) => {
        return reporters.map((item) => {
            switch (item) {
                case EurostatGeoEntities.France.code:
                case EurostatGeoEntities.France.decl:
                    return {
                        decl: EurostatGeoEntities.France.decl,
                        label: EurostatGeoEntities.France.label,
                        code: EurostatGeoEntities.France.code,
                    };

                case EurostatGeoEntities.Netherlands.code:
                case EurostatGeoEntities.Netherlands.decl:
                    return {
                        decl: EurostatGeoEntities.Netherlands.decl,
                        label: EurostatGeoEntities.Netherlands.label,
                        code: EurostatGeoEntities.France.code,
                    };

                case EurostatGeoEntities.Germany.code:
                case EurostatGeoEntities.Germany.decl:
                    return {
                        decl: EurostatGeoEntities.Germany.decl,
                        label: EurostatGeoEntities.Germany.label,
                        code: EurostatGeoEntities.France.code,
                    };

                case EurostatGeoEntities.Italy.code:
                case EurostatGeoEntities.Italy.decl:
                    return {
                        decl: EurostatGeoEntities.Italy.decl,
                        label: EurostatGeoEntities.Italy.label,
                        code: EurostatGeoEntities.France.code,
                    };

                case EurostatGeoEntities.United_Kingdom.code:
                case EurostatGeoEntities.United_Kingdom.decl:
                    return {
                        decl: EurostatGeoEntities.United_Kingdom.decl,
                        label: EurostatGeoEntities.United_Kingdom.label,
                        code: EurostatGeoEntities.United_Kingdom.code,
                    };

                case EurostatGeoEntities.Ireland.code:
                case EurostatGeoEntities.Ireland.decl:
                    return {
                        decl: EurostatGeoEntities.Ireland.decl,
                        label: EurostatGeoEntities.Ireland.label,
                        code: EurostatGeoEntities.Ireland.code,
                    };

                case EurostatGeoEntities.Denmark.code:
                case EurostatGeoEntities.Denmark.decl:
                    return {
                        decl: EurostatGeoEntities.Denmark.decl,
                        label: EurostatGeoEntities.Denmark.label,
                        code: EurostatGeoEntities.Denmark.code,
                    };

                case EurostatGeoEntities.Greece.code:
                case EurostatGeoEntities.Greece.decl:
                    return {
                        decl: EurostatGeoEntities.Greece.decl,
                        label: EurostatGeoEntities.Greece.label,
                        code: EurostatGeoEntities.Greece.code,
                    };

                case EurostatGeoEntities.Portugal.code:
                case EurostatGeoEntities.Portugal.decl:
                    return {
                        decl: EurostatGeoEntities.Portugal.decl,
                        label: EurostatGeoEntities.Portugal.label,
                        code: EurostatGeoEntities.Portugal.code,
                    };

                case EurostatGeoEntities.Spain.code:
                case EurostatGeoEntities.Spain.decl:
                    return {
                        decl: EurostatGeoEntities.Spain.decl,
                        label: EurostatGeoEntities.Spain.label,
                        code: EurostatGeoEntities.Spain.code,
                    };

                case EurostatGeoEntities.Belgium.code:
                case EurostatGeoEntities.Belgium.decl:
                    return {
                        decl: EurostatGeoEntities.Belgium.decl,
                        label: EurostatGeoEntities.Belgium.label,
                        code: EurostatGeoEntities.Belgium.code,
                    };

                case EurostatGeoEntities.Luxembourg.code:
                case EurostatGeoEntities.Luxembourg.decl:
                    return {
                        decl: EurostatGeoEntities.Luxembourg.decl,
                        label: EurostatGeoEntities.Luxembourg.label,
                        code: EurostatGeoEntities.Luxembourg.code,
                    };

                case EurostatGeoEntities.Iceland.code:
                case EurostatGeoEntities.Iceland.decl:
                    return {
                        decl: EurostatGeoEntities.Iceland.decl,
                        label: EurostatGeoEntities.Iceland.label,
                        code: EurostatGeoEntities.Iceland.code,
                    };

                case EurostatGeoEntities.Norway.code:
                case EurostatGeoEntities.Norway.decl:
                    return {
                        decl: EurostatGeoEntities.Norway.decl,
                        label: EurostatGeoEntities.Norway.label,
                        code: EurostatGeoEntities.Norway.code,
                    };

                case EurostatGeoEntities.Sweden.code:
                case EurostatGeoEntities.Sweden.decl:
                    return {
                        decl: EurostatGeoEntities.Sweden.decl,
                        label: EurostatGeoEntities.Sweden.label,
                        code: EurostatGeoEntities.Sweden.code,
                    };

                case EurostatGeoEntities.Finland.code:
                case EurostatGeoEntities.Finland.decl:
                    return {
                        decl: EurostatGeoEntities.Finland.decl,
                        label: EurostatGeoEntities.Finland.label,
                        code: EurostatGeoEntities.Finland.code,
                    };

                case EurostatGeoEntities.Austria.code:
                case EurostatGeoEntities.Austria.decl:
                    return {
                        decl: EurostatGeoEntities.Austria.decl,
                        label: EurostatGeoEntities.Austria.label,
                        code: EurostatGeoEntities.Austria.code,
                    };

                case EurostatGeoEntities.Malta.code:
                case EurostatGeoEntities.Malta.decl:
                    return {
                        decl: EurostatGeoEntities.Malta.decl,
                        label: EurostatGeoEntities.Malta.label,
                        code: EurostatGeoEntities.Malta.code,
                    };

                case EurostatGeoEntities.Tuerkiye.code:
                case EurostatGeoEntities.Tuerkiye.decl:
                    return {
                        decl: EurostatGeoEntities.Tuerkiye.decl,
                        label: EurostatGeoEntities.Tuerkiye.label,
                        code: EurostatGeoEntities.Tuerkiye.code,
                    };

                case EurostatGeoEntities.Estonia.code:
                case EurostatGeoEntities.Estonia.decl:
                    return {
                        decl: EurostatGeoEntities.Estonia.decl,
                        label: EurostatGeoEntities.Estonia.label,
                        code: EurostatGeoEntities.Estonia.code,
                    };

                case EurostatGeoEntities.Latvia.code:
                case EurostatGeoEntities.Latvia.decl:
                    return {
                        decl: EurostatGeoEntities.Latvia.decl,
                        label: EurostatGeoEntities.Latvia.label,
                        code: EurostatGeoEntities.Latvia.code,
                    };

                case EurostatGeoEntities.Lithuania.code:
                case EurostatGeoEntities.Lithuania.decl:
                    return {
                        decl: EurostatGeoEntities.Lithuania.decl,
                        label: EurostatGeoEntities.Lithuania.label,
                        code: EurostatGeoEntities.Lithuania.code,
                    };

                case EurostatGeoEntities.Poland.code:
                case EurostatGeoEntities.Poland.decl:
                    return {
                        decl: EurostatGeoEntities.Poland.decl,
                        label: EurostatGeoEntities.Poland.label,
                        code: EurostatGeoEntities.Poland.code,
                    };

                case EurostatGeoEntities.Czechia.code:
                case EurostatGeoEntities.Czechia.decl:
                    return {
                        decl: EurostatGeoEntities.Czechia.decl,
                        label: EurostatGeoEntities.Czechia.label,
                        code: EurostatGeoEntities.Czechia.code,
                    };

                case EurostatGeoEntities.Slovakia.code:
                case EurostatGeoEntities.Slovakia.decl:
                    return {
                        decl: EurostatGeoEntities.Slovakia.decl,
                        label: EurostatGeoEntities.Slovakia.label,
                        code: EurostatGeoEntities.Slovakia.code,
                    };

                case EurostatGeoEntities.Hungary.code:
                case EurostatGeoEntities.Hungary.decl:
                    return {
                        decl: EurostatGeoEntities.Hungary.decl,
                        label: EurostatGeoEntities.Hungary.label,
                        code: EurostatGeoEntities.Hungary.code,
                    };

                case EurostatGeoEntities.Romania.code:
                case EurostatGeoEntities.Romania.decl:
                    return {
                        decl: EurostatGeoEntities.Romania.decl,
                        label: EurostatGeoEntities.Romania.label,
                        code: EurostatGeoEntities.Romania.code,
                    };

                case EurostatGeoEntities.Bulgaria.code:
                case EurostatGeoEntities.Bulgaria.decl:
                    return {
                        decl: EurostatGeoEntities.Bulgaria.decl,
                        label: EurostatGeoEntities.Bulgaria.label,
                        code: EurostatGeoEntities.Bulgaria.code,
                    };

                case EurostatGeoEntities.Albania.code:
                case EurostatGeoEntities.Albania.decl:
                    return {
                        decl: EurostatGeoEntities.Albania.decl,
                        label: EurostatGeoEntities.Albania.label,
                        code: EurostatGeoEntities.Albania.code,
                    };

                case EurostatGeoEntities.Slovenia.code:
                case EurostatGeoEntities.Slovenia.decl:
                    return {
                        decl: EurostatGeoEntities.Slovenia.decl,
                        label: EurostatGeoEntities.Slovenia.label,
                        code: EurostatGeoEntities.Slovenia.code,
                    };

                case EurostatGeoEntities.Croatia.code:
                case EurostatGeoEntities.Croatia.decl:
                    return {
                        decl: EurostatGeoEntities.Croatia.decl,
                        label: EurostatGeoEntities.Croatia.label,
                        code: EurostatGeoEntities.Croatia.code,
                    };

                case EurostatGeoEntities.Bosnia_and_Herzegovina.code:
                case EurostatGeoEntities.Bosnia_and_Herzegovina.decl:
                    return {
                        decl: EurostatGeoEntities.Bosnia_and_Herzegovina.decl,
                        label: EurostatGeoEntities.Bosnia_and_Herzegovina.label,
                        code: EurostatGeoEntities.Bosnia_and_Herzegovina.code,
                    };

                case EurostatGeoEntities.North_Macedonia.code:
                case EurostatGeoEntities.North_Macedonia.decl:
                    return {
                        decl: EurostatGeoEntities.North_Macedonia.decl,
                        label: EurostatGeoEntities.North_Macedonia.label,
                        code: EurostatGeoEntities.North_Macedonia.code,
                    };

                case EurostatGeoEntities.Montenegro.code:
                case EurostatGeoEntities.Montenegro.decl:
                    return {
                        decl: EurostatGeoEntities.Montenegro.decl,
                        label: EurostatGeoEntities.Montenegro.label,
                        code: EurostatGeoEntities.Montenegro.code,
                    };

                case EurostatGeoEntities.Serbia.code:
                case EurostatGeoEntities.Serbia.decl:
                    return {
                        decl: EurostatGeoEntities.Serbia.decl,
                        label: EurostatGeoEntities.Serbia.label,
                        code: EurostatGeoEntities.Serbia.code,
                    };

                case EurostatGeoEntities.EU15TOTALS.code:
                case EurostatGeoEntities.EU15TOTALS.decl:
                    return {
                        decl: EurostatGeoEntities.EU15TOTALS.decl,
                        label: EurostatGeoEntities.EU15TOTALS.label,
                        code: EurostatGeoEntities.EU15TOTALS.code,
                    };

                case EurostatGeoEntities.EU25TOTALS.code:
                case EurostatGeoEntities.EU25TOTALS.decl:
                    return {
                        decl: EurostatGeoEntities.EU25TOTALS.decl,
                        label: EurostatGeoEntities.EU25TOTALS.label,
                        code: EurostatGeoEntities.EU25TOTALS.code,
                    };

                case EurostatGeoEntities.EU27TOTALS_2007.code:
                case EurostatGeoEntities.EU27TOTALS_2007.decl:
                    return {
                        decl: EurostatGeoEntities.EU27TOTALS_2007.decl,
                        label: EurostatGeoEntities.EU27TOTALS_2007.label,
                        code: EurostatGeoEntities.EU27TOTALS_2007.code,
                    };

                case EurostatGeoEntities.EU27TOTALS_2020.code:
                case EurostatGeoEntities.EU27TOTALS_2020.decl:
                    return {
                        decl: EurostatGeoEntities.EU27TOTALS_2020.decl,
                        label: EurostatGeoEntities.EU27TOTALS_2020.label,
                        code: EurostatGeoEntities.EU27TOTALS_2020.code,
                    };

                case EurostatGeoEntities.EUROPEAN_UNION.code:
                case EurostatGeoEntities.EUROPEAN_UNION.decl:
                    return {
                        decl: EurostatGeoEntities.EUROPEAN_UNION.decl,
                        label: EurostatGeoEntities.EUROPEAN_UNION.label,
                        code: EurostatGeoEntities.EUROPEAN_UNION.code,
                    };

                case EurostatGeoEntities.Cyprus.code:
                case EurostatGeoEntities.Cyprus.decl:
                    return {
                        decl: EurostatGeoEntities.Cyprus.decl,
                        label: EurostatGeoEntities.Cyprus.label,
                        code: EurostatGeoEntities.Cyprus.code,
                    };

                case EurostatGeoEntities.Switzerland.code:
                case EurostatGeoEntities.Switzerland.decl:
                    return {
                        decl: EurostatGeoEntities.Switzerland.decl,
                        label: EurostatGeoEntities.Switzerland.label,
                        code: EurostatGeoEntities.Switzerland.code,
                    };

                case EurostatGeoEntities.Kosovo.code:
                case EurostatGeoEntities.Kosovo.decl:
                    return {
                        decl: EurostatGeoEntities.Kosovo.decl,
                        label: EurostatGeoEntities.Kosovo.label,
                        code: EurostatGeoEntities.Kosovo.code,
                    };

                default:
                    return {
                        decl: item,
                        label: item,
                        code: item,
                    };
            }
        });
    },
});
