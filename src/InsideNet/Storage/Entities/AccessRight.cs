namespace Storage.Entities
{
    public class AccessRight : GuidIdentifiable
    {
        public string ResourceName { get; set; }

        public string AccessLevel { get; set; }
    }
}
