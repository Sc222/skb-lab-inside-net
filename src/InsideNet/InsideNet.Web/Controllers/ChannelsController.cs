using AutoMapper;
using InsideNet.Services;
using InsideNet.Web.Auth;
using InsideNet.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Storage.Entities;

namespace InsideNet.Web.Controllers
{
    [ApiController]
    [Authentication]
    [Route("api/[controller]")]
    public class ChannelsController
    {
        private readonly NotificationChannelsService notificationsService;
        private readonly IMapper mapper;

        public ChannelsController(NotificationChannelsService notificationsService, IMapper mapper)
        {
            this.notificationsService = notificationsService;
            this.mapper = mapper;
        }

        [AccessFor("canEditNotificationsChannels")]
        [HttpGet]
        public NotificationsChannelModel Get()
        {
            return mapper.Map<NotificationsChannelModel>(notificationsService.GetNotificationsChannel());
        }

        [AccessFor("canEditNotificationsChannels")]
        [HttpPost("create")]
        public ActionResult<NotificationsChannelModel> Create([FromBody] NotificationsChannelModel notificationsChannel)
        {
            var dbEntity = mapper.Map<NotificationsChannel>(notificationsChannel);
            var channel = notificationsService.CreateNotificationsChannel(dbEntity);
            if (channel == null)
                return new ObjectResult("Already exists!") {StatusCode = StatusCodes.Status409Conflict};
            return mapper.Map<NotificationsChannelModel>(channel);
        }

        [AccessFor("canEditNotificationsChannels")]
        [HttpPut("update")]
        public NotificationsChannelModel Update([FromBody] NotificationsChannelModel notificationsChannel)
        {
            var dbEntity = mapper.Map<NotificationsChannel>(notificationsChannel);
            return mapper.Map<NotificationsChannelModel>(notificationsService.UpdateNotificationsChannel(dbEntity));
        }
    }
}
