using System;
using Storage.Entities;

namespace InsideNet.Web.Models;

public class CalendarDataModel : GuidIdentifiable
{
    public virtual PersonModel Person { get; set; }

    public string Subject { get; set; }

    public string ManagerComment { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }
}
