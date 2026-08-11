import { api, LightningElement, wire } from 'lwc';
import getReltedCon from '@salesforce/apex/AccountController.getRelCon';

import { getObjectInfo, getPicklistValues} from 'lightning/uiObjectInfoApi';

const colms = [
    {label: 'First Name', fieldName: 'FirstName' , type: 'text'},
    {label: 'Last Name', fieldName: 'LastName' , type: 'text'},
    {label: 'Email', fieldName: 'Email', type: 'email'},
    {label: 'Phone', fieldName: 'Phone', type: 'phone'}
];

export default class Lwc_Scenerio_4 extends LightningElement {
    @api recordId;
    contactRecords = [];
    result = '';
    cols = colms;
    name='';

    @wire(getReltedCon, {accId: '$recordId'})
    wiredContacts({ error, data }) {
        if (data) {
            this.contactRecords = data;
        } else if (error) {
            console.error('Error fetching contacts:', error);
            this.contactRecords = [];
        }
    }
    
    
    nameHandler(event){
        this.name = event.target.value;
    }

}