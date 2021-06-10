using System;
using Storage;
using Storage.Entities;

namespace InsideNet.Services
{
    public class AccessRightsService
    {
        private readonly IRepository<AccessRight> accessRights;

        public AccessRightsService(IRepository<AccessRight> accessRights)
        {
            this.accessRights = accessRights;
        }

        public AccessRight Create(AccessRight accessRight)
        {
            accessRights.Create(accessRight);
            return accessRight;
        }

        public AccessRight Update(AccessRight accessRight)
        {
            accessRights.Update(accessRight);
            return accessRight;
        }

        public void Delete(Guid id)
        {
            accessRights.Delete(id);
        }

        public AccessRight Get(Guid id)
        {
            return accessRights.Get(id);
        }

        public AccessRight[] GetAll()
        {
            return accessRights.GetAll();
        }
    }
}
