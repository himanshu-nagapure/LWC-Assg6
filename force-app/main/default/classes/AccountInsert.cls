public with sharing class AccountInsert {
    @AuraEnabled
    public static void insertAcc(account acc){
        try{
            insert ACC;
            system.debug('ACC'+ACC);
        }catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}
