import { api, LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts'

const columns = [
    {label: 'First Name', fieldName: 'FirstName' ,type: 'text'},
    {label: 'Last Name', fieldName: 'LastName' ,type: 'text'},
    {label: 'Email', fieldName: 'Email' ,type: 'email'},
    {label: 'Phone', fieldName: 'Phone', type: 'phone'},
    {label: 'Action',type: 'button', typeAttributes:{
        label: 'view Contact',
        variant: 'brand',
        name: 'view_contact',
        title: 'View Contact'
    }}
]
export default class Practice2 extends LightningElement {
    @api accountId;
    cols = columns;
    recData;

    @wire(getContacts, {accId: '$accountId'})
    wiredAccount({error,data}){
        if(data){
            this.recData = data;
        }
        else if(error){
            this.recData = undefined;
        }
    }

    actionHandler(event){
        const rowAction = event.detail.action.name;
        const row = event.detail.row;

        if(rowAction === 'view_contact'){
            this.dispatchEvent(new CustomEvent('selectedcontact', {detail: {Id: row.Id, LastName: row.LastName}}));
        }
    }
}