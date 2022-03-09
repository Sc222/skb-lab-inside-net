using System;
using Storage.Entities;

namespace InsideNet.Web.Models;

public class NotificationModel : GuidIdentifiable
{
    public string Text { get; set; }

    public bool IsChecked { get; set; }

    public string Title { get; set; }

    public DateTime Date { get; set; }
}
