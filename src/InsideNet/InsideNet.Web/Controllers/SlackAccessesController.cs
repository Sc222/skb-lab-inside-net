using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using InsideNet.Services;
using InsideNet.Web.Auth;
using InsideNet.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Storage.Entities;

namespace InsideNet.Web.Controllers;

[ApiController]
[Authentication]
[Route("api/[controller]")]
public class SlackAccessesController
{
    private readonly SlackService slackService;
    private readonly PeopleService peopleService;
    private readonly AccessRequestService accessRequestService;
    private readonly IMapper mapper;

    public SlackAccessesController(SlackService slackService, PeopleService peopleService, IMapper mapper, AccessRequestService accessRequestService)
    {
        this.slackService = slackService;
        this.peopleService = peopleService;
        this.mapper = mapper;
        this.accessRequestService = accessRequestService;
    }

    [HttpGet("channels/{personId}")]
    public async Task<IEnumerable<SlackChannelModel>> GetSlackChannels(Guid personId)
    {
        var channels = await slackService.GetChannelsList();
        var person = peopleService.Get(personId);
        var hasSlack = string.IsNullOrEmpty(person.SlackId);
        return channels.Select(channel => new SlackChannelModel
        {
            ChannelId = channel.id,
            ChannelName = channel.name,
            IsInChannel = hasSlack && channel.members.Any(memberId => memberId == person.SlackId)
        });
    }

    [HttpPost("accessRequests/{personId}")]
    public void CreateAccessRequest(Guid personId, [FromBody] AccessRequestModel accessRequestModel)
    {
        var accessRequest = mapper.Map<AccessRequest>(accessRequestModel);
        var person = peopleService.Get(personId);

        accessRequest.SlackUserId = person.SlackId;

        accessRequestService.Create(accessRequest);
    }

    [HttpGet("accessRequests")]
    [AccessFor("canResolveAccessRequests")]
    public AccessRequestModel[] GetAllAccessRequests()
    {
        var accessRequests = accessRequestService.GetAll();
        return mapper.Map<AccessRequestModel[]>(accessRequests);
    }

    [HttpGet("accessRequests/{personId}")]
    public AccessRequestModel[] GetPersonAccessRequests(Guid personId)
    {
        var accessRequests = accessRequestService.GetByPersonId(personId);
        return mapper.Map<AccessRequestModel[]>(accessRequests);
    }


    [HttpDelete("accessRequests")]
    [AccessFor("canResolveAccessRequests")]
    public void DeleteAccessRequest([FromBody] AccessRequestModel accessRequestModel)
    {
        var accessRequest = mapper.Map<AccessRequest>(accessRequestModel);

        accessRequestService.Delete(accessRequest);
    }

    [HttpPut("accessRequests/approve")]
    [AccessFor("canResolveAccessRequests")]
    public async Task ApproveAccessRequest([FromBody] AccessRequestModel accessRequestModel)
    {
        var accessRequest = mapper.Map<AccessRequest>(accessRequestModel);

        await slackService.InviteToChannel(accessRequest.ChannelId, accessRequest.SlackUserId);

        accessRequestService.Delete(accessRequest);
    }

    [HttpPut("accessRequests")]
    [AccessFor("canResolveAccessRequests")]
    public void UpdateAccessRequest([FromBody] AccessRequestModel accessRequestModel)
    {
        var accessRequest = mapper.Map<AccessRequest>(accessRequestModel);

        accessRequestService.Update(accessRequest);
    }
}
