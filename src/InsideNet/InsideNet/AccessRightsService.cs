using System;
using System.Linq;
using Storage;
using Storage.Entities;

namespace InsideNet.Services
{
    public class AccessRightsService
    {
        private readonly IRepository<AccessRight> accessRights;
        private readonly IRepository<PersonAccessRights> personAccessRights;

        public AccessRightsService(IRepository<AccessRight> accessRights, IRepository<PersonAccessRights> personAccessRights)
        {
            this.accessRights = accessRights;
            this.personAccessRights = personAccessRights;
        }

        public AccessRight[] GetAccessRightsRelatedToPerson(Guid personId)
        {
            var ids = personAccessRights.Find(r => r.PersonId == personId).Select(r => r.AccesRightId);
            return accessRights.Find(r => ids.Contains(r.Id));
        }

        public void Create(AccessRight accessRight)
        {
            accessRights.Create(accessRight);
        }

        public void Update(AccessRight accessRight)
        {
            accessRights.Update(accessRight);
        }

        public void Delete(Guid id)
        {
            accessRights.Delete(id);
        }

        public AccessRight[] GetAll()
        {
            return accessRights.GetAll();
        }
    }
}
