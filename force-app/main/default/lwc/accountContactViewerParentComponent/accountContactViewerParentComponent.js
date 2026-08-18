import { LightningElement } from 'lwc';

export default class AccountContactViewerParentComponent extends LightningElement {

    selectedAccountId;
    selectedContactId;
    selectedConLastName;

    
    handleAccountChange(event){
        this.selectedAccountId = event.detail.recordId; 
        //don't use event.target.value; coz it will give you undefined result
        // don't use event.detail.value it's somewhere correct but it won't give anything so uise which i used above
    }

    handleContactView(event){
        window.alert('Hi');
        this.selectedContactId = event.detail.contactId;
        this.selectedConLastName = event.detail.lastName;
        window.alert(this.selectedContactId);
    }
    
}