using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Storage;

namespace SlackNotificationsWorker
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices((hostContext, services) =>
                {
                    services.AddHostedService<Worker>();
                    services.AddScoped(typeof(DbContext), typeof(StorageContext))
                        .AddScoped<ContextFactory>()
                        .AddScoped(typeof(IRepository<>), typeof(Repository<>))
                        .AddEntityFrameworkProxies();
                    services.AddSingleton<NewbiesGetter>();
                    services.AddSingleton<SlackNotificationsService>();
                });
    }
}
