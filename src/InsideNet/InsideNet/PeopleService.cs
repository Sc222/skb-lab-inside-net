using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Storage;
using Storage.Entities;

namespace InsideNet.Services;

public class PeopleService
{
    private readonly IRepository<Person> people;
    private readonly TokenGenerator tokenGenerator;

    public PeopleService(IRepository<Person> people, TokenGenerator tokenGenerator)
    {
        this.people = people;
        this.tokenGenerator = tokenGenerator;
    }

    public Person Create(Person person)
    {
        people.Create(person);
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

    public Person[] Search(string searchedName, HashSet<string> departments)
    {
        var hasDepartments = departments.Count > 0;
        var hasName = !string.IsNullOrEmpty(searchedName);
        var searchedNameLower = hasName ? searchedName.Trim().ToLower() : null;

        //TODO: simplify using predicate

        if (hasName && hasDepartments)
        {
            return people.Find(p =>
                p.FullName.ToLower().Contains(searchedNameLower) && departments.Contains(p.Department.Name)).ToArray();
        }

        if (!hasName && hasDepartments)
        {
            return people.Find(p => departments.Contains(p.Department.Name));
        }

        if (hasName && !hasDepartments)
        {
            return people.Find(p => p.FullName.ToLower().Contains(searchedNameLower));
        }

        return people.GetAll();
    }

    public Person[] GetAll()
    {
        return people.GetAll(true);
    }

    public (Person Person, string Token, DateTime Expires)? Authenticate(string email, string password)
    {
        var user = people.SingleOrDefault(x => x.Email == email && x.Password == password);

        if (user == null)
            return null;

        var (token, expires) = tokenGenerator.GenerateJwtToken(user);

        return (user, token, expires);
    }
}