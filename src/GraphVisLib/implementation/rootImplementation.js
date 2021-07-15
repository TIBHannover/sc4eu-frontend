import VOWLParser from './vowl2rrm/VOWLParser';

export default class RootImplementation {
    constructor(mainWidgetPtr) {
        this.currentData = undefined;
        this.rrmModel = undefined;
        this.mainWidget = mainWidgetPtr;
    }

    executeFileUpload = () => {
        if (this.mainWidget.uploadElement.current) {
            const uploadBTN = document.getElementById('ontologyUpload');
            uploadBTN.click();
        }
    };

    readFile = (e, __callback) => {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new FileReader();
        if (e.target.files.length === 0) {
            return;
        }
        reader.onloadend = async e => {
            this.currentData = reader.result;
            await this.createRRM_fromVOWL();
            __callback(this.rrmModel);
        };
        reader.readAsText(file);
    };

    createRRM_fromVOWL = async () => {
        console.log('EXECUTING THE PARSER');
        if (!this.currentData) {
            console.error('ERROR, no DATA PROVIDED');
        } else {
            const vowlParser = new VOWLParser();
            vowlParser.setInputData(JSON.parse(this.currentData));
            await vowlParser.execute();
            const result = vowlParser.getResult();
            this.rrmModel = result;
        }
    };
}
