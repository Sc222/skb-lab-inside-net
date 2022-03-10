using System;
using Storage;
using Storage.Entities;

namespace InsideNet.Services;

public class AccessRequestService
{
    private readonly IRepository<AccessRequest> accessRequests;

    public AccessRequestService(IRepository<AccessRequest> accessRequests)
    {
        this.accessRequests = accessRequests;
    }

    public AccessRequest[] GetByPersonId(Guid personId)
    {
        return accessRequests.Find(r => r.Person.Id == personId);
    }

    public AccessRequest[] GetAll()
    {
        return accessRequests.GetAll();
    }

    public AccessRequest Create(AccessRequest accessRequest)
    {
        accessRequests.Create(accessRequest);
        return accessRequest;
    }

    public void Delete(AccessRequest accessRequest)
    {
        accessRequests.Delete(accessRequest);
    }

    public void Update(AccessRequest accessRequest)
    {
        accessRequests.Update(accessRequest);
    }
}
