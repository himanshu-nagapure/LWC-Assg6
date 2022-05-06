import { LightningElement,track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import insertAcc from '@salesforce/apex/AccountInsert.insertAcc';
import ACCOUNT_OBJINFO from '@salesforce/schema/Account';
import RATING  from '@salesforce/schema/Account.Rating';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class AccountForm extends LightningElement {
    activeSections = ['A', 'B'];
    Name;
    Email;
    Phone;
    AnnualRevenue;
    rating;
    industry;

    isNewContacts = false;

    @track account ={};
    @track ratingPicklistOptions;
    @track industryPicklistOptions;

    @wire( getObjectInfo ,{
        objectApiName:ACCOUNT_OBJINFO
    })
    accountInfo

    @wire(getPicklistValues,{
        recordTypeId: '$accountInfo.data.defaultRecordTypeId',
        fieldApiName: INDUSTRY_FIELD
    })
    industryPicklist({error,data}){
        if(data){
                this.industryPicklistOptions = data.values;
        }else if(error){
        }
    }
    handleindustry(event){
        this.industry = event.target.value;
        this.account.industry= this.industry;
    }

    @wire(getPicklistValues,{
        recordTypeId: '$accountInfo.data.defaultRecordTypeId',
         fieldApiName: RATING
    })
    ratingPicklist({data,error}){
        if(data){
            this.ratingPicklistOptions=data.values;
        }else if(error){

        }
    }
    handleRating(event){
        this.account.rating=event.target.value;

    }

    handlerName(event){
        this.Name = event.target.value;
        console.log(this.Name)
        this.account.Name=this.Name;
    }

    handlerEmail(event){
        this.Email = event.target.value;
        console.log(this.Email)
        this.account.Email=this.EMail;
    }

    handlerPhone(event){
        this.Phone = event.target.value;
        console.log(this.Phone)
        this.account.Phone=this.Phone;
    }

    handlerAnnualRevenue(event){
        this.AnnualRevenue = event.target.value;
        console.log(this.AnnualRevenue)
        this.account.AnnualRevenue=this.AnnualRevenue;
    }

    toastEventFire(title,msg,variant,mode){
        const e = new ShowToastEvent({
            title: title,
            message: msg,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(e);
    }    

    handleForSave(){
        this.spinnerStatus = true;
        alert(JSON.stringify(this.account));
        insertAcc({ acc : this.account})
        .then(result =>{
            this.spinnerStatus = false;
            this.Name='';
            this.AccountNumber='';
            this.rating='';
            this.industry='';
            this.toastEventFire('Success','account Record is Saved','success')                      
        })
        .catch(error =>{
            this.error = error.message;
            alert(JSON.stringify(error))
        })
    }

    handleForNext(){
        alert(JSON.stringify(this.account));
        this.template.querySelector('lightning-card').classList.add('hidden');
        this.isNewContacts = true;
    }
}
