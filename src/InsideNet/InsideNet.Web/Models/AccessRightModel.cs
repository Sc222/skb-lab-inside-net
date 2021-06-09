using Storage.Entities;

namespace InsideNet.Web.Models
{
    public class AccessRightModel : GuidIdentifiable
    {
        public string ResourceName { get; set; }

        public string AccessLevel { get; set; }
    }
}
