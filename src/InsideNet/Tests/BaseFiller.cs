using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MoreLinq;
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

        rolesRepo.CreateRange(roles.Select(r => r.Value).DistinctBy(r => r.Id));
        positionsRepo.CreateRange(positions.Select(p => p.Value).DistinctBy(p => p.Id));
        departmentsRepo.CreateRange(departments.Select(d => d.Value).DistinctBy(d => d.Id));
        peopleRepo.CreateRange(people.Select(p => p.Value));

        var vacation = new CalendarData
        {
            StartTime = DateTime.Now,
            EndTime = DateTime.Now + TimeSpan.FromDays(14),
            Person = people[UserType.Programmer1],
            Subject = "Отпуск"
        };

        vacationsRepo.Create(vacation);

        var contact = new PersonContact
        {
            PersonId = people[UserType.DepartmentManager].Id,
            ContactId = people[UserType.Programmer1].Id
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
            Name = "departmentManager",
            Id = Guid.NewGuid()
        };
        var defaultRole = new Role
        {
            AllowedActions = new List<string>(),
            Name = "regularUser",
            Id = Guid.NewGuid()
        };
        var slackAdmin = new Role
        {
            AllowedActions = new List<string>
            {
                "canEditNotificationsChannels",
                "canResolveAccessRequests"
            },
            Name = "slackAdmin",
            Id = Guid.NewGuid()
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
            Name = "admin",
            Id = Guid.NewGuid()
        };
        return new Dictionary<UserType, Role>
        {
            { UserType.DepartmentManager, departmentManager },
            { UserType.Programmer1, defaultRole },
            { UserType.Admin, admin },
            { UserType.Programmer2, defaultRole },
            { UserType.Programmer3, defaultRole },
            { UserType.SlackAdmin, slackAdmin }
        };
    }

    private Dictionary<UserType, Department> GenerateDepartments()
    {
        var programmersDepartment = new Department { Name = "Отдел программистов", Id = Guid.NewGuid() };
        var mainDepartment = new Department { Name = "Главное отделение", Id = Guid.NewGuid() };
        var hrDepartment = new Department { Name = "HR-отдел", Id = Guid.NewGuid() };
        return new()
        {
            { UserType.DepartmentManager, hrDepartment },
            { UserType.Programmer1, programmersDepartment },
            { UserType.Programmer2, programmersDepartment },
            { UserType.Programmer3, programmersDepartment },
            { UserType.Admin, mainDepartment },
            { UserType.SlackAdmin, mainDepartment }
        };
    }

    private Dictionary<UserType, Position> GenerateUserPositions()
    {
        var programmerPosition = new Position { Id = Guid.NewGuid(), Name = "Программист" };
        var departmentManagerPosition = new Position { Name = "Менеджер", Id = Guid.NewGuid()};
        var adminPosition = new Position { Name = "Админ", Id = Guid.NewGuid()};
        return new()
        {
            { UserType.DepartmentManager, departmentManagerPosition },
            { UserType.Programmer1, programmerPosition },
            { UserType.Admin, adminPosition },
            { UserType.Programmer2, programmerPosition },
            { UserType.Programmer3, programmerPosition },
            { UserType.SlackAdmin, programmerPosition }
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
        var programmer1 = new Person
        {
            Email = "k@k.com",
            Login = "user",
            Password = "user",
            FullName = "Анатолий Генадьевич Зас",
            Position = positions[UserType.Programmer1],
            Department = departments[UserType.Programmer1],
            Role = roles[UserType.Programmer1],
            Telegram = "@was_ist_zas"
        };
        var programmer2 = new Person
        {
            Email = "q@q.com",
            Login = "ketamin",
            Password = "ketamin",
            FullName = "Иван Витальевич Приходько",
            Position = positions[UserType.Programmer2],
            Department = departments[UserType.Programmer2],
            Role = roles[UserType.Programmer2],
            Telegram = "@prihodi_ko_mne_vecherom"
        };
        var programmer3 = new Person
        {
            Email = "l@l.com",
            Login = "brawler",
            Password = "stars",
            FullName = "Владимир Терентьевич Жлоб",
            Position = positions[UserType.Programmer3],
            Department = departments[UserType.Programmer3],
            Role = roles[UserType.Programmer3],
            Telegram = "@generous_soul"
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
        var slackAdmin = new Person
        {
            Email = "b@b.com",
            Login = "pulya",
            Password = "dulya",
            FullName = "Данил Петрович Чемозин",
            Position = positions[UserType.SlackAdmin],
            Department = departments[UserType.SlackAdmin],
            Role = roles[UserType.SlackAdmin],
            Telegram = "@acceptedguy"
        };
        return new Dictionary<UserType, Person>
        {
            { UserType.DepartmentManager, manager },
            { UserType.Programmer1, programmer1 },
            { UserType.Programmer2, programmer2 },
            { UserType.Programmer3, programmer3 },
            { UserType.SlackAdmin, slackAdmin },
            { UserType.Admin, admin }
        };
    }

    private enum UserType
    {
        DepartmentManager,
        Programmer1,
        Admin,
        SlackAdmin,
        Programmer2,
        Programmer3,
    }
}
