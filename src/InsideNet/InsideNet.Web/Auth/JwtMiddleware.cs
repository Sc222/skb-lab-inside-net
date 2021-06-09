using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InsideNet.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Storage;
using Storage.Entities;

namespace InsideNet.Web.Auth
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate next;
        private readonly PersonRolesService rolesService;

        public JwtMiddleware(RequestDelegate next, PersonRolesService rolesService)
        {
            this.next = next;
            this.rolesService = rolesService;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (token != null)
                AttachUserToContext(context, token);

            await next(context).ConfigureAwait(false);
        }

        private void AttachUserToContext(HttpContext context, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("absolutelysecretkey)))");

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;

                var personId = Guid.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);
                var role = rolesService.GetPersonRole(personId);

                context.Items["PersonId"] = personId;
                context.Items["PersonRole"] = role;
            }
            catch
            {
                // ignored
            }
        }
    }
}
