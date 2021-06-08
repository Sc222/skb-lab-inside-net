using System;
using System.Linq;
using Storage;
using Storage.Entities;

namespace InsideNet.Services
{
    public class PersonRolesService
    {
        private readonly IRepository<PersonRole> personRoles;
        private readonly IRepository<Role> roles;
        private readonly IRepository<Person> people;

        public PersonRolesService(IRepository<PersonRole> personRoles, IRepository<Role> roles, IRepository<Person> people)
        {
            this.personRoles = personRoles;
            this.roles = roles;
            this.people = people;
        }

        public Role GetPersonRole(Guid personId)
        {
            var roleId = personRoles.SingleOrDefault(r => r.PersonId == personId)?.RoleId;
            return roles.SingleOrDefault(r => r.Id == roleId);
        }

        public void SetPersonRole(Guid personId, Guid newRoleId)
        {
            var oldRole = personRoles.SingleOrDefault(r => r.PersonId == personId);
            if (oldRole != null)
                personRoles.Delete(oldRole);
            var newPersonRole = new PersonRole {PersonId = personId, RoleId = newRoleId};
            personRoles.Create(newPersonRole);
        }

        public Person[] GetPeopleByRole(Guid roleId)
        {
            var peopleIds = personRoles.Find(r => r.RoleId == roleId).Select(r => r.PersonId);
            return people.Find(p => peopleIds.Contains(p.Id));
        }
    }
}
