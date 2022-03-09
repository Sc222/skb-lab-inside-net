using System;
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

    public Person[] Search(string searchedName, string department)
    {
        if (string.IsNullOrEmpty(searchedName))
            return string.IsNullOrEmpty(department) ?
                people.GetAll() : 
                people.Find(p => p.Department.Name == department);

        var searchedNameLower = searchedName.ToLower();
        return string.IsNullOrEmpty(department) ?
            people.Find(p => p.FullName.ToLower().Contains(searchedNameLower)) :
            people.Find(p => p.FullName.ToLower().Contains(searchedNameLower) && p.Department.Name == department);
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
