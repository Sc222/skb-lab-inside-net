namespace Storage.Entities
{
    public class NotificationsChannel : GuidIdentifiable
    {
        public string Slack { get; set; }

        public string SlackForHr { get; set; }

        public string Telegram { get; set; }

        public string TelegramForHr { get; set; }
    }
}