using System;
using System.Threading.Tasks;
using AutoMapper;
using InsideNet.Services;
using InsideNet.Web.Auth;
using InsideNet.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Storage.Entities;

namespace InsideNet.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly PeopleService peopleService;
        private readonly RolesService rolesService;
        private readonly PersonRolesService personRolesService;
        private readonly IMapper mapper;

        public PersonController(PeopleService peopleService, IMapper mapper, RolesService rolesService, PersonRolesService personRolesService)
        {
            this.peopleService = peopleService;
            this.mapper = mapper;
            this.rolesService = rolesService;
            this.personRolesService = personRolesService;
        }

        [Authentication]
        [HttpGet("{personId}")]
        public PersonModel Get(Guid personId)
        {
            return mapper.Map<PersonModel>(peopleService.Get(personId));
        }

        [Authentication]
        [HttpGet("all")]
        public PersonModel[] GetAll()
        {
            return mapper.Map<PersonModel[]>(peopleService.GetAll());
        }

        [Authentication]
        [HttpGet("find")]
        public PersonModel[] Find([FromQuery] string name)
        {
            return mapper.Map<PersonModel[]>(peopleService.SearchByName(name));
        }

        [HttpPost("create")]
        public PersonModel Create([FromBody] PersonModel person)
        {
            var personEntity = mapper.Map<Person>(person);
            personEntity = peopleService.Create(personEntity);

            var defaultRole = rolesService.GetOrCreateDefaultRole();
            personRolesService.SetPersonRole(personEntity.Id, defaultRole.Id);

            return mapper.Map<PersonModel>(person);
        }

        [Authentication]
        [AccessFor("canEditUsers", true)]
        [HttpPut("update/{personId}")]
        public PersonModel Update(Guid personId, [FromBody] PersonModel person)
        {
            var entityPerson = peopleService.Update(mapper.Map<Person>(person));
            entityPerson.Id = personId;
            return mapper.Map<PersonModel>(entityPerson);
        }

        [HttpPost("authenticate")]
        public ActionResult<AuthResult> Authenticate([FromBody] PersonModel person)
        {
            var response = peopleService.Authenticate(person.Login, person.Password);

            if (response == null)
                return BadRequest(new
                {
                    message = "Username or password is incorrect"
                });

            return Ok(new AuthResult
            {
                Person = mapper.Map<PersonModel>(response.Value.Person),
                Token = response.Value.Token,
                Expires = response.Value.Expires
            });
        }
    }
}
