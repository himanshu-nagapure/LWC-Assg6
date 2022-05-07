import { LightningElement, api } from 'lwc';

// const tabMarkup =`
//         <tr>
//             <td>
//                 <lightning-input type="text" name={Name}></lightning-input>
//             </td>
//             <td>
//                 <lightning-input type="text" name={Phone}></lightning-input>
//             </td>
//             <td>
//                 <lightning-button icon-name="action:delete" class="slds-button slds-button_destructive" 
//                 variant="Destructive"></lightning-button>
//             </td>
//         </tr>
//         <br/>
//         `;
// const 
// function handleConDelete () {
// console.log("Request to delete this contact");
// }

export default class ChildContactsForm extends LightningElement {
    Name;
    Phone;
    @api addClicked=false;

    handleModal(){
        console.log('Add Button clicked');
        this.addClicked = true;
        // this.template.querySelector('.table-con').insertAdjacentHTML('beforeend', tabMarkup);
    }
}