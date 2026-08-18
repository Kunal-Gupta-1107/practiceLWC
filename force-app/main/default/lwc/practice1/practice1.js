import { LightningElement } from 'lwc';

export default class Practice1 extends LightningElement {
    selectedAccount

    accountHandler(event){
        this.selectedAccount = event.detail.recordId;
    }

    ActionHandler(event){
        window.alert(event.detail.Id);
        window.alert(event.detail.LastName);
    }
}