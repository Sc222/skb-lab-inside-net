using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Storage;

namespace SlackNotificationsWorker
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<DbContext, StorageContext>()
                .AddScoped<ContextFactory>()
                .AddScoped(typeof(IRepository<>), typeof(Repository<>))
                .AddEntityFrameworkProxies();
            services.AddScoped<NewbiesGetter>();
            services.AddScoped<SlackNotificationsService>();
            services.AddHostedService<Worker>();
        }

        public void Configure(IApplicationBuilder app)
        {
        }
    }
}
