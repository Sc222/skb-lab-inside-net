using System;

namespace Storage.Entities;

public class Vacation : GuidIdentifiable
{
    public Guid PersonId { get; set; }

    public DateTime From { get; set; }

    public DateTime To { get; set; }
}
