using System;

namespace Storage.Entities;

public class Notification : GuidIdentifiable
{
    public Guid PersonId { get; set; }

    public string Text { get; set; }

    public bool IsChecked { get; set; }

    public string Title { get; set; }

    public DateTime Date { get; set; }
}
