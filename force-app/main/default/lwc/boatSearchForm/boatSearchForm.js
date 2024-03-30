import { LightningElement, wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
    searchOptions;
    error = undefined;
    selectedBoatTypeId = '';

    @wire(getBoatTypes)
    wiredBoatTypes({ data, error }) {
        if (data) {
            this.searchOptions = data.map(type => ({ label: type.Name, value: type.Id }));
            this.searchOptions.unshift({ label: 'All Types', value: '' });
        } else if (error) {
            this.searchOptions = 'undefined';
            this.error = error;
        }
    }

    handleChange(event) {
        this.selectedBoatTypeId = event.detail.value;
        
    }

    handleSearchOptionChange(event) {
        const searchEvent = new CustomEvent('search', { detail: { boatTypeId: this.selectedBoatTypeId }, bubbles: true });

        this.dispatchEvent(searchEvent);
    }
}