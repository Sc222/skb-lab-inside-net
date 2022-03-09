using System;

namespace InsideNet.Web.Models;

public class AuthResult
{
    public PersonModel Person { get; set; }

    public string Token { get; set; }

    public DateTime Expires { get; set; }
}
