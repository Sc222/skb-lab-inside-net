using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Storage.Entities;

// ReSharper disable PossibleNullReferenceException

namespace InsideNet.Web.Auth;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AccessFor : Attribute, IAuthorizationFilter, IOrderedFilter
{
    private readonly string actionName;
    private readonly bool isAllowedForSelf;

    public AccessFor(string actionName, bool isAllowedForSelf = false)
    {
        this.actionName = actionName;
        this.isAllowedForSelf = isAllowedForSelf;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var isCheckSuccess = TryCheckForSelf(context.HttpContext);

        if (!isCheckSuccess && actionName != null)
            isCheckSuccess = TryCheckForRoleAccess(context.HttpContext);

        if (!isCheckSuccess)
            context.Result = new StatusCodeResult(StatusCodes.Status401Unauthorized);
    }

    public int Order => 10000;

    private bool TryCheckForSelf(HttpContext context)
    {
        var routeData = context.GetRouteData();

        if (isAllowedForSelf && routeData.Values.TryGetValue("personId", out var personId)) 
            return Guid.TryParse((string)personId, out var requestPersonId) && IdValidator.IsValidAction(context, requestPersonId);

        return false;
    }

    private bool TryCheckForRoleAccess(HttpContext context)
    {
        if (context.Items.TryGetValue("PersonRole", out var role))
            return ((Role)role).AllowedActions.Contains(actionName);

        return false;
    }
}
