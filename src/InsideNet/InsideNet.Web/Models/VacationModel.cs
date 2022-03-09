using System;
using Storage.Entities;

namespace InsideNet.Web.Models;

public class VacationModel : GuidIdentifiable
{
    public Guid PersonId { get; set; }

    public DateTime From { get; set; }

    public DateTime To { get; set; }
}
