using System;
using AutoMapper;
using InsideNet.Services;
using InsideNet.Web.Auth;
using InsideNet.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace InsideNet.Web.Controllers;

[ApiController]
[Authentication]
[Route("api/[controller]/{personId}")]
public class ContactsController : ControllerBase
{
    private readonly ContactsService contactsService;
    private readonly IMapper mapper;

    public ContactsController(ContactsService contactsService, IMapper mapper)
    {
        this.contactsService = contactsService;
        this.mapper = mapper;
    }

    [HttpGet]
    public PersonModel[] GetPersonContacts(Guid personId)
    {
        var contacts = contactsService.GetPersonContacts(personId);
        return mapper.Map<PersonModel[]>(contacts);
    }

    [AccessFor(null, true)]
    [HttpPut("add/{contactId}")]
    public void AddToContacts(Guid personId, Guid contactId)
    {
        contactsService.AddToContacts(personId, contactId);
    }

    [AccessFor(null, true)]
    [HttpDelete("remove/{contactId}")]
    public void RemoveFromContacts(Guid personId, Guid contactId)
    {
        contactsService.RemoveFromContacts(personId, contactId);
    }
}
