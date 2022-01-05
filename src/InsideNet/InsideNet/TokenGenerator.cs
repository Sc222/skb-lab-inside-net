using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Storage.Entities;

namespace InsideNet.Services;

public class TokenGenerator
{
    private static readonly TimeSpan ExpirationTime = TimeSpan.FromHours(4);
    private const string SecretKey = "absolutelysecretkey)))";

    public (string Token, DateTime Expires) GenerateJwtToken(Person person)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(SecretKey);
        var expires = DateTime.UtcNow + ExpirationTime;
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("id", person.Id.ToString()) }),
            Expires = DateTime.UtcNow + ExpirationTime,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return (tokenHandler.WriteToken(token), expires);
    }
}
