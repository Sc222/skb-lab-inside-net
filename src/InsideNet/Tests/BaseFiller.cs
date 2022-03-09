using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using Storage;
using Storage.Entities;

namespace Tests;

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
        var vacationsRepo = new Repository<CalendarData>(contextFactory);
        var contactsRepo = new Repository<PersonContact>(contextFactory);
        var peopleRepo = new Repository<Person>(contextFactory);
        var departmentsRepo = new Repository<Department>(contextFactory);

        var roles = GenerateRoles();
        var positions = GenerateUserPositions();
        var departments = GenerateDepartments();
        var people = GeneratePeople(positions, departments, roles);

        rolesRepo.CreateRange(roles.Select(r => r.Value));
        positionsRepo.CreateRange(positions.Select(p => p.Value));
        departmentsRepo.CreateRange(departments.Select(d => d.Value));
        peopleRepo.CreateRange(people.Select(p => p.Value));

        var vacation = new CalendarData
        {
            StartTime = DateTime.Now,
            EndTime = DateTime.Now + TimeSpan.FromDays(14),
            Person = people[UserType.Programmer]
        };

        vacationsRepo.Create(vacation);

        var contact = new PersonContact
        {
            PersonId = people[UserType.DepartmentManager].Id,
            ContactId = people[UserType.Programmer].Id
        };

        contactsRepo.Create(contact);
    }


    private Dictionary<UserType, Role> GenerateRoles()
    {
        var departmentManager = new Role
        {
            AllowedActions = new List<string>
            {
                "canEditUsers",
                "canEditCalendars",
                "canEditPositions"
            },
            Name = "departmentManager"
        };
        var programmer = new Role
        {
            AllowedActions = new List<string>(),
            Name = "regularUser"
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
                "canEditCalendars",
                "canEditPositions",
                "canEditNotificationsChannels"
            },
            Name = "admin"
        };
        return new Dictionary<UserType, Role>
        {
            { UserType.DepartmentManager, departmentManager },
            { UserType.Programmer, programmer },
            { UserType.Admin, admin }
        };
    }

    private Dictionary<UserType, Department> GenerateDepartments()
    {
        return new()
        {
            { UserType.DepartmentManager, new Department { Name = "HR-отдел" } },
            { UserType.Programmer, new Department { Name = "Отдел программистов" } },
            { UserType.Admin, new Department { Name = "Главное отделение" } }
        };
    }

    private Dictionary<UserType, Position> GenerateUserPositions()
    {
        return new()
        {
            { UserType.DepartmentManager, new Position { Name = "Менеджер" } },
            { UserType.Programmer, new Position { Name = "Программист" } },
            { UserType.Admin, new Position { Name = "Админ" } }
        };
    }

    private Dictionary<UserType, Person> GeneratePeople(Dictionary<UserType, Position> positions, Dictionary<UserType, Department> departments, Dictionary<UserType, Role> roles)
    {
        var manager = new Person
        {
            Email = "m@m.com",
            Login = "manager",
            Password = "manager",
            FullName = "Екатерина Андреевна Зас",
            Position = positions[UserType.DepartmentManager],
            Department = departments[UserType.DepartmentManager],
            Role = roles[UserType.DepartmentManager]
        };
        var programmer = new Person
        {
            Email = "k@k.com",
            Login = "user",
            Password = "user",
            FullName = "Анатолий Генадьевич Зас",
            Position = positions[UserType.Programmer],
            Department = departments[UserType.Programmer],
            Role = roles[UserType.Programmer],
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
            Role = roles[UserType.Admin],
            PhoneNumber = "88005553535"
        };
        return new Dictionary<UserType, Person>
        {
            { UserType.DepartmentManager, manager },
            { UserType.Programmer, programmer },
            { UserType.Admin, admin }
        };
    }

    private enum UserType
    {
        DepartmentManager,
        Programmer,
        Admin
    }
}
