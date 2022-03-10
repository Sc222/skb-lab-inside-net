using Storage.Entities;

namespace InsideNet.Web.Models;

public class AccessRequestModel : GuidIdentifiable
{
    public PersonModel Person { get; set; }

    public string ChannelName { get; set; }

    public string ChannelId { get; set; }

    public bool IsDisapproved { get; set; }

    public string DisapproveReason { get; set; }
}
