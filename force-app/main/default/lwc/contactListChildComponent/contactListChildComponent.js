import { api, LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
    {label: 'First Name', fieldName: 'FirstName', type: 'text'},
    {label: 'Last Name', fieldName: 'LastName', type: 'text'},
    {label: 'Email', fieldName: 'Email', type: 'email'}
];

export default class ContactListChildComponent extends LightningElement {
    @api accountId;
    cols=columns;
    conRecord;
    isNoRecord = false;
    errors;

    @wire(getContacts, {accId: '$accountId'})
    wiredContact({error,data}){
        if(data){
            this.conRecord = data;
            if(this.conRecord.length <= 0) this.isNoRecord = true;
            this.errors = undefined;
            
        }
        else if(error){
            this.conRecord = undefined;
            this.errors = error.body.message;
        }
    }
}