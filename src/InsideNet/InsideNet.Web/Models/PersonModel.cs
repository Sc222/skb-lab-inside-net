﻿using Storage.Entities;

namespace InsideNet.Web.Models
{
    public class PersonModel : GuidIdentifiable
    {
        public string Login { get; set; }
        public string Password { get; set; }

        public string FullName { get; set; }

        public string Position { get; set; }

        public bool IsNewbie { get; set; }

        public string Telegram { get; set; }

        public string Slack { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public AccessRightModel[] AccessRights { get; set; }

        public string Role { get; set; }
    }
}
