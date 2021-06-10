using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Storage.Entities
{
    public class Role : GuidIdentifiable
    {
        public string Name { get; set; }

        public List<string> AllowedActions { get; set; }
    }
}