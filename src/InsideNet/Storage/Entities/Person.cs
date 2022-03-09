namespace Storage.Entities
{
    public class Person : GuidIdentifiable
    {
        public string Login { get; set; }

        public string Password { get; set; }

        public string FullName { get; set; }

        public virtual Position Position { get; set; }

        public bool IsNewbie { get; set; }

        public string Telegram { get; set; }

        public string Slack { get; set; }

        public string SlackId { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string AvatarUrl { get; set; }
    }
}
