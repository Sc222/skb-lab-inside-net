using Storage.Entities;

namespace InsideNet.Web.Models
{
    public class NotificationsChannelModel : GuidIdentifiable
    {
        public string Slack { get; set; }

        public string SlackForHr { get; set; }

        public string Telegram { get; set; }

        public string TelegramForHr { get; set; }
    }
}