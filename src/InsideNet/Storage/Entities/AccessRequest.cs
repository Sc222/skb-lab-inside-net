namespace Storage.Entities;

public class AccessRequest : GuidIdentifiable
{
    public virtual Person Person { get; set; }

    public string ChannelId { get; set; }

    public string ChannelName { get; set; }

    public bool IsDisapproved { get; set; }

    public string DisapproveReason { get; set; }
}
