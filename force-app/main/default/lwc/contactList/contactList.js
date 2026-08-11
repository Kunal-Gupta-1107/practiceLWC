import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

import con_Last from '@salesforce/schema/Contact.LastName';
import con_First from '@salesforce/schema/Contact.FirstName';
import con_Email from '@salesforce/schema/Contact.Email';

import { reduceErrors } from 'c/ldsUtils';

const colms = [
    { label: 'First Name', fieldName: con_First.fieldApiName },
    { label: 'Last Name', fieldName: con_Last.fieldApiName },
    { label: 'Email', fieldName: con_Email.fieldApiName }
];

export default class ContactList extends LightningElement {

    conRecords = [];
    cols = colms;
    
    errors; 

    @wire(getContacts)
    wireContacts({ error, data }) {
        if (data) {
            this.conRecords = data;
            this.errors = undefined;
        } 
        else if (error) {
            this.errors = error; 
            this.conRecords = []; 
        }
    }

    get errors() {
        if (this.errors) {
            return reduceErrors(this.errors);
        }
        return [];
    }
}