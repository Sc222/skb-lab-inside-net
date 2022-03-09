using System;
using Storage;
using Storage.Entities;

namespace InsideNet.Services;

public class CalendarsService
{
    private readonly IRepository<CalendarData> vacations;

    public CalendarsService(IRepository<CalendarData> vacations)
    {
        this.vacations = vacations;
    }

    public CalendarData[] GetForPeriod(Guid personId, DateTime from, DateTime to)
    {
        return vacations.Find(v => v.StartTime.Date >= from.Date && v.EndTime.Date <= to.Date && v.Person.Id == personId);
    }

    public CalendarData[] GetForPeriod(string department, DateTime from, DateTime to)
    {
        return !string.IsNullOrEmpty(department) ? 
            vacations.Find(v => v.StartTime.Date >= from.Date && v.EndTime.Date <= to.Date && v.Person.Department.Name == department) :
            vacations.Find(v => v.StartTime.Date >= from.Date && v.EndTime.Date <= to.Date);
    }

    public void Create(CalendarData vacation)
    {
        vacations.Create(vacation);
    }

    public void Update(CalendarData vacation)
    {
        vacations.Update(vacation);
    }

    public void Delete(Guid id)
    {
        vacations.Delete(id);
    }
}
