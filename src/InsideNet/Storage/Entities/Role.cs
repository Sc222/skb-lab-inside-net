using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Storage.Entities
{
    [Index(nameof(Name), IsUnique = true)]
    public class Role : GuidIdentifiable
    {
        public string Name { get; set; }

        public List<string> AllowedActions { get; set; }
    }
}