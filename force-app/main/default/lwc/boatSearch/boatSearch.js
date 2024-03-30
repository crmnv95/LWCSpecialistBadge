import { LightningElement, api } from 'lwc';

export default class BoatSearch extends LightningElement {
    @api isLoading = false;
    
    handleLoading() {
        this.isLoading = true;
    }

    handleDoneLoading() {
        this.isLoading = false;
    }

    // Handles search boat event
    // This custom event comes from the form
    searchBoats(event) { }

    createNewBoat() { }
}