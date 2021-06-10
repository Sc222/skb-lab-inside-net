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
    public class RolesController : ControllerBase
    {
        private readonly RolesService rolesService;
        private readonly IMapper mapper;

        public RolesController(IMapper mapper, RolesService rolesService)
        {
            this.mapper = mapper;
            this.rolesService = rolesService;
        }

        [AccessFor("canViewRoles")]
        [HttpGet("{id}")]
        public RoleModel Get(Guid id)
        {
            return mapper.Map<RoleModel>(rolesService.Get(id));
        }

        [AccessFor("canViewRoles")]
        [HttpGet("all")]
        public RoleModel[] GetAll()
        {
            return mapper.Map<RoleModel[]>(rolesService.GetAll());
        }

        [AccessFor("canEditRoles")]
        [HttpPost("create")]
        public RoleModel Create([FromBody] RoleModel role)
        {
            var entity = mapper.Map<Role>(role);
            return mapper.Map<RoleModel>(rolesService.Create(entity));
        }

        [AccessFor("canEditRoles")]
        [HttpPost("update")]
        public RoleModel Update([FromBody] RoleModel role)
        {
            var entity = mapper.Map<Role>(role);
            return mapper.Map<RoleModel>(rolesService.Update(entity));
        }

        [AccessFor("canEditRoles")]
        [HttpPost("delete")]
        public void Delete([FromBody] RoleModel role)
        {
            rolesService.Delete(role.Id);
        }
    }
}
