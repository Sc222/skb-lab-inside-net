using System;

namespace Storage.Entities;

public class AccessRequest
{
    public Guid PersonId { get; set; }

    public string SlackUserId { get; set; }

    public string ChannelId { get; set; }

    public string ChannelName { get; set; }

    public string IsDisapproved { get; set; }

    public string DisapproveReason { get; set; }
}
