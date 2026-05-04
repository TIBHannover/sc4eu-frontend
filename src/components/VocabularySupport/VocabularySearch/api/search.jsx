import { getCallSetting } from './constants';

export async function olsSearch({
    searchQuery,
    page,
    size,
    selectedOntologies,
    selectedTypes,
    selectedCollections,
    obsoletes,
    exact,
    isLeaf,
    searchInValues,
    searchUnderIris,
    searchUnderAllIris
}) {
    try {
        const rangeStart = (page - 1) * size;
        let searchUrl = process.env.REACT_APP_OLS4_API_V1 + `/suggest/?q=${searchQuery}&start=${rangeStart}&groupField=iri&rows=${size}`;
        searchUrl = selectedOntologies.length !== 0 ? searchUrl + `&ontology=${selectedOntologies.join(',')}` : searchUrl;
        searchUrl = selectedTypes.length !== 0 ? searchUrl + `&type=${selectedTypes.join(',')}` : searchUrl;
        searchUrl = searchInValues.length !== 0 ? searchUrl + `&queryFields=${searchInValues.join(',')}` : searchUrl;
        searchUrl = searchUnderIris.length !== 0 ? searchUrl + `&childrenOf=${searchUnderIris.join(',')}` : searchUrl;
        searchUrl = searchUnderAllIris.length !== 0 ? searchUrl + `&allChildrenOf=${searchUnderAllIris.join(',')}` : searchUrl;
        searchUrl = obsoletes ? searchUrl + '&obsoletes=true' : searchUrl;
        searchUrl = exact ? searchUrl + '&exact=true' : searchUrl;
        searchUrl = isLeaf ? searchUrl + '&isLeaf=true' : searchUrl;
        if (process.env.REACT_APP_PROJECT_NAME === '' && selectedCollections.length !== 0) {
            // If TIB General. Set collections if exist in filter
            searchUrl += `&schema=collection&classification=${selectedCollections.join(',')}`;
        } else if (selectedOntologies.length === 0 && process.env.REACT_APP_PROJECT_NAME !== '') {
            // Projects such as NFDI4CHEM. pre-set the target collection on each search
            // This should NOT be included when ontologies are selected.
            searchUrl += `&schema=collection&classification=${process.env.REACT_APP_PROJECT_NAME}`;
        }
        return await (await fetch(searchUrl, getCallSetting)).json();
    } catch (e) {
        return [];
    }
}

export async function getJumpToResult(inputData, count = 10) {
    try {
        let autocompleteApiBaseUrl = process.env.REACT_APP_OLS4_API_V2;
        let url = `${autocompleteApiBaseUrl}/ontologies/m4i/classes/?search=${inputData['searchQuery']}&size=${count}&page=0exactMatch=false&includeObsoleteEntities=false&exclusive=false&option=LINEAR`;
        let result = await fetch(url, getCallSetting);
        result = await result.json();
        result = result['elements'];
        return result;
    } catch (e) {
        // throw e
        return [];
    }
}


export async function getAutoCompleteResult(inputData, count = 5) {
    try {
        let url = process.env.REACT_APP_OLS4_API_V1 + `/suggest?q=${inputData['searchQuery']}&rows=${count}&ontology=m4i`;
        let searchResult = await fetch(url, getCallSetting);
        searchResult = (await searchResult.json())['response']['docs'];
        return searchResult;
    } catch (e) {
        return [];
    }
}
