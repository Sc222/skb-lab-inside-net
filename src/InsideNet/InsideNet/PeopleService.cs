using System;
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
            people.Update(person);
        }

        public Person[] SearchByName(string searchedName)
        {
            var searchedNameLower = searchedName.ToLower();
            return people.Find(p => p.FullName.ToLower().Contains(searchedNameLower));
        }

        public Person[] GetAll()
        {
            return people.GetAll(true);
        }
    }
}
