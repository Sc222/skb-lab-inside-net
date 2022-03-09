using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Storage;
using Storage.Entities;

namespace SlackNotificationsWorker
{
    public class Worker : BackgroundService
    {
        private const int WorkerDelay10MinutesInMs = 600000;
        private readonly ILogger<Worker> logger;
        private readonly NewbiesGetter newbiesGetter;
        private readonly IRepository<Person> people;
        private readonly SlackNotificationsService slackNotificationsService;

        public Worker(ILogger<Worker> logger, NewbiesGetter newbiesGetter, SlackNotificationsService slackNotificationsService, IRepository<Person> people)
        {
            this.logger = logger;
            this.newbiesGetter = newbiesGetter;
            this.slackNotificationsService = slackNotificationsService;
            this.people = people;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);

                var newbies = newbiesGetter.GetNewbies();

                await SendNotificationsToSlack(newbies);

                SetPeopleAsNotNewbies(newbies);

                logger.LogInformation("Worker finished cycle at: {time}", DateTimeOffset.Now);

                await Task.Delay(WorkerDelay10MinutesInMs, stoppingToken);
            }
        }

        private async Task SendNotificationsToSlack(Person[] newbies)
        {
            foreach (var noob in newbies)
                try
                {
                    await slackNotificationsService.SendNotificationAboutNewUserToSlack(noob);
                }
                catch (Exception e)
                {
                    logger.LogError(e, "Failed to write slack notification for user with login {login} and email {email}", noob.Login, noob.Email);
                }
        }

        private void SetPeopleAsNotNewbies(Person[] newbies)
        {
            foreach (var noob in newbies)
                noob.IsNewbie = false;

            try
            {
                people.UpdateRange(newbies);
            }
            catch (Exception e)
            {
                logger.LogError(e, "Failed to update range of people");
            }
        }
    }
}
