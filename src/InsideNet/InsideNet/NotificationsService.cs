using System.Threading.Tasks;
using Slack.Webhooks;
using Storage;
using Storage.Entities;
using Telegram.Bot;

namespace InsideNet.Services
{
    public class NotificationsService
    {
        private readonly IRepository<NotificationsChannel> notificationChannel;
        private string MessageForHrs(Person person) => $"Special message only for Hrs about {person.FullName} with email: {person.Email}";
        private string MessageForNormalPeople(Person person) => $"New cowboy out there, have a good time here {person.FullName} with email: {person.Email}";

        public NotificationsService(IRepository<NotificationsChannel> notificationChannel)
        {
            this.notificationChannel = notificationChannel;
        }

        public async Task SendNotificationAboutNewUserToSlack(Person person)
        {
            var channel = notificationChannel.SingleOrDefault(_ => true);

            if (channel == null)
                return;

            if (channel.SlackForHr != null)
            {
                using var slackClientHr = new SlackClient(channel.SlackForHr);
                await slackClientHr.PostAsync(new SlackMessage { Text = MessageForHrs(person) }).ConfigureAwait(false);
            }

            if (channel.Slack != null)
            {
                using var slackClient = new SlackClient(channel.Slack);
                await slackClient.PostAsync(new SlackMessage { Text = MessageForNormalPeople(person) }).ConfigureAwait(false);
            }
        }

        public async Task SendNotificationAboutNewUserToTelegram(Person person)
        {
            var channel = notificationChannel.SingleOrDefault(_ => true);

            if (channel == null || channel.TelegramBotApiKey == null)
                return;

            var tgBotClient = new TelegramBotClient(channel.TelegramBotApiKey);

            if (channel.TelegramForHr != null)
                await tgBotClient.SendTextMessageAsync(channel.TelegramForHr, MessageForHrs(person)).ConfigureAwait(false);

            if (channel.Telegram != null)
                await tgBotClient.SendTextMessageAsync(channel.Telegram, MessageForNormalPeople(person)).ConfigureAwait(false);
        }
    }
}
