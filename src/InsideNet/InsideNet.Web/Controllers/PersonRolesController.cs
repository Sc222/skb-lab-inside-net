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
    public class PersonRolesController : ControllerBase
    {
        private readonly PersonRolesService personRolesService;
        private readonly IMapper mapper;

        public PersonRolesController(PersonRolesService personRolesService, IMapper mapper)
        {
            this.personRolesService = personRolesService;
            this.mapper = mapper;
        }

        [AccessFor("canViewRoles", true)]
        [HttpGet("{personId}")]
        public RoleModel GetPersonRole(Guid personId)
        {
            return mapper.Map<RoleModel>(personRolesService.GetPersonRole(personId));
        }

        [AccessFor("canViewRoles")]
        [HttpGet("role/{id}")]
        public PersonModel[] GetPeopleByRole(Guid id)
        {
            return mapper.Map<PersonModel[]>(personRolesService.GetPeopleByRole(id));
        }

        [AccessFor("canSetRoles")]
        [HttpPut("set/{roleId}/{personId}")]
        public void SetPersonRole(Guid roleId, Guid personId)
        {
            personRolesService.SetPersonRole(personId, roleId); 
        }
    }
}
