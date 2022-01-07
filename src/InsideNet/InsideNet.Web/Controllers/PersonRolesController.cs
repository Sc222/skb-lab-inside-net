using System;
using System.Collections.Generic;
using AutoMapper;
using InsideNet.Services;
using InsideNet.Web.Auth;
using InsideNet.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace InsideNet.Web.Controllers
{
    [ApiController]
    [Authentication]
    [Route("api/[controller]")]
    public class PersonRolesController : ControllerBase
    {
        private readonly PersonRolesService personRolesService;
        private readonly IMapper mapper;

        public PersonRolesController(PersonRolesService personRolesService, IMapper mapper)
        {
            this.personRolesService = personRolesService;
            this.mapper = mapper;
        }

        [AccessFor(null, true)]
        [HttpGet("allowedActions/{personId}")]
        public List<string> GetAllowedActionsForPerson(Guid personId)
        {
            var role = personRolesService.GetPersonRole(personId);
            return role.AllowedActions;
        }

        [AccessFor("canViewRoles", true)]
        [HttpGet("{personId}")]
        public RoleModel GetPersonRole(Guid personId)
        {
            return mapper.Map<RoleModel>(personRolesService.GetPersonRole(personId));
        }

        [AccessFor("canViewRoles")]
        [HttpGet("role/{roleId}")]
        public PersonModel[] GetPeopleByRole(Guid roleId)
        {
            return mapper.Map<PersonModel[]>(personRolesService.GetPeopleByRole(roleId));
        }

        [AccessFor("canSetRoles")]
        [HttpPut("set/{roleId}/{personId}")]
        public void SetPersonRole(Guid roleId, Guid personId)
        {
            personRolesService.SetPersonRole(personId, roleId); 
        }
    }
}
