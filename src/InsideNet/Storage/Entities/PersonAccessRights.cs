using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Storage.Entities
{
    public class PersonAccessRights
    {
        public Guid PersonId { get; set; }

        public Guid AccesRightId { get; set; }
    }
}
