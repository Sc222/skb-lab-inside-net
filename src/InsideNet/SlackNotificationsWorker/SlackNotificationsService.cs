using System.Threading.Tasks;
using Slack.Webhooks;
using Storage;
using Storage.Entities;

namespace SlackNotificationsWorker
{
    public class SlackNotificationsService
    {
        private readonly IRepository<NotificationsChannel> notificationChannel;

        public SlackNotificationsService(IRepository<NotificationsChannel> notificationChannel)
        {
            this.notificationChannel = notificationChannel;
        }

        private string MessageForHrs(Person person)
        {
            return $"Special message only for Hrs about {person.FullName} with email: {person.Email}";
        }

        private string MessageForNormalPeople(Person person)
        {
            return $"New cowboy out there, have a good time here {person.FullName} with email: {person.Email}";
        }

        public async Task SendNotificationAboutNewUserToSlack(Person person)
        {
            var channel = notificationChannel.SingleOrDefault();

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
    }
}
