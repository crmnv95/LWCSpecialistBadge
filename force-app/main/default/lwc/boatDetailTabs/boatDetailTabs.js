import { LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
// Custom Labels Imports
import labelDetails from '@salesforce/label/c.Details';
import labelReviews from '@salesforce/label/c.Reviews';
import labelPleaseSelectABoat from '@salesforce/label/c.Please_select_a_boat';
import labelAddReview from '@salesforce/label/c.Add_Review';
import labelFullDetails from '@salesforce/label/c.Full_Details';
import BOAT_ID_FIELD from '@salesforce/schema/Boat__c.Id';
import BOAT_NAME_FIELD from '@salesforce/schema/Boat__c.Name';
import BOATMC from '@salesforce/messageChannel/BoatMessageChannel__c';

const BOAT_FIELDS = [BOAT_ID_FIELD, BOAT_NAME_FIELD];

export default class BoatDetailTabs extends LightningElement {
    boatId;
    @wire(getRecord, { recordId: '$boatId', fields: BOAT_FIELDS })
    wiredRecord;

    label = {
        labelDetails,
        labelReviews,
        labelAddReview,
        labelFullDetails,
        labelPleaseSelectABoat,
    };
    
    // Decide when to show or hide the icon
    // returns 'utility:anchor' or null
    get detailsTabIconName() {
        if (this.wiredRecord.data) {
            return 'utility:anchor'
        } else {
            return null
        }
     }
    
    // Utilize getFieldValue to extract the boat name from the record wire
    get boatName() {
        return getFieldValue(this.wiredRecord.data, BOAT_NAME_FIELD)
    }
    
    // Private
    subscription = null;
    
    // Subscribe to the message channel
    subscribeMC() {
        // local boatId must receive the recordId from the message
    }
    
    // Calls subscribeMC()
    connectedCallback() { }
    
    // Navigates to record page
    navigateToRecordViewPage() { }
    
    // Navigates back to the review list, and refreshes reviews component
    handleReviewCreated() {
        this.template.querySelector('lightning-tabset').activeTabValue = 'reviews';
        this.template.querySelector('c-boat-reviews').refresh();
     }
}