using System;
using System.Linq;
using Castle.Core.Internal;
using Storage;
using Storage.Entities;

namespace InsideNet.Services
{
    public class PeopleService
    {
        private readonly IRepository<Person> people;
        private readonly IRepository<PersonAccessRights> accessRights;


        public PeopleService(IRepository<Person> people, IRepository<PersonAccessRights> accessRights)
        {
            this.people = people;
            this.accessRights = accessRights;
        }

        public void Create(Person person)
        {
            people.Create(person);
            if (!person.AccessRights.IsNullOrEmpty())
                accessRights.CreateRange(person.AccessRights);
            //движуха с рассылкой уведомлений
        }

        public Person Get(Guid id)
        {
            return people.Get(id);
        }

        public void Update(Person person)
        {
            var dbAccessRights = accessRights.Find(r => r.PersonId == person.Id);

            var (newRights, approvedRights, removedRights) = GetChangedRights(person.AccessRights, dbAccessRights);

            people.Update(person);

            accessRights.CreateRange(newRights);
            accessRights.UpdateRange(approvedRights);
            accessRights.DeleteRange(removedRights);
        }

        private static (PersonAccessRights[] newRights, PersonAccessRights[] approvedRights, PersonAccessRights[] removedRights) GetChangedRights(
            PersonAccessRights[] personAccessRights,
            PersonAccessRights[] dbAccessRights)
        {
            var ids = personAccessRights.Select(r => r.AccesRightId);
            var dbIds = dbAccessRights.Select(r => r.AccesRightId);
            var newRights = personAccessRights.Where(r => !dbIds.Contains(r.AccesRightId)).ToArray();
            var oldRights = personAccessRights.Where(r => dbIds.Contains(r.AccesRightId)).ToArray();
            var approvedRights = oldRights.Where(r => r.IsApproved).ToArray();
            var removedRights = dbAccessRights.Where(r => !ids.Contains(r.AccesRightId)).ToArray();
            return (newRights, approvedRights, removedRights);
        }

        public Person[] SearchByName(string searchedName)
        {
            var searchedNameLower = searchedName.ToLower();
            return people.Find(p => p.FullName.ToLower().Contains(searchedNameLower));
        }
    }
}
