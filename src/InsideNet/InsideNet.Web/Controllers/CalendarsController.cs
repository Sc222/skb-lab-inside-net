using System;
using AutoMapper;
using InsideNet.Services;
using InsideNet.Web.Auth;
using InsideNet.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Storage.Entities;

namespace InsideNet.Web.Controllers;

[ApiController]
[Authentication]
[Route("api/[controller]")]
public class CalendarsController : ControllerBase
{
    private readonly IMapper mapper;
    private readonly CalendarsService calendarsService;

    public CalendarsController(CalendarsService calendarsService, IMapper mapper)
    {
        this.calendarsService = calendarsService;
        this.mapper = mapper;
    }

    [HttpGet("{personId}")]
    public CalendarDataModel[] GetForPerson(Guid personId, [FromQuery] DateTime? from, [FromQuery] DateTime? to)
    {
        var calendars = calendarsService.GetForPeriod(personId, from ?? DateTime.MinValue, to ?? DateTime.MaxValue);
        return mapper.Map<CalendarDataModel[]>(calendars);
    }

    [HttpGet]
    public CalendarDataModel[] GetForAll([FromQuery] string department, [FromQuery] DateTime? from, [FromQuery] DateTime? to)
    {
        var calendars = calendarsService.GetForPeriod(department, from ?? DateTime.MinValue, to ?? DateTime.MaxValue);
        return mapper.Map<CalendarDataModel[]>(calendars);
    }

    [AccessFor("canEditCalendars", true)]
    [HttpPost]
    public ActionResult Create([FromBody] CalendarDataModel calendarData)
    {
        var calendarEvent = mapper.Map<CalendarData>(calendarData);

        calendarsService.Create(calendarEvent);

        return Ok();
    }

    [AccessFor("canEditCalendars", true)]
    [HttpPut]
    public ActionResult Update([FromBody] CalendarDataModel calendarData)
    {
        var calendarEvent = mapper.Map<CalendarData>(calendarData);

        calendarsService.Update(calendarEvent);

        return Ok();
    }
    
    [AccessFor("canEditCalendars", true)]
    [HttpDelete("delete/{calendarDataId}")]
    public void Delete(Guid calendarDataId)
    {
        calendarsService.Delete(calendarDataId);
    }
}
