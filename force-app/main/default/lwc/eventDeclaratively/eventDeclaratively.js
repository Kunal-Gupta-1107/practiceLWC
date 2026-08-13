import { LightningElement } from 'lwc';

export default class EventDeclaratively extends LightningElement {

    incHandler(event){
        // Create Event
        const inc = new CustomEvent('increase',{detail: 'Vol Increase'}) // always lowercase
        //Dispatch Event
        this.dispatchEvent(inc);

    }

    decHandler(event){  
    
        this.dispatchEvent(new CustomEvent('descrease',{detail: 'Vol Decrease'})); 
    }
}