import { api, LightningElement } from 'lwc';

export default class RecordViewForm extends LightningElement {

    @api recordId;

    clearFunc2(event){
        const inputField =  this.template.querySelectorAll('lightning-input-field');
        inputField.forEach(field=>{field.reset();});
    }
}