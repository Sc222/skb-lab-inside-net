using System;
using System.Linq;
using Storage;
using Storage.Entities;

namespace InsideNet.Services
{
    public class ContactsService
    {
        private readonly IRepository<Person> people;
        private readonly IRepository<PersonContact> contacts;


        public ContactsService(IRepository<Person> people, IRepository<PersonContact> contacts)
        {
            this.people = people;
            this.contacts = contacts;
        }

        public Person[] GetPersonContacts(Guid id)
        {
            var contactsIds = contacts.Find(p => p.PersonId == id).Select(p => p.ContactId);
            return people.Find(p => contactsIds.Contains(p.Id));
        }

        public void AddToContacts(Guid initiatorId, Guid contactId)
        {
            contacts.Create(new PersonContact
            {
                PersonId = initiatorId,
                ContactId = contactId
            });
        }

        public void RemoveFromContacts(Guid initiatorId, Guid contactId)
        {
            contacts.Delete(new PersonContact
            {
                PersonId = initiatorId,
                ContactId = contactId
            });
        }
    }
}
