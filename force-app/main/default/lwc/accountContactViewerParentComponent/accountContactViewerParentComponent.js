import { LightningElement } from 'lwc';

export default class AccountContactViewerParentComponent extends LightningElement {

    selectedAccountId;
    handleAccountChange(event){
        this.selectedAccountId = event.detail.recordId;
    }
    
}