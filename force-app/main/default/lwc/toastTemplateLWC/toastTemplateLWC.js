import { LightningElement } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ToastTemplateLWC extends LightningElement {
    onClickHandler(event) {
        const toastEvent = new ShowToastEvent({
            title: 'Salesforce Toast',
            message: 'It is just a checkup process, not a warning',
            variant: 'warning'
        });
        console.log('here i got you');
        this.dispatchEvent(toastEvent);
    }
}