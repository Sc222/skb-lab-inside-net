using System;

namespace Storage.Entities;

public class CalendarData : GuidIdentifiable
{
    public virtual Person Person { get; set; }

    public string Subject { get; set; }

    public string ManagerComment { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }
}
