using System;
using AutoMapper;
using InsideNet.Services;
using InsideNet.Web.Auth;
using InsideNet.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Storage.Entities;

namespace InsideNet.Web.Controllers
{
    [ApiController]
    [Authentication]
    [Route("api/[controller]")]
    public class AccessRightsController : ControllerBase
    {
        private readonly AccessRightsService accessRightsService;
        private readonly IMapper mapper;

        public AccessRightsController(AccessRightsService accessRightsService, IMapper mapper)
        {
            this.accessRightsService = accessRightsService;
            this.mapper = mapper;
        }

        [HttpGet("{id}")]
        public AccessRightModel Get(Guid id)
        {
            return mapper.Map<AccessRightModel>(accessRightsService.Get(id));
        }

        [HttpGet("all")]
        public AccessRightModel[] GetAll()
        {
            return mapper.Map<AccessRightModel[]>(accessRightsService.GetAll());
        }

        [AccessFor("canEditAccessRights")]
        [HttpPost("create")]
        public AccessRightModel Create([FromBody] AccessRightModel accessRight)
        {
            var entity = mapper.Map<AccessRight>(accessRight);
            return mapper.Map<AccessRightModel>(accessRightsService.Create(entity));
        }

        [AccessFor("canEditAccessRights")]
        [HttpPost("update")]
        public AccessRightModel Update([FromBody] AccessRightModel accessRight)
        {
            var entity = mapper.Map<AccessRight>(accessRight);
            return mapper.Map<AccessRightModel>(accessRightsService.Update(entity));
        }

        [AccessFor("canEditAccessRights")]
        [HttpPost("delete")]
        public void Delete([FromBody] AccessRightModel accessRight)
        {
            accessRightsService.Delete(accessRight.Id);
        }
    }
}
