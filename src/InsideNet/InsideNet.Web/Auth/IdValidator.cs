using System;
using Microsoft.AspNetCore.Http;

namespace InsideNet.Web.Auth;

public static class IdValidator
{
    public static bool IsValidAction(HttpContext context, Guid requestPersonId)
    {
        if (context.Items.TryGetValue("PersonId", out var id))
            return requestPersonId == (Guid)id;
        return false;
    }
}
