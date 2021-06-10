using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace InsideNet.Web.Auth
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class Authentication : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var userId = (Guid?)context.HttpContext.Items["UserId"];
            if (userId == null)
            {
                context.Result = new JsonResult(new
                {
                    message = "Unauthenticated"
                })
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
        }
    }
}
