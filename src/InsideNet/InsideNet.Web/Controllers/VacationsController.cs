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
    [Route("api/[controller]/{personId}")]
    public class VacationsController : ControllerBase
    {
        private readonly VacationsService vacationsService;
        private readonly IMapper mapper;
        public VacationsController(VacationsService vacationsService, IMapper mapper)
        {
            this.vacationsService = vacationsService;
            this.mapper = mapper;
        }

        [HttpGet]
        public VacationModel[] GetForPerson(Guid personId, [FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            var vacations = vacationsService.GetForPeriod(personId, from ?? DateTime.MinValue, to ?? DateTime.MaxValue);
            return mapper.Map<VacationModel[]>(vacations);
        }

        [AccessFor("canEditVacations", true)]
        [HttpPost("create")]
        public ActionResult Create(Guid personId, [FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            if (!from.HasValue || !to.HasValue)
                return BadRequest();

            var vacation = CreateVacation(personId, from, to);

            vacationsService.Create(vacation);

            return Ok();
        }

        [AccessFor("canEditVacations", true)]
        [HttpPut("update")]
        public ActionResult Update(Guid personId, [FromQuery] DateTime? from, [FromQuery] DateTime? to)
        {
            if (!from.HasValue || !to.HasValue)
                return BadRequest();

            var vacation = CreateVacation(personId, from, to);

            vacationsService.Update(vacation);

            return Ok();
        }

        [AccessFor("canEditVacations", true)]
        [HttpDelete("delete/{vacationId}")]
        public void Delete(Guid personId, Guid vacationId)
        {
            vacationsService.Delete(vacationId);
        }

        private static Vacation CreateVacation(Guid personId, DateTime? from, DateTime? to)
        {
            var vacation = new Vacation
            {
                PersonId = personId,
                From = from.Value,
                To = to.Value
            };
            return vacation;
        }
    }
}
