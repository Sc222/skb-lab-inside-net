﻿using System;
using System.Threading.Tasks;
using Storage;
using Storage.Entities;

namespace InsideNet.Services
{
    public class PeopleService
    {
        private readonly IRepository<Person> people;
        private readonly IRepository<PersonAccessRights> accessRights;
        private readonly NotificationsService notificationsService;
        private readonly TokenGenerator tokenGenerator;

        public PeopleService(IRepository<Person> people, IRepository<PersonAccessRights> accessRights, NotificationsService notificationsService, TokenGenerator tokenGenerator)
        {
            this.people = people;
            this.accessRights = accessRights;
            this.notificationsService = notificationsService;
            this.tokenGenerator = tokenGenerator;
        }

        public async Task<Person> Create(Person person)
        {
            people.Create(person);
            if (person.IsNewbie)
                try
                {
                    await notificationsService.SendNotificationAboutNewUserToSlack(person).ConfigureAwait(false);
                    await notificationsService.SendNotificationAboutNewUserToTelegram(person).ConfigureAwait(false);
                }
                catch
                {
                    // ignored
                }

            return person;
        }

        public Person Get(Guid id)
        {
            return people.Get(id);
        }

        public Person Update(Person person)
        {
            people.Update(person);
            return person;
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

        public (Person Person, string Token, DateTime Expires)? Authenticate(string login, string password)
        {
            var user = people.SingleOrDefault(x => x.Login == login && x.Password == password);

            if (user == null)
                return null;

            var (token, expires) = tokenGenerator.GenerateJwtToken(user);

            return (user, token, expires);
        }
    }
}
