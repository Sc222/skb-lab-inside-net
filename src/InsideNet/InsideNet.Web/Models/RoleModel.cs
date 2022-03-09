using System.Collections.Generic;
using Storage.Entities;

namespace InsideNet.Web.Models;

public class RoleModel : GuidIdentifiable
{
    public string Name { get; set; }

    public List<string> AllowedActions { get; set; }
}
