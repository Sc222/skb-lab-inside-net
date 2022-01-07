using System;

namespace InsideNet.Web.Models;

public class NotificationModel
{
    public Guid Id { get; set; }

    public string Text { get; set; }

    public bool IsChecked { get; set; }

    public string Title { get; set; }

    public DateTime Date { get; set; }
}
