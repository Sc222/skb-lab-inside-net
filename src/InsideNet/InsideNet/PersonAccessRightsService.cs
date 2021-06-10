using System;
using System.Collections.Generic;
using System.Linq;
using Storage;
using Storage.Entities;

namespace InsideNet.Services
{
    public class PersonAccessRightsService
    {
        private readonly IRepository<PersonAccessRights> personAccessRights;
        private readonly IRepository<AccessRight> accessRights;

        public PersonAccessRightsService(IRepository<PersonAccessRights> personAccessRights, IRepository<AccessRight> accessRights)
        {
            this.personAccessRights = personAccessRights;
            this.accessRights = accessRights;
        }

        public AccessRight[] GetAccessRightsRelatedToPerson(Guid personId)
        {
            var ids = personAccessRights.Find(r => r.PersonId == personId).Select(r => r.AccesRightId);
            return accessRights.Find(r => ids.Contains(r.Id));
        }

        public void RequestAccess(Guid personId, params Guid[] rightsIds)
        {
            var accessRights = ConvertToPersonAccessRights(personId, rightsIds);
            personAccessRights.CreateRange(accessRights);
        }

        public void ApproveAccess(Guid personId, params Guid[] rightsIds)
        {
            var accessRights = ConvertToPersonAccessRights(personId, rightsIds, true);
            personAccessRights.UpdateRange(accessRights);
        }

        public void RemoveAccess(Guid personId, params Guid[] rightsIds)
        {
            var accessRights = ConvertToPersonAccessRights(personId, rightsIds);
            personAccessRights.DeleteRange(accessRights);
        }

        private static IEnumerable<PersonAccessRights> ConvertToPersonAccessRights(Guid personId, Guid[] rightsIds, bool isApproved = false)
        {
            var accessRights = rightsIds.Select(id => new PersonAccessRights
            {
                AccesRightId = id,
                PersonId = personId,
                IsApproved = isApproved
            });
            return accessRights;
        }
    }
}
