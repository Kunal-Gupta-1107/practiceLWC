import { LightningElement } from 'lwc';

export default class Program1 extends LightningElement {
    buttonHandler(){
        window.alert('Button Clicked');
    }
}