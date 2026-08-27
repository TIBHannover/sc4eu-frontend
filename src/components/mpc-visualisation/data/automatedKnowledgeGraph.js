export const AUTOMATED_KNOWLEDGE_GRAPH_TTL = `
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix survey: <http://www.semanticweb.org/gibajajulena/ontologies/2025/9/OEM_Monthly_Survey/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

survey:10nm_to_less_than_28nm a rdfs:Class ;
    rdfs:subClassOf survey:InventoryDevelopment_Semi,
        survey:InventoryTargetIndicator_Semi,
        survey:OrderCancellationChange_Semi .

survey:180nm_or_greater a rdfs:Class ;
    rdfs:subClassOf survey:InventoryDevelopment_Semi,
        survey:InventoryTargetIndicator_Semi,
        survey:OrderCancellationChange_Semi .

survey:28nm_to_less_than_45nm a rdfs:Class ;
    rdfs:subClassOf survey:InventoryDevelopment_Semi,
        survey:InventoryTargetIndicator_Semi,
        survey:OrderCancellationChange_Semi .

survey:55nm_to_180nm a rdfs:Class ;
    rdfs:subClassOf survey:InventoryDevelopment_Semi,
        survey:InventoryTargetIndicator_Semi,
        survey:OrderCancellationChange_Semi .

survey:7nm_or_less a rdfs:Class ;
    rdfs:subClassOf survey:InventoryDevelopment_Semi,
        survey:InventoryTargetIndicator_Semi,
        survey:OrderCancellationChange_Semi .

survey:Advanced_driver-assistance_systems_ADAS a survey:ComponentShare_Tier1,
        rdfs:Class ;
    survey:isActiveInCategory "{'Yes': 1.0, 'No': 0.0, 'SUM': 1.0}"^^xsd:string ;
    rdfs:subClassOf survey:ComponentShare_Tier1 .

survey:AggregatedDemand a rdfs:Class ;
    rdfs:subClassOf survey:Demand .

survey:Automotive a rdfs:Class ;
    rdfs:subClassOf survey:MarketSegment .

survey:AutonomousDrivingDevelopment a rdfs:Class .

survey:AutonomousDrivingDevelopment_OEM a survey:AutonomousDrivingDevelopment_OEM,
        rdfs:Class ;
    survey:hasDetail survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_1_Year_2026,
        survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_1_Year_2027,
        survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_1_Year_2028,
        survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_2_Year_2026,
        survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_2_Year_2027,
        survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_2_Year_2028,
        survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_3_Year_2026,
        survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_3_Year_2027,
        survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_3_Year_2028,
        survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_4_Year_2026,
        survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_4_Year_2027,
        survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_4_Year_2028,
        survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_5_Year_2026,
        survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_5_Year_2027,
        survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_5_Year_2028,
        survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_1_Year_2026,
        survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_1_Year_2027,
        survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_1_Year_2028,
        survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_2_Year_2026,
        survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_2_Year_2027,
        survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_2_Year_2028,
        survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_3_Year_2026,
        survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_3_Year_2027,
        survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_3_Year_2028,
        survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_4_Year_2026,
        survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_4_Year_2027,
        survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_4_Year_2028,
        survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_5_Year_2026,
        survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_5_Year_2027,
        survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_5_Year_2028,
        survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_1_Year_2026,
        survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_1_Year_2027,
        survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_1_Year_2028,
        survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_2_Year_2026,
        survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_2_Year_2027,
        survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_2_Year_2028,
        survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_3_Year_2026,
        survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_3_Year_2027,
        survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_3_Year_2028,
        survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_4_Year_2026,
        survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_4_Year_2027,
        survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_4_Year_2028,
        survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_5_Year_2026,
        survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_5_Year_2027,
        survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_5_Year_2028 ;
    survey:hasSurveyOrigin survey:OEM_Survey ;
    survey:hasVehicleType survey:BEHV,
        survey:BEV,
        survey:ICE ;
    rdfs:subClassOf survey:AutonomousDrivingDevelopment .

survey:AutonomousDrivingDevelopment_Tier1 a survey:AutonomousDrivingDevelopment_Tier1,
        rdfs:Class ;
    survey:hasDetail survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_1_Year_2026,
        survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_1_Year_2027,
        survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_1_Year_2028,
        survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_2_Year_2026,
        survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_2_Year_2027,
        survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_2_Year_2028,
        survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_3_Year_2026,
        survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_3_Year_2027,
        survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_3_Year_2028,
        survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_4_Year_2026,
        survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_4_Year_2027,
        survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_4_Year_2028,
        survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_5_Year_2026,
        survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_5_Year_2027,
        survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_5_Year_2028,
        survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_1_Year_2026,
        survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_1_Year_2027,
        survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_1_Year_2028,
        survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_2_Year_2026,
        survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_2_Year_2027,
        survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_2_Year_2028,
        survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_3_Year_2026,
        survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_3_Year_2027,
        survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_3_Year_2028,
        survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_4_Year_2026,
        survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_4_Year_2027,
        survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_4_Year_2028,
        survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_5_Year_2026,
        survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_5_Year_2027,
        survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_5_Year_2028,
        survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_1_Year_2026,
        survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_1_Year_2027,
        survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_1_Year_2028,
        survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_2_Year_2026,
        survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_2_Year_2027,
        survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_2_Year_2028,
        survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_3_Year_2026,
        survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_3_Year_2027,
        survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_3_Year_2028,
        survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_4_Year_2026,
        survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_4_Year_2027,
        survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_4_Year_2028,
        survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_5_Year_2026,
        survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_5_Year_2027,
        survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_5_Year_2028 ;
    survey:hasSurveyOrigin survey:Tier1_Survey ;
    survey:hasVehicleType survey:BEHV,
        survey:BEV,
        survey:ICE ;
    rdfs:subClassOf survey:AutonomousDrivingDevelopment .

survey:BEHV a rdfs:Class ;
    survey:hasSAELevel survey:SAE_Level_1,
        survey:SAE_Level_2,
        survey:SAE_Level_3,
        survey:SAE_Level_4,
        survey:SAE_Level_5 ;
    rdfs:subClassOf survey:VehicleType .

survey:BEV a rdfs:Class ;
    survey:hasSAELevel survey:SAE_Level_1,
        survey:SAE_Level_2,
        survey:SAE_Level_3,
        survey:SAE_Level_4,
        survey:SAE_Level_5 ;
    rdfs:subClassOf survey:VehicleType .

survey:Body_and_convenience a survey:ComponentShare_Tier1,
        rdfs:Class ;
    survey:isActiveInCategory "{'Yes': 0.0, 'No': 1.0, 'SUM': 1.0}"^^xsd:string ;
    rdfs:subClassOf survey:ComponentShare_Tier1 .

survey:Chassis_and_safety a survey:ComponentShare_Tier1,
        rdfs:Class ;
    survey:isActiveInCategory "{'Yes': 1.0, 'No': 0.0, 'SUM': 1.0}"^^xsd:string ;
    rdfs:subClassOf survey:ComponentShare_Tier1 .

survey:ComponentShare a rdfs:Class .

survey:ComponentShare_Tier1 a rdfs:Class ;
    rdfs:subClassOf survey:ComponentShare .

survey:ComponentType_Tier1 a rdfs:Class ;
    rdfs:subClassOf survey:ComponentShare .

survey:ConversionFactor a rdfs:Class .

survey:CurrentDemandAnalysis a rdfs:Class ;
    rdfs:subClassOf survey:Demand .

survey:CurrentRegionalDemand a rdfs:Class ;
    rdfs:subClassOf survey:Demand .

survey:Demand a rdfs:Class .

survey:DemandForRegion a rdfs:Class ;
    rdfs:subClassOf survey:Demand .

survey:DemandResponse a rdfs:Class ;
    rdfs:subClassOf survey:Demand .

survey:EV a survey:ComponentType_Tier1,
        rdfs:Class ;
    survey:componentType "EV" ;
    survey:hasComponentTypeSplit survey:EV ;
    survey:splitPercentage 40.0 ;
    rdfs:subClassOf survey:ComponentType_Tier1 .

survey:FutureDemandAnalysis a survey:FutureDemandAnalysis,
        rdfs:Class ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    rdfs:subClassOf survey:Demand .

survey:FutureRegionalDemand a rdfs:Class ;
    rdfs:subClassOf survey:Demand .

survey:ICE a rdfs:Class ;
    survey:hasSAELevel survey:SAE_Level_1,
        survey:SAE_Level_2,
        survey:SAE_Level_3,
        survey:SAE_Level_4,
        survey:SAE_Level_5 ;
    rdfs:subClassOf survey:VehicleType .

survey:Infotainment_and_Telematics a survey:ComponentShare_Tier1,
        rdfs:Class ;
    survey:isActiveInCategory "{'Yes': 1.0, 'No': 0.0, 'SUM': 1.0}"^^xsd:string ;
    rdfs:subClassOf survey:ComponentShare_Tier1 .

survey:Inventory a rdfs:Class .

survey:InventoryDevelopment a rdfs:Class ;
    rdfs:subClassOf survey:Inventory .

survey:InventoryDevelopment_Semi a rdfs:Class ;
    rdfs:subClassOf survey:InventoryDevelopment .

survey:InventoryDevelopment_Tier1 a rdfs:Class ;
    rdfs:subClassOf survey:InventoryDevelopment .

survey:InventoryTargetIndicator a rdfs:Class ;
    rdfs:subClassOf survey:Inventory .

survey:InventoryTargetIndicator_Semi a rdfs:Class ;
    rdfs:subClassOf survey:InventoryTargetIndicator .

survey:MarketSegment a rdfs:Class .

survey:OEM_Survey a rdfs:Class ;
    rdfs:subClassOf survey:Survey .

survey:OrderCancellation a rdfs:Class .

survey:OrderCancellationChange_Semi a rdfs:Class ;
    rdfs:subClassOf survey:OrderCancellation .

survey:Other a survey:ComponentShare_Tier1,
        rdfs:Class ;
    survey:isActiveInCategory "{'Yes': 0.0, 'No': 1.0, 'SUM': 1.0}"^^xsd:string ;
    rdfs:subClassOf survey:ComponentShare_Tier1 .

survey:Powertrain a survey:ComponentShare_Tier1,
        rdfs:Class ;
    survey:isActiveInCategory "{'Yes': 0.0, 'No': 1.0, 'SUM': 1.0}"^^xsd:string ;
    rdfs:subClassOf survey:ComponentShare_Tier1 .

survey:SemiconductorShortage a rdfs:Class .

survey:Survey a rdfs:Class .

survey:Tier1_Survey a rdfs:Class ;
    rdfs:subClassOf survey:Survey .

survey:TimePeriod a rdfs:Class .

survey:VehicleSalesObservation a rdfs:Class .

survey:non_EV a survey:ComponentType_Tier1,
        rdfs:Class ;
    survey:componentType "non_EV" ;
    survey:hasComponentTypeSplit survey:non_EV ;
    survey:splitPercentage 60.0 ;
    rdfs:subClassOf survey:ComponentType_Tier1 .

survey:AggregatedInventoryTrendSummary a survey:InventoryDevelopment_Tier1 ;
    survey:forComponent survey:Component_EV,
        survey:Component_both,
        survey:Component_non_EV .

survey:AggregatedTrend_EV_Decrease survey:hasInventoryResponse survey:Decrease .

survey:AggregatedTrend_EV_Increase survey:hasInventoryResponse survey:Increase .

survey:AggregatedTrend_EV_SUM survey:hasInventoryResponse survey:Sum .

survey:AggregatedTrend_EV_Stable survey:hasInventoryResponse survey:Stable .

survey:AggregatedTrend_both_Decrease survey:hasInventoryResponse survey:Decrease .

survey:AggregatedTrend_both_Increase survey:hasInventoryResponse survey:Increase .

survey:AggregatedTrend_both_SUM survey:hasInventoryResponse survey:Sum .

survey:AggregatedTrend_both_Stable survey:hasInventoryResponse survey:Stable .

survey:AggregatedTrend_non_EV_Decrease survey:hasInventoryResponse survey:Decrease .

survey:AggregatedTrend_non_EV_Increase survey:hasInventoryResponse survey:Increase .

survey:AggregatedTrend_non_EV_SUM survey:hasInventoryResponse survey:Sum .

survey:AggregatedTrend_non_EV_Stable survey:hasInventoryResponse survey:Stable .

survey:Baseline2023Justification survey:baselineYear "2023" ;
    survey:dataType "Actual Sales Data" ;
    survey:justificationDescription """
        BASELINE JUSTIFICATION: Using CY 2023 as baseline for the following reasons:
        1. COMPLETE DATA: 2023 represents the most recent full calendar year with complete actual sales data
        2. POST-PANDEMIC STABILITY: 2023 reflects market conditions after pandemic-related disruptions stabilized
        3. PRE-TRANSITION PERIOD: Captures the automotive industry at the beginning of major EV transition
        4. DATA RELIABILITY: Actual sales data vs. forecasts provide more reliable baseline metrics
        5. INDUSTRY STANDARD: Calendar Year 2023 is commonly used as reference point in automotive industry analysis
        6. COMPARABILITY: Enables consistent comparison across different vehicle types and manufacturers
        """ .

survey:ClassificationAssumptions survey:hasAssumption survey:assumption_1061_SERIES,
        survey:assumption_1118,
        survey:assumption_178,
        survey:assumption_186,
        survey:assumption_2101,
        survey:assumption_2108,
        survey:assumption_2110,
        survey:assumption_2121,
        survey:assumption_2500,
        survey:assumption_2500%282%29,
        survey:assumption_296N,
        survey:assumption_2SA,
        survey:assumption_2SD,
        survey:assumption_2YA,
        survey:assumption_300N,
        survey:assumption_307,
        survey:assumption_307%282%29,
        survey:assumption_3160,
        survey:assumption_31XX_31XX-2,
        survey:assumption_3302,
        survey:assumption_330N,
        survey:assumption_370N,
        survey:assumption_407%282%29,
        survey:assumption_407_608_609,
        survey:assumption_414T,
        survey:assumption_500N,
        survey:assumption_560T_810T,
        survey:assumption_66L_21Z,
        survey:assumption_670H_KF,
        survey:assumption_800,
        survey:assumption_800T,
        survey:assumption_8C,
        survey:assumption_970,
        survey:assumption_980,
        survey:assumption_986_996_-_987_997,
        survey:assumption_9X1,
        survey:assumption_A,
        survey:assumption_A%282%29,
        survey:assumption_A-SERIES,
        survey:assumption_A0,
        survey:assumption_A0%282%29,
        survey:assumption_A002,
        survey:assumption_A100,
        survey:assumption_A10_A24_A32,
        survey:assumption_A30,
        survey:assumption_A30%282%29,
        survey:assumption_AA,
        survey:assumption_AM,
        survey:assumption_AM-RB,
        survey:assumption_AM800,
        survey:assumption_AMG.EA,
        survey:assumption_AMP,
        survey:assumption_AM_EV,
        survey:assumption_AN_DN_ND,
        survey:assumption_AP,
        survey:assumption_APP,
        survey:assumption_AP_UM_JR_JK_MB,
        survey:assumption_ATLAS,
        survey:assumption_AU,
        survey:assumption_Alpine,
        survey:assumption_Ampr,
        survey:assumption_B,
        survey:assumption_B%282%29,
        survey:assumption_B-0,
        survey:assumption_B-SERIES,
        survey:assumption_B-VX62,
        survey:assumption_B0,
        survey:assumption_B1,
        survey:assumption_B2,
        survey:assumption_B2E,
        survey:assumption_B3,
        survey:assumption_B30,
        survey:assumption_B30%282%29,
        survey:assumption_B6,
        survey:assumption_BC,
        survey:assumption_BC300,
        survey:assumption_BD_LD-100,
        survey:assumption_BE,
        survey:assumption_BE%282%29,
        survey:assumption_BE11,
        survey:assumption_BE21,
        survey:assumption_BE21%282%29,
        survey:assumption_BE22,
        survey:assumption_BE22%282%29,
        survey:assumption_BE91,
        survey:assumption_BEV-F,
        survey:assumption_BEV3_BEV_N,
        survey:assumption_BEV_Prime,
        survey:assumption_BF,
        survey:assumption_BF1,
        survey:assumption_BJ2020,
        survey:assumption_BJ2022,
        survey:assumption_BJ2022%282%29,
        survey:assumption_BLP,
        survey:assumption_BLP%282%29,
        survey:assumption_BLP-L,
        survey:assumption_BLP-L%282%29,
        survey:assumption_BLUECAR,
        survey:assumption_BMA,
        survey:assumption_BMFA,
        survey:assumption_BMFA%282%29,
        survey:assumption_BMP,
        survey:assumption_BMP%282%29,
        survey:assumption_BM_MD,
        survey:assumption_BR-LT,
        survey:assumption_BR-LT%282%29,
        survey:assumption_BR450,
        survey:assumption_BR451,
        survey:assumption_BREMACH,
        survey:assumption_BSN,
        survey:assumption_BSP,
        survey:assumption_BSP%282%29,
        survey:assumption_BT1,
        survey:assumption_BUGATTI,
        survey:assumption_BV1,
        survey:assumption_C,
        survey:assumption_C%282%29,
        survey:assumption_C-5,
        survey:assumption_C-EV,
        survey:assumption_C-EVO_CUSW,
        survey:assumption_C1,
        survey:assumption_C170,
        survey:assumption_C199,
        survey:assumption_C1XX_C1XX-2,
        survey:assumption_C2,
        survey:assumption_C2_GE1,
        survey:assumption_C30,
        survey:assumption_C30%282%29,
        survey:assumption_C6,
        survey:assumption_CA1046,
        survey:assumption_CA1046%282%29,
        survey:assumption_CA6300,
        survey:assumption_CANTER,
        survey:assumption_CB40,
        survey:assumption_CCA,
        survey:assumption_CD,
        survey:assumption_CD-EU,
        survey:assumption_CD1-3,
        survey:assumption_CD4,
        survey:assumption_CD6,
        survey:assumption_CE,
        survey:assumption_CE1,
        survey:assumption_CF-SERIES,
        survey:assumption_CF4,
        survey:assumption_CFT,
        survey:assumption_CFT%282%29,
        survey:assumption_CH,
        survey:assumption_CHB,
        survey:assumption_CIVILIAN,
        survey:assumption_CK,
        survey:assumption_CKZ,
        survey:assumption_CL_MM,
        survey:assumption_CL_MM%282%29,
        survey:assumption_CMA,
        survey:assumption_CMF-A,
        survey:assumption_CMF-B,
        survey:assumption_CMF-C_D,
        survey:assumption_CMF-C_D%282%29,
        survey:assumption_CMF-EV,
        survey:assumption_CMP,
        survey:assumption_CMV,
        survey:assumption_CN2,
        survey:assumption_COASTER,
        survey:assumption_CR,
        survey:assumption_CRRC,
        survey:assumption_CS,
        survey:assumption_CSP,
        survey:assumption_CUB,
        survey:assumption_CUB%282%29,
        survey:assumption_CV-L,
        survey:assumption_CV9,
        survey:assumption_CX,
        survey:assumption_CXV,
        survey:assumption_CZ,
        survey:assumption_C_D,
        survey:assumption_C_Q,
        survey:assumption_Ceer,
        survey:assumption_Compact_Main_Platform,
        survey:assumption_Cybertruck,
        survey:assumption_D,
        survey:assumption_D%282%29,
        survey:assumption_D-5,
        survey:assumption_D-XEV,
        survey:assumption_D01A,
        survey:assumption_D186,
        survey:assumption_D21,
        survey:assumption_D2C_D5,
        survey:assumption_D30,
        survey:assumption_D3_D4,
        survey:assumption_D71A,
        survey:assumption_D8,
        survey:assumption_D91B,
        survey:assumption_DAILY,
        survey:assumption_DALLARA,
        survey:assumption_DC1,
        survey:assumption_DC2,
        survey:assumption_DD1020_1022_1023,
        survey:assumption_DD6760_6751_6600,
        survey:assumption_DE30,
        survey:assumption_DEFENDER,
        survey:assumption_DELIVERY,
        survey:assumption_DEV,
        survey:assumption_DF1,
        survey:assumption_DF1%282%29,
        survey:assumption_DF2,
        survey:assumption_DF2%282%29,
        survey:assumption_DFLT,
        survey:assumption_DI,
        survey:assumption_DI%282%29,
        survey:assumption_DOST,
        survey:assumption_DOST%282%29,
        survey:assumption_DR_DH,
        survey:assumption_DSMA,
        survey:assumption_DSMA%282%29,
        survey:assumption_DS_DJ,
        survey:assumption_DYNA,
        survey:assumption_DYNA%282%29,
        survey:assumption_D_X_Z,
        survey:assumption_David,
        survey:assumption_E,
        survey:assumption_E%2B,
        survey:assumption_E-GMP,
        survey:assumption_E-LCV,
        survey:assumption_E-LTF,
        survey:assumption_E-Sports,
        survey:assumption_E0X,
        survey:assumption_E2,
        survey:assumption_E46,
        survey:assumption_E8,
        survey:assumption_EA169,
        survey:assumption_EDISON,
        survey:assumption_EFC,
        survey:assumption_EF_MS,
        survey:assumption_EICHER,
        survey:assumption_EICHER%5B2%5D,
        survey:assumption_EJ,
        survey:assumption_EL,
        survey:assumption_ELF,
        survey:assumption_ELF-M,
        survey:assumption_ELISE,
        survey:assumption_EMA,
        survey:assumption_EMA%282%29,
        survey:assumption_EMP,
        survey:assumption_EMP2,
        survey:assumption_EN53-114_FN145,
        survey:assumption_EP,
        survey:assumption_EP1,
        survey:assumption_EP2,
        survey:assumption_EPA0,
        survey:assumption_EPA0%282%29,
        survey:assumption_EPA1,
        survey:assumption_EPA1%282%29,
        survey:assumption_EPA2,
        survey:assumption_EPA2%282%29,
        survey:assumption_EPSILON,
        survey:assumption_ESSA,
        survey:assumption_EV,
        survey:assumption_EV%282%29,
        survey:assumption_EV%2B,
        survey:assumption_EV1,
        survey:assumption_EV2,
        survey:assumption_EVA2,
        survey:assumption_EVL,
        survey:assumption_EX,
        survey:assumption_E_SERIES,
        survey:assumption_Edward,
        survey:assumption_Edward%282%29,
        survey:assumption_Elemental,
        survey:assumption_Evolution,
        survey:assumption_Extreme,
        survey:assumption_F,
        survey:assumption_F-SERIES,
        survey:assumption_F1,
        survey:assumption_F2,
        survey:assumption_F5,
        survey:assumption_F91,
        survey:assumption_F91%282%29,
        survey:assumption_FD,
        survey:assumption_FD%282%29,
        survey:assumption_FERRARI_FR-L,
        survey:assumption_FERRARI_MR-L,
        survey:assumption_FF,
        survey:assumption_FF%282%29,
        survey:assumption_FL,
        survey:assumption_FLT,
        survey:assumption_FL_S-FR,
        survey:assumption_FM29,
        survey:assumption_FMA,
        survey:assumption_FMA%282%29,
        survey:assumption_FME-A1,
        survey:assumption_FME-A2,
        survey:assumption_FME-A2%282%29,
        survey:assumption_FN74,
        survey:assumption_FOMM,
        survey:assumption_FORLAND,
        survey:assumption_FR,
        survey:assumption_FR-L,
        survey:assumption_FSQ,
        survey:assumption_FX,
        survey:assumption_FY,
        survey:assumption_FZ6102,
        survey:assumption_FlexEVan,
        survey:assumption_Forland2,
        survey:assumption_Forseven,
        survey:assumption_Franklin,
        survey:assumption_G,
        survey:assumption_G%282%29,
        survey:assumption_GA,
        survey:assumption_GA-B,
        survey:assumption_GA-C,
        survey:assumption_GA-C%282%29,
        survey:assumption_GA-D,
        survey:assumption_GA-E,
        survey:assumption_GA-E%282%29,
        survey:assumption_GA-F,
        survey:assumption_GA-K,
        survey:assumption_GA-K%282%29,
        survey:assumption_GA-L,
        survey:assumption_GAMMA,
        survey:assumption_GAZelle_Next,
        survey:assumption_GBC,
        survey:assumption_GBRC,
        survey:assumption_GBRC%282%29,
        survey:assumption_GCV,
        survey:assumption_GEA,
        survey:assumption_GEA%282%29,
        survey:assumption_GEC,
        survey:assumption_GEN_III,
        survey:assumption_GEP,
        survey:assumption_GEP%282%29,
        survey:assumption_GH,
        survey:assumption_GHT1020S,
        survey:assumption_GHT1020S%282%29,
        survey:assumption_GIO,
        survey:assumption_GL,
        survey:assumption_GL-LCV,
        survey:assumption_GL6590_GL6650_GL6700,
        survey:assumption_GLCA,
        survey:assumption_GLOBAL_DELTA_D2XX,
        survey:assumption_GLOBAL_EPSILON_E2XX,
        survey:assumption_GLOBAL_GAMMA_G2XX,
        survey:assumption_GLOBAL_MINI_M2XX,
        survey:assumption_GLTP,
        survey:assumption_GM,
        survey:assumption_GM2900,
        survey:assumption_GM3000,
        survey:assumption_GM4200,
        survey:assumption_GMC,
        survey:assumption_GMT200_201,
        survey:assumption_GMT325_330,
        survey:assumption_GMT355_700,
        survey:assumption_GMT360_370,
        survey:assumption_GMT600,
        survey:assumption_GMT610,
        survey:assumption_GMT800_900,
        survey:assumption_GPMA,
        survey:assumption_GPMA%282%29,
        survey:assumption_GQ,
        survey:assumption_GS,
        survey:assumption_GSC,
        survey:assumption_GSE,
        survey:assumption_GSE%282%29,
        survey:assumption_GSEV,
        survey:assumption_GSEV%282%29,
        survey:assumption_GSP,
        survey:assumption_GSP%282%29,
        survey:assumption_GS_HF,
        survey:assumption_GT,
        survey:assumption_GT%282%29,
        survey:assumption_GTO,
        survey:assumption_GTZ,
        survey:assumption_GV,
        survey:assumption_GV%282%29,
        survey:assumption_GX,
        survey:assumption_GZ6590_GZ6700_GZ6750,
        survey:assumption_Gen7,
        survey:assumption_Giorgio_Giorgio_Global,
        survey:assumption_Global_Alpha_A2XX,
        survey:assumption_Grace,
        survey:assumption_H,
        survey:assumption_H%282%29,
        survey:assumption_H-SERIES,
        survey:assumption_H-SERIES%282%29,
        survey:assumption_H1,
        survey:assumption_H2,
        survey:assumption_HA,
        survey:assumption_HB,
        survey:assumption_HD,
        survey:assumption_HFC1061,
        survey:assumption_HFC1061%282%29,
        survey:assumption_HFC6600_HFC6800,
        survey:assumption_HFC6600_HFC6800%282%29,
        survey:assumption_HHR,
        survey:assumption_HIACE,
        survey:assumption_HK,
        survey:assumption_HM,
        survey:assumption_HMGA,
        survey:assumption_HP,
        survey:assumption_HPA,
        survey:assumption_HPC,
        survey:assumption_HSJ,
        survey:assumption_HSJ%282%29,
        survey:assumption_Higer_PUP,
        survey:assumption_Howard,
        survey:assumption_IGPF,
        survey:assumption_IKP1,
        survey:assumption_IMV,
        survey:assumption_IMV%282%29,
        survey:assumption_INGLO,
        survey:assumption_IS,
        survey:assumption_Ineos,
        survey:assumption_Ineos_EV,
        survey:assumption_J,
        survey:assumption_J1,
        survey:assumption_J100,
        survey:assumption_J25,
        survey:assumption_J2_J3,
        survey:assumption_J97,
        survey:assumption_JEA,
        survey:assumption_JEST,
        survey:assumption_JGM_JGM%282%29,
        survey:assumption_JH,
        survey:assumption_JHC,
        survey:assumption_JHC%282%29,
        survey:assumption_JIEOU,
        survey:assumption_JIEOU%282%29,
        survey:assumption_JK,
        survey:assumption_JK_JL,
        survey:assumption_JLT,
        survey:assumption_JT,
        survey:assumption_K,
        survey:assumption_K-Series,
        survey:assumption_K0,
        survey:assumption_K100_Y100,
        survey:assumption_K100_Y100%282%29,
        survey:assumption_K1_K2-P1,
        survey:assumption_K1_K2-P2,
        survey:assumption_K1_K2-P3,
        survey:assumption_K2XX,
        survey:assumption_K3_K4-P1,
        survey:assumption_K3_K4-P2,
        survey:assumption_K3_K4-P3,
        survey:assumption_KAPPA,
        survey:assumption_KC_SG,
        survey:assumption_KEV,
        survey:assumption_KJ_KK,
        survey:assumption_KM,
        survey:assumption_KM%282%29,
        survey:assumption_KQC2,
        survey:assumption_KZ,
        survey:assumption_Kama,
        survey:assumption_Kunlun,
        survey:assumption_L,
        survey:assumption_L1,
        survey:assumption_L2,
        survey:assumption_L200,
        survey:assumption_L3,
        survey:assumption_L4,
        survey:assumption_L6,
        survey:assumption_L7,
        survey:assumption_LA,
        survey:assumption_LAMBDA,
        survey:assumption_LAMBORGHINI,
        survey:assumption_LB,
        survey:assumption_LC,
        survey:assumption_LCV1,
        survey:assumption_LEVC-TX,
        survey:assumption_LF1030,
        survey:assumption_LFA,
        survey:assumption_LG,
        survey:assumption_LH,
        survey:assumption_LH%282%29,
        survey:assumption_LH1040D,
        survey:assumption_LIEBAO,
        survey:assumption_LJC1040_LJC1041,
        survey:assumption_LK,
        survey:assumption_LS,
        survey:assumption_LSB,
        survey:assumption_LST,
        survey:assumption_LTV,
        survey:assumption_LU,
        survey:assumption_LX,
        survey:assumption_Lada_B,
        survey:assumption_Li,
        survey:assumption_Lingbox,
        survey:assumption_Lingbox%282%29,
        survey:assumption_M,
        survey:assumption_M%282%29,
        survey:assumption_M-M2,
        survey:assumption_M-M2%282%29,
        survey:assumption_M-SERIES,
        survey:assumption_M-Trix%2893%29,
        survey:assumption_M-Trix%2895%29,
        survey:assumption_M0,
        survey:assumption_M1,
        survey:assumption_M100,
        survey:assumption_M1KA,
        survey:assumption_M1X,
        survey:assumption_M1X%282%29,
        survey:assumption_M1_M2,
        survey:assumption_M2,
        survey:assumption_M3,
        survey:assumption_M3X,
        survey:assumption_M3X%282%29,
        survey:assumption_M3_M4,
        survey:assumption_M49_M59,
        survey:assumption_M6,
        survey:assumption_M80,
        survey:assumption_M8X,
        survey:assumption_MA,
        survey:assumption_MAS,
        survey:assumption_MASERATI,
        survey:assumption_MASERATI_Spaceframe,
        survey:assumption_MB,
        survey:assumption_MB.EA,
        survey:assumption_MB100,
        survey:assumption_MC-C,
        survey:assumption_MC-M,
        survey:assumption_MCAR,
        survey:assumption_MCLA,
        survey:assumption_ME,
        survey:assumption_MEB,
        survey:assumption_MEB_entry,
        survey:assumption_MFA,
        survey:assumption_MG,
        survey:assumption_MHA,
        survey:assumption_MI,
        survey:assumption_MIA,
        survey:assumption_MIFA,
        survey:assumption_MIFA%282%29,
        survey:assumption_MIH,
        survey:assumption_MILA,
        survey:assumption_MINICAB,
        survey:assumption_MINI_CUB,
        survey:assumption_MIS,
        survey:assumption_MIS%282%29,
        survey:assumption_MK,
        survey:assumption_MLA,
        survey:assumption_MLB3,
        survey:assumption_MLB_B,
        survey:assumption_MLB_C_D,
        survey:assumption_MMA,
        survey:assumption_MMB,
        survey:assumption_MNB,
        survey:assumption_MODEL_S,
        survey:assumption_MORGAN,
        survey:assumption_MORV,
        survey:assumption_MORV%282%29,
        survey:assumption_MPA0,
        survey:assumption_MPA1,
        survey:assumption_MPA1%282%29,
        survey:assumption_MPA2,
        survey:assumption_MQB_A0,
        survey:assumption_MQB_A_B,
        survey:assumption_MQB_C,
        survey:assumption_MR,
        survey:assumption_MRA_LARGE,
        survey:assumption_MRA_MID-SIZE,
        survey:assumption_MS,
        survey:assumption_MS2000,
        survey:assumption_MSA,
        survey:assumption_MSB,
        survey:assumption_MSP,
        survey:assumption_MUSE,
        survey:assumption_MUV,
        survey:assumption_MV1,
        survey:assumption_Mann,
        survey:assumption_Mengshi,
        survey:assumption_Midsize,
        survey:assumption_Mission_R,
        survey:assumption_Mission_X,
        survey:assumption_Mitsubishi_Z,
        survey:assumption_Modena,
        survey:assumption_Modern,
        survey:assumption_N,
        survey:assumption_N%282%29,
        survey:assumption_N1_N2,
        survey:assumption_N3_N4,
        survey:assumption_N5_N6,
        survey:assumption_N800,
        survey:assumption_N800%282%29,
        survey:assumption_NBC,
        survey:assumption_NBC%282%29,
        survey:assumption_NCV2,
        survey:assumption_NCV3,
        survey:assumption_NCV4,
        survey:assumption_NE_IN_CO_UA,
        survey:assumption_NFA,
        survey:assumption_NF_CM,
        survey:assumption_NGDV,
        survey:assumption_NISSAN_JUNIOR,
        survey:assumption_NJ1041_1061,
        survey:assumption_NK,
        survey:assumption_NL,
        survey:assumption_NPB,
        survey:assumption_NPC,
        survey:assumption_NPD,
        survey:assumption_NPE,
        survey:assumption_NPE%282%29,
        survey:assumption_NPL_PT,
        survey:assumption_NSC,
        survey:assumption_NSX,
        survey:assumption_NU_029N_152N,
        survey:assumption_NV,
        survey:assumption_NV2,
        survey:assumption_NZ,
        survey:assumption_New_Gonow_LT,
        survey:assumption_New_Gonow_LT%282%29,
        survey:assumption_OMEGA_O2XX,
        survey:assumption_ONE_LITRE_CAR,
        survey:assumption_OU%282%29,
        survey:assumption_P-SERIES,
        survey:assumption_P11,
        survey:assumption_P131_P356_P473,
        survey:assumption_P2,
        survey:assumption_P4,
        survey:assumption_P4%282%29,
        survey:assumption_P71,
        survey:assumption_P71%282%29,
        survey:assumption_PAYKAN,
        survey:assumption_PC,
        survey:assumption_PEGASUS,
        survey:assumption_PETUNIA,
        survey:assumption_PF-A,
        survey:assumption_PF-B,
        survey:assumption_PF-B%282%29,
        survey:assumption_PF-C,
        survey:assumption_PF-CD,
        survey:assumption_PF-D,
        survey:assumption_PF1,
        survey:assumption_PF2,
        survey:assumption_PF3,
        survey:assumption_PF7_PF7E,
        survey:assumption_PFE,
        survey:assumption_PHOENIX,
        survey:assumption_PK5,
        survey:assumption_PK5%282%29,
        survey:assumption_PL22,
        survey:assumption_PL45,
        survey:assumption_PL56,
        survey:assumption_PL62,
        survey:assumption_PL71-72,
        survey:assumption_PLA-D6a,
        survey:assumption_PLA-D7a,
        survey:assumption_PLA-D7e,
        survey:assumption_PLA-D7u,
        survey:assumption_PL_PQ46-47,
        survey:assumption_PMC1,
        survey:assumption_PN105-106,
        survey:assumption_PN96_T1,
        survey:assumption_PPE,
        survey:assumption_PQ12,
        survey:assumption_PQ22,
        survey:assumption_PQ23,
        survey:assumption_PQ24,
        survey:assumption_PQ25_26,
        survey:assumption_PQ33,
        survey:assumption_PQ34,
        survey:assumption_PQ35,
        survey:assumption_PQ75,
        survey:assumption_PQ_SD_ASD,
        survey:assumption_PR3,
        survey:assumption_PREMIUM,
        survey:assumption_PROCEED,
        survey:assumption_PROJECT_ONE,
        survey:assumption_PS,
        survey:assumption_PS-10,
        survey:assumption_PU,
        survey:assumption_Phevos,
        survey:assumption_Phoenix,
        survey:assumption_Project_V,
        survey:assumption_Q,
        survey:assumption_Q-SERIES,
        survey:assumption_QILING_1041,
        survey:assumption_QL6500,
        survey:assumption_R,
        survey:assumption_R-R_Spaceframe,
        survey:assumption_R07,
        survey:assumption_R1,
        survey:assumption_R3_HHR,
        survey:assumption_R40,
        survey:assumption_RCV,
        survey:assumption_REF,
        survey:assumption_REVA,
        survey:assumption_ROLLS_ROYCE,
        survey:assumption_ROSA,
        survey:assumption_RPU,
        survey:assumption_RR01,
        survey:assumption_RS_RT,
        survey:assumption_RS_UK,
        survey:assumption_RU,
        survey:assumption_Rich,
        survey:assumption_S,
        survey:assumption_S-330N,
        survey:assumption_S-375N_635N,
        survey:assumption_S-B0,
        survey:assumption_S-C,
        survey:assumption_S-CD1-3,
        survey:assumption_S-CMF-A,
        survey:assumption_S-CMF-B,
        survey:assumption_S-CS,
        survey:assumption_S-EF_MS,
        survey:assumption_S-FR,
        survey:assumption_S-FR%282%29,
        survey:assumption_S-GS,
        survey:assumption_S-GV,
        survey:assumption_S-GV%282%29,
        survey:assumption_S-G_M,
        survey:assumption_S-HP,
        survey:assumption_S-J,
        survey:assumption_S-J100,
        survey:assumption_S-J25,
        survey:assumption_S-J55,
        survey:assumption_S-M100,
        survey:assumption_S-MC_M,
        survey:assumption_S-MG,
        survey:assumption_S-N,
        survey:assumption_S-NE_IN_CO_UA,
        survey:assumption_S-NU_029N_152N,
        survey:assumption_S-NU_029N_152N%282%29,
        survey:assumption_S-PF3,
        survey:assumption_S-Q,
        survey:assumption_S-R40,
        survey:assumption_S-SERIES,
        survey:assumption_S-TC_TY,
        survey:assumption_S-TC_TY%282%29,
        survey:assumption_S-TYPE_E,
        survey:assumption_S-U204,
        survey:assumption_S-UCR145,
        survey:assumption_S-UCR145%282%29,
        survey:assumption_S-XJ,
        survey:assumption_S-Z,
        survey:assumption_S1,
        survey:assumption_S161,
        survey:assumption_S161%282%29,
        survey:assumption_S2,
        survey:assumption_S2-E,
        survey:assumption_S2-E%282%29,
        survey:assumption_S2000,
        survey:assumption_S2000%282%29,
        survey:assumption_S3,
        survey:assumption_S3%282%29,
        survey:assumption_S5X-1,
        survey:assumption_S5X-1%282%29,
        survey:assumption_S5X-2,
        survey:assumption_S6,
        survey:assumption_SA,
        survey:assumption_SC,
        survey:assumption_SC1021_1040,
        survey:assumption_SC6601_6608,
        survey:assumption_SCM,
        survey:assumption_SD,
        survey:assumption_SD%282%29,
        survey:assumption_SE-LT,
        survey:assumption_SEA1,
        survey:assumption_SEA1%282%29,
        survey:assumption_SEA2,
        survey:assumption_SEA2%282%29,
        survey:assumption_SEA3,
        survey:assumption_SEA3%282%29,
        survey:assumption_SF,
        survey:assumption_SF%282%29,
        survey:assumption_SGP,
        survey:assumption_SGP%282%29,
        survey:assumption_SGP-E,
        survey:assumption_SI,
        survey:assumption_SI%282%29,
        survey:assumption_SIGMA,
        survey:assumption_SIGMA%282%29,
        survey:assumption_SKYACTIV_B,
        survey:assumption_SKYACTIV_C_D,
        survey:assumption_SKYACTIV_C_D%282%29,
        survey:assumption_SKYACTIV_EV,
        survey:assumption_SKYACTIV_FR,
        survey:assumption_SKYACTIV_R,
        survey:assumption_SL,
        survey:assumption_SLB,
        survey:assumption_SMA,
        survey:assumption_SNJ,
        survey:assumption_SNJ%282%29,
        survey:assumption_SOA,
        survey:assumption_SOA%282%29,
        survey:assumption_SP0,
        survey:assumption_SP1,
        survey:assumption_SPA,
        survey:assumption_SPA3,
        survey:assumption_SPU,
        survey:assumption_SR,
        survey:assumption_SS,
        survey:assumption_SS%282%29,
        survey:assumption_SSA,
        survey:assumption_SSM,
        survey:assumption_SSP_A_B,
        survey:assumption_SSP_B_C,
        survey:assumption_SSP_D,
        survey:assumption_ST,
        survey:assumption_STD,
        survey:assumption_STLA_City,
        survey:assumption_STLA_Frame,
        survey:assumption_STLA_Large,
        survey:assumption_STLA_Medium,
        survey:assumption_STLA_Small,
        survey:assumption_STLA_Van,
        survey:assumption_STREETSCOOTER,
        survey:assumption_SUPER_7,
        survey:assumption_SUV,
        survey:assumption_SV5,
        survey:assumption_SV6,
        survey:assumption_SV7,
        survey:assumption_SWB,
        survey:assumption_SWM-M,
        survey:assumption_SXK,
        survey:assumption_SXZ6440_SXZ6481,
        survey:assumption_SXZ6440_SXZ6481%282%29,
        survey:assumption_SY,
        survey:assumption_SY%282%29,
        survey:assumption_SY1023-26-28,
        survey:assumption_SY1027_SY5021,
        survey:assumption_Shaolin,
        survey:assumption_Skywell,
        survey:assumption_Slate,
        survey:assumption_Small_SUSW,
        survey:assumption_T,
        survey:assumption_T-CAR,
        survey:assumption_T-SERIES,
        survey:assumption_T-SERIES%282%29,
        survey:assumption_T1,
        survey:assumption_T1%282%29,
        survey:assumption_T100,
        survey:assumption_T1N,
        survey:assumption_T1XX,
        survey:assumption_T2,
        survey:assumption_T25,
        survey:assumption_T25%282%29,
        survey:assumption_T2N,
        survey:assumption_T3,
        survey:assumption_T4,
        survey:assumption_T5,
        survey:assumption_T6,
        survey:assumption_TC_TY,
        survey:assumption_TC_TY%282%29,
        survey:assumption_TE1,
        survey:assumption_THETA_TE,
        survey:assumption_TM,
        survey:assumption_TMA,
        survey:assumption_TMB,
        survey:assumption_TOGG,
        survey:assumption_TQ,
        survey:assumption_TR40,
        survey:assumption_TRAX,
        survey:assumption_TRAX%282%29,
        survey:assumption_TRUMP,
        survey:assumption_TRUMP%282%29,
        survey:assumption_TX1,
        survey:assumption_TYPE_169,
        survey:assumption_TYPE_188,
        survey:assumption_TYPE_199,
        survey:assumption_TYPE_2_3,
        survey:assumption_TYPE_2_3-C,
        survey:assumption_TYPE_A,
        survey:assumption_TYPE_B,
        survey:assumption_TYPE_E,
        survey:assumption_U,
        survey:assumption_U%2B,
        survey:assumption_U%2B%282%29,
        survey:assumption_U-IMV,
        survey:assumption_U-IMV%282%29,
        survey:assumption_U152_U251,
        survey:assumption_U204,
        survey:assumption_U300,
        survey:assumption_U452,
        survey:assumption_U469,
        survey:assumption_UCR145,
        survey:assumption_UCR145%282%29,
        survey:assumption_UF0,
        survey:assumption_UH,
        survey:assumption_UNIMOG,
        survey:assumption_UNIMOG%282%29,
        survey:assumption_UPP,
        survey:assumption_UT,
        survey:assumption_UZ,
        survey:assumption_U_V,
        survey:assumption_V,
        survey:assumption_V100_V200,
        survey:assumption_V3,
        survey:assumption_V4,
        survey:assumption_V6,
        survey:assumption_VAN,
        survey:assumption_VAN.EA_CA,
        survey:assumption_VC,
        survey:assumption_VD,
        survey:assumption_VE1,
        survey:assumption_VE83,
        survey:assumption_VH,
        survey:assumption_VH5,
        survey:assumption_VITO,
        survey:assumption_VMG-A_B,
        survey:assumption_VMG-C_D,
        survey:assumption_VN127,
        survey:assumption_VSA-L,
        survey:assumption_VSS-F_B_C,
        survey:assumption_VSS-F_D_E,
        survey:assumption_VVA,
        survey:assumption_W,
        survey:assumption_W%282%29,
        survey:assumption_W126,
        survey:assumption_W140,
        survey:assumption_W164_V251_W166,
        survey:assumption_W169,
        survey:assumption_W203,
        survey:assumption_W204,
        survey:assumption_W211,
        survey:assumption_W212,
        survey:assumption_W212%282%29,
        survey:assumption_W220,
        survey:assumption_W221,
        survey:assumption_W222,
        survey:assumption_W461,
        survey:assumption_WEV,
        survey:assumption_WK_WK2,
        survey:assumption_WL-EV,
        survey:assumption_WL-LCV,
        survey:assumption_WMV,
        survey:assumption_WORLD_A,
        survey:assumption_WP,
        survey:assumption_WP%282%29,
        survey:assumption_WQ,
        survey:assumption_WQ%282%29,
        survey:assumption_WS1160,
        survey:assumption_WT,
        survey:assumption_WX-LT,
        survey:assumption_Whale,
        survey:assumption_X,
        survey:assumption_X%282%29,
        survey:assumption_X-PF,
        survey:assumption_X06,
        survey:assumption_X100,
        survey:assumption_X2,
        survey:assumption_X200,
        survey:assumption_X24,
        survey:assumption_X250,
        survey:assumption_X3,
        survey:assumption_X6,
        survey:assumption_X61B,
        survey:assumption_X62,
        survey:assumption_X64,
        survey:assumption_X65,
        survey:assumption_X70,
        survey:assumption_X83,
        survey:assumption_XGA,
        survey:assumption_XJS_X100,
        survey:assumption_XL_BN,
        survey:assumption_XMQ6520,
        survey:assumption_XMQ6520%282%29,
        survey:assumption_XP,
        survey:assumption_X_X2,
        survey:assumption_Xiaoyao,
        survey:assumption_Y-CAR_Y1XX,
        survey:assumption_Y60,
        survey:assumption_Y62,
        survey:assumption_YD,
        survey:assumption_YF_YJ,
        survey:assumption_YG,
        survey:assumption_YM,
        survey:assumption_YMB,
        survey:assumption_YN,
        survey:assumption_YR,
        survey:assumption_YT4,
        survey:assumption_YTQ,
        survey:assumption_YW,
        survey:assumption_YX,
        survey:assumption_YX%282%29,
        survey:assumption_Z0,
        survey:assumption_Z1,
        survey:assumption_Z3,
        survey:assumption_Z6,
        survey:assumption_ZB,
        survey:assumption_ZERV,
        survey:assumption_ZETA,
        survey:assumption_ZK,
        survey:assumption_ZK%282%29,
        survey:assumption_ZL,
        survey:assumption_ZTZ,
        survey:assumption_ZZ,
        survey:assumption_Zoox_1,
        survey:assumption_e-GSP,
        survey:assumption_e-HA,
        survey:assumption_eK,
        survey:assumption_eLCV,
        survey:assumption_eM,
        survey:assumption_eS,
        survey:assumption_miniEV ;
    survey:methodologyDescription "Vehicle platform classification based on documented assumptions and industry knowledge" .

survey:CurrentRegionalDemand_OEM a survey:CurrentRegionalDemand ;
    survey:hasRegionalDemand survey:CurrentDemand_OEM_Americas,
        survey:CurrentDemand_OEM_Asia_Pacific_China,
        survey:CurrentDemand_OEM_Asia_Pacific_Other,
        survey:CurrentDemand_OEM_Europe,
        survey:CurrentDemand_OEM_Japan .

survey:CurrentRegionalDemand_Semiconductor a survey:CurrentRegionalDemand ;
    survey:hasRegionalDemand survey:CurrentDemand_Semiconductor_Americas,
        survey:CurrentDemand_Semiconductor_Asia_Pacific_China,
        survey:CurrentDemand_Semiconductor_Asia_Pacific_Other,
        survey:CurrentDemand_Semiconductor_Europe,
        survey:CurrentDemand_Semiconductor_Japan .

survey:CurrentRegionalDemand_Tier1 a survey:CurrentRegionalDemand ;
    survey:hasRegionalDemand survey:CurrentDemand_Tier1_Americas,
        survey:CurrentDemand_Tier1_Asia_Pacific_China,
        survey:CurrentDemand_Tier1_Asia_Pacific_Other,
        survey:CurrentDemand_Tier1_Europe,
        survey:CurrentDemand_Tier1_Japan .

survey:FutureDemand_OEM_Americas_current_quarter_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_current_quarter ;
    survey:totalDemandPercentageChange 20.6 .

survey:FutureDemand_OEM_Americas_q1_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q1_2027 ;
    survey:totalDemandPercentageChange 19.86 .

survey:FutureDemand_OEM_Americas_q2_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q2_2026 ;
    survey:totalDemandPercentageChange 17.61 .

survey:FutureDemand_OEM_Americas_q2_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q2_2027 ;
    survey:totalDemandPercentageChange 34.45 .

survey:FutureDemand_OEM_Americas_q3_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q3_2026 ;
    survey:totalDemandPercentageChange 33.2 .

survey:FutureDemand_OEM_Americas_q3_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q3_2027 ;
    survey:totalDemandPercentageChange 24.51 .

survey:FutureDemand_OEM_Americas_q4_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q4_2026 ;
    survey:totalDemandPercentageChange 36.77 .

survey:FutureDemand_OEM_Americas_q4_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q4_2027 ;
    survey:totalDemandPercentageChange 14.39 .

survey:FutureDemand_OEM_Asia_Pacific_China_current_quarter_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_current_quarter ;
    survey:totalDemandPercentageChange 36.29 .

survey:FutureDemand_OEM_Asia_Pacific_China_q1_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q1_2027 ;
    survey:totalDemandPercentageChange 35.06 .

survey:FutureDemand_OEM_Asia_Pacific_China_q2_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q2_2026 ;
    survey:totalDemandPercentageChange 38.61 .

survey:FutureDemand_OEM_Asia_Pacific_China_q2_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q2_2027 ;
    survey:totalDemandPercentageChange 34.03 .

survey:FutureDemand_OEM_Asia_Pacific_China_q3_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q3_2026 ;
    survey:totalDemandPercentageChange 29.28 .

survey:FutureDemand_OEM_Asia_Pacific_China_q3_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q3_2027 ;
    survey:totalDemandPercentageChange 33.12 .

survey:FutureDemand_OEM_Asia_Pacific_China_q4_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q4_2026 ;
    survey:totalDemandPercentageChange 13.31 .

survey:FutureDemand_OEM_Asia_Pacific_China_q4_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q4_2027 ;
    survey:totalDemandPercentageChange 14.89 .

survey:FutureDemand_OEM_Asia_Pacific_Other_current_quarter_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_current_quarter ;
    survey:totalDemandPercentageChange 20.74 .

survey:FutureDemand_OEM_Asia_Pacific_Other_q1_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q1_2027 ;
    survey:totalDemandPercentageChange 12.1 .

survey:FutureDemand_OEM_Asia_Pacific_Other_q2_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q2_2026 ;
    survey:totalDemandPercentageChange 39.39 .

survey:FutureDemand_OEM_Asia_Pacific_Other_q2_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q2_2027 ;
    survey:totalDemandPercentageChange 17.79 .

survey:FutureDemand_OEM_Asia_Pacific_Other_q3_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q3_2026 ;
    survey:totalDemandPercentageChange 33.92 .

survey:FutureDemand_OEM_Asia_Pacific_Other_q3_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q3_2027 ;
    survey:totalDemandPercentageChange 34.96 .

survey:FutureDemand_OEM_Asia_Pacific_Other_q4_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q4_2026 ;
    survey:totalDemandPercentageChange 39.39 .

survey:FutureDemand_OEM_Asia_Pacific_Other_q4_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q4_2027 ;
    survey:totalDemandPercentageChange 36.13 .

survey:FutureDemand_OEM_Europe_current_quarter_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_current_quarter ;
    survey:totalDemandPercentageChange 32.83 .

survey:FutureDemand_OEM_Europe_q1_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q1_2027 ;
    survey:totalDemandPercentageChange 28.45 .

survey:FutureDemand_OEM_Europe_q2_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q2_2026 ;
    survey:totalDemandPercentageChange 17.53 .

survey:FutureDemand_OEM_Europe_q2_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q2_2027 ;
    survey:totalDemandPercentageChange 17.86 .

survey:FutureDemand_OEM_Europe_q3_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q3_2026 ;
    survey:totalDemandPercentageChange 26.32 .

survey:FutureDemand_OEM_Europe_q3_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q3_2027 ;
    survey:totalDemandPercentageChange 31.74 .

survey:FutureDemand_OEM_Europe_q4_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q4_2026 ;
    survey:totalDemandPercentageChange 33.01 .

survey:FutureDemand_OEM_Europe_q4_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q4_2027 ;
    survey:totalDemandPercentageChange 30.19 .

survey:FutureDemand_OEM_Japan_current_quarter_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_current_quarter ;
    survey:totalDemandPercentageChange 38.84 .

survey:FutureDemand_OEM_Japan_q1_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q1_2027 ;
    survey:totalDemandPercentageChange 39.94 .

survey:FutureDemand_OEM_Japan_q2_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q2_2026 ;
    survey:totalDemandPercentageChange 34.57 .

survey:FutureDemand_OEM_Japan_q2_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q2_2027 ;
    survey:totalDemandPercentageChange 30.99 .

survey:FutureDemand_OEM_Japan_q3_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q3_2026 ;
    survey:totalDemandPercentageChange 37.07 .

survey:FutureDemand_OEM_Japan_q3_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q3_2027 ;
    survey:totalDemandPercentageChange 36.02 .

survey:FutureDemand_OEM_Japan_q4_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q4_2026 ;
    survey:totalDemandPercentageChange 36.72 .

survey:FutureDemand_OEM_Japan_q4_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q4_2027 ;
    survey:totalDemandPercentageChange 26.74 .

survey:FutureDemand_Semiconductor_Americas_current_quarter_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_current_quarter ;
    survey:totalDemandPercentageChange 16.78 .

survey:FutureDemand_Semiconductor_Americas_q1_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q1_2027 ;
    survey:totalDemandPercentageChange 12.73 .

survey:FutureDemand_Semiconductor_Americas_q2_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q2_2026 ;
    survey:totalDemandPercentageChange 50.89 .

survey:FutureDemand_Semiconductor_Americas_q2_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q2_2027 ;
    survey:totalDemandPercentageChange 42.96 .

survey:FutureDemand_Semiconductor_Americas_q3_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q3_2026 ;
    survey:totalDemandPercentageChange 17.39 .

survey:FutureDemand_Semiconductor_Americas_q3_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q3_2027 ;
    survey:totalDemandPercentageChange 9.76 .

survey:FutureDemand_Semiconductor_Americas_q4_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q4_2026 ;
    survey:totalDemandPercentageChange 17.77 .

survey:FutureDemand_Semiconductor_Americas_q4_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q4_2027 ;
    survey:totalDemandPercentageChange 5.93 .

survey:FutureDemand_Semiconductor_Asia_Pacific_China_current_quarter_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_current_quarter ;
    survey:totalDemandPercentageChange 9.06 .

survey:FutureDemand_Semiconductor_Asia_Pacific_China_q1_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q1_2027 ;
    survey:totalDemandPercentageChange 23.59 .

survey:FutureDemand_Semiconductor_Asia_Pacific_China_q2_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q2_2026 ;
    survey:totalDemandPercentageChange 25.16 .

survey:FutureDemand_Semiconductor_Asia_Pacific_China_q2_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q2_2027 ;
    survey:totalDemandPercentageChange 31.22 .

survey:FutureDemand_Semiconductor_Asia_Pacific_China_q3_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q3_2026 ;
    survey:totalDemandPercentageChange 5.85 .

survey:FutureDemand_Semiconductor_Asia_Pacific_China_q3_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q3_2027 ;
    survey:totalDemandPercentageChange -1.15 .

survey:FutureDemand_Semiconductor_Asia_Pacific_China_q4_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q4_2026 ;
    survey:totalDemandPercentageChange 6.6 .

survey:FutureDemand_Semiconductor_Asia_Pacific_China_q4_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q4_2027 ;
    survey:totalDemandPercentageChange -0.0 .

survey:FutureDemand_Semiconductor_Asia_Pacific_Other_current_quarter_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_current_quarter ;
    survey:totalDemandPercentageChange 18.22 .

survey:FutureDemand_Semiconductor_Asia_Pacific_Other_q1_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q1_2027 ;
    survey:totalDemandPercentageChange 23.0 .

survey:FutureDemand_Semiconductor_Asia_Pacific_Other_q2_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q2_2026 ;
    survey:totalDemandPercentageChange 35.75 .

survey:FutureDemand_Semiconductor_Asia_Pacific_Other_q2_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q2_2027 ;
    survey:totalDemandPercentageChange 15.5 .

survey:FutureDemand_Semiconductor_Asia_Pacific_Other_q3_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q3_2026 ;
    survey:totalDemandPercentageChange 18.39 .

survey:FutureDemand_Semiconductor_Asia_Pacific_Other_q3_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q3_2027 ;
    survey:totalDemandPercentageChange 17.32 .

survey:FutureDemand_Semiconductor_Asia_Pacific_Other_q4_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q4_2026 ;
    survey:totalDemandPercentageChange 42.86 .

survey:FutureDemand_Semiconductor_Asia_Pacific_Other_q4_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q4_2027 ;
    survey:totalDemandPercentageChange 9.84 .

survey:FutureDemand_Semiconductor_Europe_current_quarter_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_current_quarter ;
    survey:totalDemandPercentageChange 17.5 .

survey:FutureDemand_Semiconductor_Europe_q1_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q1_2027 ;
    survey:totalDemandPercentageChange 22.98 .

survey:FutureDemand_Semiconductor_Europe_q2_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q2_2026 ;
    survey:totalDemandPercentageChange 9.51 .

survey:FutureDemand_Semiconductor_Europe_q2_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q2_2027 ;
    survey:totalDemandPercentageChange 5.79 .

survey:FutureDemand_Semiconductor_Europe_q3_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q3_2026 ;
    survey:totalDemandPercentageChange 3.59 .

survey:FutureDemand_Semiconductor_Europe_q3_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q3_2027 ;
    survey:totalDemandPercentageChange 6.44 .

survey:FutureDemand_Semiconductor_Europe_q4_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q4_2026 ;
    survey:totalDemandPercentageChange 4.67 .

survey:FutureDemand_Semiconductor_Europe_q4_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q4_2027 ;
    survey:totalDemandPercentageChange 5.59 .

survey:FutureDemand_Semiconductor_Japan_current_quarter_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_current_quarter ;
    survey:totalDemandPercentageChange 16.26 .

survey:FutureDemand_Semiconductor_Japan_q1_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q1_2027 ;
    survey:totalDemandPercentageChange 4.82 .

survey:FutureDemand_Semiconductor_Japan_q2_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q2_2026 ;
    survey:totalDemandPercentageChange 10.39 .

survey:FutureDemand_Semiconductor_Japan_q2_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q2_2027 ;
    survey:totalDemandPercentageChange 10.0 .

survey:FutureDemand_Semiconductor_Japan_q3_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q3_2026 ;
    survey:totalDemandPercentageChange 18.84 .

survey:FutureDemand_Semiconductor_Japan_q3_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q3_2027 ;
    survey:totalDemandPercentageChange 6.47 .

survey:FutureDemand_Semiconductor_Japan_q4_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q4_2026 ;
    survey:totalDemandPercentageChange 7.41 .

survey:FutureDemand_Semiconductor_Japan_q4_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q4_2027 ;
    survey:totalDemandPercentageChange 11.67 .

survey:FutureDemand_Tier1_Americas_current_quarter_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_current_quarter ;
    survey:totalDemandPercentageChange 18.25 .

survey:FutureDemand_Tier1_Americas_q1_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q1_2027 ;
    survey:totalDemandPercentageChange 20.84 .

survey:FutureDemand_Tier1_Americas_q2_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q2_2026 ;
    survey:totalDemandPercentageChange 23.97 .

survey:FutureDemand_Tier1_Americas_q2_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q2_2027 ;
    survey:totalDemandPercentageChange 31.64 .

survey:FutureDemand_Tier1_Americas_q3_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q3_2026 ;
    survey:totalDemandPercentageChange 27.31 .

survey:FutureDemand_Tier1_Americas_q3_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q3_2027 ;
    survey:totalDemandPercentageChange 13.81 .

survey:FutureDemand_Tier1_Americas_q4_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q4_2026 ;
    survey:totalDemandPercentageChange 24.22 .

survey:FutureDemand_Tier1_Americas_q4_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:quarter survey:Quarter_q4_2027 ;
    survey:totalDemandPercentageChange 33.2 .

survey:FutureDemand_Tier1_Asia_Pacific_China_current_quarter_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_current_quarter ;
    survey:totalDemandPercentageChange 35.65 .

survey:FutureDemand_Tier1_Asia_Pacific_China_q1_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q1_2027 ;
    survey:totalDemandPercentageChange 14.92 .

survey:FutureDemand_Tier1_Asia_Pacific_China_q2_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q2_2026 ;
    survey:totalDemandPercentageChange 11.24 .

survey:FutureDemand_Tier1_Asia_Pacific_China_q2_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q2_2027 ;
    survey:totalDemandPercentageChange 30.33 .

survey:FutureDemand_Tier1_Asia_Pacific_China_q3_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q3_2026 ;
    survey:totalDemandPercentageChange 26.72 .

survey:FutureDemand_Tier1_Asia_Pacific_China_q3_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q3_2027 ;
    survey:totalDemandPercentageChange 39.83 .

survey:FutureDemand_Tier1_Asia_Pacific_China_q4_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q4_2026 ;
    survey:totalDemandPercentageChange 15.14 .

survey:FutureDemand_Tier1_Asia_Pacific_China_q4_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:quarter survey:Quarter_q4_2027 ;
    survey:totalDemandPercentageChange 24.88 .

survey:FutureDemand_Tier1_Asia_Pacific_Other_current_quarter_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_current_quarter ;
    survey:totalDemandPercentageChange 31.27 .

survey:FutureDemand_Tier1_Asia_Pacific_Other_q1_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q1_2027 ;
    survey:totalDemandPercentageChange 26.09 .

survey:FutureDemand_Tier1_Asia_Pacific_Other_q2_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q2_2026 ;
    survey:totalDemandPercentageChange 39.24 .

survey:FutureDemand_Tier1_Asia_Pacific_Other_q2_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q2_2027 ;
    survey:totalDemandPercentageChange 38.5 .

survey:FutureDemand_Tier1_Asia_Pacific_Other_q3_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q3_2026 ;
    survey:totalDemandPercentageChange 18.54 .

survey:FutureDemand_Tier1_Asia_Pacific_Other_q3_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q3_2027 ;
    survey:totalDemandPercentageChange 37.05 .

survey:FutureDemand_Tier1_Asia_Pacific_Other_q4_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q4_2026 ;
    survey:totalDemandPercentageChange 11.58 .

survey:FutureDemand_Tier1_Asia_Pacific_Other_q4_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:quarter survey:Quarter_q4_2027 ;
    survey:totalDemandPercentageChange 17.35 .

survey:FutureDemand_Tier1_Europe_current_quarter_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_current_quarter ;
    survey:totalDemandPercentageChange 13.99 .

survey:FutureDemand_Tier1_Europe_q1_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q1_2027 ;
    survey:totalDemandPercentageChange 36.61 .

survey:FutureDemand_Tier1_Europe_q2_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q2_2026 ;
    survey:totalDemandPercentageChange 32.17 .

survey:FutureDemand_Tier1_Europe_q2_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q2_2027 ;
    survey:totalDemandPercentageChange 35.87 .

survey:FutureDemand_Tier1_Europe_q3_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q3_2026 ;
    survey:totalDemandPercentageChange 16.86 .

survey:FutureDemand_Tier1_Europe_q3_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q3_2027 ;
    survey:totalDemandPercentageChange 30.67 .

survey:FutureDemand_Tier1_Europe_q4_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q4_2026 ;
    survey:totalDemandPercentageChange 19.32 .

survey:FutureDemand_Tier1_Europe_q4_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:quarter survey:Quarter_q4_2027 ;
    survey:totalDemandPercentageChange 30.44 .

survey:FutureDemand_Tier1_Japan_current_quarter_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_current_quarter ;
    survey:totalDemandPercentageChange 14.69 .

survey:FutureDemand_Tier1_Japan_q1_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q1_2027 ;
    survey:totalDemandPercentageChange 26.75 .

survey:FutureDemand_Tier1_Japan_q2_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q2_2026 ;
    survey:totalDemandPercentageChange 16.56 .

survey:FutureDemand_Tier1_Japan_q2_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q2_2027 ;
    survey:totalDemandPercentageChange 38.41 .

survey:FutureDemand_Tier1_Japan_q3_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q3_2026 ;
    survey:totalDemandPercentageChange 12.52 .

survey:FutureDemand_Tier1_Japan_q3_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q3_2027 ;
    survey:totalDemandPercentageChange 31.08 .

survey:FutureDemand_Tier1_Japan_q4_2026_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q4_2026 ;
    survey:totalDemandPercentageChange 33.7 .

survey:FutureDemand_Tier1_Japan_q4_2027_Entry a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:quarter survey:Quarter_q4_2027 ;
    survey:totalDemandPercentageChange 24.42 .

survey:FutureRegionalDemand_OEM a survey:FutureRegionalDemand .

survey:FutureRegionalDemand_Semiconductor a survey:FutureRegionalDemand .

survey:FutureRegionalDemand_Tier1 a survey:FutureRegionalDemand .

survey:OEMCurrentDemand a survey:CurrentDemandAnalysis ;
    survey:hasAggregatedResult survey:OEMCurrentDemand_BEHV,
        survey:OEMCurrentDemand_BEV,
        survey:OEMCurrentDemand_ICE ;
    survey:hasSurveyOrigin survey:OEM_Survey .

survey:OEMFutureDemand_Option1 a survey:FutureDemandAnalysis ;
    survey:hasAggregatedResult survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Current_Quarter,
        survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Q1_2026,
        survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Q1_2027,
        survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Q2_2026,
        survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Q2_2027,
        survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Q3_2026,
        survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Q3_2027,
        survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Q4_2026,
        survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Current_Quarter,
        survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Q1_2026,
        survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Q1_2027,
        survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Q2_2026,
        survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Q2_2027,
        survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Q3_2026,
        survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Q3_2027,
        survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Q4_2026,
        survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Current_Quarter,
        survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Q1_2026,
        survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Q1_2027,
        survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Q2_2026,
        survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Q2_2027,
        survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Q3_2026,
        survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Q3_2027,
        survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Q4_2026 ;
    survey:hasSurveyOrigin survey:OEM_Survey .

survey:OEMFutureDemand_Option2 a survey:FutureDemandAnalysis ;
    survey:hasAggregatedResult survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Current_Quarter,
        survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Q1_2026,
        survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Q1_2027,
        survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Q2_2026,
        survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Q2_2027,
        survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Q3_2026,
        survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Q3_2027,
        survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Q4_2026,
        survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Current_Quarter,
        survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Q1_2026,
        survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Q1_2027,
        survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Q2_2026,
        survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Q2_2027,
        survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Q3_2026,
        survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Q3_2027,
        survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Q4_2026,
        survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Current_Quarter,
        survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Q1_2026,
        survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Q1_2027,
        survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Q2_2026,
        survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Q2_2027,
        survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Q3_2026,
        survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Q3_2027,
        survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Q4_2026 ;
    survey:hasSurveyOrigin survey:OEM_Survey .

survey:OEMFutureDemand_Option3 a survey:FutureDemandAnalysis ;
    survey:hasAggregatedResult survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Current_Quarter,
        survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Q1_2026,
        survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Q1_2027,
        survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Q2_2026,
        survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Q2_2027,
        survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Q3_2026,
        survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Q3_2027,
        survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Q4_2026,
        survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Current_Quarter,
        survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Q1_2026,
        survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Q1_2027,
        survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Q2_2026,
        survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Q2_2027,
        survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Q3_2026,
        survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Q3_2027,
        survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Q4_2026,
        survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Current_Quarter,
        survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Q1_2026,
        survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Q1_2027,
        survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Q2_2026,
        survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Q2_2027,
        survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Q3_2026,
        survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Q3_2027,
        survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Q4_2026 ;
    survey:hasSurveyOrigin survey:OEM_Survey .

survey:OrderCancellation_Aggregated_%3C%3D_7nm_Decrease a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_lt%3D_7nm ;
    survey:hasResponseType survey:Decrease ;
    survey:participantCount 0.0 .

survey:OrderCancellation_Aggregated_%3C%3D_7nm_Increase a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_lt%3D_7nm ;
    survey:hasResponseType survey:Increase ;
    survey:participantCount 1.0 .

survey:OrderCancellation_Aggregated_%3C%3D_7nm_SUM a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_lt%3D_7nm ;
    survey:hasResponseType survey:Sum ;
    survey:participantCount 1.0 .

survey:OrderCancellation_Aggregated_%3C%3D_7nm_Stable a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_lt%3D_7nm ;
    survey:hasResponseType survey:Stable ;
    survey:participantCount 0.0 .

survey:OrderCancellation_Aggregated_10nm_to_%3C28nm_Decrease a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_10nm_to_lt28nm ;
    survey:hasResponseType survey:Decrease ;
    survey:participantCount 1.0 .

survey:OrderCancellation_Aggregated_10nm_to_%3C28nm_Increase a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_10nm_to_lt28nm ;
    survey:hasResponseType survey:Increase ;
    survey:participantCount 0.0 .

survey:OrderCancellation_Aggregated_10nm_to_%3C28nm_SUM a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_10nm_to_lt28nm ;
    survey:hasResponseType survey:Sum ;
    survey:participantCount 1.0 .

survey:OrderCancellation_Aggregated_10nm_to_%3C28nm_Stable a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_10nm_to_lt28nm ;
    survey:hasResponseType survey:Stable ;
    survey:participantCount 0.0 .

survey:OrderCancellation_Aggregated_180nm_or_greater_Decrease a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_180nm_or_greater ;
    survey:hasResponseType survey:Decrease ;
    survey:participantCount 1.0 .

survey:OrderCancellation_Aggregated_180nm_or_greater_Increase a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_180nm_or_greater ;
    survey:hasResponseType survey:Increase ;
    survey:participantCount 0.0 .

survey:OrderCancellation_Aggregated_180nm_or_greater_SUM a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_180nm_or_greater ;
    survey:hasResponseType survey:Sum ;
    survey:participantCount 1.0 .

survey:OrderCancellation_Aggregated_180nm_or_greater_Stable a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_180nm_or_greater ;
    survey:hasResponseType survey:Stable ;
    survey:participantCount 0.0 .

survey:OrderCancellation_Aggregated_28nm_to_%3C45nm_Decrease a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_28nm_to_lt45nm ;
    survey:hasResponseType survey:Decrease ;
    survey:participantCount 0.0 .

survey:OrderCancellation_Aggregated_28nm_to_%3C45nm_Increase a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_28nm_to_lt45nm ;
    survey:hasResponseType survey:Increase ;
    survey:participantCount 1.0 .

survey:OrderCancellation_Aggregated_28nm_to_%3C45nm_SUM a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_28nm_to_lt45nm ;
    survey:hasResponseType survey:Sum ;
    survey:participantCount 1.0 .

survey:OrderCancellation_Aggregated_28nm_to_%3C45nm_Stable a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_28nm_to_lt45nm ;
    survey:hasResponseType survey:Stable ;
    survey:participantCount 0.0 .

survey:OrderCancellation_Aggregated_55nm_to_180nm_Decrease a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_55nm_to_180nm ;
    survey:hasResponseType survey:Decrease ;
    survey:participantCount 0.0 .

survey:OrderCancellation_Aggregated_55nm_to_180nm_Increase a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_55nm_to_180nm ;
    survey:hasResponseType survey:Increase ;
    survey:participantCount 0.0 .

survey:OrderCancellation_Aggregated_55nm_to_180nm_SUM a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_55nm_to_180nm ;
    survey:hasResponseType survey:Sum ;
    survey:participantCount 1.0 .

survey:OrderCancellation_Aggregated_55nm_to_180nm_Stable a survey:OrderCancellation ;
    survey:forTechnologyNode survey:OrderCancellationChange_Semiconductor_55nm_to_180nm ;
    survey:hasResponseType survey:Stable ;
    survey:participantCount 1.0 .

survey:SemiCurrentDemand a survey:CurrentDemandAnalysis ;
    survey:hasAggregatedResult survey:SemiCurrentDemand_%3C%3D_7nm,
        survey:SemiCurrentDemand_10nm_to_%3C28nm,
        survey:SemiCurrentDemand_180nm_or_greater,
        survey:SemiCurrentDemand_28nm_to_%3C45nm,
        survey:SemiCurrentDemand_55nm_to_180nm ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey .

survey:SemiFutureDemand_Option1 a survey:FutureDemandAnalysis ;
    survey:hasAggregatedResult survey:SemiFutureDemand_Option1_%3C%3D_7nm_Current_Quarter,
        survey:SemiFutureDemand_Option1_%3C%3D_7nm_Q1_2026,
        survey:SemiFutureDemand_Option1_%3C%3D_7nm_Q1_2027,
        survey:SemiFutureDemand_Option1_%3C%3D_7nm_Q2_2026,
        survey:SemiFutureDemand_Option1_%3C%3D_7nm_Q2_2027,
        survey:SemiFutureDemand_Option1_%3C%3D_7nm_Q3_2026,
        survey:SemiFutureDemand_Option1_%3C%3D_7nm_Q3_2027,
        survey:SemiFutureDemand_Option1_%3C%3D_7nm_Q4_2026,
        survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Current_Quarter,
        survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Q1_2026,
        survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Q1_2027,
        survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Q2_2026,
        survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Q2_2027,
        survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Q3_2026,
        survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Q3_2027,
        survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Q4_2026,
        survey:SemiFutureDemand_Option1_180nm_or_greater_Current_Quarter,
        survey:SemiFutureDemand_Option1_180nm_or_greater_Q1_2026,
        survey:SemiFutureDemand_Option1_180nm_or_greater_Q1_2027,
        survey:SemiFutureDemand_Option1_180nm_or_greater_Q2_2026,
        survey:SemiFutureDemand_Option1_180nm_or_greater_Q2_2027,
        survey:SemiFutureDemand_Option1_180nm_or_greater_Q3_2026,
        survey:SemiFutureDemand_Option1_180nm_or_greater_Q3_2027,
        survey:SemiFutureDemand_Option1_180nm_or_greater_Q4_2026,
        survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Current_Quarter,
        survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Q1_2026,
        survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Q1_2027,
        survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Q2_2026,
        survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Q2_2027,
        survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Q3_2026,
        survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Q3_2027,
        survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Q4_2026,
        survey:SemiFutureDemand_Option1_55nm_to_180nm_Current_Quarter,
        survey:SemiFutureDemand_Option1_55nm_to_180nm_Q1_2026,
        survey:SemiFutureDemand_Option1_55nm_to_180nm_Q1_2027,
        survey:SemiFutureDemand_Option1_55nm_to_180nm_Q2_2026,
        survey:SemiFutureDemand_Option1_55nm_to_180nm_Q2_2027,
        survey:SemiFutureDemand_Option1_55nm_to_180nm_Q3_2026,
        survey:SemiFutureDemand_Option1_55nm_to_180nm_Q3_2027,
        survey:SemiFutureDemand_Option1_55nm_to_180nm_Q4_2026 ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey .

survey:SemiFutureDemand_Option2 a survey:FutureDemandAnalysis ;
    survey:hasAggregatedResult survey:SemiFutureDemand_Option2_%3C%3D_7nm_Current_Quarter,
        survey:SemiFutureDemand_Option2_%3C%3D_7nm_Q1_2026,
        survey:SemiFutureDemand_Option2_%3C%3D_7nm_Q1_2027,
        survey:SemiFutureDemand_Option2_%3C%3D_7nm_Q2_2026,
        survey:SemiFutureDemand_Option2_%3C%3D_7nm_Q2_2027,
        survey:SemiFutureDemand_Option2_%3C%3D_7nm_Q3_2026,
        survey:SemiFutureDemand_Option2_%3C%3D_7nm_Q3_2027,
        survey:SemiFutureDemand_Option2_%3C%3D_7nm_Q4_2026,
        survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Current_Quarter,
        survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Q1_2026,
        survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Q1_2027,
        survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Q2_2026,
        survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Q2_2027,
        survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Q3_2026,
        survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Q3_2027,
        survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Q4_2026,
        survey:SemiFutureDemand_Option2_180nm_or_greater_Current_Quarter,
        survey:SemiFutureDemand_Option2_180nm_or_greater_Q1_2026,
        survey:SemiFutureDemand_Option2_180nm_or_greater_Q1_2027,
        survey:SemiFutureDemand_Option2_180nm_or_greater_Q2_2026,
        survey:SemiFutureDemand_Option2_180nm_or_greater_Q2_2027,
        survey:SemiFutureDemand_Option2_180nm_or_greater_Q3_2026,
        survey:SemiFutureDemand_Option2_180nm_or_greater_Q3_2027,
        survey:SemiFutureDemand_Option2_180nm_or_greater_Q4_2026,
        survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Current_Quarter,
        survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Q1_2026,
        survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Q1_2027,
        survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Q2_2026,
        survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Q2_2027,
        survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Q3_2026,
        survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Q3_2027,
        survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Q4_2026,
        survey:SemiFutureDemand_Option2_55nm_to_180nm_Current_Quarter,
        survey:SemiFutureDemand_Option2_55nm_to_180nm_Q1_2026,
        survey:SemiFutureDemand_Option2_55nm_to_180nm_Q1_2027,
        survey:SemiFutureDemand_Option2_55nm_to_180nm_Q2_2026,
        survey:SemiFutureDemand_Option2_55nm_to_180nm_Q2_2027,
        survey:SemiFutureDemand_Option2_55nm_to_180nm_Q3_2026,
        survey:SemiFutureDemand_Option2_55nm_to_180nm_Q3_2027,
        survey:SemiFutureDemand_Option2_55nm_to_180nm_Q4_2026 ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey .

survey:SemiFutureDemand_Option3 a survey:FutureDemandAnalysis ;
    survey:hasAggregatedResult survey:SemiFutureDemand_Option3_%3C%3D_7nm_Current_Quarter,
        survey:SemiFutureDemand_Option3_%3C%3D_7nm_Q1_2026,
        survey:SemiFutureDemand_Option3_%3C%3D_7nm_Q1_2027,
        survey:SemiFutureDemand_Option3_%3C%3D_7nm_Q2_2026,
        survey:SemiFutureDemand_Option3_%3C%3D_7nm_Q2_2027,
        survey:SemiFutureDemand_Option3_%3C%3D_7nm_Q3_2026,
        survey:SemiFutureDemand_Option3_%3C%3D_7nm_Q3_2027,
        survey:SemiFutureDemand_Option3_%3C%3D_7nm_Q4_2026,
        survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Current_Quarter,
        survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Q1_2026,
        survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Q1_2027,
        survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Q2_2026,
        survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Q2_2027,
        survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Q3_2026,
        survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Q3_2027,
        survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Q4_2026,
        survey:SemiFutureDemand_Option3_180nm_or_greater_Current_Quarter,
        survey:SemiFutureDemand_Option3_180nm_or_greater_Q1_2026,
        survey:SemiFutureDemand_Option3_180nm_or_greater_Q1_2027,
        survey:SemiFutureDemand_Option3_180nm_or_greater_Q2_2026,
        survey:SemiFutureDemand_Option3_180nm_or_greater_Q2_2027,
        survey:SemiFutureDemand_Option3_180nm_or_greater_Q3_2026,
        survey:SemiFutureDemand_Option3_180nm_or_greater_Q3_2027,
        survey:SemiFutureDemand_Option3_180nm_or_greater_Q4_2026,
        survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Current_Quarter,
        survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Q1_2026,
        survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Q1_2027,
        survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Q2_2026,
        survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Q2_2027,
        survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Q3_2026,
        survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Q3_2027,
        survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Q4_2026,
        survey:SemiFutureDemand_Option3_55nm_to_180nm_Current_Quarter,
        survey:SemiFutureDemand_Option3_55nm_to_180nm_Q1_2026,
        survey:SemiFutureDemand_Option3_55nm_to_180nm_Q1_2027,
        survey:SemiFutureDemand_Option3_55nm_to_180nm_Q2_2026,
        survey:SemiFutureDemand_Option3_55nm_to_180nm_Q2_2027,
        survey:SemiFutureDemand_Option3_55nm_to_180nm_Q3_2026,
        survey:SemiFutureDemand_Option3_55nm_to_180nm_Q3_2027,
        survey:SemiFutureDemand_Option3_55nm_to_180nm_Q4_2026 ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey .

survey:SemiconductorShortage_Aggregated_OEM_No a survey:SemiconductorShortage ;
    survey:hasResponseType survey:No ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:participantCount 0 .

survey:SemiconductorShortage_Aggregated_OEM_SUM a survey:SemiconductorShortage ;
    survey:hasResponseType survey:SUM ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:participantCount 1 .

survey:SemiconductorShortage_Aggregated_OEM_Yes a survey:SemiconductorShortage ;
    survey:hasResponseType survey:Yes ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:participantCount 1 .

survey:SemiconductorShortage_Aggregated_SEMI_No a survey:SemiconductorShortage ;
    survey:hasResponseType survey:No ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:participantCount 0 .

survey:SemiconductorShortage_Aggregated_SEMI_SUM a survey:SemiconductorShortage ;
    survey:hasResponseType survey:SUM ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:participantCount 1 .

survey:SemiconductorShortage_Aggregated_SEMI_Yes a survey:SemiconductorShortage ;
    survey:hasResponseType survey:Yes ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:participantCount 1 .

survey:SemiconductorShortage_Aggregated_Tier1_No a survey:SemiconductorShortage ;
    survey:hasResponseType survey:No ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:participantCount 0 .

survey:SemiconductorShortage_Aggregated_Tier1_SUM a survey:SemiconductorShortage ;
    survey:hasResponseType survey:SUM ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:participantCount 0 .

survey:SemiconductorShortage_Aggregated_Tier1_Yes a survey:SemiconductorShortage ;
    survey:hasResponseType survey:Yes ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:participantCount 1 .

survey:TechnologyNodeAssumptions survey:definesCategory survey:TechCategory_10-16_nm,
        survey:TechCategory_180-500_nm,
        survey:TechCategory_2-7_nm,
        survey:TechCategory_28-45_nm,
        survey:TechCategory_55-150_nm ;
    survey:hasAssumption survey:tech_assumption_1061_SERIES,
        survey:tech_assumption_1118,
        survey:tech_assumption_178,
        survey:tech_assumption_186,
        survey:tech_assumption_2101,
        survey:tech_assumption_2108,
        survey:tech_assumption_2110,
        survey:tech_assumption_2121,
        survey:tech_assumption_2500,
        survey:tech_assumption_2500%282%29,
        survey:tech_assumption_296N,
        survey:tech_assumption_2SA,
        survey:tech_assumption_2SD,
        survey:tech_assumption_2YA,
        survey:tech_assumption_300N,
        survey:tech_assumption_307,
        survey:tech_assumption_307%282%29,
        survey:tech_assumption_3160,
        survey:tech_assumption_31XX_31XX-2,
        survey:tech_assumption_3302,
        survey:tech_assumption_330N,
        survey:tech_assumption_370N,
        survey:tech_assumption_407%282%29,
        survey:tech_assumption_407_608_609,
        survey:tech_assumption_414T,
        survey:tech_assumption_500N,
        survey:tech_assumption_560T_810T,
        survey:tech_assumption_66L_21Z,
        survey:tech_assumption_670H_KF,
        survey:tech_assumption_800,
        survey:tech_assumption_800T,
        survey:tech_assumption_8C,
        survey:tech_assumption_970,
        survey:tech_assumption_980,
        survey:tech_assumption_986_996_-_987_997,
        survey:tech_assumption_9X1,
        survey:tech_assumption_A,
        survey:tech_assumption_A%282%29,
        survey:tech_assumption_A-SERIES,
        survey:tech_assumption_A0,
        survey:tech_assumption_A0%282%29,
        survey:tech_assumption_A002,
        survey:tech_assumption_A100,
        survey:tech_assumption_A10_A24_A32,
        survey:tech_assumption_A30,
        survey:tech_assumption_A30%282%29,
        survey:tech_assumption_AA,
        survey:tech_assumption_AM,
        survey:tech_assumption_AM-RB,
        survey:tech_assumption_AM800,
        survey:tech_assumption_AMG.EA,
        survey:tech_assumption_AMP,
        survey:tech_assumption_AM_EV,
        survey:tech_assumption_AN_DN_ND,
        survey:tech_assumption_AP,
        survey:tech_assumption_APP,
        survey:tech_assumption_AP_UM_JR_JK_MB,
        survey:tech_assumption_ATLAS,
        survey:tech_assumption_AU,
        survey:tech_assumption_Alpine,
        survey:tech_assumption_Ampr,
        survey:tech_assumption_B,
        survey:tech_assumption_B%282%29,
        survey:tech_assumption_B-0,
        survey:tech_assumption_B-SERIES,
        survey:tech_assumption_B-VX62,
        survey:tech_assumption_B0,
        survey:tech_assumption_B1,
        survey:tech_assumption_B2,
        survey:tech_assumption_B2E,
        survey:tech_assumption_B3,
        survey:tech_assumption_B30,
        survey:tech_assumption_B30%282%29,
        survey:tech_assumption_B6,
        survey:tech_assumption_BC,
        survey:tech_assumption_BC300,
        survey:tech_assumption_BD_LD-100,
        survey:tech_assumption_BE,
        survey:tech_assumption_BE%282%29,
        survey:tech_assumption_BE11,
        survey:tech_assumption_BE21,
        survey:tech_assumption_BE21%282%29,
        survey:tech_assumption_BE22,
        survey:tech_assumption_BE22%282%29,
        survey:tech_assumption_BE91,
        survey:tech_assumption_BEV-F,
        survey:tech_assumption_BEV3_BEV_N,
        survey:tech_assumption_BEV_Prime,
        survey:tech_assumption_BF,
        survey:tech_assumption_BF1,
        survey:tech_assumption_BJ2020,
        survey:tech_assumption_BJ2022,
        survey:tech_assumption_BJ2022%282%29,
        survey:tech_assumption_BLP,
        survey:tech_assumption_BLP%282%29,
        survey:tech_assumption_BLP-L,
        survey:tech_assumption_BLP-L%282%29,
        survey:tech_assumption_BLUECAR,
        survey:tech_assumption_BMA,
        survey:tech_assumption_BMFA,
        survey:tech_assumption_BMFA%282%29,
        survey:tech_assumption_BMP,
        survey:tech_assumption_BMP%282%29,
        survey:tech_assumption_BM_MD,
        survey:tech_assumption_BR-LT,
        survey:tech_assumption_BR-LT%282%29,
        survey:tech_assumption_BR450,
        survey:tech_assumption_BR451,
        survey:tech_assumption_BREMACH,
        survey:tech_assumption_BSN,
        survey:tech_assumption_BSP,
        survey:tech_assumption_BSP%282%29,
        survey:tech_assumption_BT1,
        survey:tech_assumption_BUGATTI,
        survey:tech_assumption_BV1,
        survey:tech_assumption_C,
        survey:tech_assumption_C%282%29,
        survey:tech_assumption_C-5,
        survey:tech_assumption_C-EV,
        survey:tech_assumption_C-EVO_CUSW,
        survey:tech_assumption_C1,
        survey:tech_assumption_C170,
        survey:tech_assumption_C199,
        survey:tech_assumption_C1XX_C1XX-2,
        survey:tech_assumption_C2,
        survey:tech_assumption_C2_GE1,
        survey:tech_assumption_C30,
        survey:tech_assumption_C30%282%29,
        survey:tech_assumption_C6,
        survey:tech_assumption_CA1046,
        survey:tech_assumption_CA1046%282%29,
        survey:tech_assumption_CA6300,
        survey:tech_assumption_CANTER,
        survey:tech_assumption_CB40,
        survey:tech_assumption_CCA,
        survey:tech_assumption_CD,
        survey:tech_assumption_CD-EU,
        survey:tech_assumption_CD1-3,
        survey:tech_assumption_CD4,
        survey:tech_assumption_CD6,
        survey:tech_assumption_CE,
        survey:tech_assumption_CE1,
        survey:tech_assumption_CF-SERIES,
        survey:tech_assumption_CF4,
        survey:tech_assumption_CFT,
        survey:tech_assumption_CFT%282%29,
        survey:tech_assumption_CH,
        survey:tech_assumption_CHB,
        survey:tech_assumption_CIVILIAN,
        survey:tech_assumption_CK,
        survey:tech_assumption_CKZ,
        survey:tech_assumption_CL_MM,
        survey:tech_assumption_CL_MM%282%29,
        survey:tech_assumption_CMA,
        survey:tech_assumption_CMF-A,
        survey:tech_assumption_CMF-B,
        survey:tech_assumption_CMF-C_D,
        survey:tech_assumption_CMF-C_D%282%29,
        survey:tech_assumption_CMF-EV,
        survey:tech_assumption_CMP,
        survey:tech_assumption_CMV,
        survey:tech_assumption_CN2,
        survey:tech_assumption_COASTER,
        survey:tech_assumption_CR,
        survey:tech_assumption_CRRC,
        survey:tech_assumption_CS,
        survey:tech_assumption_CSP,
        survey:tech_assumption_CUB,
        survey:tech_assumption_CUB%282%29,
        survey:tech_assumption_CV-L,
        survey:tech_assumption_CV9,
        survey:tech_assumption_CX,
        survey:tech_assumption_CXV,
        survey:tech_assumption_CZ,
        survey:tech_assumption_C_D,
        survey:tech_assumption_C_Q,
        survey:tech_assumption_Ceer,
        survey:tech_assumption_Compact_Main_Platform,
        survey:tech_assumption_Cybertruck,
        survey:tech_assumption_D,
        survey:tech_assumption_D%282%29,
        survey:tech_assumption_D-5,
        survey:tech_assumption_D-XEV,
        survey:tech_assumption_D01A,
        survey:tech_assumption_D186,
        survey:tech_assumption_D21,
        survey:tech_assumption_D2C_D5,
        survey:tech_assumption_D30,
        survey:tech_assumption_D3_D4,
        survey:tech_assumption_D71A,
        survey:tech_assumption_D8,
        survey:tech_assumption_D91B,
        survey:tech_assumption_DAILY,
        survey:tech_assumption_DALLARA,
        survey:tech_assumption_DC1,
        survey:tech_assumption_DC2,
        survey:tech_assumption_DD1020_1022_1023,
        survey:tech_assumption_DD6760_6751_6600,
        survey:tech_assumption_DE30,
        survey:tech_assumption_DEFENDER,
        survey:tech_assumption_DELIVERY,
        survey:tech_assumption_DEV,
        survey:tech_assumption_DF1,
        survey:tech_assumption_DF1%282%29,
        survey:tech_assumption_DF2,
        survey:tech_assumption_DF2%282%29,
        survey:tech_assumption_DFLT,
        survey:tech_assumption_DI,
        survey:tech_assumption_DI%282%29,
        survey:tech_assumption_DOST,
        survey:tech_assumption_DOST%282%29,
        survey:tech_assumption_DR_DH,
        survey:tech_assumption_DSMA,
        survey:tech_assumption_DSMA%282%29,
        survey:tech_assumption_DS_DJ,
        survey:tech_assumption_DYNA,
        survey:tech_assumption_DYNA%282%29,
        survey:tech_assumption_D_X_Z,
        survey:tech_assumption_David,
        survey:tech_assumption_E,
        survey:tech_assumption_E%2B,
        survey:tech_assumption_E-GMP,
        survey:tech_assumption_E-LCV,
        survey:tech_assumption_E-LTF,
        survey:tech_assumption_E-Sports,
        survey:tech_assumption_E0X,
        survey:tech_assumption_E2,
        survey:tech_assumption_E46,
        survey:tech_assumption_E8,
        survey:tech_assumption_EA169,
        survey:tech_assumption_EDISON,
        survey:tech_assumption_EFC,
        survey:tech_assumption_EF_MS,
        survey:tech_assumption_EICHER,
        survey:tech_assumption_EICHER%5B2%5D,
        survey:tech_assumption_EJ,
        survey:tech_assumption_EL,
        survey:tech_assumption_ELF,
        survey:tech_assumption_ELF-M,
        survey:tech_assumption_ELISE,
        survey:tech_assumption_EMA,
        survey:tech_assumption_EMA%282%29,
        survey:tech_assumption_EMP,
        survey:tech_assumption_EMP2,
        survey:tech_assumption_EN53-114_FN145,
        survey:tech_assumption_EP,
        survey:tech_assumption_EP1,
        survey:tech_assumption_EP2,
        survey:tech_assumption_EPA0,
        survey:tech_assumption_EPA0%282%29,
        survey:tech_assumption_EPA1,
        survey:tech_assumption_EPA1%282%29,
        survey:tech_assumption_EPA2,
        survey:tech_assumption_EPA2%282%29,
        survey:tech_assumption_EPSILON,
        survey:tech_assumption_ESSA,
        survey:tech_assumption_EV,
        survey:tech_assumption_EV%282%29,
        survey:tech_assumption_EV%2B,
        survey:tech_assumption_EV1,
        survey:tech_assumption_EV2,
        survey:tech_assumption_EVA2,
        survey:tech_assumption_EVL,
        survey:tech_assumption_EX,
        survey:tech_assumption_E_SERIES,
        survey:tech_assumption_Edward,
        survey:tech_assumption_Edward%282%29,
        survey:tech_assumption_Elemental,
        survey:tech_assumption_Evolution,
        survey:tech_assumption_Extreme,
        survey:tech_assumption_F,
        survey:tech_assumption_F-SERIES,
        survey:tech_assumption_F1,
        survey:tech_assumption_F2,
        survey:tech_assumption_F5,
        survey:tech_assumption_F91,
        survey:tech_assumption_F91%282%29,
        survey:tech_assumption_FD,
        survey:tech_assumption_FD%282%29,
        survey:tech_assumption_FERRARI_FR-L,
        survey:tech_assumption_FERRARI_MR-L,
        survey:tech_assumption_FF,
        survey:tech_assumption_FF%282%29,
        survey:tech_assumption_FL,
        survey:tech_assumption_FLT,
        survey:tech_assumption_FL_S-FR,
        survey:tech_assumption_FM29,
        survey:tech_assumption_FMA,
        survey:tech_assumption_FMA%282%29,
        survey:tech_assumption_FME-A1,
        survey:tech_assumption_FME-A2,
        survey:tech_assumption_FME-A2%282%29,
        survey:tech_assumption_FN74,
        survey:tech_assumption_FOMM,
        survey:tech_assumption_FORLAND,
        survey:tech_assumption_FR,
        survey:tech_assumption_FR-L,
        survey:tech_assumption_FSQ,
        survey:tech_assumption_FX,
        survey:tech_assumption_FY,
        survey:tech_assumption_FZ6102,
        survey:tech_assumption_FlexEVan,
        survey:tech_assumption_Forland2,
        survey:tech_assumption_Forseven,
        survey:tech_assumption_Franklin,
        survey:tech_assumption_G,
        survey:tech_assumption_G%282%29,
        survey:tech_assumption_GA,
        survey:tech_assumption_GA-B,
        survey:tech_assumption_GA-C,
        survey:tech_assumption_GA-C%282%29,
        survey:tech_assumption_GA-D,
        survey:tech_assumption_GA-E,
        survey:tech_assumption_GA-E%282%29,
        survey:tech_assumption_GA-F,
        survey:tech_assumption_GA-K,
        survey:tech_assumption_GA-K%282%29,
        survey:tech_assumption_GA-L,
        survey:tech_assumption_GAMMA,
        survey:tech_assumption_GAZelle_Next,
        survey:tech_assumption_GBC,
        survey:tech_assumption_GBRC,
        survey:tech_assumption_GBRC%282%29,
        survey:tech_assumption_GCV,
        survey:tech_assumption_GEA,
        survey:tech_assumption_GEA%282%29,
        survey:tech_assumption_GEC,
        survey:tech_assumption_GEN_III,
        survey:tech_assumption_GEP,
        survey:tech_assumption_GEP%282%29,
        survey:tech_assumption_GH,
        survey:tech_assumption_GHT1020S,
        survey:tech_assumption_GHT1020S%282%29,
        survey:tech_assumption_GIO,
        survey:tech_assumption_GL,
        survey:tech_assumption_GL-LCV,
        survey:tech_assumption_GL6590_GL6650_GL6700,
        survey:tech_assumption_GLCA,
        survey:tech_assumption_GLOBAL_DELTA_D2XX,
        survey:tech_assumption_GLOBAL_EPSILON_E2XX,
        survey:tech_assumption_GLOBAL_GAMMA_G2XX,
        survey:tech_assumption_GLOBAL_MINI_M2XX,
        survey:tech_assumption_GLTP,
        survey:tech_assumption_GM,
        survey:tech_assumption_GM2900,
        survey:tech_assumption_GM3000,
        survey:tech_assumption_GM4200,
        survey:tech_assumption_GMC,
        survey:tech_assumption_GMT200_201,
        survey:tech_assumption_GMT325_330,
        survey:tech_assumption_GMT355_700,
        survey:tech_assumption_GMT360_370,
        survey:tech_assumption_GMT600,
        survey:tech_assumption_GMT610,
        survey:tech_assumption_GMT800_900,
        survey:tech_assumption_GPMA,
        survey:tech_assumption_GPMA%282%29,
        survey:tech_assumption_GQ,
        survey:tech_assumption_GS,
        survey:tech_assumption_GSC,
        survey:tech_assumption_GSE,
        survey:tech_assumption_GSE%282%29,
        survey:tech_assumption_GSEV,
        survey:tech_assumption_GSEV%282%29,
        survey:tech_assumption_GSP,
        survey:tech_assumption_GSP%282%29,
        survey:tech_assumption_GS_HF,
        survey:tech_assumption_GT,
        survey:tech_assumption_GT%282%29,
        survey:tech_assumption_GTO,
        survey:tech_assumption_GTZ,
        survey:tech_assumption_GV,
        survey:tech_assumption_GV%282%29,
        survey:tech_assumption_GX,
        survey:tech_assumption_GZ6590_GZ6700_GZ6750,
        survey:tech_assumption_Gen7,
        survey:tech_assumption_Giorgio_Giorgio_Global,
        survey:tech_assumption_Global_Alpha_A2XX,
        survey:tech_assumption_Grace,
        survey:tech_assumption_H,
        survey:tech_assumption_H%282%29,
        survey:tech_assumption_H-SERIES,
        survey:tech_assumption_H-SERIES%282%29,
        survey:tech_assumption_H1,
        survey:tech_assumption_H2,
        survey:tech_assumption_HA,
        survey:tech_assumption_HB,
        survey:tech_assumption_HD,
        survey:tech_assumption_HFC1061,
        survey:tech_assumption_HFC1061%282%29,
        survey:tech_assumption_HFC6600_HFC6800,
        survey:tech_assumption_HFC6600_HFC6800%282%29,
        survey:tech_assumption_HHR,
        survey:tech_assumption_HIACE,
        survey:tech_assumption_HK,
        survey:tech_assumption_HM,
        survey:tech_assumption_HMGA,
        survey:tech_assumption_HP,
        survey:tech_assumption_HPA,
        survey:tech_assumption_HPC,
        survey:tech_assumption_HSJ,
        survey:tech_assumption_HSJ%282%29,
        survey:tech_assumption_Higer_PUP,
        survey:tech_assumption_Howard,
        survey:tech_assumption_IGPF,
        survey:tech_assumption_IKP1,
        survey:tech_assumption_IMV,
        survey:tech_assumption_IMV%282%29,
        survey:tech_assumption_INGLO,
        survey:tech_assumption_IS,
        survey:tech_assumption_Ineos,
        survey:tech_assumption_Ineos_EV,
        survey:tech_assumption_J,
        survey:tech_assumption_J1,
        survey:tech_assumption_J100,
        survey:tech_assumption_J25,
        survey:tech_assumption_J2_J3,
        survey:tech_assumption_J97,
        survey:tech_assumption_JEA,
        survey:tech_assumption_JEST,
        survey:tech_assumption_JGM_JGM%282%29,
        survey:tech_assumption_JH,
        survey:tech_assumption_JHC,
        survey:tech_assumption_JHC%282%29,
        survey:tech_assumption_JIEOU,
        survey:tech_assumption_JIEOU%282%29,
        survey:tech_assumption_JK,
        survey:tech_assumption_JK_JL,
        survey:tech_assumption_JLT,
        survey:tech_assumption_JT,
        survey:tech_assumption_K,
        survey:tech_assumption_K-Series,
        survey:tech_assumption_K0,
        survey:tech_assumption_K100_Y100,
        survey:tech_assumption_K100_Y100%282%29,
        survey:tech_assumption_K1_K2-P1,
        survey:tech_assumption_K1_K2-P2,
        survey:tech_assumption_K1_K2-P3,
        survey:tech_assumption_K2XX,
        survey:tech_assumption_K3_K4-P1,
        survey:tech_assumption_K3_K4-P2,
        survey:tech_assumption_K3_K4-P3,
        survey:tech_assumption_KAPPA,
        survey:tech_assumption_KC_SG,
        survey:tech_assumption_KEV,
        survey:tech_assumption_KJ_KK,
        survey:tech_assumption_KM,
        survey:tech_assumption_KM%282%29,
        survey:tech_assumption_KQC2,
        survey:tech_assumption_KZ,
        survey:tech_assumption_Kama,
        survey:tech_assumption_Kunlun,
        survey:tech_assumption_L,
        survey:tech_assumption_L1,
        survey:tech_assumption_L2,
        survey:tech_assumption_L200,
        survey:tech_assumption_L3,
        survey:tech_assumption_L4,
        survey:tech_assumption_L6,
        survey:tech_assumption_L7,
        survey:tech_assumption_LA,
        survey:tech_assumption_LAMBDA,
        survey:tech_assumption_LAMBORGHINI,
        survey:tech_assumption_LB,
        survey:tech_assumption_LC,
        survey:tech_assumption_LCV1,
        survey:tech_assumption_LEVC-TX,
        survey:tech_assumption_LF1030,
        survey:tech_assumption_LFA,
        survey:tech_assumption_LG,
        survey:tech_assumption_LH,
        survey:tech_assumption_LH%282%29,
        survey:tech_assumption_LH1040D,
        survey:tech_assumption_LIEBAO,
        survey:tech_assumption_LJC1040_LJC1041,
        survey:tech_assumption_LK,
        survey:tech_assumption_LS,
        survey:tech_assumption_LSB,
        survey:tech_assumption_LST,
        survey:tech_assumption_LTV,
        survey:tech_assumption_LU,
        survey:tech_assumption_LX,
        survey:tech_assumption_Lada_B,
        survey:tech_assumption_Li,
        survey:tech_assumption_Lingbox,
        survey:tech_assumption_Lingbox%282%29,
        survey:tech_assumption_M,
        survey:tech_assumption_M%282%29,
        survey:tech_assumption_M-M2,
        survey:tech_assumption_M-M2%282%29,
        survey:tech_assumption_M-SERIES,
        survey:tech_assumption_M-Trix%2893%29,
        survey:tech_assumption_M-Trix%2895%29,
        survey:tech_assumption_M0,
        survey:tech_assumption_M1,
        survey:tech_assumption_M100,
        survey:tech_assumption_M1KA,
        survey:tech_assumption_M1X,
        survey:tech_assumption_M1X%282%29,
        survey:tech_assumption_M1_M2,
        survey:tech_assumption_M2,
        survey:tech_assumption_M3,
        survey:tech_assumption_M3X,
        survey:tech_assumption_M3X%282%29,
        survey:tech_assumption_M3_M4,
        survey:tech_assumption_M49_M59,
        survey:tech_assumption_M6,
        survey:tech_assumption_M80,
        survey:tech_assumption_M8X,
        survey:tech_assumption_MA,
        survey:tech_assumption_MAS,
        survey:tech_assumption_MASERATI,
        survey:tech_assumption_MASERATI_Spaceframe,
        survey:tech_assumption_MB,
        survey:tech_assumption_MB.EA,
        survey:tech_assumption_MB100,
        survey:tech_assumption_MC-C,
        survey:tech_assumption_MC-M,
        survey:tech_assumption_MCAR,
        survey:tech_assumption_MCLA,
        survey:tech_assumption_ME,
        survey:tech_assumption_MEB,
        survey:tech_assumption_MEB_entry,
        survey:tech_assumption_MFA,
        survey:tech_assumption_MG,
        survey:tech_assumption_MHA,
        survey:tech_assumption_MI,
        survey:tech_assumption_MIA,
        survey:tech_assumption_MIFA,
        survey:tech_assumption_MIFA%282%29,
        survey:tech_assumption_MIH,
        survey:tech_assumption_MILA,
        survey:tech_assumption_MINICAB,
        survey:tech_assumption_MINI_CUB,
        survey:tech_assumption_MIS,
        survey:tech_assumption_MIS%282%29,
        survey:tech_assumption_MK,
        survey:tech_assumption_MLA,
        survey:tech_assumption_MLB3,
        survey:tech_assumption_MLB_B,
        survey:tech_assumption_MLB_C_D,
        survey:tech_assumption_MMA,
        survey:tech_assumption_MMB,
        survey:tech_assumption_MNB,
        survey:tech_assumption_MODEL_S,
        survey:tech_assumption_MORGAN,
        survey:tech_assumption_MORV,
        survey:tech_assumption_MORV%282%29,
        survey:tech_assumption_MPA0,
        survey:tech_assumption_MPA1,
        survey:tech_assumption_MPA1%282%29,
        survey:tech_assumption_MPA2,
        survey:tech_assumption_MQB_A0,
        survey:tech_assumption_MQB_A_B,
        survey:tech_assumption_MQB_C,
        survey:tech_assumption_MR,
        survey:tech_assumption_MRA_LARGE,
        survey:tech_assumption_MRA_MID-SIZE,
        survey:tech_assumption_MS,
        survey:tech_assumption_MS2000,
        survey:tech_assumption_MSA,
        survey:tech_assumption_MSB,
        survey:tech_assumption_MSP,
        survey:tech_assumption_MUSE,
        survey:tech_assumption_MUV,
        survey:tech_assumption_MV1,
        survey:tech_assumption_Mann,
        survey:tech_assumption_Mengshi,
        survey:tech_assumption_Midsize,
        survey:tech_assumption_Mission_R,
        survey:tech_assumption_Mission_X,
        survey:tech_assumption_Mitsubishi_Z,
        survey:tech_assumption_Modena,
        survey:tech_assumption_Modern,
        survey:tech_assumption_N,
        survey:tech_assumption_N%282%29,
        survey:tech_assumption_N1_N2,
        survey:tech_assumption_N3_N4,
        survey:tech_assumption_N5_N6,
        survey:tech_assumption_N800,
        survey:tech_assumption_N800%282%29,
        survey:tech_assumption_NBC,
        survey:tech_assumption_NBC%282%29,
        survey:tech_assumption_NCV2,
        survey:tech_assumption_NCV3,
        survey:tech_assumption_NCV4,
        survey:tech_assumption_NE_IN_CO_UA,
        survey:tech_assumption_NFA,
        survey:tech_assumption_NF_CM,
        survey:tech_assumption_NGDV,
        survey:tech_assumption_NISSAN_JUNIOR,
        survey:tech_assumption_NJ1041_1061,
        survey:tech_assumption_NK,
        survey:tech_assumption_NL,
        survey:tech_assumption_NPB,
        survey:tech_assumption_NPC,
        survey:tech_assumption_NPD,
        survey:tech_assumption_NPE,
        survey:tech_assumption_NPE%282%29,
        survey:tech_assumption_NPL_PT,
        survey:tech_assumption_NSC,
        survey:tech_assumption_NSX,
        survey:tech_assumption_NU_029N_152N,
        survey:tech_assumption_NV,
        survey:tech_assumption_NV2,
        survey:tech_assumption_NZ,
        survey:tech_assumption_New_Gonow_LT,
        survey:tech_assumption_New_Gonow_LT%282%29,
        survey:tech_assumption_OMEGA_O2XX,
        survey:tech_assumption_ONE_LITRE_CAR,
        survey:tech_assumption_OU%282%29,
        survey:tech_assumption_P-SERIES,
        survey:tech_assumption_P11,
        survey:tech_assumption_P131_P356_P473,
        survey:tech_assumption_P2,
        survey:tech_assumption_P4,
        survey:tech_assumption_P4%282%29,
        survey:tech_assumption_P71,
        survey:tech_assumption_P71%282%29,
        survey:tech_assumption_PAYKAN,
        survey:tech_assumption_PC,
        survey:tech_assumption_PEGASUS,
        survey:tech_assumption_PETUNIA,
        survey:tech_assumption_PF-A,
        survey:tech_assumption_PF-B,
        survey:tech_assumption_PF-B%282%29,
        survey:tech_assumption_PF-C,
        survey:tech_assumption_PF-CD,
        survey:tech_assumption_PF-D,
        survey:tech_assumption_PF1,
        survey:tech_assumption_PF2,
        survey:tech_assumption_PF3,
        survey:tech_assumption_PF7_PF7E,
        survey:tech_assumption_PFE,
        survey:tech_assumption_PHOENIX,
        survey:tech_assumption_PK5,
        survey:tech_assumption_PK5%282%29,
        survey:tech_assumption_PL22,
        survey:tech_assumption_PL45,
        survey:tech_assumption_PL56,
        survey:tech_assumption_PL62,
        survey:tech_assumption_PL71-72,
        survey:tech_assumption_PLA-D6a,
        survey:tech_assumption_PLA-D7a,
        survey:tech_assumption_PLA-D7e,
        survey:tech_assumption_PLA-D7u,
        survey:tech_assumption_PL_PQ46-47,
        survey:tech_assumption_PMC1,
        survey:tech_assumption_PN105-106,
        survey:tech_assumption_PN96_T1,
        survey:tech_assumption_PPE,
        survey:tech_assumption_PQ12,
        survey:tech_assumption_PQ22,
        survey:tech_assumption_PQ23,
        survey:tech_assumption_PQ24,
        survey:tech_assumption_PQ25_26,
        survey:tech_assumption_PQ33,
        survey:tech_assumption_PQ34,
        survey:tech_assumption_PQ35,
        survey:tech_assumption_PQ75,
        survey:tech_assumption_PQ_SD_ASD,
        survey:tech_assumption_PR3,
        survey:tech_assumption_PREMIUM,
        survey:tech_assumption_PROCEED,
        survey:tech_assumption_PROJECT_ONE,
        survey:tech_assumption_PS,
        survey:tech_assumption_PS-10,
        survey:tech_assumption_PU,
        survey:tech_assumption_Phevos,
        survey:tech_assumption_Phoenix,
        survey:tech_assumption_Project_V,
        survey:tech_assumption_Q,
        survey:tech_assumption_Q-SERIES,
        survey:tech_assumption_QILING_1041,
        survey:tech_assumption_QL6500,
        survey:tech_assumption_R,
        survey:tech_assumption_R-R_Spaceframe,
        survey:tech_assumption_R07,
        survey:tech_assumption_R1,
        survey:tech_assumption_R3_HHR,
        survey:tech_assumption_R40,
        survey:tech_assumption_RCV,
        survey:tech_assumption_REF,
        survey:tech_assumption_REVA,
        survey:tech_assumption_ROLLS_ROYCE,
        survey:tech_assumption_ROSA,
        survey:tech_assumption_RPU,
        survey:tech_assumption_RR01,
        survey:tech_assumption_RS_RT,
        survey:tech_assumption_RS_UK,
        survey:tech_assumption_RU,
        survey:tech_assumption_Rich,
        survey:tech_assumption_S,
        survey:tech_assumption_S-330N,
        survey:tech_assumption_S-375N_635N,
        survey:tech_assumption_S-B0,
        survey:tech_assumption_S-C,
        survey:tech_assumption_S-CD1-3,
        survey:tech_assumption_S-CMF-A,
        survey:tech_assumption_S-CMF-B,
        survey:tech_assumption_S-CS,
        survey:tech_assumption_S-EF_MS,
        survey:tech_assumption_S-FR,
        survey:tech_assumption_S-FR%282%29,
        survey:tech_assumption_S-GS,
        survey:tech_assumption_S-GV,
        survey:tech_assumption_S-GV%282%29,
        survey:tech_assumption_S-G_M,
        survey:tech_assumption_S-HP,
        survey:tech_assumption_S-J,
        survey:tech_assumption_S-J100,
        survey:tech_assumption_S-J25,
        survey:tech_assumption_S-J55,
        survey:tech_assumption_S-M100,
        survey:tech_assumption_S-MC_M,
        survey:tech_assumption_S-MG,
        survey:tech_assumption_S-N,
        survey:tech_assumption_S-NE_IN_CO_UA,
        survey:tech_assumption_S-NU_029N_152N,
        survey:tech_assumption_S-NU_029N_152N%282%29,
        survey:tech_assumption_S-PF3,
        survey:tech_assumption_S-Q,
        survey:tech_assumption_S-R40,
        survey:tech_assumption_S-SERIES,
        survey:tech_assumption_S-TC_TY,
        survey:tech_assumption_S-TC_TY%282%29,
        survey:tech_assumption_S-TYPE_E,
        survey:tech_assumption_S-U204,
        survey:tech_assumption_S-UCR145,
        survey:tech_assumption_S-UCR145%282%29,
        survey:tech_assumption_S-XJ,
        survey:tech_assumption_S-Z,
        survey:tech_assumption_S1,
        survey:tech_assumption_S161,
        survey:tech_assumption_S161%282%29,
        survey:tech_assumption_S2,
        survey:tech_assumption_S2-E,
        survey:tech_assumption_S2-E%282%29,
        survey:tech_assumption_S2000,
        survey:tech_assumption_S2000%282%29,
        survey:tech_assumption_S3,
        survey:tech_assumption_S3%282%29,
        survey:tech_assumption_S5X-1,
        survey:tech_assumption_S5X-1%282%29,
        survey:tech_assumption_S5X-2,
        survey:tech_assumption_S6,
        survey:tech_assumption_SA,
        survey:tech_assumption_SC,
        survey:tech_assumption_SC1021_1040,
        survey:tech_assumption_SC6601_6608,
        survey:tech_assumption_SCM,
        survey:tech_assumption_SD,
        survey:tech_assumption_SD%282%29,
        survey:tech_assumption_SE-LT,
        survey:tech_assumption_SEA1,
        survey:tech_assumption_SEA1%282%29,
        survey:tech_assumption_SEA2,
        survey:tech_assumption_SEA2%282%29,
        survey:tech_assumption_SEA3,
        survey:tech_assumption_SEA3%282%29,
        survey:tech_assumption_SF,
        survey:tech_assumption_SF%282%29,
        survey:tech_assumption_SGP,
        survey:tech_assumption_SGP%282%29,
        survey:tech_assumption_SGP-E,
        survey:tech_assumption_SI,
        survey:tech_assumption_SI%282%29,
        survey:tech_assumption_SIGMA,
        survey:tech_assumption_SIGMA%282%29,
        survey:tech_assumption_SKYACTIV_B,
        survey:tech_assumption_SKYACTIV_C_D,
        survey:tech_assumption_SKYACTIV_C_D%282%29,
        survey:tech_assumption_SKYACTIV_EV,
        survey:tech_assumption_SKYACTIV_FR,
        survey:tech_assumption_SKYACTIV_R,
        survey:tech_assumption_SL,
        survey:tech_assumption_SLB,
        survey:tech_assumption_SMA,
        survey:tech_assumption_SNJ,
        survey:tech_assumption_SNJ%282%29,
        survey:tech_assumption_SOA,
        survey:tech_assumption_SOA%282%29,
        survey:tech_assumption_SP0,
        survey:tech_assumption_SP1,
        survey:tech_assumption_SPA,
        survey:tech_assumption_SPA3,
        survey:tech_assumption_SPU,
        survey:tech_assumption_SR,
        survey:tech_assumption_SS,
        survey:tech_assumption_SS%282%29,
        survey:tech_assumption_SSA,
        survey:tech_assumption_SSM,
        survey:tech_assumption_SSP_A_B,
        survey:tech_assumption_SSP_B_C,
        survey:tech_assumption_SSP_D,
        survey:tech_assumption_ST,
        survey:tech_assumption_STD,
        survey:tech_assumption_STLA_City,
        survey:tech_assumption_STLA_Frame,
        survey:tech_assumption_STLA_Large,
        survey:tech_assumption_STLA_Medium,
        survey:tech_assumption_STLA_Small,
        survey:tech_assumption_STLA_Van,
        survey:tech_assumption_STREETSCOOTER,
        survey:tech_assumption_SUPER_7,
        survey:tech_assumption_SUV,
        survey:tech_assumption_SV5,
        survey:tech_assumption_SV6,
        survey:tech_assumption_SV7,
        survey:tech_assumption_SWB,
        survey:tech_assumption_SWM-M,
        survey:tech_assumption_SXK,
        survey:tech_assumption_SXZ6440_SXZ6481,
        survey:tech_assumption_SXZ6440_SXZ6481%282%29,
        survey:tech_assumption_SY,
        survey:tech_assumption_SY%282%29,
        survey:tech_assumption_SY1023-26-28,
        survey:tech_assumption_SY1027_SY5021,
        survey:tech_assumption_Shaolin,
        survey:tech_assumption_Skywell,
        survey:tech_assumption_Slate,
        survey:tech_assumption_Small_SUSW,
        survey:tech_assumption_T,
        survey:tech_assumption_T-CAR,
        survey:tech_assumption_T-SERIES,
        survey:tech_assumption_T-SERIES%282%29,
        survey:tech_assumption_T1,
        survey:tech_assumption_T1%282%29,
        survey:tech_assumption_T100,
        survey:tech_assumption_T1N,
        survey:tech_assumption_T1XX,
        survey:tech_assumption_T2,
        survey:tech_assumption_T25,
        survey:tech_assumption_T25%282%29,
        survey:tech_assumption_T2N,
        survey:tech_assumption_T3,
        survey:tech_assumption_T4,
        survey:tech_assumption_T5,
        survey:tech_assumption_T6,
        survey:tech_assumption_TC_TY,
        survey:tech_assumption_TC_TY%282%29,
        survey:tech_assumption_TE1,
        survey:tech_assumption_THETA_TE,
        survey:tech_assumption_TM,
        survey:tech_assumption_TMA,
        survey:tech_assumption_TMB,
        survey:tech_assumption_TOGG,
        survey:tech_assumption_TQ,
        survey:tech_assumption_TR40,
        survey:tech_assumption_TRAX,
        survey:tech_assumption_TRAX%282%29,
        survey:tech_assumption_TRUMP,
        survey:tech_assumption_TRUMP%282%29,
        survey:tech_assumption_TX1,
        survey:tech_assumption_TYPE_169,
        survey:tech_assumption_TYPE_188,
        survey:tech_assumption_TYPE_199,
        survey:tech_assumption_TYPE_2_3,
        survey:tech_assumption_TYPE_2_3-C,
        survey:tech_assumption_TYPE_A,
        survey:tech_assumption_TYPE_B,
        survey:tech_assumption_TYPE_E,
        survey:tech_assumption_U,
        survey:tech_assumption_U%2B,
        survey:tech_assumption_U%2B%282%29,
        survey:tech_assumption_U-IMV,
        survey:tech_assumption_U-IMV%282%29,
        survey:tech_assumption_U152_U251,
        survey:tech_assumption_U204,
        survey:tech_assumption_U300,
        survey:tech_assumption_U452,
        survey:tech_assumption_U469,
        survey:tech_assumption_UCR145,
        survey:tech_assumption_UCR145%282%29,
        survey:tech_assumption_UF0,
        survey:tech_assumption_UH,
        survey:tech_assumption_UNIMOG,
        survey:tech_assumption_UNIMOG%282%29,
        survey:tech_assumption_UPP,
        survey:tech_assumption_UT,
        survey:tech_assumption_UZ,
        survey:tech_assumption_U_V,
        survey:tech_assumption_V,
        survey:tech_assumption_V100_V200,
        survey:tech_assumption_V3,
        survey:tech_assumption_V4,
        survey:tech_assumption_V6,
        survey:tech_assumption_VAN,
        survey:tech_assumption_VAN.EA_CA,
        survey:tech_assumption_VC,
        survey:tech_assumption_VD,
        survey:tech_assumption_VE1,
        survey:tech_assumption_VE83,
        survey:tech_assumption_VH,
        survey:tech_assumption_VH5,
        survey:tech_assumption_VITO,
        survey:tech_assumption_VMG-A_B,
        survey:tech_assumption_VMG-C_D,
        survey:tech_assumption_VN127,
        survey:tech_assumption_VSA-L,
        survey:tech_assumption_VSS-F_B_C,
        survey:tech_assumption_VSS-F_D_E,
        survey:tech_assumption_VVA,
        survey:tech_assumption_W,
        survey:tech_assumption_W%282%29,
        survey:tech_assumption_W126,
        survey:tech_assumption_W140,
        survey:tech_assumption_W164_V251_W166,
        survey:tech_assumption_W169,
        survey:tech_assumption_W203,
        survey:tech_assumption_W204,
        survey:tech_assumption_W211,
        survey:tech_assumption_W212,
        survey:tech_assumption_W212%282%29,
        survey:tech_assumption_W220,
        survey:tech_assumption_W221,
        survey:tech_assumption_W222,
        survey:tech_assumption_W461,
        survey:tech_assumption_WEV,
        survey:tech_assumption_WK_WK2,
        survey:tech_assumption_WL-EV,
        survey:tech_assumption_WL-LCV,
        survey:tech_assumption_WMV,
        survey:tech_assumption_WORLD_A,
        survey:tech_assumption_WP,
        survey:tech_assumption_WP%282%29,
        survey:tech_assumption_WQ,
        survey:tech_assumption_WQ%282%29,
        survey:tech_assumption_WS1160,
        survey:tech_assumption_WT,
        survey:tech_assumption_WX-LT,
        survey:tech_assumption_Whale,
        survey:tech_assumption_X,
        survey:tech_assumption_X%282%29,
        survey:tech_assumption_X-PF,
        survey:tech_assumption_X06,
        survey:tech_assumption_X100,
        survey:tech_assumption_X2,
        survey:tech_assumption_X200,
        survey:tech_assumption_X24,
        survey:tech_assumption_X250,
        survey:tech_assumption_X3,
        survey:tech_assumption_X6,
        survey:tech_assumption_X61B,
        survey:tech_assumption_X62,
        survey:tech_assumption_X64,
        survey:tech_assumption_X65,
        survey:tech_assumption_X70,
        survey:tech_assumption_X83,
        survey:tech_assumption_XGA,
        survey:tech_assumption_XJS_X100,
        survey:tech_assumption_XL_BN,
        survey:tech_assumption_XMQ6520,
        survey:tech_assumption_XMQ6520%282%29,
        survey:tech_assumption_XP,
        survey:tech_assumption_X_X2,
        survey:tech_assumption_Xiaoyao,
        survey:tech_assumption_Y-CAR_Y1XX,
        survey:tech_assumption_Y60,
        survey:tech_assumption_Y62,
        survey:tech_assumption_YD,
        survey:tech_assumption_YF_YJ,
        survey:tech_assumption_YG,
        survey:tech_assumption_YM,
        survey:tech_assumption_YMB,
        survey:tech_assumption_YN,
        survey:tech_assumption_YR,
        survey:tech_assumption_YT4,
        survey:tech_assumption_YTQ,
        survey:tech_assumption_YW,
        survey:tech_assumption_YX,
        survey:tech_assumption_YX%282%29,
        survey:tech_assumption_Z0,
        survey:tech_assumption_Z1,
        survey:tech_assumption_Z3,
        survey:tech_assumption_Z6,
        survey:tech_assumption_ZB,
        survey:tech_assumption_ZERV,
        survey:tech_assumption_ZETA,
        survey:tech_assumption_ZK,
        survey:tech_assumption_ZK%282%29,
        survey:tech_assumption_ZL,
        survey:tech_assumption_ZTZ,
        survey:tech_assumption_ZZ,
        survey:tech_assumption_Zoox_1,
        survey:tech_assumption_e-GSP,
        survey:tech_assumption_e-HA,
        survey:tech_assumption_eK,
        survey:tech_assumption_eLCV,
        survey:tech_assumption_eM,
        survey:tech_assumption_eS,
        survey:tech_assumption_miniEV ;
    survey:methodologyDescription "Technology category classification based on documented assumptions about semiconductor process requirements" .

survey:Tier1CurrentDemand a survey:CurrentDemandAnalysis ;
    survey:hasAggregatedResult survey:Tier1CurrentDemand_BL1,
        survey:Tier1CurrentDemand_BL2 ;
    survey:hasMarketSegment survey:Automotive ;
    survey:hasSurveyOrigin survey:Tier1_Survey .

survey:Tier1DemandAnalysis a survey:CurrentDemandAnalysis ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance .

survey:Tier1FutureDemand survey:hasMarketSegment survey:Automotive .

survey:Tier1FutureDemand_Option1 a survey:FutureDemandAnalysis ;
    survey:hasAggregatedResult survey:Tier1FutureDemand_Option1_Current_Quarter_Quarter_0,
        survey:Tier1FutureDemand_Option1_Quarter_1,
        survey:Tier1FutureDemand_Option1_Quarter_2,
        survey:Tier1FutureDemand_Option1_Quarter_3,
        survey:Tier1FutureDemand_Option1_Quarter_4,
        survey:Tier1FutureDemand_Option1_Quarter_5,
        survey:Tier1FutureDemand_Option1_Quarter_6,
        survey:Tier1FutureDemand_Option1_Quarter_7 ;
    survey:hasSurveyOrigin survey:Tier1_Survey .

survey:Tier1FutureDemand_Option2 a survey:FutureDemandAnalysis ;
    survey:hasAggregatedResult survey:Tier1FutureDemand_Option2_Current_Quarter_Quarter_0,
        survey:Tier1FutureDemand_Option2_Quarter_1,
        survey:Tier1FutureDemand_Option2_Quarter_2,
        survey:Tier1FutureDemand_Option2_Quarter_3,
        survey:Tier1FutureDemand_Option2_Quarter_4,
        survey:Tier1FutureDemand_Option2_Quarter_5,
        survey:Tier1FutureDemand_Option2_Quarter_6,
        survey:Tier1FutureDemand_Option2_Quarter_7 ;
    survey:hasSurveyOrigin survey:Tier1_Survey .

survey:Tier1FutureDemand_Option3 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10-16_nm,
        survey:TechCategory_180-500_nm,
        survey:TechCategory_2-7_nm,
        survey:TechCategory_28-45_nm,
        survey:TechCategory_55-150_nm ;
    survey:hasAggregatedResult survey:Tier1FutureDemand_Option3_Current_Quarter_Quarter_0,
        survey:Tier1FutureDemand_Option3_Quarter_1,
        survey:Tier1FutureDemand_Option3_Quarter_2,
        survey:Tier1FutureDemand_Option3_Quarter_3,
        survey:Tier1FutureDemand_Option3_Quarter_4,
        survey:Tier1FutureDemand_Option3_Quarter_5,
        survey:Tier1FutureDemand_Option3_Quarter_6,
        survey:Tier1FutureDemand_Option3_Quarter_7 ;
    survey:hasSurveyOrigin survey:Tier1_Survey .

survey:analyzesTechnologyNode a rdf:Property ;
    rdfs:domain survey:Demand ;
    rdfs:range survey:TechnologyNode .

survey:analyzesTechnologyNodeName a rdf:Property,
        owl:DatatypeProperty ;
    rdfs:domain survey:TechnologyNode ;
    rdfs:range xsd:string .

survey:analyzesVehicleType a rdf:Property ;
    rdfs:domain survey:Demand ;
    rdfs:range survey:VehicleType .

survey:appliesToVehicleType a rdf:Property ;
    rdfs:domain survey:ConversionFactor ;
    rdfs:range survey:VehicleType .

survey:baselineType a rdf:Property,
        owl:DatatypeProperty ;
    rdfs:label "Baseline Type" ;
    rdfs:comment "Indicates the baseline type for the future demand analysis (e.g., Option1, Option2, Option3)." ;
    rdfs:domain survey:CurrentDemandAnalysis,
        survey:FutureDemandAnalysis ;
    rdfs:range xsd:string .

survey:conversionDescription a rdf:Property,
        owl:DatatypeProperty ;
    rdfs:domain survey:ConversionFactor ;
    rdfs:range xsd:string .

survey:conversionValue a rdf:Property,
        owl:DatatypeProperty ;
    rdfs:domain survey:ConversionFactor ;
    rdfs:range xsd:decimal .

survey:forTechnologyNode a rdf:Property ;
    rdfs:domain survey:Inventory,
        survey:OrderCancellation ;
    rdfs:range survey:InventoryDevelopment_Semi,
        survey:InventoryTargetIndicator_Semi,
        survey:OrderCancellationChange_Semi .

survey:forTimePeriod a rdf:Property ;
    rdfs:domain survey:VehicleSalesObservation ;
    rdfs:range survey:Month .

survey:hasAggregatedResult a rdf:Property ;
    rdfs:domain survey:Demand ;
    rdfs:range survey:AggregatedDemand .

survey:hasComponentTypeSplit a rdf:Property ;
    rdfs:domain survey:ComponentShare ;
    rdfs:range xsd:decimal .

survey:hasConversionFactor a rdf:Property ;
    rdfs:domain survey:TechnologyNode ;
    rdfs:range survey:ConversionFactor .

survey:hasDetail a rdf:Property ;
    rdfs:label "Has Detail" ;
    rdfs:comment "Links SAE Levels to their associated data entries." ;
    rdfs:domain survey:SAELevel ;
    rdfs:range survey:AutonomousDrivingDevelopment .

survey:hasFutureDemand a rdf:Property ;
    rdfs:domain survey:FutureDemandAnalysis ;
    rdfs:range survey:FutureDemandAnalysis .

survey:hasInventoryResponse a rdf:Property ;
    rdfs:domain survey:Tier1_Survey ;
    rdfs:range survey:InventoryDevelopment_Semi,
        survey:InventoryDevelopment_Tier1,
        survey:InventoryTargetIndicator_Semi .

survey:hasInventoryTrend a rdf:Property ;
    rdfs:domain survey:InventoryDevelopment_Semi,
        survey:InventoryDevelopment_Tier1 .

survey:hasMarketSegment a rdf:Property ;
    rdfs:domain survey:Demand ;
    rdfs:range survey:MarketSegment .

survey:hasOrderCancellation a rdf:Property ;
    rdfs:domain survey:Semiconductor_Survey ;
    rdfs:range survey:OrderCancellation .

survey:hasPercentage a rdf:Property,
        owl:DatatypeProperty ;
    rdfs:label "Percentage" ;
    rdfs:comment "The percentage value for SAE Level data." ;
    rdfs:domain survey:AutonomousDrivingDevelopment ;
    rdfs:range xsd:decimal .

survey:hasResponse a rdf:Property ;
    rdfs:domain survey:Demand ;
    rdfs:range survey:DemandResponse .

survey:hasResponseType a rdf:Property ;
    rdfs:domain survey:OrderCancellation,
        survey:SemiconductorShortage .

survey:hasSAELevel a rdf:Property ;
    rdfs:label "Has SAE Level" ;
    rdfs:comment "Links a Vehicle Type to its associated SAE Levels." ;
    rdfs:domain survey:VehicleType ;
    rdfs:range survey:SAELevel .

survey:hasSurveyOrigin a rdf:Property ;
    rdfs:domain survey:DemandResponse ;
    rdfs:range survey:Survey .

survey:hasTargetIndicator a rdf:Property ;
    rdfs:domain survey:InventoryTargetIndicator_Semi .

survey:hasTechnologyNode a rdf:Property ;
    rdfs:range survey:TechnologyNode .

survey:hasVehicleType a rdf:Property ;
    rdfs:label "Has Vehicle Type" ;
    rdfs:comment "Links an AutonomousDrivingDevelopment subclass to its associated Vehicle Types." ;
    rdfs:domain survey:AutonomousDrivingDevelopment ;
    rdfs:range survey:VehicleType .

survey:hasYear a rdf:Property,
        owl:DatatypeProperty ;
    rdfs:label "Year" ;
    rdfs:comment "The year associated with the percentage value." ;
    rdfs:domain survey:AutonomousDrivingDevelopment ;
    rdfs:range xsd:integer .

survey:inRegion a rdf:Property ;
    rdfs:domain survey:DemandForRegion ;
    rdfs:range survey:Region .

survey:inventoryTrend a rdf:Property ;
    rdfs:label "Inventory Trend" ;
    rdfs:comment "Specifies the trend associated with inventory (e.g., Increase, Decrease, Stable)." ;
    rdfs:domain survey:InventoryDevelopment_Tier1 ;
    rdfs:range xsd:string .

survey:isActiveInCategory a rdf:Property ;
    rdfs:domain survey:ComponentShare_Tier1 ;
    rdfs:range xsd:integer .

survey:isAggregatedResult a rdf:Property,
        owl:DatatypeProperty ;
    rdfs:domain survey:AggregatedDemand ;
    rdfs:range xsd:boolean .

survey:observedInMarket a rdf:Property .

survey:participantCount a rdf:Property ;
    rdfs:domain survey:Inventory,
        survey:OrderCancellation ;
    rdfs:range xsd:integer .

survey:percentageChange a rdf:Property ;
    rdfs:domain survey:Demand ;
    rdfs:range xsd:decimal .

survey:percentageChangeBL1 a rdf:Property,
        owl:DatatypeProperty ;
    rdfs:label "Percentage Change to BL1" ;
    rdfs:comment "The percentage change in demand compared to Baseline 1 (last month)." ;
    rdfs:domain survey:CurrentDemandAnalysis ;
    rdfs:range xsd:decimal .

survey:percentageChangeBL2 a rdf:Property,
        owl:DatatypeProperty ;
    rdfs:label "Percentage Change to BL2" ;
    rdfs:comment "The percentage change in demand compared to Baseline 2 (last 12 months)." ;
    rdfs:domain survey:CurrentDemandAnalysis ;
    rdfs:range xsd:decimal .

survey:periodLabel a rdf:Property,
        owl:DatatypeProperty ;
    rdfs:domain survey:Month ;
    rdfs:range xsd:string .

survey:quarter a rdf:Property,
        owl:DatatypeProperty ;
    rdfs:domain survey:DemandForRegion ;
    rdfs:range xsd:string .

survey:targetIndicatorStatus a rdf:Property ;
    rdfs:label "Inventory Target Indicator Status" ;
    rdfs:comment "Specifies the inventory target indicator status (e.g., AtTarget, AboveTarget, BelowTarget)." ;
    rdfs:domain survey:InventoryTargetIndicator_Semi ;
    rdfs:range xsd:string .

survey:technologyDescription a rdf:Property,
        owl:DatatypeProperty ;
    rdfs:domain survey:TechnologyNode ;
    rdfs:range xsd:string .

survey:totalDemand a rdf:Property,
        owl:DatatypeProperty ;
    rdfs:domain survey:DemandForRegion ;
    rdfs:range xsd:decimal .

survey:totalDemandPercentageChange a rdf:Property,
        owl:DatatypeProperty ;
    rdfs:domain survey:FutureRegionalDemand ;
    rdfs:range xsd:decimal .

survey:unitsSold a rdf:Property,
        owl:DatatypeProperty ;
    rdfs:domain survey:VehicleSalesObservation ;
    rdfs:range xsd:integer .

survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_1_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.22 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_1_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.42 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_1_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_2_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.32 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_2_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.52 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_2_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.72 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_3_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.42 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_3_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_3_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.82 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_4_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.52 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_4_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.72 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_4_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.92 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_5_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_5_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.82 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_OEM_BEHV_SAE_Level_5_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 1.02 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_1_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.22 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_1_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.42 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_1_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_2_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.32 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_2_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.52 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_2_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.72 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_3_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.42 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_3_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_3_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.82 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_4_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.52 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_4_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.72 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_4_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.92 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_5_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_5_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.82 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_OEM_BEV_SAE_Level_5_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 1.02 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_1_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.22 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_1_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.42 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_1_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_2_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.32 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_2_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.52 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_2_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.72 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_3_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.42 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_3_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_3_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.82 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_4_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.52 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_4_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.72 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_4_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.92 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_5_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_5_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.82 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_OEM_ICE_SAE_Level_5_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 1.02 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_1_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.22 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_1_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.42 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_1_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_2_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.32 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_2_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.52 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_2_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.72 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_3_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.42 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_3_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_3_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.82 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_4_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.52 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_4_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.72 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_4_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.92 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_5_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_5_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.82 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_Tier1_BEHV_SAE_Level_5_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 1.02 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:BEHV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_1_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.22 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_1_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.42 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_1_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_2_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.32 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_2_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.52 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_2_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.72 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_3_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.42 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_3_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_3_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.82 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_4_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.52 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_4_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.72 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_4_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.92 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_5_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_5_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.82 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_Tier1_BEV_SAE_Level_5_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 1.02 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:BEV ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_1_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.22 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_1_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.42 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_1_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_1 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_2_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.32 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_2_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.52 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_2_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.72 ;
    survey:hasSAELevel survey:SAE_Level_2 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_3_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.42 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_3_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_3_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.82 ;
    survey:hasSAELevel survey:SAE_Level_3 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_4_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.52 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_4_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.72 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_4_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.92 ;
    survey:hasSAELevel survey:SAE_Level_4 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2028 .

survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_5_Year_2026 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.62 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2026 .

survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_5_Year_2027 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 0.82 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2027 .

survey:AutonomousDrivingDevelopment_Tier1_ICE_SAE_Level_5_Year_2028 a survey:AutonomousDrivingDevelopment ;
    survey:hasPercentage 1.02 ;
    survey:hasSAELevel survey:SAE_Level_5 ;
    survey:hasVehicleType survey:ICE ;
    survey:hasYear 2028 .

survey:ConvFactor_10-16_nm_BEHV a survey:ConversionFactor ;
    survey:appliesToVehicleType survey:BEHV ;
    survey:conversionDescription "Conversion factor for 10-16 nm technology in BEHV vehicles" ;
    survey:conversionValue 1.26 .

survey:ConvFactor_10-16_nm_BEV a survey:ConversionFactor ;
    survey:appliesToVehicleType survey:BEV ;
    survey:conversionDescription "Conversion factor for 10-16 nm technology in BEV vehicles" ;
    survey:conversionValue 1.76 .

survey:ConvFactor_10-16_nm_ICE a survey:ConversionFactor ;
    survey:appliesToVehicleType survey:ICE ;
    survey:conversionDescription "Conversion factor for 10-16 nm technology in ICE vehicles" ;
    survey:conversionValue 1.98 .

survey:ConvFactor_180-500_nm_BEHV a survey:ConversionFactor ;
    survey:appliesToVehicleType survey:BEHV ;
    survey:conversionDescription "Conversion factor for 180-500 nm technology in BEHV vehicles" ;
    survey:conversionValue 0.74 .

survey:ConvFactor_180-500_nm_BEV a survey:ConversionFactor ;
    survey:appliesToVehicleType survey:BEV ;
    survey:conversionDescription "Conversion factor for 180-500 nm technology in BEV vehicles" ;
    survey:conversionValue 1.15 .

survey:ConvFactor_180-500_nm_ICE a survey:ConversionFactor ;
    survey:appliesToVehicleType survey:ICE ;
    survey:conversionDescription "Conversion factor for 180-500 nm technology in ICE vehicles" ;
    survey:conversionValue 0.78 .

survey:ConvFactor_2-7_nm_BEHV a survey:ConversionFactor ;
    survey:appliesToVehicleType survey:BEHV ;
    survey:conversionDescription "Conversion factor for 2-7 nm technology in BEHV vehicles" ;
    survey:conversionValue 1.04 .

survey:ConvFactor_2-7_nm_BEV a survey:ConversionFactor ;
    survey:appliesToVehicleType survey:BEV ;
    survey:conversionDescription "Conversion factor for 2-7 nm technology in BEV vehicles" ;
    survey:conversionValue 0.53 .

survey:ConvFactor_2-7_nm_ICE a survey:ConversionFactor ;
    survey:appliesToVehicleType survey:ICE ;
    survey:conversionDescription "Conversion factor for 2-7 nm technology in ICE vehicles" ;
    survey:conversionValue 1.1 .

survey:ConvFactor_28-45_nm_BEHV a survey:ConversionFactor ;
    survey:appliesToVehicleType survey:BEHV ;
    survey:conversionDescription "Conversion factor for 28-45 nm technology in BEHV vehicles" ;
    survey:conversionValue 0.7 .

survey:ConvFactor_28-45_nm_BEV a survey:ConversionFactor ;
    survey:appliesToVehicleType survey:BEV ;
    survey:conversionDescription "Conversion factor for 28-45 nm technology in BEV vehicles" ;
    survey:conversionValue 1.6 .

survey:ConvFactor_28-45_nm_ICE a survey:ConversionFactor ;
    survey:appliesToVehicleType survey:ICE ;
    survey:conversionDescription "Conversion factor for 28-45 nm technology in ICE vehicles" ;
    survey:conversionValue 1.15 .

survey:ConvFactor_55-150_nm_BEHV a survey:ConversionFactor ;
    survey:appliesToVehicleType survey:BEHV ;
    survey:conversionDescription "Conversion factor for 55-150 nm technology in BEHV vehicles" ;
    survey:conversionValue 0.56 .

survey:ConvFactor_55-150_nm_BEV a survey:ConversionFactor ;
    survey:appliesToVehicleType survey:BEV ;
    survey:conversionDescription "Conversion factor for 55-150 nm technology in BEV vehicles" ;
    survey:conversionValue 1.33 .

survey:ConvFactor_55-150_nm_ICE a survey:ConversionFactor ;
    survey:appliesToVehicleType survey:ICE ;
    survey:conversionDescription "Conversion factor for 55-150 nm technology in ICE vehicles" ;
    survey:conversionValue 0.71 .

survey:CurrentDemand_OEM_Americas a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:totalDemand 25.0 .

survey:CurrentDemand_OEM_Asia_Pacific_China a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:totalDemand 10.0 .

survey:CurrentDemand_OEM_Asia_Pacific_Other a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:totalDemand 15.0 .

survey:CurrentDemand_OEM_Europe a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:totalDemand 25.0 .

survey:CurrentDemand_OEM_Japan a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:OEM_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:totalDemand 25.0 .

survey:CurrentDemand_Semiconductor_Americas a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:totalDemand 17.5 .

survey:CurrentDemand_Semiconductor_Asia_Pacific_China a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:totalDemand 16.25 .

survey:CurrentDemand_Semiconductor_Asia_Pacific_Other a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:totalDemand 21.25 .

survey:CurrentDemand_Semiconductor_Europe a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:totalDemand 20.0 .

survey:CurrentDemand_Semiconductor_Japan a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Semiconductor_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:totalDemand 25.0 .

survey:CurrentDemand_Tier1_Americas a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAmericas ;
    survey:totalDemand 30.0 .

survey:CurrentDemand_Tier1_Asia_Pacific_China a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificChina ;
    survey:totalDemand 15.0 .

survey:CurrentDemand_Tier1_Asia_Pacific_Other a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionAsiaPacificOther ;
    survey:totalDemand 10.0 .

survey:CurrentDemand_Tier1_Europe a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionEurope ;
    survey:totalDemand 30.0 .

survey:CurrentDemand_Tier1_Japan a survey:DemandForRegion ;
    survey:hasSurveyOrigin survey:Tier1_Survey_Instance ;
    survey:inRegion survey:RegionJapan ;
    survey:totalDemand 15.0 .

survey:InventoryTarget_Aggregated_Semi_10nm_to_%3C28nm_Above_target a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:10nm_to_%3C28nm ;
    survey:participantCount 1.0 ;
    survey:targetIndicatorStatus "Above target"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_10nm_to_%3C28nm_At_target a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:10nm_to_%3C28nm ;
    survey:participantCount 0.0 ;
    survey:targetIndicatorStatus "At target"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_10nm_to_%3C28nm_Below_target a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:10nm_to_%3C28nm ;
    survey:participantCount 0.0 ;
    survey:targetIndicatorStatus "Below target"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_10nm_to_%3C28nm_SUM a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:10nm_to_%3C28nm ;
    survey:participantCount 1.0 ;
    survey:targetIndicatorStatus "SUM"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_180nm_or_greater_Above_target a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:180nm_or_greater ;
    survey:participantCount 1.0 ;
    survey:targetIndicatorStatus "Above target"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_180nm_or_greater_At_target a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:180nm_or_greater ;
    survey:participantCount 0.0 ;
    survey:targetIndicatorStatus "At target"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_180nm_or_greater_Below_target a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:180nm_or_greater ;
    survey:participantCount 0.0 ;
    survey:targetIndicatorStatus "Below target"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_180nm_or_greater_SUM a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:180nm_or_greater ;
    survey:participantCount 1.0 ;
    survey:targetIndicatorStatus "SUM"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_28nm_to_%3C45nm_Above_target a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:28nm_to_%3C45nm ;
    survey:participantCount 0.0 ;
    survey:targetIndicatorStatus "Above target"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_28nm_to_%3C45nm_At_target a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:28nm_to_%3C45nm ;
    survey:participantCount 0.0 ;
    survey:targetIndicatorStatus "At target"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_28nm_to_%3C45nm_Below_target a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:28nm_to_%3C45nm ;
    survey:participantCount 1.0 ;
    survey:targetIndicatorStatus "Below target"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_28nm_to_%3C45nm_SUM a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:28nm_to_%3C45nm ;
    survey:participantCount 1.0 ;
    survey:targetIndicatorStatus "SUM"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_55nm_to_180nm_Above_target a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:55nm_to_180nm ;
    survey:participantCount 0.0 ;
    survey:targetIndicatorStatus "Above target"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_55nm_to_180nm_At_target a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:55nm_to_180nm ;
    survey:participantCount 1.0 ;
    survey:targetIndicatorStatus "At target"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_55nm_to_180nm_Below_target a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:55nm_to_180nm ;
    survey:participantCount 0.0 ;
    survey:targetIndicatorStatus "Below target"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_55nm_to_180nm_SUM a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:55nm_to_180nm ;
    survey:participantCount 1.0 ;
    survey:targetIndicatorStatus "SUM"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_lte_7nm_Above_target a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:lte_7nm ;
    survey:participantCount 0.0 ;
    survey:targetIndicatorStatus "Above target"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_lte_7nm_At_target a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:lte_7nm ;
    survey:participantCount 1.0 ;
    survey:targetIndicatorStatus "At target"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_lte_7nm_Below_target a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:lte_7nm ;
    survey:participantCount 0.0 ;
    survey:targetIndicatorStatus "Below target"^^xsd:string .

survey:InventoryTarget_Aggregated_Semi_lte_7nm_SUM a survey:InventoryTargetIndicator_Semi ;
    survey:forTechnologyNode survey:lte_7nm ;
    survey:participantCount 1.0 ;
    survey:targetIndicatorStatus "SUM"^^xsd:string .

survey:InventoryTrend_Aggregated_Semi_10nm_to_%3C28nm_Decrease a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:10nm_to_%3C28nm ;
    survey:hasInventoryTrend survey:Decrease ;
    survey:participantCount 1.0 .

survey:InventoryTrend_Aggregated_Semi_10nm_to_%3C28nm_Increase a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:10nm_to_%3C28nm ;
    survey:hasInventoryTrend survey:Increase ;
    survey:participantCount 0.0 .

survey:InventoryTrend_Aggregated_Semi_10nm_to_%3C28nm_SUM a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:10nm_to_%3C28nm ;
    survey:hasInventoryTrend survey:Sum ;
    survey:participantCount 1.0 .

survey:InventoryTrend_Aggregated_Semi_10nm_to_%3C28nm_Stable a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:10nm_to_%3C28nm ;
    survey:hasInventoryTrend survey:Stable ;
    survey:participantCount 0.0 .

survey:InventoryTrend_Aggregated_Semi_180nm_or_greater_Decrease a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:180nm_or_greater ;
    survey:hasInventoryTrend survey:Decrease ;
    survey:participantCount 0.0 .

survey:InventoryTrend_Aggregated_Semi_180nm_or_greater_Increase a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:180nm_or_greater ;
    survey:hasInventoryTrend survey:Increase ;
    survey:participantCount 0.0 .

survey:InventoryTrend_Aggregated_Semi_180nm_or_greater_SUM a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:180nm_or_greater ;
    survey:hasInventoryTrend survey:Sum ;
    survey:participantCount 1.0 .

survey:InventoryTrend_Aggregated_Semi_180nm_or_greater_Stable a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:180nm_or_greater ;
    survey:hasInventoryTrend survey:Stable ;
    survey:participantCount 1.0 .

survey:InventoryTrend_Aggregated_Semi_28nm_to_%3C45nm_Decrease a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:28nm_to_%3C45nm ;
    survey:hasInventoryTrend survey:Decrease ;
    survey:participantCount 0.0 .

survey:InventoryTrend_Aggregated_Semi_28nm_to_%3C45nm_Increase a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:28nm_to_%3C45nm ;
    survey:hasInventoryTrend survey:Increase ;
    survey:participantCount 0.0 .

survey:InventoryTrend_Aggregated_Semi_28nm_to_%3C45nm_SUM a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:28nm_to_%3C45nm ;
    survey:hasInventoryTrend survey:Sum ;
    survey:participantCount 1.0 .

survey:InventoryTrend_Aggregated_Semi_28nm_to_%3C45nm_Stable a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:28nm_to_%3C45nm ;
    survey:hasInventoryTrend survey:Stable ;
    survey:participantCount 1.0 .

survey:InventoryTrend_Aggregated_Semi_55nm_to_180nm_Decrease a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:55nm_to_180nm ;
    survey:hasInventoryTrend survey:Decrease ;
    survey:participantCount 0.0 .

survey:InventoryTrend_Aggregated_Semi_55nm_to_180nm_Increase a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:55nm_to_180nm ;
    survey:hasInventoryTrend survey:Increase ;
    survey:participantCount 1.0 .

survey:InventoryTrend_Aggregated_Semi_55nm_to_180nm_SUM a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:55nm_to_180nm ;
    survey:hasInventoryTrend survey:Sum ;
    survey:participantCount 1.0 .

survey:InventoryTrend_Aggregated_Semi_55nm_to_180nm_Stable a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:55nm_to_180nm ;
    survey:hasInventoryTrend survey:Stable ;
    survey:participantCount 0.0 .

survey:InventoryTrend_Aggregated_Semi_lte_7nm_Decrease a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:lte_7nm ;
    survey:hasInventoryTrend survey:Decrease ;
    survey:participantCount 0.0 .

survey:InventoryTrend_Aggregated_Semi_lte_7nm_Increase a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:lte_7nm ;
    survey:hasInventoryTrend survey:Increase ;
    survey:participantCount 1.0 .

survey:InventoryTrend_Aggregated_Semi_lte_7nm_SUM a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:lte_7nm ;
    survey:hasInventoryTrend survey:Sum ;
    survey:participantCount 1.0 .

survey:InventoryTrend_Aggregated_Semi_lte_7nm_Stable a survey:InventoryDevelopment_Semi ;
    survey:forTechnologyNode survey:lte_7nm ;
    survey:hasInventoryTrend survey:Stable ;
    survey:participantCount 0.0 .

survey:OEMCurrentDemand_BEHV a survey:CurrentDemandAnalysis ;
    survey:analyzesVehicleType survey:VehicleType_BEHV ;
    survey:percentageChangeBL1 6.0 ;
    survey:percentageChangeBL2 4.34 .

survey:OEMCurrentDemand_BEV a survey:CurrentDemandAnalysis ;
    survey:analyzesVehicleType survey:VehicleType_BEV ;
    survey:percentageChangeBL1 5.0 ;
    survey:percentageChangeBL2 -1.04 .

survey:OEMCurrentDemand_ICE a survey:CurrentDemandAnalysis ;
    survey:analyzesVehicleType survey:VehicleType_ICE ;
    survey:percentageChangeBL1 7.0 ;
    survey:percentageChangeBL2 5.89 .

survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Current_Quarter ;
    survey:percentageChange 9.85 .

survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2026 ;
    survey:percentageChange -3.96 .

survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2027 ;
    survey:percentageChange 10.65 .

survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2026 ;
    survey:percentageChange 12.4 .

survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2027 ;
    survey:percentageChange 7.36 .

survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2026 ;
    survey:percentageChange 0.73 .

survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2027 ;
    survey:percentageChange 4.67 .

survey:OEMFutureDemand_Option1_BEHV_Uture_Demand_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q4_2026 ;
    survey:percentageChange 1.93 .

survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Current_Quarter ;
    survey:percentageChange 9.03 .

survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2026 ;
    survey:percentageChange -2.02 .

survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2027 ;
    survey:percentageChange 11.85 .

survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2026 ;
    survey:percentageChange 13.67 .

survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2027 ;
    survey:percentageChange 7.93 .

survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2026 ;
    survey:percentageChange -0.37 .

survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2027 ;
    survey:percentageChange 3.21 .

survey:OEMFutureDemand_Option1_BEV_Uture_Demand_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q4_2026 ;
    survey:percentageChange 1.93 .

survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Current_Quarter ;
    survey:percentageChange 8.51 .

survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2026 ;
    survey:percentageChange -3.11 .

survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2027 ;
    survey:percentageChange 11.81 .

survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2026 ;
    survey:percentageChange 14.25 .

survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2027 ;
    survey:percentageChange 7.1 .

survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2026 ;
    survey:percentageChange -1.19 .

survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2027 ;
    survey:percentageChange 2.89 .

survey:OEMFutureDemand_Option1_ICE_Uture_Demand_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q4_2026 ;
    survey:percentageChange 1.81 .

survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Current_Quarter ;
    survey:percentageChange 9.85 .

survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2026 ;
    survey:percentageChange -3.96 .

survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2027 ;
    survey:percentageChange 10.65 .

survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2026 ;
    survey:percentageChange 12.4 .

survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2027 ;
    survey:percentageChange 7.36 .

survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2026 ;
    survey:percentageChange 0.73 .

survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2027 ;
    survey:percentageChange 4.67 .

survey:OEMFutureDemand_Option2_BEHV_Uture_Demand_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q4_2026 ;
    survey:percentageChange 1.93 .

survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Current_Quarter ;
    survey:percentageChange 9.03 .

survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2026 ;
    survey:percentageChange -2.02 .

survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2027 ;
    survey:percentageChange 11.85 .

survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2026 ;
    survey:percentageChange 13.67 .

survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2027 ;
    survey:percentageChange 7.93 .

survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2026 ;
    survey:percentageChange -0.37 .

survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2027 ;
    survey:percentageChange 3.21 .

survey:OEMFutureDemand_Option2_BEV_Uture_Demand_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q4_2026 ;
    survey:percentageChange 1.93 .

survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Current_Quarter ;
    survey:percentageChange 8.51 .

survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2026 ;
    survey:percentageChange -3.11 .

survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2027 ;
    survey:percentageChange 11.81 .

survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2026 ;
    survey:percentageChange 14.25 .

survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2027 ;
    survey:percentageChange 7.1 .

survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2026 ;
    survey:percentageChange -1.19 .

survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2027 ;
    survey:percentageChange 2.89 .

survey:OEMFutureDemand_Option2_ICE_Uture_Demand_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q4_2026 ;
    survey:percentageChange 1.81 .

survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Current_Quarter ;
    survey:percentageChange 9.85 .

survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2026 ;
    survey:percentageChange -3.96 .

survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2027 ;
    survey:percentageChange 10.65 .

survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2026 ;
    survey:percentageChange 12.4 .

survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2027 ;
    survey:percentageChange 7.36 .

survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2026 ;
    survey:percentageChange 0.73 .

survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2027 ;
    survey:percentageChange 4.67 .

survey:OEMFutureDemand_Option3_BEHV_Uture_Demand_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEHV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q4_2026 ;
    survey:percentageChange 1.93 .

survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Current_Quarter ;
    survey:percentageChange 9.03 .

survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2026 ;
    survey:percentageChange -2.02 .

survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2027 ;
    survey:percentageChange 11.85 .

survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2026 ;
    survey:percentageChange 13.67 .

survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2027 ;
    survey:percentageChange 7.93 .

survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2026 ;
    survey:percentageChange -0.37 .

survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2027 ;
    survey:percentageChange 3.21 .

survey:OEMFutureDemand_Option3_BEV_Uture_Demand_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_BEV ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q4_2026 ;
    survey:percentageChange 1.93 .

survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Current_Quarter ;
    survey:percentageChange 8.51 .

survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2026 ;
    survey:percentageChange -3.11 .

survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q1_2027 ;
    survey:percentageChange 11.81 .

survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2026 ;
    survey:percentageChange 14.25 .

survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q2_2027 ;
    survey:percentageChange 7.1 .

survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2026 ;
    survey:percentageChange -1.19 .

survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q3_2027 ;
    survey:percentageChange 2.89 .

survey:OEMFutureDemand_Option3_ICE_Uture_Demand_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesVehicleType survey:ICE,
        survey:VehicleType_ICE ;
    survey:forTimePeriod survey:Quarter_Uture_Demand_Q4_2026 ;
    survey:percentageChange 1.81 .

survey:SemiCurrentDemand_%3C%3D_7nm a survey:CurrentDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:percentageChangeBL1 11.11 ;
    survey:percentageChangeBL2 -9.09 .

survey:SemiCurrentDemand_10nm_to_%3C28nm a survey:CurrentDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:percentageChangeBL1 -4.76 ;
    survey:percentageChangeBL2 5.26 .

survey:SemiCurrentDemand_180nm_or_greater a survey:CurrentDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:percentageChangeBL1 5.88 ;
    survey:percentageChangeBL2 3.85 .

survey:SemiCurrentDemand_28nm_to_%3C45nm a survey:CurrentDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:percentageChangeBL1 21.05 ;
    survey:percentageChangeBL2 4.55 .

survey:SemiCurrentDemand_55nm_to_180nm a survey:CurrentDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:percentageChangeBL1 -4.76 ;
    survey:percentageChangeBL2 -2.44 .

survey:SemiFutureDemand_Option1_%3C%3D_7nm_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Current_Quarter ;
    survey:percentageChange 9.09 .

survey:SemiFutureDemand_Option1_%3C%3D_7nm_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q1_2026 ;
    survey:percentageChange 55.56 .

survey:SemiFutureDemand_Option1_%3C%3D_7nm_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q1_2027 ;
    survey:percentageChange 11.85 .

survey:SemiFutureDemand_Option1_%3C%3D_7nm_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q2_2026 ;
    survey:percentageChange -21.43 .

survey:SemiFutureDemand_Option1_%3C%3D_7nm_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q2_2027 ;
    survey:percentageChange 18.18 .

survey:SemiFutureDemand_Option1_%3C%3D_7nm_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q3_2026 ;
    survey:percentageChange 23.08 .

survey:SemiFutureDemand_Option1_%3C%3D_7nm_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q3_2027 ;
    survey:percentageChange 12.5 .

survey:SemiFutureDemand_Option1_%3C%3D_7nm_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q4_2026 ;
    survey:percentageChange 1.93 .

survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Current_Quarter ;
    survey:percentageChange -4.35 .

survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q1_2026 ;
    survey:percentageChange 13.04 .

survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q1_2027 ;
    survey:percentageChange 4.17 .

survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q2_2026 ;
    survey:percentageChange -8.33 .

survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q2_2027 ;
    survey:percentageChange 3.03 .

survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q3_2026 ;
    survey:percentageChange 13.04 .

survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q3_2027 ;
    survey:percentageChange 7.69 .

survey:SemiFutureDemand_Option1_10nm_to_%3C28nm_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q4_2026 ;
    survey:percentageChange 4.55 .

survey:SemiFutureDemand_Option1_180nm_or_greater_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Current_Quarter ;
    survey:percentageChange 42.86 .

survey:SemiFutureDemand_Option1_180nm_or_greater_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q1_2026 ;
    survey:percentageChange 50.0 .

survey:SemiFutureDemand_Option1_180nm_or_greater_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q1_2027 ;
    survey:percentageChange 25.0 .

survey:SemiFutureDemand_Option1_180nm_or_greater_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q2_2026 ;
    survey:percentageChange 55.56 .

survey:SemiFutureDemand_Option1_180nm_or_greater_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q2_2027 ;
    survey:percentageChange 21.43 .

survey:SemiFutureDemand_Option1_180nm_or_greater_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q3_2026 ;
    survey:percentageChange 31.43 .

survey:SemiFutureDemand_Option1_180nm_or_greater_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q3_2027 ;
    survey:percentageChange 16.67 .

survey:SemiFutureDemand_Option1_180nm_or_greater_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q4_2026 ;
    survey:percentageChange 40.0 .

survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Current_Quarter ;
    survey:percentageChange 20.0 .

survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q1_2026 ;
    survey:percentageChange 31.58 .

survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q1_2027 ;
    survey:percentageChange 8.0 .

survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q2_2026 ;
    survey:percentageChange 8.7 .

survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q2_2027 ;
    survey:percentageChange 7.93 .

survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q3_2026 ;
    survey:percentageChange 16.0 .

survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q3_2027 ;
    survey:percentageChange 6.9 .

survey:SemiFutureDemand_Option1_28nm_to_%3C45nm_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q4_2026 ;
    survey:percentageChange 8.33 .

survey:SemiFutureDemand_Option1_55nm_to_180nm_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Current_Quarter ;
    survey:percentageChange 10.0 .

survey:SemiFutureDemand_Option1_55nm_to_180nm_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q1_2026 ;
    survey:percentageChange 3.62 .

survey:SemiFutureDemand_Option1_55nm_to_180nm_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q1_2027 ;
    survey:percentageChange -4.56 .

survey:SemiFutureDemand_Option1_55nm_to_180nm_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q2_2026 ;
    survey:percentageChange 7.41 .

survey:SemiFutureDemand_Option1_55nm_to_180nm_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q2_2027 ;
    survey:percentageChange -6.3 .

survey:SemiFutureDemand_Option1_55nm_to_180nm_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q3_2026 ;
    survey:percentageChange 7.41 .

survey:SemiFutureDemand_Option1_55nm_to_180nm_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q3_2027 ;
    survey:percentageChange -1.67 .

survey:SemiFutureDemand_Option1_55nm_to_180nm_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q4_2026 ;
    survey:percentageChange -3.64 .

survey:SemiFutureDemand_Option2_%3C%3D_7nm_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Current_Quarter ;
    survey:percentageChange 9.09 .

survey:SemiFutureDemand_Option2_%3C%3D_7nm_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q1_2026 ;
    survey:percentageChange 55.56 .

survey:SemiFutureDemand_Option2_%3C%3D_7nm_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q1_2027 ;
    survey:percentageChange 11.85 .

survey:SemiFutureDemand_Option2_%3C%3D_7nm_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q2_2026 ;
    survey:percentageChange -21.43 .

survey:SemiFutureDemand_Option2_%3C%3D_7nm_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q2_2027 ;
    survey:percentageChange 18.18 .

survey:SemiFutureDemand_Option2_%3C%3D_7nm_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q3_2026 ;
    survey:percentageChange 23.08 .

survey:SemiFutureDemand_Option2_%3C%3D_7nm_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q3_2027 ;
    survey:percentageChange 12.5 .

survey:SemiFutureDemand_Option2_%3C%3D_7nm_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q4_2026 ;
    survey:percentageChange 1.93 .

survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Current_Quarter ;
    survey:percentageChange -4.35 .

survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q1_2026 ;
    survey:percentageChange 13.04 .

survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q1_2027 ;
    survey:percentageChange 4.17 .

survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q2_2026 ;
    survey:percentageChange -8.33 .

survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q2_2027 ;
    survey:percentageChange 3.03 .

survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q3_2026 ;
    survey:percentageChange 13.04 .

survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q3_2027 ;
    survey:percentageChange 7.69 .

survey:SemiFutureDemand_Option2_10nm_to_%3C28nm_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q4_2026 ;
    survey:percentageChange 4.55 .

survey:SemiFutureDemand_Option2_180nm_or_greater_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Current_Quarter ;
    survey:percentageChange 42.86 .

survey:SemiFutureDemand_Option2_180nm_or_greater_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q1_2026 ;
    survey:percentageChange 50.0 .

survey:SemiFutureDemand_Option2_180nm_or_greater_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q1_2027 ;
    survey:percentageChange 25.0 .

survey:SemiFutureDemand_Option2_180nm_or_greater_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q2_2026 ;
    survey:percentageChange 55.56 .

survey:SemiFutureDemand_Option2_180nm_or_greater_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q2_2027 ;
    survey:percentageChange 21.43 .

survey:SemiFutureDemand_Option2_180nm_or_greater_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q3_2026 ;
    survey:percentageChange 31.43 .

survey:SemiFutureDemand_Option2_180nm_or_greater_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q3_2027 ;
    survey:percentageChange 16.67 .

survey:SemiFutureDemand_Option2_180nm_or_greater_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q4_2026 ;
    survey:percentageChange 40.0 .

survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Current_Quarter ;
    survey:percentageChange 20.0 .

survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q1_2026 ;
    survey:percentageChange 31.58 .

survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q1_2027 ;
    survey:percentageChange 8.0 .

survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q2_2026 ;
    survey:percentageChange 8.7 .

survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q2_2027 ;
    survey:percentageChange 7.93 .

survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q3_2026 ;
    survey:percentageChange 16.0 .

survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q3_2027 ;
    survey:percentageChange 6.9 .

survey:SemiFutureDemand_Option2_28nm_to_%3C45nm_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q4_2026 ;
    survey:percentageChange 8.33 .

survey:SemiFutureDemand_Option2_55nm_to_180nm_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Current_Quarter ;
    survey:percentageChange 10.0 .

survey:SemiFutureDemand_Option2_55nm_to_180nm_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q1_2026 ;
    survey:percentageChange 3.62 .

survey:SemiFutureDemand_Option2_55nm_to_180nm_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q1_2027 ;
    survey:percentageChange -4.56 .

survey:SemiFutureDemand_Option2_55nm_to_180nm_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q2_2026 ;
    survey:percentageChange 7.41 .

survey:SemiFutureDemand_Option2_55nm_to_180nm_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q2_2027 ;
    survey:percentageChange -6.3 .

survey:SemiFutureDemand_Option2_55nm_to_180nm_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q3_2026 ;
    survey:percentageChange 7.41 .

survey:SemiFutureDemand_Option2_55nm_to_180nm_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q3_2027 ;
    survey:percentageChange -1.67 .

survey:SemiFutureDemand_Option2_55nm_to_180nm_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q4_2026 ;
    survey:percentageChange -3.64 .

survey:SemiFutureDemand_Option3_%3C%3D_7nm_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Current_Quarter ;
    survey:percentageChange 9.09 .

survey:SemiFutureDemand_Option3_%3C%3D_7nm_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q1_2026 ;
    survey:percentageChange 55.56 .

survey:SemiFutureDemand_Option3_%3C%3D_7nm_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q1_2027 ;
    survey:percentageChange 11.85 .

survey:SemiFutureDemand_Option3_%3C%3D_7nm_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q2_2026 ;
    survey:percentageChange -21.43 .

survey:SemiFutureDemand_Option3_%3C%3D_7nm_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q2_2027 ;
    survey:percentageChange 18.18 .

survey:SemiFutureDemand_Option3_%3C%3D_7nm_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q3_2026 ;
    survey:percentageChange 23.08 .

survey:SemiFutureDemand_Option3_%3C%3D_7nm_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q3_2027 ;
    survey:percentageChange 12.5 .

survey:SemiFutureDemand_Option3_%3C%3D_7nm_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_%3C%3D_7nm ;
    survey:forTimePeriod survey:Quarter_Q4_2026 ;
    survey:percentageChange 1.93 .

survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Current_Quarter ;
    survey:percentageChange -4.35 .

survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q1_2026 ;
    survey:percentageChange 13.04 .

survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q1_2027 ;
    survey:percentageChange 4.17 .

survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q2_2026 ;
    survey:percentageChange -8.33 .

survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q2_2027 ;
    survey:percentageChange 3.03 .

survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q3_2026 ;
    survey:percentageChange 13.04 .

survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q3_2027 ;
    survey:percentageChange 7.69 .

survey:SemiFutureDemand_Option3_10nm_to_%3C28nm_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_10nm_to_%3C28nm ;
    survey:forTimePeriod survey:Quarter_Q4_2026 ;
    survey:percentageChange 4.55 .

survey:SemiFutureDemand_Option3_180nm_or_greater_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Current_Quarter ;
    survey:percentageChange 42.86 .

survey:SemiFutureDemand_Option3_180nm_or_greater_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q1_2026 ;
    survey:percentageChange 50.0 .

survey:SemiFutureDemand_Option3_180nm_or_greater_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q1_2027 ;
    survey:percentageChange 25.0 .

survey:SemiFutureDemand_Option3_180nm_or_greater_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q2_2026 ;
    survey:percentageChange 55.56 .

survey:SemiFutureDemand_Option3_180nm_or_greater_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q2_2027 ;
    survey:percentageChange 21.43 .

survey:SemiFutureDemand_Option3_180nm_or_greater_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q3_2026 ;
    survey:percentageChange 31.43 .

survey:SemiFutureDemand_Option3_180nm_or_greater_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q3_2027 ;
    survey:percentageChange 16.67 .

survey:SemiFutureDemand_Option3_180nm_or_greater_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_180nm_or_greater ;
    survey:forTimePeriod survey:Quarter_Q4_2026 ;
    survey:percentageChange 40.0 .

survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Current_Quarter ;
    survey:percentageChange 20.0 .

survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q1_2026 ;
    survey:percentageChange 31.58 .

survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q1_2027 ;
    survey:percentageChange 8.0 .

survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q2_2026 ;
    survey:percentageChange 8.7 .

survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q2_2027 ;
    survey:percentageChange 7.93 .

survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q3_2026 ;
    survey:percentageChange 16.0 .

survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q3_2027 ;
    survey:percentageChange 6.9 .

survey:SemiFutureDemand_Option3_28nm_to_%3C45nm_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_28nm_to_%3C45nm ;
    survey:forTimePeriod survey:Quarter_Q4_2026 ;
    survey:percentageChange 8.33 .

survey:SemiFutureDemand_Option3_55nm_to_180nm_Current_Quarter a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Current_Quarter ;
    survey:percentageChange 10.0 .

survey:SemiFutureDemand_Option3_55nm_to_180nm_Q1_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q1_2026 ;
    survey:percentageChange 3.62 .

survey:SemiFutureDemand_Option3_55nm_to_180nm_Q1_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q1_2027 ;
    survey:percentageChange -4.56 .

survey:SemiFutureDemand_Option3_55nm_to_180nm_Q2_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q2_2026 ;
    survey:percentageChange 7.41 .

survey:SemiFutureDemand_Option3_55nm_to_180nm_Q2_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q2_2027 ;
    survey:percentageChange -6.3 .

survey:SemiFutureDemand_Option3_55nm_to_180nm_Q3_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q3_2026 ;
    survey:percentageChange 7.41 .

survey:SemiFutureDemand_Option3_55nm_to_180nm_Q3_2027 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q3_2027 ;
    survey:percentageChange -1.67 .

survey:SemiFutureDemand_Option3_55nm_to_180nm_Q4_2026 a survey:FutureDemandAnalysis ;
    survey:analyzesTechnologyNode survey:TechCategory_55nm_to_180nm ;
    survey:forTimePeriod survey:Quarter_Q4_2026 ;
    survey:percentageChange -3.64 .

survey:Tier1CurrentDemand_BL1 a survey:CurrentDemandAnalysis ;
    survey:baselineType "BL1" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 11.11 .

survey:Tier1CurrentDemand_BL2 a survey:CurrentDemandAnalysis ;
    survey:baselineType "BL2" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange -9.09 .

survey:Tier1FutureDemand_Option1_Current_Quarter_Quarter_0 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option1" ;
    survey:forTimePeriod "Current Quarter Quarter 0" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 9.09 .

survey:Tier1FutureDemand_Option1_Quarter_1 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option1" ;
    survey:forTimePeriod "Quarter 1" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 55.56 .

survey:Tier1FutureDemand_Option1_Quarter_2 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option1" ;
    survey:forTimePeriod "Quarter 2" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange -21.43 .

survey:Tier1FutureDemand_Option1_Quarter_3 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option1" ;
    survey:forTimePeriod "Quarter 3" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 23.08 .

survey:Tier1FutureDemand_Option1_Quarter_4 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option1" ;
    survey:forTimePeriod "Quarter 4" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 1.93 .

survey:Tier1FutureDemand_Option1_Quarter_5 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option1" ;
    survey:forTimePeriod "Quarter 5" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 11.85 .

survey:Tier1FutureDemand_Option1_Quarter_6 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option1" ;
    survey:forTimePeriod "Quarter 6" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 18.18 .

survey:Tier1FutureDemand_Option1_Quarter_7 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option1" ;
    survey:forTimePeriod "Quarter 7" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 12.5 .

survey:Tier1FutureDemand_Option2_Current_Quarter_Quarter_0 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option2" ;
    survey:forTimePeriod "Current Quarter Quarter 0" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 9.09 .

survey:Tier1FutureDemand_Option2_Quarter_1 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option2" ;
    survey:forTimePeriod "Quarter 1" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 55.56 .

survey:Tier1FutureDemand_Option2_Quarter_2 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option2" ;
    survey:forTimePeriod "Quarter 2" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange -21.43 .

survey:Tier1FutureDemand_Option2_Quarter_3 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option2" ;
    survey:forTimePeriod "Quarter 3" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 23.08 .

survey:Tier1FutureDemand_Option2_Quarter_4 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option2" ;
    survey:forTimePeriod "Quarter 4" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 1.93 .

survey:Tier1FutureDemand_Option2_Quarter_5 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option2" ;
    survey:forTimePeriod "Quarter 5" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 11.85 .

survey:Tier1FutureDemand_Option2_Quarter_6 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option2" ;
    survey:forTimePeriod "Quarter 6" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 18.18 .

survey:Tier1FutureDemand_Option2_Quarter_7 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option2" ;
    survey:forTimePeriod "Quarter 7" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 12.5 .

survey:Tier1FutureDemand_Option3_Current_Quarter_Quarter_0 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option3" ;
    survey:forTimePeriod "Current Quarter Quarter 0" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 9.09 .

survey:Tier1FutureDemand_Option3_Quarter_1 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option3" ;
    survey:forTimePeriod "Quarter 1" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 55.56 .

survey:Tier1FutureDemand_Option3_Quarter_2 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option3" ;
    survey:forTimePeriod "Quarter 2" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange -21.43 .

survey:Tier1FutureDemand_Option3_Quarter_3 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option3" ;
    survey:forTimePeriod "Quarter 3" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 23.08 .

survey:Tier1FutureDemand_Option3_Quarter_4 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option3" ;
    survey:forTimePeriod "Quarter 4" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 1.93 .

survey:Tier1FutureDemand_Option3_Quarter_5 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option3" ;
    survey:forTimePeriod "Quarter 5" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 11.85 .

survey:Tier1FutureDemand_Option3_Quarter_6 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option3" ;
    survey:forTimePeriod "Quarter 6" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 18.18 .

survey:Tier1FutureDemand_Option3_Quarter_7 a survey:FutureDemandAnalysis ;
    survey:baselineType "Option3" ;
    survey:forTimePeriod "Quarter 7" ;
    survey:hasMarketSegment survey:Automotive ;
    survey:percentageChange 12.5 .

survey:assumption_1061_SERIES survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: 1061 SERIES" .

survey:assumption_1118 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 1118" .

survey:assumption_178 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 178" .

survey:assumption_186 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 186" .

survey:assumption_2101 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 2101" .

survey:assumption_2108 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 2108" .

survey:assumption_2110 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 2110" .

survey:assumption_2121 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 2121" .

survey:assumption_2500 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 2500" .

survey:assumption_2500%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 2500(2)" .

survey:assumption_296N survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 296N" .

survey:assumption_2SA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 2SA" .

survey:assumption_2SD survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: 2SD" .

survey:assumption_2YA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 2YA" .

survey:assumption_300N survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 300N" .

survey:assumption_307 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 307" .

survey:assumption_307%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 307(2)" .

survey:assumption_3160 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 3160" .

survey:assumption_31XX_31XX-2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 31XX/31XX-2" .

survey:assumption_3302 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: 3302" .

survey:assumption_330N survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 330N" .

survey:assumption_370N survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 370N" .

survey:assumption_407%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 407(2)" .

survey:assumption_407_608_609 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 407/608/609" .

survey:assumption_414T survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 414T" .

survey:assumption_500N survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 500N" .

survey:assumption_560T_810T survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 560T/810T" .

survey:assumption_66L_21Z survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 66L/21Z" .

survey:assumption_670H_KF survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 670H/KF" .

survey:assumption_800 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 800" .

survey:assumption_800T survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 800T" .

survey:assumption_8C survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 8C" .

survey:assumption_970 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 970" .

survey:assumption_980 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: 980" .

survey:assumption_986_996_-_987_997 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 986/996 - 987/997" .

survey:assumption_9X1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: 9X1" .

survey:assumption_A survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: A" .

survey:assumption_A%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: A(2)" .

survey:assumption_A-SERIES survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: A-SERIES" .

survey:assumption_A0 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: A0" .

survey:assumption_A0%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: A0(2)" .

survey:assumption_A002 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: A002" .

survey:assumption_A100 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: A100" .

survey:assumption_A10_A24_A32 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: A10/A24/A32" .

survey:assumption_A30 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: A30" .

survey:assumption_A30%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: A30(2)" .

survey:assumption_AA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: AA" .

survey:assumption_AM survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: AM" .

survey:assumption_AM-RB survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: AM-RB" .

survey:assumption_AM800 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: AM800" .

survey:assumption_AMG.EA survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Default classification - no EV/hybrid indicators found" .

survey:assumption_AMP survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: AMP" .

survey:assumption_AM_EV survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EV" .

survey:assumption_AN_DN_ND survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: AN/DN/ND" .

survey:assumption_AP survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: AP" .

survey:assumption_APP survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: APP" .

survey:assumption_AP_UM_JR_JK_MB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: AP/UM/JR/JK/MB" .

survey:assumption_ATLAS survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: ATLAS" .

survey:assumption_AU survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: AU" .

survey:assumption_Alpine survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: Alpine" .

survey:assumption_Ampr survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Ampr" .

survey:assumption_B survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: B" .

survey:assumption_B%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: B(2)" .

survey:assumption_B-0 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: B-0" .

survey:assumption_B-SERIES survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: B-SERIES" .

survey:assumption_B-VX62 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: B-VX62" .

survey:assumption_B0 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: B0" .

survey:assumption_B1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: B1" .

survey:assumption_B2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: B2" .

survey:assumption_B2E survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: B2E" .

survey:assumption_B3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: B3" .

survey:assumption_B30 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: B30" .

survey:assumption_B30%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: B30(2)" .

survey:assumption_B6 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: B6" .

survey:assumption_BC survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BC" .

survey:assumption_BC300 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BC300" .

survey:assumption_BD_LD-100 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BD/LD-100" .

survey:assumption_BE survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: BE" .

survey:assumption_BE%282%29 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: BE(2)" .

survey:assumption_BE11 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: BE11" .

survey:assumption_BE21 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: BE21" .

survey:assumption_BE21%282%29 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: BE21(2)" .

survey:assumption_BE22 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: BE22" .

survey:assumption_BE22%282%29 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: BE22(2)" .

survey:assumption_BE91 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: BE91" .

survey:assumption_BEV-F survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EV" .

survey:assumption_BEV3_BEV_N survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: BEV3/BEV N" .

survey:assumption_BEV_Prime survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: BEV" .

survey:assumption_BF survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BF" .

survey:assumption_BF1 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: BF1" .

survey:assumption_BJ2020 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BJ2020" .

survey:assumption_BJ2022 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Basic utility vehicle platform with simple ICE systems" .

survey:assumption_BJ2022%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: BJ2022(2)" .

survey:assumption_BLP survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: BLP" .

survey:assumption_BLP%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: BLP(2)" .

survey:assumption_BLP-L survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BLP-L" .

survey:assumption_BLP-L%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BLP-L(2)" .

survey:assumption_BLUECAR survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BLUECAR" .

survey:assumption_BMA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BMA" .

survey:assumption_BMFA survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Default classification - no EV/hybrid indicators found" .

survey:assumption_BMFA%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BMFA(2)" .

survey:assumption_BMP survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: BMP" .

survey:assumption_BMP%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: BMP(2)" .

survey:assumption_BM_MD survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BM/MD" .

survey:assumption_BR-LT survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BR-LT" .

survey:assumption_BR-LT%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BR-LT(2)" .

survey:assumption_BR450 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BR450" .

survey:assumption_BR451 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: BR451" .

survey:assumption_BREMACH survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BREMACH" .

survey:assumption_BSN survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BSN" .

survey:assumption_BSP survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: BSP" .

survey:assumption_BSP%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: BSP(2)" .

survey:assumption_BT1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: BT1" .

survey:assumption_BUGATTI survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: BUGATTI" .

survey:assumption_BV1 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: BV1" .

survey:assumption_C survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: C" .

survey:assumption_C%282%29 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: C(2)" .

survey:assumption_C-5 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: C-5" .

survey:assumption_C-EV survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EV" .

survey:assumption_C-EVO_CUSW survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EV" .

survey:assumption_C1 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: C1" .

survey:assumption_C170 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: C170" .

survey:assumption_C199 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: C199" .

survey:assumption_C1XX_C1XX-2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: C1XX/C1XX-2" .

survey:assumption_C2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: C2" .

survey:assumption_C2_GE1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: C2/GE1" .

survey:assumption_C30 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: C30" .

survey:assumption_C30%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: C30(2)" .

survey:assumption_C6 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: C6" .

survey:assumption_CA1046 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CA1046" .

survey:assumption_CA1046%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CA1046(2)" .

survey:assumption_CA6300 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CA6300" .

survey:assumption_CANTER survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CANTER" .

survey:assumption_CB40 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CB40" .

survey:assumption_CCA survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: CCA" .

survey:assumption_CD survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CD" .

survey:assumption_CD-EU survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: CD-EU" .

survey:assumption_CD1-3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CD1-3" .

survey:assumption_CD4 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CD4" .

survey:assumption_CD6 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CD6" .

survey:assumption_CE survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: CE" .

survey:assumption_CE1 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: CE1" .

survey:assumption_CF-SERIES survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CF-SERIES" .

survey:assumption_CF4 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CF4" .

survey:assumption_CFT survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CFT" .

survey:assumption_CFT%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CFT(2)" .

survey:assumption_CH survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CH" .

survey:assumption_CHB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CHB" .

survey:assumption_CIVILIAN survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CIVILIAN" .

survey:assumption_CK survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CK" .

survey:assumption_CKZ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CKZ" .

survey:assumption_CL_MM survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CL/MM" .

survey:assumption_CL_MM%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CL/MM(2)" .

survey:assumption_CMA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Compact Modular Architecture used for Volvo/Geely hybrids" .

survey:assumption_CMF-A survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CMF-A" .

survey:assumption_CMF-B survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CMF-B" .

survey:assumption_CMF-C_D survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CMF-C/D" .

survey:assumption_CMF-C_D%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Default classification - no EV/hybrid indicators found" .

survey:assumption_CMF-EV survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EV" .

survey:assumption_CMP survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Common Modular Platform for multi-powertrain vehicles" .

survey:assumption_CMV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CMV" .

survey:assumption_CN2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CN2" .

survey:assumption_COASTER survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: COASTER" .

survey:assumption_CR survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CR" .

survey:assumption_CRRC survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CRRC" .

survey:assumption_CS survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CS" .

survey:assumption_CSP survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: CSP" .

survey:assumption_CUB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CUB" .

survey:assumption_CUB%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CUB(2)" .

survey:assumption_CV-L survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CV-L" .

survey:assumption_CV9 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CV9" .

survey:assumption_CX survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CX" .

survey:assumption_CXV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CXV" .

survey:assumption_CZ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CZ" .

survey:assumption_C_D survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: C/D" .

survey:assumption_C_Q survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: C/Q" .

survey:assumption_Ceer survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Ceer" .

survey:assumption_Compact_Main_Platform survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Compact Main Platform" .

survey:assumption_Cybertruck survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: Cybertruck" .

survey:assumption_D survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: D" .

survey:assumption_D%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: D(2)" .

survey:assumption_D-5 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: D-5" .

survey:assumption_D-XEV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: D-XEV" .

survey:assumption_D01A survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: D01A" .

survey:assumption_D186 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: D186" .

survey:assumption_D21 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: D21" .

survey:assumption_D2C_D5 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: D2C/D5" .

survey:assumption_D30 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: D30" .

survey:assumption_D3_D4 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: D3/D4" .

survey:assumption_D71A survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: D71A" .

survey:assumption_D8 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: D8" .

survey:assumption_D91B survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: D91B" .

survey:assumption_DAILY survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DAILY" .

survey:assumption_DALLARA survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: DALLARA" .

survey:assumption_DC1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DC1" .

survey:assumption_DC2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DC2" .

survey:assumption_DD1020_1022_1023 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DD1020/1022/1023" .

survey:assumption_DD6760_6751_6600 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DD6760/6751/6600" .

survey:assumption_DE30 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DE30" .

survey:assumption_DEFENDER survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DEFENDER" .

survey:assumption_DELIVERY survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DELIVERY" .

survey:assumption_DEV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DEV" .

survey:assumption_DF1 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: DF1" .

survey:assumption_DF1%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: DF1(2)" .

survey:assumption_DF2 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: DF2" .

survey:assumption_DF2%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: DF2(2)" .

survey:assumption_DFLT survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DFLT" .

survey:assumption_DI survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DI" .

survey:assumption_DI%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DI(2)" .

survey:assumption_DOST survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DOST" .

survey:assumption_DOST%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DOST(2)" .

survey:assumption_DR_DH survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DR/DH" .

survey:assumption_DSMA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DSMA" .

survey:assumption_DSMA%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DSMA(2)" .

survey:assumption_DS_DJ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DS/DJ" .

survey:assumption_DYNA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DYNA" .

survey:assumption_DYNA%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: DYNA(2)" .

survey:assumption_D_X_Z survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: D/X/Z" .

survey:assumption_David survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: David" .

survey:assumption_E survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: E" .

survey:assumption_E%2B survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: E+" .

survey:assumption_E-GMP survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Hyundai-Kia dedicated Electric Global Modular Platform" .

survey:assumption_E-LCV survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: E-LCV" .

survey:assumption_E-LTF survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: E-LTF" .

survey:assumption_E-Sports survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: E-Sports" .

survey:assumption_E0X survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "BMW dedicated EV platform" .

survey:assumption_E2 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: E2" .

survey:assumption_E46 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: E46" .

survey:assumption_E8 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: E8" .

survey:assumption_EA169 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: EA169" .

survey:assumption_EDISON survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EDISON" .

survey:assumption_EFC survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: EFC" .

survey:assumption_EF_MS survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EF/MS" .

survey:assumption_EICHER survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EICHER" .

survey:assumption_EICHER%5B2%5D survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EICHER[2]" .

survey:assumption_EJ survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EJ" .

survey:assumption_EL survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: EL" .

survey:assumption_ELF survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: ELF" .

survey:assumption_ELF-M survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: ELF-M" .

survey:assumption_ELISE survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: ELISE" .

survey:assumption_EMA survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Electric Modular Architecture for compact EVs" .

survey:assumption_EMA%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: EMA(2)" .

survey:assumption_EMP survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: EMP" .

survey:assumption_EMP2 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Efficient Modular Platform 2 supporting multiple powertrains" .

survey:assumption_EN53-114_FN145 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: EN53-114/FN145" .

survey:assumption_EP survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: EP" .

survey:assumption_EP1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: EP1" .

survey:assumption_EP2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: EP2" .

survey:assumption_EPA0 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EPA0" .

survey:assumption_EPA0%282%29 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EPA0(2)" .

survey:assumption_EPA1 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Dedicated EV platform for Ford Mustang Mach-E" .

survey:assumption_EPA1%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: EPA1(2)" .

survey:assumption_EPA2 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Ford dedicated EV platform for future models" .

survey:assumption_EPA2%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: EPA2(2)" .

survey:assumption_EPSILON survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: EPSILON" .

survey:assumption_ESSA survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: ESSA" .

survey:assumption_EV survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EV" .

survey:assumption_EV%282%29 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EV(2)" .

survey:assumption_EV%2B survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EV+" .

survey:assumption_EV1 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EV1" .

survey:assumption_EV2 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EV2" .

survey:assumption_EVA2 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Mercedes-Benz Electric Vehicle Architecture 2" .

survey:assumption_EVL survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EVL" .

survey:assumption_EX survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: EX" .

survey:assumption_E_SERIES survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: E" .

survey:assumption_Edward survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Edward" .

survey:assumption_Edward%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Edward(2)" .

survey:assumption_Elemental survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Elemental" .

survey:assumption_Evolution survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Evolution" .

survey:assumption_Extreme survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Extreme" .

survey:assumption_F survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: F" .

survey:assumption_F-SERIES survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: F-SERIES" .

survey:assumption_F1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: F1" .

survey:assumption_F2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: F2" .

survey:assumption_F5 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: F5" .

survey:assumption_F91 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: F91" .

survey:assumption_F91%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Default classification - no EV/hybrid indicators found" .

survey:assumption_FD survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FD" .

survey:assumption_FD%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FD(2)" .

survey:assumption_FERRARI_FR-L survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: FERRARI FR-L" .

survey:assumption_FERRARI_MR-L survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: FERRARI MR-L" .

survey:assumption_FF survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FF" .

survey:assumption_FF%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FF(2)" .

survey:assumption_FL survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FL" .

survey:assumption_FLT survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FLT" .

survey:assumption_FL_S-FR survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FL/S-FR" .

survey:assumption_FM29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FM29" .

survey:assumption_FMA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FMA" .

survey:assumption_FMA%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FMA(2)" .

survey:assumption_FME-A1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FME-A1" .

survey:assumption_FME-A2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FME-A2" .

survey:assumption_FME-A2%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FME-A2(2)" .

survey:assumption_FN74 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FN74" .

survey:assumption_FOMM survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: FOMM" .

survey:assumption_FORLAND survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Chinese commercial vehicle with conventional powertrain" .

survey:assumption_FR survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: FR" .

survey:assumption_FR-L survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FR-L" .

survey:assumption_FSQ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FSQ" .

survey:assumption_FX survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FX" .

survey:assumption_FY survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FY" .

survey:assumption_FZ6102 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FZ6102" .

survey:assumption_FlexEVan survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: FlexEVan" .

survey:assumption_Forland2 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: Forland2" .

survey:assumption_Forseven survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: Forseven" .

survey:assumption_Franklin survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: Franklin" .

survey:assumption_G survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: G" .

survey:assumption_G%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: G(2)" .

survey:assumption_GA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GA" .

survey:assumption_GA-B survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GA-B" .

survey:assumption_GA-C survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GA-C" .

survey:assumption_GA-C%282%29 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: C(2)" .

survey:assumption_GA-D survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GA-D" .

survey:assumption_GA-E survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GA-E" .

survey:assumption_GA-E%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GA-E(2)" .

survey:assumption_GA-F survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GA-F" .

survey:assumption_GA-K survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Toyota Global Architecture commonly used for hybrid vehicles" .

survey:assumption_GA-K%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GA-K(2)" .

survey:assumption_GA-L survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Toyota luxury platform with hybrid variants" .

survey:assumption_GAMMA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GAMMA" .

survey:assumption_GAZelle_Next survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: GAZelle Next" .

survey:assumption_GBC survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: GBC" .

survey:assumption_GBRC survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: GBRC" .

survey:assumption_GBRC%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GBRC(2)" .

survey:assumption_GCV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GCV" .

survey:assumption_GEA survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: GEA" .

survey:assumption_GEA%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GEA(2)" .

survey:assumption_GEC survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: GEC" .

survey:assumption_GEN_III survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GEN III" .

survey:assumption_GEP survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: GEP" .

survey:assumption_GEP%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: GEP(2)" .

survey:assumption_GH survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GH" .

survey:assumption_GHT1020S survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GHT1020S" .

survey:assumption_GHT1020S%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GHT1020S(2)" .

survey:assumption_GIO survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GIO" .

survey:assumption_GL survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GL" .

survey:assumption_GL-LCV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GL-LCV" .

survey:assumption_GL6590_GL6650_GL6700 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GL6590/GL6650/GL6700" .

survey:assumption_GLCA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GLCA" .

survey:assumption_GLOBAL_DELTA_D2XX survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GLOBAL DELTA/D2XX" .

survey:assumption_GLOBAL_EPSILON_E2XX survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GLOBAL EPSILON/E2XX" .

survey:assumption_GLOBAL_GAMMA_G2XX survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GLOBAL GAMMA/G2XX" .

survey:assumption_GLOBAL_MINI_M2XX survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GLOBAL MINI/M2XX" .

survey:assumption_GLTP survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GLTP" .

survey:assumption_GM survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GM" .

survey:assumption_GM2900 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GM2900" .

survey:assumption_GM3000 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GM3000" .

survey:assumption_GM4200 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GM4200" .

survey:assumption_GMC survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GMC" .

survey:assumption_GMT200_201 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GMT200/201" .

survey:assumption_GMT325_330 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GMT325/330" .

survey:assumption_GMT355_700 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: GMT355/700" .

survey:assumption_GMT360_370 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GMT360/370" .

survey:assumption_GMT600 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GMT600" .

survey:assumption_GMT610 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GMT610" .

survey:assumption_GMT800_900 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: GMT800/900" .

survey:assumption_GPMA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GPMA" .

survey:assumption_GPMA%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GPMA(2)" .

survey:assumption_GQ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GQ" .

survey:assumption_GS survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: GS" .

survey:assumption_GSC survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GSC" .

survey:assumption_GSE survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GSE" .

survey:assumption_GSE%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GSE(2)" .

survey:assumption_GSEV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GSEV" .

survey:assumption_GSEV%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: GSEV(2)" .

survey:assumption_GSP survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GSP" .

survey:assumption_GSP%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: GSP(2)" .

survey:assumption_GS_HF survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GS/HF" .

survey:assumption_GT survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GT" .

survey:assumption_GT%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GT(2)" .

survey:assumption_GTO survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GTO" .

survey:assumption_GTZ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GTZ" .

survey:assumption_GV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GV" .

survey:assumption_GV%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GV(2)" .

survey:assumption_GX survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GX" .

survey:assumption_GZ6590_GZ6700_GZ6750 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: GZ6590/GZ6700/GZ6750" .

survey:assumption_Gen7 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Gen7" .

survey:assumption_Giorgio_Giorgio_Global survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: Giorgio/Giorgio Global" .

survey:assumption_Global_Alpha_A2XX survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Global Alpha/A2XX" .

survey:assumption_Grace survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Grace" .

survey:assumption_H survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: H" .

survey:assumption_H%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: H(2)" .

survey:assumption_H-SERIES survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: H-SERIES" .

survey:assumption_H-SERIES%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: H-SERIES(2)" .

survey:assumption_H1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: H1" .

survey:assumption_H2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: H2" .

survey:assumption_HA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HA" .

survey:assumption_HB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HB" .

survey:assumption_HD survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HD" .

survey:assumption_HFC1061 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HFC1061" .

survey:assumption_HFC1061%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HFC1061(2)" .

survey:assumption_HFC6600_HFC6800 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HFC6600/HFC6800" .

survey:assumption_HFC6600_HFC6800%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HFC6600/HFC6800(2)" .

survey:assumption_HHR survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: HHR" .

survey:assumption_HIACE survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HIACE" .

survey:assumption_HK survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HK" .

survey:assumption_HM survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HM" .

survey:assumption_HMGA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HMGA" .

survey:assumption_HP survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HP" .

survey:assumption_HPA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HPA" .

survey:assumption_HPC survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HPC" .

survey:assumption_HSJ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HSJ" .

survey:assumption_HSJ%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: HSJ(2)" .

survey:assumption_Higer_PUP survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Higer PUP" .

survey:assumption_Howard survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: Howard" .

survey:assumption_IGPF survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: IGPF" .

survey:assumption_IKP1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: IKP1" .

survey:assumption_IMV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: IMV" .

survey:assumption_IMV%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: IMV(2)" .

survey:assumption_INGLO survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: INGLO" .

survey:assumption_IS survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: IS" .

survey:assumption_Ineos survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Ineos" .

survey:assumption_Ineos_EV survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EV" .

survey:assumption_J survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: J" .

survey:assumption_J1 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Default classification - no EV/hybrid indicators found" .

survey:assumption_J100 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: J100" .

survey:assumption_J25 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: J25" .

survey:assumption_J2_J3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: J2/J3" .

survey:assumption_J97 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: J97" .

survey:assumption_JEA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: JEA" .

survey:assumption_JEST survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: JEST" .

survey:assumption_JGM_JGM%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: JGM/JGM(2)" .

survey:assumption_JH survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: JH" .

survey:assumption_JHC survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: JHC" .

survey:assumption_JHC%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: JHC(2)" .

survey:assumption_JIEOU survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: JIEOU" .

survey:assumption_JIEOU%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: JIEOU(2)" .

survey:assumption_JK survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: JK" .

survey:assumption_JK_JL survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: JK/JL" .

survey:assumption_JLT survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: JLT" .

survey:assumption_JT survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: JT" .

survey:assumption_K survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: K" .

survey:assumption_K-Series survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: K-Series" .

survey:assumption_K0 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: K0" .

survey:assumption_K100_Y100 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: K100/Y100" .

survey:assumption_K100_Y100%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: K100/Y100(2)" .

survey:assumption_K1_K2-P1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: K1/K2-P1" .

survey:assumption_K1_K2-P2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: K1/K2-P2" .

survey:assumption_K1_K2-P3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: K1/K2-P3" .

survey:assumption_K2XX survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "GM full-size SUV platform primarily ICE" .

survey:assumption_K3_K4-P1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: K3/K4-P1" .

survey:assumption_K3_K4-P2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: K3/K4-P2" .

survey:assumption_K3_K4-P3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: K3/K4-P3" .

survey:assumption_KAPPA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: KAPPA" .

survey:assumption_KC_SG survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: KC/SG" .

survey:assumption_KEV survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: KEV" .

survey:assumption_KJ_KK survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: KJ/KK" .

survey:assumption_KM survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: KM" .

survey:assumption_KM%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: KM(2)" .

survey:assumption_KQC2 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: KQC2" .

survey:assumption_KZ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: KZ" .

survey:assumption_Kama survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Kama" .

survey:assumption_Kunlun survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Kunlun" .

survey:assumption_L survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: L" .

survey:assumption_L1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: L1" .

survey:assumption_L2 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: L2" .

survey:assumption_L200 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: L200" .

survey:assumption_L3 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: L3" .

survey:assumption_L4 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: L4" .

survey:assumption_L6 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: L6" .

survey:assumption_L7 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: L7" .

survey:assumption_LA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LA" .

survey:assumption_LAMBDA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LAMBDA" .

survey:assumption_LAMBORGHINI survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LAMBORGHINI" .

survey:assumption_LB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LB" .

survey:assumption_LC survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LC" .

survey:assumption_LCV1 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: LCV1" .

survey:assumption_LEVC-TX survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LEVC-TX" .

survey:assumption_LF1030 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LF1030" .

survey:assumption_LFA survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: LFA" .

survey:assumption_LG survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: LG" .

survey:assumption_LH survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LH" .

survey:assumption_LH%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LH(2)" .

survey:assumption_LH1040D survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LH1040D" .

survey:assumption_LIEBAO survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LIEBAO" .

survey:assumption_LJC1040_LJC1041 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LJC1040/LJC1041" .

survey:assumption_LK survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: LK" .

survey:assumption_LS survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LS" .

survey:assumption_LSB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LSB" .

survey:assumption_LST survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LST" .

survey:assumption_LTV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LTV" .

survey:assumption_LU survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: LU" .

survey:assumption_LX survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: LX" .

survey:assumption_Lada_B survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: B" .

survey:assumption_Li survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: Li" .

survey:assumption_Lingbox survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Lingbox" .

survey:assumption_Lingbox%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Lingbox(2)" .

survey:assumption_M survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M" .

survey:assumption_M%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M(2)" .

survey:assumption_M-M2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M-M2" .

survey:assumption_M-M2%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M-M2(2)" .

survey:assumption_M-SERIES survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M-SERIES" .

survey:assumption_M-Trix%2893%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M-Trix(93)" .

survey:assumption_M-Trix%2895%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M-Trix(95)" .

survey:assumption_M0 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M0" .

survey:assumption_M1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M1" .

survey:assumption_M100 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M100" .

survey:assumption_M1KA survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: M1KA" .

survey:assumption_M1X survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M1X" .

survey:assumption_M1X%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M1X(2)" .

survey:assumption_M1_M2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M1/M2" .

survey:assumption_M2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M2" .

survey:assumption_M3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M3" .

survey:assumption_M3X survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M3X" .

survey:assumption_M3X%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M3X(2)" .

survey:assumption_M3_M4 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M3/M4" .

survey:assumption_M49_M59 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M49/M59" .

survey:assumption_M6 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M6" .

survey:assumption_M80 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M80" .

survey:assumption_M8X survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: M8X" .

survey:assumption_MA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MA" .

survey:assumption_MAS survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MAS" .

survey:assumption_MASERATI survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: MASERATI" .

survey:assumption_MASERATI_Spaceframe survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: MASERATI" .

survey:assumption_MB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MB" .

survey:assumption_MB.EA survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Default classification - no EV/hybrid indicators found" .

survey:assumption_MB100 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MB100" .

survey:assumption_MC-C survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MC-C" .

survey:assumption_MC-M survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MC-M" .

survey:assumption_MCAR survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MCAR" .

survey:assumption_MCLA survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: MCLA" .

survey:assumption_ME survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: ME" .

survey:assumption_MEB survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Volkswagen Group Modular Electric Drive Matrix" .

survey:assumption_MEB_entry survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: MEB" .

survey:assumption_MFA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MFA" .

survey:assumption_MG survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MG" .

survey:assumption_MHA survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: MHA" .

survey:assumption_MI survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MI" .

survey:assumption_MIA survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: MIA" .

survey:assumption_MIFA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MIFA" .

survey:assumption_MIFA%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: MIFA(2)" .

survey:assumption_MIH survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MIH" .

survey:assumption_MILA survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: MILA" .

survey:assumption_MINICAB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MINICAB" .

survey:assumption_MINI_CUB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: CUB" .

survey:assumption_MIS survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MIS" .

survey:assumption_MIS%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MIS(2)" .

survey:assumption_MK survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MK" .

survey:assumption_MLA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MLA" .

survey:assumption_MLB3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MLB3" .

survey:assumption_MLB_B survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MLB" .

survey:assumption_MLB_C_D survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MLB" .

survey:assumption_MMA survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Default classification - no EV/hybrid indicators found" .

survey:assumption_MMB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MMB" .

survey:assumption_MNB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MNB" .

survey:assumption_MODEL_S survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: MODEL S" .

survey:assumption_MORGAN survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: MORGAN" .

survey:assumption_MORV survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: MORV" .

survey:assumption_MORV%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MORV(2)" .

survey:assumption_MPA0 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: MPA0" .

survey:assumption_MPA1 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: MPA1" .

survey:assumption_MPA1%282%29 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: MPA1(2)" .

survey:assumption_MPA2 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: MPA2" .

survey:assumption_MQB_A0 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MQB" .

survey:assumption_MQB_A_B survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MQB" .

survey:assumption_MQB_C survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MQB" .

survey:assumption_MR survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MR" .

survey:assumption_MRA_LARGE survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Default classification - no EV/hybrid indicators found" .

survey:assumption_MRA_MID-SIZE survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MRA MID-SIZE" .

survey:assumption_MS survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MS" .

survey:assumption_MS2000 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MS2000" .

survey:assumption_MSA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MSA" .

survey:assumption_MSB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MSB" .

survey:assumption_MSP survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MSP" .

survey:assumption_MUSE survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MUSE" .

survey:assumption_MUV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MUV" .

survey:assumption_MV1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: MV1" .

survey:assumption_Mann survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Mann" .

survey:assumption_Mengshi survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Mengshi" .

survey:assumption_Midsize survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Midsize" .

survey:assumption_Mission_R survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: R" .

survey:assumption_Mission_X survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X" .

survey:assumption_Mitsubishi_Z survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Mitsubishi Z" .

survey:assumption_Modena survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Modena" .

survey:assumption_Modern survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Modern" .

survey:assumption_N survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: N" .

survey:assumption_N%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: N(2)" .

survey:assumption_N1_N2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: N1/N2" .

survey:assumption_N3_N4 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: N3/N4" .

survey:assumption_N5_N6 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: N5/N6" .

survey:assumption_N800 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: N800" .

survey:assumption_N800%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: N800(2)" .

survey:assumption_NBC survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NBC" .

survey:assumption_NBC%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NBC(2)" .

survey:assumption_NCV2 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: NCV2" .

survey:assumption_NCV3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NCV3" .

survey:assumption_NCV4 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NCV4" .

survey:assumption_NE_IN_CO_UA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NE/IN/CO/UA" .

survey:assumption_NFA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NFA" .

survey:assumption_NF_CM survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NF/CM" .

survey:assumption_NGDV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NGDV" .

survey:assumption_NISSAN_JUNIOR survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NISSAN JUNIOR" .

survey:assumption_NJ1041_1061 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NJ1041/1061" .

survey:assumption_NK survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: NK" .

survey:assumption_NL survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NL" .

survey:assumption_NPB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NPB" .

survey:assumption_NPC survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NPC" .

survey:assumption_NPD survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NPD" .

survey:assumption_NPE survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NPE" .

survey:assumption_NPE%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NPE(2)" .

survey:assumption_NPL_PT survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NPL/PT" .

survey:assumption_NSC survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NSC" .

survey:assumption_NSX survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: NSX" .

survey:assumption_NU_029N_152N survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NU/029N/152N" .

survey:assumption_NV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NV" .

survey:assumption_NV2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NV2" .

survey:assumption_NZ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: NZ" .

survey:assumption_New_Gonow_LT survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: New Gonow LT" .

survey:assumption_New_Gonow_LT%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: New Gonow LT(2)" .

survey:assumption_OMEGA_O2XX survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: OMEGA/O2XX" .

survey:assumption_ONE_LITRE_CAR survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: ONE LITRE CAR" .

survey:assumption_OU%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: OU(2)" .

survey:assumption_P-SERIES survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: P-SERIES" .

survey:assumption_P11 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: P11" .

survey:assumption_P131_P356_P473 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: P131/P356/P473" .

survey:assumption_P2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: P2" .

survey:assumption_P4 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: P4" .

survey:assumption_P4%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: P4(2)" .

survey:assumption_P71 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: P71" .

survey:assumption_P71%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: P71(2)" .

survey:assumption_PAYKAN survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PAYKAN" .

survey:assumption_PC survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PC" .

survey:assumption_PEGASUS survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PEGASUS" .

survey:assumption_PETUNIA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PETUNIA" .

survey:assumption_PF-A survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PF-A" .

survey:assumption_PF-B survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PF-B" .

survey:assumption_PF-B%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PF-B(2)" .

survey:assumption_PF-C survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PF-C" .

survey:assumption_PF-CD survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PF-CD" .

survey:assumption_PF-D survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PF-D" .

survey:assumption_PF1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PF1" .

survey:assumption_PF2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PF2" .

survey:assumption_PF3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PF3" .

survey:assumption_PF7_PF7E survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PF7/PF7E" .

survey:assumption_PFE survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: PFE" .

survey:assumption_PHOENIX survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: PHOENIX" .

survey:assumption_PK5 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PK5" .

survey:assumption_PK5%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PK5(2)" .

survey:assumption_PL22 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PL22" .

survey:assumption_PL45 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PL45" .

survey:assumption_PL56 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PL56" .

survey:assumption_PL62 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: PL62" .

survey:assumption_PL71-72 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PL71-72" .

survey:assumption_PLA-D6a survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: PLA-D6a" .

survey:assumption_PLA-D7a survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: PLA-D7a" .

survey:assumption_PLA-D7e survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: PLA-D7e" .

survey:assumption_PLA-D7u survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: PLA-D7u" .

survey:assumption_PL_PQ46-47 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PL/PQ46-47" .

survey:assumption_PMC1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PMC1" .

survey:assumption_PN105-106 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PN105-106" .

survey:assumption_PN96_T1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PN96/T1" .

survey:assumption_PPE survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Premium Platform Electric for Audi/Porsche" .

survey:assumption_PQ12 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PQ12" .

survey:assumption_PQ22 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PQ22" .

survey:assumption_PQ23 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PQ23" .

survey:assumption_PQ24 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PQ24" .

survey:assumption_PQ25_26 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PQ25/26" .

survey:assumption_PQ33 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PQ33" .

survey:assumption_PQ34 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PQ34" .

survey:assumption_PQ35 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Legacy Volkswagen platform primarily for ICE vehicles" .

survey:assumption_PQ75 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PQ75" .

survey:assumption_PQ_SD_ASD survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PQ/SD/ASD" .

survey:assumption_PR3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PR3" .

survey:assumption_PREMIUM survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: PREMIUM" .

survey:assumption_PROCEED survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PROCEED" .

survey:assumption_PROJECT_ONE survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: PROJECT ONE" .

survey:assumption_PS survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PS" .

survey:assumption_PS-10 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PS-10" .

survey:assumption_PU survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: PU" .

survey:assumption_Phevos survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Phevos" .

survey:assumption_Phoenix survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: Phoenix" .

survey:assumption_Project_V survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: V" .

survey:assumption_Q survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Q" .

survey:assumption_Q-SERIES survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Q-SERIES" .

survey:assumption_QILING_1041 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: QILING 1041" .

survey:assumption_QL6500 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: QL6500" .

survey:assumption_R survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: R" .

survey:assumption_R-R_Spaceframe survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: R-R Spaceframe" .

survey:assumption_R07 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: R07" .

survey:assumption_R1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: R1" .

survey:assumption_R3_HHR survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: R3/HHR" .

survey:assumption_R40 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: R40" .

survey:assumption_RCV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: RCV" .

survey:assumption_REF survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: REF" .

survey:assumption_REVA survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: REVA" .

survey:assumption_ROLLS_ROYCE survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: ROLLS ROYCE" .

survey:assumption_ROSA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: ROSA" .

survey:assumption_RPU survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: RPU" .

survey:assumption_RR01 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: RR01" .

survey:assumption_RS_RT survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: RS/RT" .

survey:assumption_RS_UK survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: RS/UK" .

survey:assumption_RU survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: RU" .

survey:assumption_Rich survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Rich" .

survey:assumption_S survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S" .

survey:assumption_S-330N survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-330N" .

survey:assumption_S-375N_635N survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-375N/635N" .

survey:assumption_S-B0 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-B0" .

survey:assumption_S-C survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-C" .

survey:assumption_S-CD1-3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-CD1-3" .

survey:assumption_S-CMF-A survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-CMF-A" .

survey:assumption_S-CMF-B survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-CMF-B" .

survey:assumption_S-CS survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-CS" .

survey:assumption_S-EF_MS survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EF/MS" .

survey:assumption_S-FR survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-FR" .

survey:assumption_S-FR%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-FR(2)" .

survey:assumption_S-GS survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-GS" .

survey:assumption_S-GV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-GV" .

survey:assumption_S-GV%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-GV(2)" .

survey:assumption_S-G_M survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-G/M" .

survey:assumption_S-HP survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-HP" .

survey:assumption_S-J survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-J" .

survey:assumption_S-J100 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-J100" .

survey:assumption_S-J25 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-J25" .

survey:assumption_S-J55 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-J55" .

survey:assumption_S-M100 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-M100" .

survey:assumption_S-MC_M survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-MC/M" .

survey:assumption_S-MG survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-MG" .

survey:assumption_S-N survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-N" .

survey:assumption_S-NE_IN_CO_UA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-NE/IN/CO/UA" .

survey:assumption_S-NU_029N_152N survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-NU/029N/152N" .

survey:assumption_S-NU_029N_152N%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-NU/029N/152N(2)" .

survey:assumption_S-PF3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-PF3" .

survey:assumption_S-Q survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-Q" .

survey:assumption_S-R40 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-R40" .

survey:assumption_S-SERIES survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: S-SERIES" .

survey:assumption_S-TC_TY survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: S-TC/TY" .

survey:assumption_S-TC_TY%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: S-TC/TY(2)" .

survey:assumption_S-TYPE_E survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: E" .

survey:assumption_S-U204 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-U204" .

survey:assumption_S-UCR145 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-UCR145" .

survey:assumption_S-UCR145%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-UCR145(2)" .

survey:assumption_S-XJ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-XJ" .

survey:assumption_S-Z survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S-Z" .

survey:assumption_S1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S1" .

survey:assumption_S161 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S161" .

survey:assumption_S161%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S161(2)" .

survey:assumption_S2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S2" .

survey:assumption_S2-E survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S2-E" .

survey:assumption_S2-E%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S2-E(2)" .

survey:assumption_S2000 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S2000" .

survey:assumption_S2000%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S2000(2)" .

survey:assumption_S3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S3" .

survey:assumption_S3%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S3(2)" .

survey:assumption_S5X-1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S5X-1" .

survey:assumption_S5X-1%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: S5X-1(2)" .

survey:assumption_S5X-2 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: S5X-2" .

survey:assumption_S6 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: S6" .

survey:assumption_SA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SA" .

survey:assumption_SC survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SC" .

survey:assumption_SC1021_1040 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SC1021/1040" .

survey:assumption_SC6601_6608 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SC6601/6608" .

survey:assumption_SCM survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SCM" .

survey:assumption_SD survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SD" .

survey:assumption_SD%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SD(2)" .

survey:assumption_SE-LT survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SE-LT" .

survey:assumption_SEA1 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Geely Sustainable Experience Architecture for EVs" .

survey:assumption_SEA1%282%29 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: SEA1(2)" .

survey:assumption_SEA2 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Geely SEA platform evolution" .

survey:assumption_SEA2%282%29 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: SEA2(2)" .

survey:assumption_SEA3 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: SEA3" .

survey:assumption_SEA3%282%29 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: SEA3(2)" .

survey:assumption_SF survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: SF" .

survey:assumption_SF%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SF(2)" .

survey:assumption_SGP survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SGP" .

survey:assumption_SGP%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: SGP(2)" .

survey:assumption_SGP-E survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SGP-E" .

survey:assumption_SI survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SI" .

survey:assumption_SI%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: SI(2)" .

survey:assumption_SIGMA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SIGMA" .

survey:assumption_SIGMA%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: SIGMA(2)" .

survey:assumption_SKYACTIV_B survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SKYACTIV B" .

survey:assumption_SKYACTIV_C_D survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SKYACTIV C/D" .

survey:assumption_SKYACTIV_C_D%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Default classification - no EV/hybrid indicators found" .

survey:assumption_SKYACTIV_EV survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EV" .

survey:assumption_SKYACTIV_FR survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SKYACTIV FR" .

survey:assumption_SKYACTIV_R survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: R" .

survey:assumption_SL survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SL" .

survey:assumption_SLB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SLB" .

survey:assumption_SMA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SMA" .

survey:assumption_SNJ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SNJ" .

survey:assumption_SNJ%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SNJ(2)" .

survey:assumption_SOA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SOA" .

survey:assumption_SOA%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SOA(2)" .

survey:assumption_SP0 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SP0" .

survey:assumption_SP1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SP1" .

survey:assumption_SPA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SPA" .

survey:assumption_SPA3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SPA3" .

survey:assumption_SPU survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: SPU" .

survey:assumption_SR survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SR" .

survey:assumption_SS survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SS" .

survey:assumption_SS%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SS(2)" .

survey:assumption_SSA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SSA" .

survey:assumption_SSM survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SSM" .

survey:assumption_SSP_A_B survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: SSP" .

survey:assumption_SSP_B_C survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: SSP" .

survey:assumption_SSP_D survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: SSP" .

survey:assumption_ST survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: ST" .

survey:assumption_STD survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: STD" .

survey:assumption_STLA_City survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: STLA City" .

survey:assumption_STLA_Frame survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: STLA Frame" .

survey:assumption_STLA_Large survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: STLA Large" .

survey:assumption_STLA_Medium survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Default classification - no EV/hybrid indicators found" .

survey:assumption_STLA_Small survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Default classification - no EV/hybrid indicators found" .

survey:assumption_STLA_Van survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: STLA Van" .

survey:assumption_STREETSCOOTER survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: STREETSCOOTER" .

survey:assumption_SUPER_7 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: SUPER 7" .

survey:assumption_SUV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SUV" .

survey:assumption_SV5 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: SV5" .

survey:assumption_SV6 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SV6" .

survey:assumption_SV7 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SV7" .

survey:assumption_SWB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SWB" .

survey:assumption_SWM-M survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SWM-M" .

survey:assumption_SXK survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SXK" .

survey:assumption_SXZ6440_SXZ6481 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SXZ6440/SXZ6481" .

survey:assumption_SXZ6440_SXZ6481%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SXZ6440/SXZ6481(2)" .

survey:assumption_SY survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SY" .

survey:assumption_SY%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SY(2)" .

survey:assumption_SY1023-26-28 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SY1023-26-28" .

survey:assumption_SY1027_SY5021 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: SY1027/SY5021" .

survey:assumption_Shaolin survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Shaolin" .

survey:assumption_Skywell survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Skywell" .

survey:assumption_Slate survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Slate" .

survey:assumption_Small_SUSW survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Small/SUSW" .

survey:assumption_T survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: T" .

survey:assumption_T-CAR survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: T-CAR" .

survey:assumption_T-SERIES survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: T-SERIES" .

survey:assumption_T-SERIES%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: T-SERIES(2)" .

survey:assumption_T1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: T1" .

survey:assumption_T1%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: T1(2)" .

survey:assumption_T100 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: T100" .

survey:assumption_T1N survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: T1N" .

survey:assumption_T1XX survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "GM truck platform primarily ICE" .

survey:assumption_T2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: T2" .

survey:assumption_T25 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: T25" .

survey:assumption_T25%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: T25(2)" .

survey:assumption_T2N survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: T2N" .

survey:assumption_T3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: T3" .

survey:assumption_T4 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: T4" .

survey:assumption_T5 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: T5" .

survey:assumption_T6 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: T6" .

survey:assumption_TC_TY survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TC/TY" .

survey:assumption_TC_TY%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: TC/TY(2)" .

survey:assumption_TE1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TE1" .

survey:assumption_THETA_TE survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: THETA/TE" .

survey:assumption_TM survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TM" .

survey:assumption_TMA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TMA" .

survey:assumption_TMB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TMB" .

survey:assumption_TOGG survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: TOGG" .

survey:assumption_TQ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TQ" .

survey:assumption_TR40 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TR40" .

survey:assumption_TRAX survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TRAX" .

survey:assumption_TRAX%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TRAX(2)" .

survey:assumption_TRUMP survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TRUMP" .

survey:assumption_TRUMP%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TRUMP(2)" .

survey:assumption_TX1 survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: TX1" .

survey:assumption_TYPE_169 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TYPE 169" .

survey:assumption_TYPE_188 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TYPE 188" .

survey:assumption_TYPE_199 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TYPE 199" .

survey:assumption_TYPE_2_3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TYPE 2/3" .

survey:assumption_TYPE_2_3-C survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: TYPE 2/3-C" .

survey:assumption_TYPE_A survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: A" .

survey:assumption_TYPE_B survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: B" .

survey:assumption_TYPE_E survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: E" .

survey:assumption_U survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: U" .

survey:assumption_U%2B survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: U+" .

survey:assumption_U%2B%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: U+(2)" .

survey:assumption_U-IMV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: U-IMV" .

survey:assumption_U-IMV%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: U-IMV(2)" .

survey:assumption_U152_U251 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: U152/U251" .

survey:assumption_U204 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: U204" .

survey:assumption_U300 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: U300" .

survey:assumption_U452 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: U452" .

survey:assumption_U469 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: U469" .

survey:assumption_UCR145 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: UCR145" .

survey:assumption_UCR145%282%29 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: UCR145(2)" .

survey:assumption_UF0 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: UF0" .

survey:assumption_UH survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: UH" .

survey:assumption_UNIMOG survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: UNIMOG" .

survey:assumption_UNIMOG%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: UNIMOG(2)" .

survey:assumption_UPP survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: UPP" .

survey:assumption_UT survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: UT" .

survey:assumption_UZ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: UZ" .

survey:assumption_U_V survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: U/V" .

survey:assumption_V survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: V" .

survey:assumption_V100_V200 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: V100/V200" .

survey:assumption_V3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: V3" .

survey:assumption_V4 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: V4" .

survey:assumption_V6 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: V6" .

survey:assumption_VAN survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: VAN" .

survey:assumption_VAN.EA_CA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: VAN.EA/CA" .

survey:assumption_VC survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: VC" .

survey:assumption_VD survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: VD" .

survey:assumption_VE1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: VE1" .

survey:assumption_VE83 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: VE83" .

survey:assumption_VH survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: VH" .

survey:assumption_VH5 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: VH5" .

survey:assumption_VITO survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: VITO" .

survey:assumption_VMG-A_B survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: VMG-A/B" .

survey:assumption_VMG-C_D survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: VMG-C/D" .

survey:assumption_VN127 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: VN127" .

survey:assumption_VSA-L survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: VSA-L" .

survey:assumption_VSS-F_B_C survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: VSS-F B/C" .

survey:assumption_VSS-F_D_E survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: VSS-F D/E" .

survey:assumption_VVA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: VVA" .

survey:assumption_W survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: W" .

survey:assumption_W%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: W(2)" .

survey:assumption_W126 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: W126" .

survey:assumption_W140 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: W140" .

survey:assumption_W164_V251_W166 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: W164/V251/W166" .

survey:assumption_W169 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: W169" .

survey:assumption_W203 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: W203" .

survey:assumption_W204 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: W204" .

survey:assumption_W211 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: W211" .

survey:assumption_W212 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: W212" .

survey:assumption_W212%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: W212(2)" .

survey:assumption_W220 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: W220" .

survey:assumption_W221 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: W221" .

survey:assumption_W222 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: W222" .

survey:assumption_W461 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: W461" .

survey:assumption_WEV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: WEV" .

survey:assumption_WK_WK2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: WK/WK2" .

survey:assumption_WL-EV survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: EV" .

survey:assumption_WL-LCV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: WL-LCV" .

survey:assumption_WMV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: WMV" .

survey:assumption_WORLD_A survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: WORLD A" .

survey:assumption_WP survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: WP" .

survey:assumption_WP%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: WP(2)" .

survey:assumption_WQ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: WQ" .

survey:assumption_WQ%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: WQ(2)" .

survey:assumption_WS1160 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: WS1160" .

survey:assumption_WT survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: WT" .

survey:assumption_WX-LT survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: WX-LT" .

survey:assumption_Whale survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Whale" .

survey:assumption_X survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X" .

survey:assumption_X%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X(2)" .

survey:assumption_X-PF survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X-PF" .

survey:assumption_X06 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X06" .

survey:assumption_X100 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X100" .

survey:assumption_X2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X2" .

survey:assumption_X200 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X200" .

survey:assumption_X24 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X24" .

survey:assumption_X250 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X250" .

survey:assumption_X3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X3" .

survey:assumption_X6 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X6" .

survey:assumption_X61B survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X61B" .

survey:assumption_X62 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X62" .

survey:assumption_X64 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X64" .

survey:assumption_X65 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X65" .

survey:assumption_X70 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X70" .

survey:assumption_X83 survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: X83" .

survey:assumption_XGA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: XGA" .

survey:assumption_XJS_X100 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: XJS/X100" .

survey:assumption_XL_BN survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: XL/BN" .

survey:assumption_XMQ6520 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: XMQ6520" .

survey:assumption_XMQ6520%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: XMQ6520(2)" .

survey:assumption_XP survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: XP" .

survey:assumption_X_X2 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: X/X2" .

survey:assumption_Xiaoyao survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Xiaoyao" .

survey:assumption_Y-CAR_Y1XX survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Y-CAR/Y1XX" .

survey:assumption_Y60 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Y60" .

survey:assumption_Y62 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Y62" .

survey:assumption_YD survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: YD" .

survey:assumption_YF_YJ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: YF/YJ" .

survey:assumption_YG survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: YG" .

survey:assumption_YM survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: YM" .

survey:assumption_YMB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: YMB" .

survey:assumption_YN survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: YN" .

survey:assumption_YR survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: YR" .

survey:assumption_YT4 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: YT4" .

survey:assumption_YTQ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: YTQ" .

survey:assumption_YW survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: YW" .

survey:assumption_YX survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: YX" .

survey:assumption_YX%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: YX(2)" .

survey:assumption_Z0 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Z0" .

survey:assumption_Z1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Z1" .

survey:assumption_Z3 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Z3" .

survey:assumption_Z6 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Z6" .

survey:assumption_ZB survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: ZB" .

survey:assumption_ZERV survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: ZERV" .

survey:assumption_ZETA survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: ZETA" .

survey:assumption_ZK survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: ZK" .

survey:assumption_ZK%282%29 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: ZK(2)" .

survey:assumption_ZL survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: ZL" .

survey:assumption_ZTZ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: ZTZ" .

survey:assumption_ZZ survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: ZZ" .

survey:assumption_Zoox_1 survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: Zoox 1" .

survey:assumption_e-GSP survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: e-GSP" .

survey:assumption_e-HA survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: e-HA" .

survey:assumption_eK survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: eK" .

survey:assumption_eLCV survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: eLCV" .

survey:assumption_eM survey:assignedVehicleType "ICE" ;
    survey:assumptionReason "Contains ICE-related keyword: eM" .

survey:assumption_eS survey:assignedVehicleType "BEV" ;
    survey:assumptionReason "Contains EV-related keyword: eS" .

survey:assumption_miniEV survey:assignedVehicleType "BEHV" ;
    survey:assumptionReason "Contains hybrid-related keyword: miniEV" .

survey:tech_assumption_1061_SERIES survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_1118 survey:assignedTechnologyNode "180-500 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_178 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_186 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_2101 survey:assignedTechnologyNode "180-500 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_2108 survey:assignedTechnologyNode "180-500 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_2110 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_2121 survey:assignedTechnologyNode "180-500 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_2500 survey:assignedTechnologyNode "180-500 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_2500%282%29 survey:assignedTechnologyNode "180-500 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_296N survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_2SA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_2SD survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_2YA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_300N survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_307 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_307%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_3160 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_31XX_31XX-2 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_3302 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Default: ICE platform assigned mature technology" .

survey:tech_assumption_330N survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_370N survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_407%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_407_608_609 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_414T survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_500N survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_560T_810T survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_66L_21Z survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_670H_KF survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_800 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_800T survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_8C survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_970 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_980 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_986_996_-_987_997 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_9X1 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_A survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_A%282%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_A-SERIES survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_A0 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_A0%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_A002 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_A100 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_A10_A24_A32 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_A30 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_A30%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_AA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_AM survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_AM-RB survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_AM800 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_AMG.EA survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_AMP survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_AM_EV survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_AN_DN_ND survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_AP survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_APP survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_AP_UM_JR_JK_MB survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ATLAS survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_AU survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Default: Hybrid platform assigned established technology" .

survey:tech_assumption_Alpine survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Ampr survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_B survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_B%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_B-0 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_B-SERIES survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_B-VX62 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_B0 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_B1 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_B2 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_B2E survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_B3 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_B30 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_B30%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_B6 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BC survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BC300 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BD_LD-100 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BE survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BE%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BE11 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BE21 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BE21%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BE22 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BE22%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BE91 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BEV-F survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BEV3_BEV_N survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BEV_Prime survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BF survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BF1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BJ2020 survey:assignedTechnologyNode "180-500 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BJ2022 survey:assignedTechnologyNode "180-500 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BJ2022%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BLP survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BLP%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BLP-L survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BLP-L%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BLUECAR survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BMA survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BMFA survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BMFA%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BMP survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BMP%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BM_MD survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BR-LT survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BR-LT%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BR450 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BR451 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BREMACH survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BSN survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BSP survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BSP%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BT1 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BUGATTI survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_BV1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C-5 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C-EV survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C-EVO_CUSW survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C170 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C199 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C1XX_C1XX-2 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C2 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C2_GE1 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C30 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C30%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C6 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CA1046 survey:assignedTechnologyNode "180-500 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CA1046%282%29 survey:assignedTechnologyNode "180-500 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CA6300 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CANTER survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CB40 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CCA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CD survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CD-EU survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CD1-3 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CD4 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CD6 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CE survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CE1 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CF-SERIES survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CF4 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CFT survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CFT%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CH survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CHB survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CIVILIAN survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CK survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CKZ survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CL_MM survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CL_MM%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CMA survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CMF-A survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CMF-B survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CMF-C_D survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CMF-C_D%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CMF-EV survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CMP survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CMV survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CN2 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_COASTER survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CR survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CRRC survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CS survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CSP survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CUB survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CUB%282%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CV-L survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CV9 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CX survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CXV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_CZ survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C_D survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_C_Q survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Ceer survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Compact_Main_Platform survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Cybertruck survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_D survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_D%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_D-5 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_D-XEV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_D01A survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_D186 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_D21 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_D2C_D5 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_D30 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_D3_D4 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_D71A survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_D8 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_D91B survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DAILY survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DALLARA survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DC1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DC2 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DD1020_1022_1023 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DD6760_6751_6600 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DE30 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DEFENDER survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DELIVERY survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DEV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DF1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DF1%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DF2 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DF2%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DFLT survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DI survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DI%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DOST survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DOST%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DR_DH survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DSMA survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DSMA%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DS_DJ survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DYNA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_DYNA%282%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_D_X_Z survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_David survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_E survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_E%2B survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_E-GMP survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_E-LCV survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_E-LTF survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_E-Sports survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_E0X survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_E2 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_E46 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_E8 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EA169 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EDISON survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EFC survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EF_MS survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EICHER survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EICHER%5B2%5D survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EJ survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EL survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ELF survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ELF-M survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ELISE survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EMA survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EMA%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EMP survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EMP2 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EN53-114_FN145 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EP survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EP1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EP2 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EPA0 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EPA0%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EPA1 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Default: ICE platform assigned mature technology" .

survey:tech_assumption_EPA1%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EPA2 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EPA2%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EPSILON survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ESSA survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EV survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Default: BEV platform assigned mainstream technology" .

survey:tech_assumption_EV%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EV%2B survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EV1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EV2 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EVA2 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EVL survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_EX survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_E_SERIES survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Edward survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Edward%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Elemental survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Evolution survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Extreme survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_F survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_F-SERIES survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_F1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_F2 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_F5 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_F91 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_F91%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FD survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FD%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FERRARI_FR-L survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FERRARI_MR-L survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FF survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FF%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FL survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FLT survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FL_S-FR survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FM29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FMA survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FMA%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FME-A1 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FME-A2 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FME-A2%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FN74 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FOMM survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FORLAND survey:assignedTechnologyNode "180-500 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FR survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FR-L survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FSQ survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FX survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FY survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FZ6102 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_FlexEVan survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Forland2 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Forseven survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Franklin survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_G survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_G%282%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GA survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GA-B survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GA-C survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GA-C%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GA-D survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GA-E survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GA-E%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GA-F survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GA-K survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GA-K%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GA-L survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GAMMA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GAZelle_Next survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GBC survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GBRC survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GBRC%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GCV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GEA survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GEA%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GEC survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GEN_III survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GEP survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GEP%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GH survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GHT1020S survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GHT1020S%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GIO survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GL survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GL-LCV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GL6590_GL6650_GL6700 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GLCA survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GLOBAL_DELTA_D2XX survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GLOBAL_EPSILON_E2XX survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GLOBAL_GAMMA_G2XX survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GLOBAL_MINI_M2XX survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GLTP survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GM survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GM2900 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GM3000 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GM4200 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GMC survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GMT200_201 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GMT325_330 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GMT355_700 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GMT360_370 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GMT600 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GMT610 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GMT800_900 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GPMA survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GPMA%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GQ survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GS survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GSC survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GSE survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GSE%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GSEV survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GSEV%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GSP survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GSP%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GS_HF survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GT survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GT%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GTO survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GTZ survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GV survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GV%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GX survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_GZ6590_GZ6700_GZ6750 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Gen7 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Giorgio_Giorgio_Global survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Default: ICE platform assigned mature technology" .

survey:tech_assumption_Global_Alpha_A2XX survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Grace survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_H survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_H%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_H-SERIES survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_H-SERIES%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_H1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_H2 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_HA survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_HB survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_HD survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Default: Hybrid platform assigned established technology" .

survey:tech_assumption_HFC1061 survey:assignedTechnologyNode "180-500 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_HFC1061%282%29 survey:assignedTechnologyNode "180-500 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_HFC6600_HFC6800 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_HFC6600_HFC6800%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_HHR survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_HIACE survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_HK survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_HM survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Default: Hybrid platform assigned established technology" .

survey:tech_assumption_HMGA survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_HP survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_HPA survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_HPC survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_HSJ survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_HSJ%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Higer_PUP survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Howard survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_IGPF survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_IKP1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_IMV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_IMV%282%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_INGLO survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_IS survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Ineos survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Ineos_EV survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Default: BEV platform assigned mainstream technology" .

survey:tech_assumption_J survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_J1 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_J100 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_J25 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_J2_J3 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Default: Hybrid platform assigned established technology" .

survey:tech_assumption_J97 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_JEA survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_JEST survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_JGM_JGM%282%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Default: Hybrid platform assigned established technology" .

survey:tech_assumption_JH survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_JHC survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_JHC%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_JIEOU survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_JIEOU%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_JK survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_JK_JL survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_JLT survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_JT survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_K survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_K-Series survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_K0 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_K100_Y100 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_K100_Y100%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_K1_K2-P1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Default: Hybrid platform assigned established technology" .

survey:tech_assumption_K1_K2-P2 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_K1_K2-P3 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_K2XX survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_K3_K4-P1 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_K3_K4-P2 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_K3_K4-P3 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_KAPPA survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_KC_SG survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_KEV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_KJ_KK survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_KM survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_KM%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_KQC2 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_KZ survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Kama survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Kunlun survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_L survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_L1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_L2 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_L200 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_L3 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_L4 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_L6 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_L7 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LA survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LAMBDA survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LAMBORGHINI survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LB survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LC survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LCV1 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LEVC-TX survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LF1030 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LFA survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LG survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LH survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LH%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LH1040D survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LIEBAO survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LJC1040_LJC1041 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LK survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LS survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LSB survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LST survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LTV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LU survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_LX survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Lada_B survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Default: Hybrid platform assigned established technology" .

survey:tech_assumption_Li survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Lingbox survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Lingbox%282%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Default: Hybrid platform assigned established technology" .

survey:tech_assumption_M survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M%282%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Default: Hybrid platform assigned established technology" .

survey:tech_assumption_M-M2 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M-M2%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M-SERIES survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M-Trix%2893%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M-Trix%2895%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M0 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M1 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M100 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M1KA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M1X survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M1X%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M1_M2 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M2 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M3 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M3X survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M3X%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M3_M4 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M49_M59 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M6 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M80 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_M8X survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MAS survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MASERATI survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MASERATI_Spaceframe survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MB survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MB.EA survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MB100 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MC-C survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MC-M survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MCAR survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MCLA survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ME survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MEB survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MEB_entry survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Default: BEV platform assigned mainstream technology" .

survey:tech_assumption_MFA survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MG survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MHA survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Default: ICE platform assigned mature technology" .

survey:tech_assumption_MI survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MIA survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MIFA survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MIFA%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MIH survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MILA survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MINICAB survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MINI_CUB survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MIS survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MIS%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MK survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MLA survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MLB3 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MLB_B survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MLB_C_D survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MMA survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MMB survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MNB survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MODEL_S survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MORGAN survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MORV survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MORV%282%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MPA0 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MPA1 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MPA1%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MPA2 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MQB_A0 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MQB_A_B survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MQB_C survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MR survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MRA_LARGE survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MRA_MID-SIZE survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MS survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MS2000 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MSA survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MSB survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MSP survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MUSE survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MUV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_MV1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Mann survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Mengshi survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Midsize survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Mission_R survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Mission_X survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Mitsubishi_Z survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Modena survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Modern survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_N survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_N%282%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_N1_N2 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_N3_N4 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_N5_N6 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_N800 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_N800%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NBC survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NBC%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NCV2 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NCV3 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NCV4 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NE_IN_CO_UA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NFA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NF_CM survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NGDV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NISSAN_JUNIOR survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NJ1041_1061 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NK survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NL survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NPB survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NPC survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NPD survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NPE survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NPE%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NPL_PT survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NSC survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NSX survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NU_029N_152N survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NV survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NV2 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_NZ survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_New_Gonow_LT survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_New_Gonow_LT%282%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Default: Hybrid platform assigned established technology" .

survey:tech_assumption_OMEGA_O2XX survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ONE_LITRE_CAR survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_OU%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_P-SERIES survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_P11 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_P131_P356_P473 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_P2 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_P4 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_P4%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_P71 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_P71%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PAYKAN survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PC survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PEGASUS survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PETUNIA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PF-A survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PF-B survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PF-B%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PF-C survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PF-CD survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PF-D survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PF1 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PF2 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PF3 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PF7_PF7E survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PFE survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PHOENIX survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PK5 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PK5%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PL22 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PL45 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PL56 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PL62 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PL71-72 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PLA-D6a survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PLA-D7a survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PLA-D7e survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PLA-D7u survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PL_PQ46-47 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PMC1 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PN105-106 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PN96_T1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PPE survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PQ12 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PQ22 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PQ23 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PQ24 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PQ25_26 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PQ33 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PQ34 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PQ35 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PQ75 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PQ_SD_ASD survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PR3 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PREMIUM survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PROCEED survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PROJECT_ONE survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PS survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PS-10 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_PU survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Phevos survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Phoenix survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Project_V survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Q survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Q-SERIES survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_QILING_1041 survey:assignedTechnologyNode "180-500 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_QL6500 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_R survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_R-R_Spaceframe survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Default: ICE platform assigned mature technology" .

survey:tech_assumption_R07 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_R1 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_R3_HHR survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_R40 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_RCV survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_REF survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_REVA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ROLLS_ROYCE survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ROSA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_RPU survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_RR01 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_RS_RT survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_RS_UK survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_RU survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Rich survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-330N survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-375N_635N survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-B0 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-C survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-CD1-3 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-CMF-A survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-CMF-B survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-CS survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-EF_MS survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-FR survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-FR%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-GS survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-GV survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-GV%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-G_M survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-HP survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-J survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-J100 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-J25 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-J55 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-M100 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-MC_M survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-MG survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-N survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-NE_IN_CO_UA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-NU_029N_152N survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-NU_029N_152N%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-PF3 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-Q survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-R40 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-SERIES survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-TC_TY survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-TC_TY%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-TYPE_E survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-U204 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-UCR145 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-UCR145%282%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-XJ survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S-Z survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S1 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S161 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S161%282%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S2 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S2-E survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S2-E%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S2000 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S2000%282%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S3 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S3%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S5X-1 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S5X-1%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S5X-2 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_S6 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SA survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SC survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SC1021_1040 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SC6601_6608 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SCM survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SD survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SD%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SE-LT survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SEA1 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SEA1%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SEA2 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SEA2%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SEA3 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SEA3%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SF survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SF%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SGP survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SGP%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SGP-E survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SI survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SI%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SIGMA survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SIGMA%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SKYACTIV_B survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SKYACTIV_C_D survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SKYACTIV_C_D%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SKYACTIV_EV survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SKYACTIV_FR survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SKYACTIV_R survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Default: Hybrid platform assigned established technology" .

survey:tech_assumption_SL survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SLB survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SMA survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SNJ survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SNJ%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SOA survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SOA%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SP0 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SP1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SPA survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SPA3 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SPU survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SR survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SS survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SS%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SSA survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SSM survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SSP_A_B survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SSP_B_C survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SSP_D survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ST survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_STD survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_STLA_City survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Default: ICE platform assigned mature technology" .

survey:tech_assumption_STLA_Frame survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_STLA_Large survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Default: ICE platform assigned mature technology" .

survey:tech_assumption_STLA_Medium survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_STLA_Small survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Default: ICE platform assigned mature technology" .

survey:tech_assumption_STLA_Van survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_STREETSCOOTER survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SUPER_7 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SUV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SV5 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SV6 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SV7 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SWB survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SWM-M survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SXK survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SXZ6440_SXZ6481 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SXZ6440_SXZ6481%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SY survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SY%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SY1023-26-28 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_SY1027_SY5021 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Shaolin survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Skywell survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Slate survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Small_SUSW survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T-CAR survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T-SERIES survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T-SERIES%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T1 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T1%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T100 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T1N survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T1XX survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T2 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T25 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T25%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T2N survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T3 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T4 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T5 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_T6 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TC_TY survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TC_TY%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TE1 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_THETA_TE survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TM survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TMA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TMB survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TOGG survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TQ survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TR40 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TRAX survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TRAX%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TRUMP survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TRUMP%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TX1 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TYPE_169 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TYPE_188 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TYPE_199 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TYPE_2_3 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TYPE_2_3-C survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TYPE_A survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TYPE_B survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_TYPE_E survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_U survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_U%2B survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_U%2B%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_U-IMV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_U-IMV%282%29 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_U152_U251 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_U204 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_U300 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_U452 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_U469 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_UCR145 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_UCR145%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_UF0 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_UH survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_UNIMOG survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_UNIMOG%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_UPP survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_UT survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_UZ survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Default: Hybrid platform assigned established technology" .

survey:tech_assumption_U_V survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_V survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_V100_V200 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_V3 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_V4 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_V6 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VAN survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VAN.EA_CA survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VC survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VD survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VE1 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VE83 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VH survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VH5 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VITO survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VMG-A_B survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VMG-C_D survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VN127 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VSA-L survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VSS-F_B_C survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VSS-F_D_E survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_VVA survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_W survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_W%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_W126 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_W140 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_W164_V251_W166 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_W169 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_W203 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_W204 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_W211 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_W212 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_W212%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_W220 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_W221 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_W222 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Default: ICE platform assigned mature technology" .

survey:tech_assumption_W461 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_WEV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_WK_WK2 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_WL-EV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_WL-LCV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_WMV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_WORLD_A survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_WP survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_WP%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_WQ survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_WQ%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_WS1160 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_WT survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_WX-LT survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Whale survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X-PF survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X06 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X100 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X2 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X200 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X24 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X250 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X3 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X6 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X61B survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X62 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X64 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X65 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X70 survey:assignedTechnologyNode "2-7 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X83 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_XGA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_XJS_X100 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_XL_BN survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_XMQ6520 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_XMQ6520%282%29 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_XP survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_X_X2 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Xiaoyao survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Y-CAR_Y1XX survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Y60 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Y62 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_YD survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_YF_YJ survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_YG survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_YM survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_YMB survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_YN survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_YR survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_YT4 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_YTQ survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_YW survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_YX survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_YX%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Z0 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Z1 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Z3 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Z6 survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ZB survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ZERV survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ZETA survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ZK survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ZK%282%29 survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ZL survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ZTZ survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_ZZ survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_Zoox_1 survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_e-GSP survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_e-HA survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_eK survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_eLCV survey:assignedTechnologyNode "28-45 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_eM survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Default: ICE platform assigned mature technology" .

survey:tech_assumption_eS survey:assignedTechnologyNode "10-16 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:tech_assumption_miniEV survey:assignedTechnologyNode "55-150 nm" ;
    survey:assumptionReason "Platform classified based on technology requirements and vehicle type" .

survey:Month rdfs:subClassOf survey:TimePeriod .

survey:TechCategory_10-16_nm a survey:TechnologyNode ;
    survey:analyzesTechnologyNodeName "10-16 nm" ;
    survey:hasConversionFactor survey:ConvFactor_10-16_nm_BEHV,
        survey:ConvFactor_10-16_nm_BEV,
        survey:ConvFactor_10-16_nm_ICE ;
    survey:technologyDescription "Mainstream semiconductor processes for most modern vehicles with advanced features" .

survey:TechCategory_180-500_nm a survey:TechnologyNode ;
    survey:analyzesTechnologyNodeName "180-500 nm" ;
    survey:hasConversionFactor survey:ConvFactor_180-500_nm_BEHV,
        survey:ConvFactor_180-500_nm_BEV,
        survey:ConvFactor_180-500_nm_ICE ;
    survey:technologyDescription "Legacy processes for simple control systems and basic functions" .

survey:TechCategory_2-7_nm a survey:TechnologyNode ;
    survey:analyzesTechnologyNodeName "2-7 nm" ;
    survey:hasConversionFactor survey:ConvFactor_2-7_nm_BEHV,
        survey:ConvFactor_2-7_nm_BEV,
        survey:ConvFactor_2-7_nm_ICE ;
    survey:technologyDescription "Advanced semiconductor processes for high-performance computing in premium/luxury EVs" .

survey:TechCategory_28-45_nm a survey:TechnologyNode ;
    survey:analyzesTechnologyNodeName "28-45 nm" ;
    survey:hasConversionFactor survey:ConvFactor_28-45_nm_BEHV,
        survey:ConvFactor_28-45_nm_BEV,
        survey:ConvFactor_28-45_nm_ICE ;
    survey:technologyDescription "Established processes for mid-range vehicles and automotive components" .

survey:TechCategory_55-150_nm a survey:TechnologyNode ;
    survey:analyzesTechnologyNodeName "55-150 nm" ;
    survey:hasConversionFactor survey:ConvFactor_55-150_nm_BEHV,
        survey:ConvFactor_55-150_nm_BEV,
        survey:ConvFactor_55-150_nm_ICE ;
    survey:technologyDescription "Mature processes for basic automotive electronics and legacy systems" .

survey:Component_EV a survey:Component .

survey:Component_both a survey:Component .

survey:Component_non_EV a survey:Component .

survey:Semiconductor_Survey rdfs:subClassOf survey:Survey .

survey:Quarter_Uture_Demand_Current_Quarter a survey:Quarter ;
    survey:periodLabel "Uture Demand Current Quarter" .

survey:Quarter_Uture_Demand_Q1_2026 a survey:Quarter ;
    survey:periodLabel "Uture Demand Q1 2026" .

survey:Quarter_Uture_Demand_Q1_2027 a survey:Quarter ;
    survey:periodLabel "Uture Demand Q1 2027" .

survey:Quarter_Uture_Demand_Q2_2026 a survey:Quarter ;
    survey:periodLabel "Uture Demand Q2 2026" .

survey:Quarter_Uture_Demand_Q2_2027 a survey:Quarter ;
    survey:periodLabel "Uture Demand Q2 2027" .

survey:Quarter_Uture_Demand_Q3_2026 a survey:Quarter ;
    survey:periodLabel "Uture Demand Q3 2026" .

survey:Quarter_Uture_Demand_Q3_2027 a survey:Quarter ;
    survey:periodLabel "Uture Demand Q3 2027" .

survey:Quarter_Uture_Demand_Q4_2026 a survey:Quarter ;
    survey:periodLabel "Uture Demand Q4 2026" .

survey:Decrease a survey:InventoryDevelopment_Tier1 ;
    survey:forComponent survey:Component_EV,
        survey:Component_both,
        survey:Component_non_EV ;
    survey:inventoryTrend "Decrease"^^xsd:string ;
    survey:participantCount 0.0,
        1.0 .

survey:Increase a survey:InventoryDevelopment_Tier1 ;
    survey:forComponent survey:Component_EV,
        survey:Component_both,
        survey:Component_non_EV ;
    survey:inventoryTrend "Increase"^^xsd:string ;
    survey:participantCount 0.0,
        1.0 .

survey:Stable a survey:InventoryDevelopment_Tier1 ;
    survey:forComponent survey:Component_EV,
        survey:Component_both,
        survey:Component_non_EV ;
    survey:inventoryTrend "Stable"^^xsd:string ;
    survey:participantCount 0.0,
        1.0 .

survey:Sum a survey:InventoryDevelopment_Tier1 ;
    survey:forComponent survey:Component_EV,
        survey:Component_both,
        survey:Component_non_EV ;
    survey:inventoryTrend "SUM"^^xsd:string ;
    survey:participantCount 1.0 .

survey:Quarter_Current_Quarter a survey:Quarter ;
    survey:periodLabel "Current Quarter" .

survey:Quarter_Q1_2026 a survey:Quarter ;
    survey:periodLabel "Q1 2026" .

survey:Quarter_Q1_2027 a survey:Quarter ;
    survey:periodLabel "Q1 2027" .

survey:Quarter_Q2_2026 a survey:Quarter ;
    survey:periodLabel "Q2 2026" .

survey:Quarter_Q2_2027 a survey:Quarter ;
    survey:periodLabel "Q2 2027" .

survey:Quarter_Q3_2026 a survey:Quarter ;
    survey:periodLabel "Q3 2026" .

survey:Quarter_Q3_2027 a survey:Quarter ;
    survey:periodLabel "Q3 2027" .

survey:Quarter_Q4_2026 a survey:Quarter ;
    survey:periodLabel "Q4 2026" .

survey:Quarter_current_quarter a survey:Quarter ;
    survey:periodLabel "current_quarter" .

survey:Quarter_q1_2027 a survey:Quarter ;
    survey:periodLabel "q1_2027" .

survey:Quarter_q2_2026 a survey:Quarter ;
    survey:periodLabel "q2_2026" .

survey:Quarter_q2_2027 a survey:Quarter ;
    survey:periodLabel "q2_2027" .

survey:Quarter_q3_2026 a survey:Quarter ;
    survey:periodLabel "q3_2026" .

survey:Quarter_q3_2027 a survey:Quarter ;
    survey:periodLabel "q3_2027" .

survey:Quarter_q4_2026 a survey:Quarter ;
    survey:periodLabel "q4_2026" .

survey:Quarter_q4_2027 a survey:Quarter ;
    survey:periodLabel "q4_2027" .

survey:SAE_Level_1 a survey:SAELevel ;
    rdfs:label "SAE Level 1" .

survey:SAE_Level_2 a survey:SAELevel ;
    rdfs:label "SAE Level 2" .

survey:SAE_Level_3 a survey:SAELevel ;
    rdfs:label "SAE Level 3" .

survey:SAE_Level_4 a survey:SAELevel ;
    rdfs:label "SAE Level 4" .

survey:SAE_Level_5 a survey:SAELevel ;
    rdfs:label "SAE Level 5" .

survey:Quarter rdfs:subClassOf survey:TimePeriod .

survey:VehicleType_BEHV survey:forVehicleType survey:BEHV .

survey:VehicleType_BEV survey:forVehicleType survey:BEV .

survey:VehicleType_ICE survey:forVehicleType survey:ICE .

survey:RegionAmericas a survey:Region ;
    survey:regionName "Americas" .

survey:RegionAsiaPacificChina a survey:Region ;
    survey:regionName "Asia Pacific China" .

survey:RegionAsiaPacificOther a survey:Region ;
    survey:regionName "Asia Pacific Other" .

survey:RegionEurope a survey:Region ;
    survey:regionName "Europe" .

survey:RegionJapan a survey:Region ;
    survey:regionName "Japan" .

survey:Semiconductor_Survey_Instance a survey:Semiconductor_Survey ;
    survey:hasInventoryResponse survey:InventoryTarget_Aggregated_Semi_10nm_to_%3C28nm_Above_target,
        survey:InventoryTarget_Aggregated_Semi_10nm_to_%3C28nm_At_target,
        survey:InventoryTarget_Aggregated_Semi_10nm_to_%3C28nm_Below_target,
        survey:InventoryTarget_Aggregated_Semi_10nm_to_%3C28nm_SUM,
        survey:InventoryTarget_Aggregated_Semi_180nm_or_greater_Above_target,
        survey:InventoryTarget_Aggregated_Semi_180nm_or_greater_At_target,
        survey:InventoryTarget_Aggregated_Semi_180nm_or_greater_Below_target,
        survey:InventoryTarget_Aggregated_Semi_180nm_or_greater_SUM,
        survey:InventoryTarget_Aggregated_Semi_28nm_to_%3C45nm_Above_target,
        survey:InventoryTarget_Aggregated_Semi_28nm_to_%3C45nm_At_target,
        survey:InventoryTarget_Aggregated_Semi_28nm_to_%3C45nm_Below_target,
        survey:InventoryTarget_Aggregated_Semi_28nm_to_%3C45nm_SUM,
        survey:InventoryTarget_Aggregated_Semi_55nm_to_180nm_Above_target,
        survey:InventoryTarget_Aggregated_Semi_55nm_to_180nm_At_target,
        survey:InventoryTarget_Aggregated_Semi_55nm_to_180nm_Below_target,
        survey:InventoryTarget_Aggregated_Semi_55nm_to_180nm_SUM,
        survey:InventoryTarget_Aggregated_Semi_lte_7nm_Above_target,
        survey:InventoryTarget_Aggregated_Semi_lte_7nm_At_target,
        survey:InventoryTarget_Aggregated_Semi_lte_7nm_Below_target,
        survey:InventoryTarget_Aggregated_Semi_lte_7nm_SUM,
        survey:InventoryTrend_Aggregated_Semi_10nm_to_%3C28nm_Decrease,
        survey:InventoryTrend_Aggregated_Semi_10nm_to_%3C28nm_Increase,
        survey:InventoryTrend_Aggregated_Semi_10nm_to_%3C28nm_SUM,
        survey:InventoryTrend_Aggregated_Semi_10nm_to_%3C28nm_Stable,
        survey:InventoryTrend_Aggregated_Semi_180nm_or_greater_Decrease,
        survey:InventoryTrend_Aggregated_Semi_180nm_or_greater_Increase,
        survey:InventoryTrend_Aggregated_Semi_180nm_or_greater_SUM,
        survey:InventoryTrend_Aggregated_Semi_180nm_or_greater_Stable,
        survey:InventoryTrend_Aggregated_Semi_28nm_to_%3C45nm_Decrease,
        survey:InventoryTrend_Aggregated_Semi_28nm_to_%3C45nm_Increase,
        survey:InventoryTrend_Aggregated_Semi_28nm_to_%3C45nm_SUM,
        survey:InventoryTrend_Aggregated_Semi_28nm_to_%3C45nm_Stable,
        survey:InventoryTrend_Aggregated_Semi_55nm_to_180nm_Decrease,
        survey:InventoryTrend_Aggregated_Semi_55nm_to_180nm_Increase,
        survey:InventoryTrend_Aggregated_Semi_55nm_to_180nm_SUM,
        survey:InventoryTrend_Aggregated_Semi_55nm_to_180nm_Stable,
        survey:InventoryTrend_Aggregated_Semi_lte_7nm_Decrease,
        survey:InventoryTrend_Aggregated_Semi_lte_7nm_Increase,
        survey:InventoryTrend_Aggregated_Semi_lte_7nm_SUM,
        survey:InventoryTrend_Aggregated_Semi_lte_7nm_Stable .

survey:OEM_Survey_Instance a survey:OEM_Survey .

survey:Tier1_Survey_Instance a survey:Tier1_Survey ;
    survey:hasInventoryResponse survey:Advanced_driver-assistance_systems_ADAS,
        survey:Body_and_convenience,
        survey:Chassis_and_safety,
        survey:Infotainment_and_Telematics,
        survey:Other,
        survey:Powertrain .


`