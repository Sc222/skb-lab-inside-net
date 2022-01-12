using System;
using AutoMapper;
using InsideNet.Services;
using InsideNet.Web.Auth;
using InsideNet.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace InsideNet.Web.Controllers;

[ApiController]
[Authentication]
[Route("api/[controller]")]
public class NotificationController : ControllerBase
{
    private readonly IMapper mapper;
    private readonly NotificationService notificationService;

    public NotificationController(NotificationService notificationService, IMapper mapper)
    {
        this.notificationService = notificationService;
        this.mapper = mapper;
    }

    [HttpGet("{personId}")]
    [AccessFor(null, true)]
    public NotificationModel[] GetUserNotifications(Guid personId)
    {
        var notifications = notificationService.GetNotificationsByPerson(personId);
        return mapper.Map<NotificationModel[]>(notifications);
    }

    [HttpDelete("{notificationId}")]
    [AccessFor(null, true)]
    public void Delete(Guid notificationId)
    {
        notificationService.Delete(notificationId);
    }

    [HttpDelete("{personId}")]
    [AccessFor(null, true)]
    public void DeleteAllByPerson(Guid personId)
    {
        notificationService.DeleteByPerson(personId);
    }
}
