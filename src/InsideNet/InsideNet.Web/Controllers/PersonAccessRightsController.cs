using System;
using AutoMapper;
using InsideNet.Services;
using InsideNet.Web.Auth;
using InsideNet.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace InsideNet.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authentication]
    public class PersonAccessRightsController : ControllerBase
    {
        private readonly PersonAccessRightsService personAccessRightsService;
        private readonly IMapper mapper;

        public PersonAccessRightsController(PersonAccessRightsService personAccessRightsService, IMapper mapper)
        {
            this.personAccessRightsService = personAccessRightsService;
            this.mapper = mapper;
        }

        [HttpGet("{personId}")]
        public AccessRightModel[] GetPersonAccessRights(Guid personId)
        {
            var accessRights = personAccessRightsService.GetAccessRightsRelatedToPerson(personId);
            return mapper.Map<AccessRightModel[]>(accessRights);
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
