using System;
using System.Collections.Generic;
using Storage;
using Storage.Entities;

namespace InsideNet.Services
{
    public class RolesService
    {
        private readonly IRepository<Role> roles;

        public RolesService(IRepository<Role> roles)
        {
            this.roles = roles;
        }

        public Role GetOrCreateDefaultRole()
        {
            var defaultRole = roles.SingleOrDefault(r => r.Name == "Default");

            if (defaultRole != null)
                return defaultRole;

            defaultRole = new Role
            {
                AllowedActions = new List<string> {"canRead"},
                Name = "Default"
            };
            roles.Create(defaultRole);

            return defaultRole;
        }

        public Role Get(Guid id)
        {
            return roles.Get(id);
        }

        public Role[] GetAll()
        {
            return roles.GetAll();
        }

        public Role Create(Role role)
        {
            roles.Create(role);
            return role;
        }

        public Role Update(Role role)
        {
            roles.Update(role);
            return role;
        }

        public void Delete(Guid id)
        {
            roles.Delete(id);
        }
    }
}
