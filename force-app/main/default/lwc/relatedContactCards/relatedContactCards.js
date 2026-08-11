import { api, LightningElement, wire } from 'lwc';
import getContact from '@salesforce/apex/AccountController.getRelCon'

export default class RelatedContactCards extends LightningElement {
    cardName='Contact Cards';
    @api recordId;
    contactRecords=[];
    
    hasContactRecords= false;

    @wire(getContact, {accId: '$recordId'})
    response({error, data}){
        if(data){
            this.contactRecords=data;
            this.cardName = 'Contact Card  (' + data.length + ')';
            this.hasContactRecords = true;
        }
        else{
            this.contactRecords = [];
            this.cardName = 'Contact Card (😵)';
            this.hasContactRecords = false;
        }
    }
}