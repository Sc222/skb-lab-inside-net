using System;

namespace Storage.Entities
{
    public class PersonAccessRights
    {
        public Guid PersonId { get; set; }

        public Guid AccesRightId { get; set; }

        public bool IsApproved { get; set; }
    }
}
