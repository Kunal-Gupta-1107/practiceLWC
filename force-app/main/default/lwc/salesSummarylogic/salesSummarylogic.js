import { LightningElement, wire } from 'lwc';
import getOpps from '@salesforce/apex/AccountController.getOpps';

export default class SalesSummarylogic extends LightningElement {
    totalRevenue = 0;
    totalGain = 0;
    totalLoss = 0;
    totalOpen = 0;

    

    @wire(getOpps)
    wiredOpps({ error, data }) {
        if (data) {
            
            

        } else if (error) {
            console.error('Error fetching opportunities:', error);
        }
    }

}