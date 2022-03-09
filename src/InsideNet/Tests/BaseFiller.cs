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
            var rolesRepo = new Repository<Role>(contextFactory);
            var positionsRepo = new Repository<Position>(contextFactory);
            var vacationsRepo = new Repository<Vacation>(contextFactory);
            var contactsRepo = new Repository<PersonContact>(contextFactory);
            var peopleRepo = new Repository<Person>(contextFactory);
            var peopleRolesRepo = new Repository<PersonRole>(contextFactory);
            var departmentsRepo = new Repository<Department>(contextFactory);

            var roles = GenerateRoles();
            var positions = GenerateUserPositions();
            var departments = GenerateDepartments();
            var people = GeneratePeople(positions, departments);

            rolesRepo.CreateRange(roles.Select(r => r.Value));
            positionsRepo.CreateRange(positions.Select(p => p.Value));
            departmentsRepo.CreateRange(departments.Select(d => d.Value));
            peopleRepo.CreateRange(people.Select(p => p.Value));

            var vacation = new Vacation
            {
                From = DateTime.Now,
                To = DateTime.Now + TimeSpan.FromDays(14),
                PersonId = people[UserType.Programmer].Id
            };

            vacationsRepo.Create(vacation);

            var contact = new PersonContact
            {
                PersonId = people[UserType.DepartmentManager].Id,
                ContactId = people[UserType.Programmer].Id
            };

            contactsRepo.Create(contact);


            var peopleRoles = GeneratePersonRoles(people, roles);
            peopleRolesRepo.CreateRange(peopleRoles);
        }

        private enum UserType
        {
            DepartmentManager,
            Programmer,
            Admin
        }


        private Dictionary<UserType, Role> GenerateRoles()
        {
            var departmentManager = new Role
            {
                AllowedActions = new List<string>
                {
                    "canEditUsers",
                    "canEditVacations",
                    "canEditPositions"
                }, 
                Name = "DepartmentManager"
            };
            var programmer = new Role
            {
                AllowedActions = new List<string>(), 
                Name = "Regular"
            };
            var admin = new Role
            {
                AllowedActions = new List<string> 
                { 
                    "canEditUsers",
                    "canEditRoles",
                    "canSetRoles",
                    "canViewRoles",
                    "canResolveAccessRequests",
                    "canEditVacations",
                    "canEditPositions",
                    "canEditNotificationsChannels"
                },
                Name = "Admin"
            };
            return new Dictionary<UserType, Role>
            {
                {UserType.DepartmentManager, departmentManager},
                {UserType.Programmer, programmer},
                {UserType.Admin, admin}
            };
        }

        private Dictionary<UserType, Department> GenerateDepartments() => new Dictionary<UserType, Department>
        {
            { UserType.DepartmentManager, new Department { Name = "HR-отдел" } },
            { UserType.Programmer, new Department { Name = "Отдел программистов" } },
            { UserType.Admin, new Department { Name = "Главное отделение" } }
        };

        private Dictionary<UserType, Position> GenerateUserPositions() => new Dictionary<UserType, Position>
        {
            {UserType.DepartmentManager, new Position {Name = "Менеджер"}},
            {UserType.Programmer, new Position {Name = "Программист"}},
            {UserType.Admin, new Position {Name = "Админ"}}
        };

        private Dictionary<UserType, Person> GeneratePeople(Dictionary<UserType, Position> positions, Dictionary<UserType, Department> departments)
        {
            var manager = new Person
            {
                Email = "m@m.com",
                Login = "manager",
                Password = "manager",
                FullName = "Екатерина Андреевна Зас",
                Position = positions[UserType.DepartmentManager],
                Department = departments[UserType.DepartmentManager]
            };
            var programmer = new Person
            {
                Email = "k@k.com",
                Login = "user",
                Password = "user",
                FullName = "Анатолий Генадьевич Зас",
                Position = positions[UserType.Programmer],
                Department = departments[UserType.Programmer],
                Telegram = "@abc"
            };
            var admin = new Person
            {
                Email = "a@a.com",
                Login = "admin",
                Password = "admin",
                FullName = "Евгений Кожемяко",
                Position = positions[UserType.Admin],
                Department = departments[UserType.Admin],
                PhoneNumber = "88005553535"
            };
            return new Dictionary<UserType, Person>
            {
                {UserType.DepartmentManager, manager},
                {UserType.Programmer, programmer},
                {UserType.Admin, admin}
            };
        }

        private List<PersonRole> GeneratePersonRoles(Dictionary<UserType, Person> people, Dictionary<UserType, Role> roles) =>
            people
                .Select(kvp => new PersonRole
                {
                    PersonId = kvp.Value.Id,
                    RoleId = roles[kvp.Key].Id
                })
                .ToList();
    }
}