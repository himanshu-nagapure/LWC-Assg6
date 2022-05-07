public with sharing class AccountInsert {
    @AuraEnabled
    public static Account insertAcc(Account acc){
        try{
            insert acc;
            system.debug('ACC'+acc);
            return acc;
        }catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}
