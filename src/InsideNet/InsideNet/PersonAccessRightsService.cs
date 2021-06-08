using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Storage;
using Storage.Entities;

namespace InsideNet.Services
{
    public class PersonAccessRightsService
    {
        private readonly IRepository<PersonAccessRights> personAccessRights;

        public PersonAccessRightsService(IRepository<PersonAccessRights> personAccessRights)
        {
            this.personAccessRights = personAccessRights;
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
