public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        throw new AuraHandledException('Forced error for Trailhead');
//        return [SELECT Id, FirstName, LastName, Email FROM Contact];
    }
}