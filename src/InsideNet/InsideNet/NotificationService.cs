using System;
using System.Collections.Generic;
using System.Linq;
using Storage;
using Storage.Entities;

namespace InsideNet.Services;

public class NotificationService
{
    private readonly IRepository<Notification> notificationRepository;

    public NotificationService(IRepository<Notification> notificationRepository)
    {
        this.notificationRepository = notificationRepository;
    }

    public Notification[] GetNotificationsByPerson(Guid personId)
    {
        return notificationRepository.Find(n => n.PersonId == personId)
            .OrderByDescending(n => n.Date)
            .ToArray();
    }

    public void Delete(Guid notificationId)
    {
        notificationRepository.Delete(notificationId);
    }

    public void DeleteByPerson(Guid personId)
    {
        var notificationsToDelete = notificationRepository.Find(n => n.PersonId == personId);
        notificationRepository.DeleteRange(notificationsToDelete);
    }

    public void Create(Notification notification)
    {
        notificationRepository.Create(notification);
    }

    public void CreateRange(IEnumerable<Notification> notifications)
    {
        notificationRepository.CreateRange(notifications);
    }
}
