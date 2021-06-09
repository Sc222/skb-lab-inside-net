using System;
using InsideNet.Services;
using InsideNet.Web.Auth;
using Microsoft.AspNetCore.Mvc;

namespace InsideNet.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authentication]
    public class PersonAccessRightsController : ControllerBase
    {
        private readonly PersonAccessRightsService personAccessRightsService;

        public PersonAccessRightsController(PersonAccessRightsService personAccessRightsService)
        {
            this.personAccessRightsService = personAccessRightsService;
        }

        [AccessFor("canRequestAccess", true)]
        [HttpPost("request/{personId}")]
        public void RequestAccessRightApproval(Guid personId, [FromQuery(Name = "rightId")] Guid[] rightsIds)
        {
            personAccessRightsService.RequestAccess(personId, rightsIds);
        }

        [AccessFor("canSetAccessRights")]
        [HttpPut("approve/{personId}")]
        public void ApproveRequest(Guid personId, [FromQuery(Name = "rightId")] Guid[] rightsIds)
        {
            personAccessRightsService.ApproveAccess(personId, rightsIds);
        }

        [AccessFor("canSetAccessRights")]
        [HttpDelete("remove/{personId}")]
        public void RemoveAccessRight(Guid personId, [FromQuery(Name = "rightId")] Guid[] rightsIds)
        {
            personAccessRightsService.RemoveAccess(personId, rightsIds);
        }
    }
}
