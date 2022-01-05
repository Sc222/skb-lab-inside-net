using System;

namespace InsideNet.Web.Models;

public class AccessRequestModel
{
    public Guid PersonId { get; set; }

    public string SlackUserId { get; set; }

    public string ChannelName { get; set; }

    public string ChannelId { get; set; }
}
