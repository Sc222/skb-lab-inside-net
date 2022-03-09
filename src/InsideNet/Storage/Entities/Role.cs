using System.Collections.Generic;

namespace Storage.Entities;

public class Role : GuidIdentifiable
{
    public string Name { get; set; }

    public List<string> AllowedActions { get; set; }
}
