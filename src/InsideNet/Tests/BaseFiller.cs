using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Storage;
using Storage.Entities;

namespace Tests
{
    public class Tests
    {
        [Test]
        public void ClearBase()
        {
            var context = new StorageContext();
            context.Database.ExecuteSqlRaw("DROP SCHEMA public CASCADE");
            context.Database.ExecuteSqlRaw("CREATE SCHEMA public");
            context.Database.Migrate();
        }

        [Test]
        public void FillBase()
        {
            var contextFactory = new ContextFactory();
            var rightsRepo = new Repository<AccessRight>(contextFactory);
            var rolesRepo = new Repository<Role>(contextFactory);
            var positionsRepo = new Repository<Position>(contextFactory);
            var vacationsRepo = new Repository<Vacation>(contextFactory);
            var contactsRepo = new Repository<PersonContact>(contextFactory);
            var peopleRepo = new Repository<Person>(contextFactory);
            var peopleAccessRightsRepo = new Repository<PersonAccessRights>(contextFactory);
            var peopleRolesRepo = new Repository<PersonRole>(contextFactory);

            var rights = GenerateAccessRights();
            var roles = GenerateRoles();
            var positions = GenerateUserPositions();
            var people = GeneratePeople(rights, positions, roles);

            rightsRepo.CreateRange(rights);
            rolesRepo.CreateRange(roles.Select(r => r.Value));
            positionsRepo.CreateRange(positions.Select(p => p.Value));
            peopleRepo.CreateRange(people.Select(p => p.Value));

            var vacation = new Vacation
            {
                From = DateTime.Now,
                To = DateTime.Now + TimeSpan.FromDays(14),
                PersonId = people[UserType.SimpleDimple].Id
            };

            vacationsRepo.Create(vacation);

            var contact = new PersonContact
            {
                PersonId = people[UserType.Hr].Id,
                ContactId = people[UserType.SimpleDimple].Id
            };

            contactsRepo.Create(contact);

            var peopleAccessRights = GeneratePersonAccessRights(people.Select(p => p.Value), rights);
            peopleAccessRightsRepo.CreateRange(peopleAccessRights);

            var peopleRoles = GeneratePersonRoles(people, roles);
            peopleRolesRepo.CreateRange(peopleRoles);
        }

        private List<AccessRight> GenerateAccessRights()
        {
            var right1 = new AccessRight
            {
                AccessLevel = "Reader",
                ResourceName = "Grafana"
            };
            var right2 = new AccessRight
            {
                AccessLevel = "Maintainer",
                ResourceName = "GitLab"
            };
            return new List<AccessRight> {right1, right2};
        }

        private enum UserType
        {
            Hr,
            SimpleDimple,
            Admin
        }


        private Dictionary<UserType, Role> GenerateRoles()
        {
            var hr = new Role
            {
                AllowedActions = new List<string> {"canEdit"}, //заглушка, пока не придумал экшены
                Name = "Hr"
            };
            var popIt = new Role
            {
                AllowedActions = new List<string> { "canEdit" }, //заглушка, пока не придумал экшены
                Name = "SimpleDimple"
            };
            var admin = new Role
            {
                AllowedActions = new List<string> { "canEdit" }, //заглушка, пока не придумал экшены
                Name = "Admin"
            };
            return new Dictionary<UserType, Role>
            {
                {UserType.Hr, hr},
                {UserType.SimpleDimple, popIt},
                {UserType.Admin, admin}
            };
        }

        private Dictionary<UserType, Position> GenerateUserPositions() => new Dictionary<UserType, Position>
        {
            {UserType.Hr, new Position {Name = "Hr"}},
            {UserType.SimpleDimple, new Position {Name = "Programmer"}},
            {UserType.Admin, new Position {Name = "RUSS1488"}}
        };

        private Dictionary<UserType, Person> GeneratePeople(List<AccessRight> rights, Dictionary<UserType, Position> positions, Dictionary<UserType, Role> roles)
        {
            var hr = new Person
            {
                Email = "m@m.com",
                Login = "hr",
                Password = "hr",
                Name = "Екатерина",
                Patronymic = "Андреевна",
                Surname = "Зас",
                Position = positions[UserType.Hr]
            };
            var simpleDimple = new Person
            {
                Email = "k@k.com",
                Login = "user",
                Password = "user",
                Name = "Анатолий",
                Patronymic = "Генадьевич",
                Surname = "Зас",
                Position = positions[UserType.SimpleDimple],
                Telegram = "@abc"
            };
            var admin = new Person
            {
                Email = "a@a.com",
                Login = "admin",
                Password = "admin",
                Name = "Супер",
                Patronymic = "Пупер",
                Surname = "Админ",
                Position = positions[UserType.Admin],
                PhoneNumber = "88005553535"
            };
            return new Dictionary<UserType, Person>
            {
                {UserType.Hr, hr},
                {UserType.SimpleDimple, simpleDimple},
                {UserType.Admin, admin}
            };
        }

        private List<PersonAccessRights> GeneratePersonAccessRights(IEnumerable<Person> people, List<AccessRight> rights) =>
            people
                .SelectMany(p => rights.Select(r => new PersonAccessRights
                {
                    AccesRightId = r.Id,
                    PersonId = p.Id
                }))
                .ToList();

        private List<PersonRole> GeneratePersonRoles(Dictionary<UserType, Person> people, Dictionary<UserType, Role> rights) =>
            people
                .Select(kvp => new PersonRole
                {
                    PersonId = kvp.Value.Id,
                    RoleId = rights[kvp.Key].Id
                })
                .ToList();
    }
}