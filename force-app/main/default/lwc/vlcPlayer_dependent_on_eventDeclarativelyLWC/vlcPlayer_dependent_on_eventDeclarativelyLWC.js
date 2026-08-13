import { LightningElement } from 'lwc';

export default class VlcPlayer_dependent_on_eventDeclarativelyLWC extends LightningElement {
    vol=50;
    text = 'Volume';
    increaseHandler(event){
        if(this.vol<100){
            this.vol++;
            this.text = event.detail;
        } 
            
    }
    DecreaseHandler(event){
        if(this.vol>0){
            this.vol--;
            this.text = event.detail;
        }
    }
}
