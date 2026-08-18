import { api, LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
    {label: 'First Name', fieldName: 'FirstName', type: 'text'},
    {label: 'Last Name', fieldName: 'LastName', type: 'text'},
    {label: 'Email', fieldName: 'Email', type: 'email'},
    {label: 'Action', type: 'button', typeAttributes:{
        label: 'view Contact',
        variant: 'brand',
        name: 'view_contact',
        title: 'View Contact'
    }}
];

export default class ContactListChildComponent extends LightningElement {
    @api accountId;
    cols=columns;
    conRecord;
    errors;

    @wire(getContacts, {accId: '$accountId'})
    wiredContact({error,data}){
        if(data){
            this.conRecord = data;
            this.errors = undefined;
            
        }
        else if(error){
            this.conRecord = undefined;
            this.errors = error.body.message;
        }
    }


    actionHandler(event){
        const rowAction = event.detail.action.name;
        const row = event.detail.row;
        console.log(rowAction);
        console.log(row.Id);
        console.log(row.LastName);
        
        if(rowAction == 'view_contact'){
            //Custom Event  
            console.log('inside condition');
            const c_event = new CustomEvent('selectedcontact', {detail: {contactId: row.Id, lastName: row.LastName}});
            console.log(c_event);
            this.dispatchEvent(c_event);
        }
    }
    // to remove the problem when account id become null and empty list come and when Account's Contact is not available then also null
    // so same thing happend and when nothing selected then i show the same msg as seen in empty list

    //remove under all to see reflection

    get hasRecords() {
        return Boolean(this.accountId && this.conRecord && this.conRecord.length > 0);
    }

    
    get isNoRecord() {
        return Boolean(Boolean(this.accountId) && this.conRecord && this.conRecord.length === 0);
    }
}