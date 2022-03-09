using Storage;
using Storage.Entities;

namespace InsideNet.Services;

public class NotificationChannelsService
{
    private readonly IRepository<NotificationsChannel> notificationChannel;

    public NotificationChannelsService(IRepository<NotificationsChannel> notificationChannel)
    {
        this.notificationChannel = notificationChannel;
    }

    public NotificationsChannel GetNotificationsChannel()
    {
        return notificationChannel.SingleOrDefault();
    }

    public NotificationsChannel CreateNotificationsChannel(NotificationsChannel channel)
    {
        var dbChannel = notificationChannel.SingleOrDefault();
        if (dbChannel != null)
            return null;
        notificationChannel.Create(channel);
        return channel;
    }

    public NotificationsChannel UpdateNotificationsChannel(NotificationsChannel channel)
    {
        notificationChannel.Update(channel);
        return channel;
    }
}
