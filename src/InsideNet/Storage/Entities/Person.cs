﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Storage.Entities
{
    [Index(nameof(Login), IsUnique = true)]
    [Index(nameof(Telegram), IsUnique = true)]
    [Index(nameof(Slack), IsUnique = true)]
    [Index(nameof(Email), IsUnique = true)]
    [Index(nameof(PhoneNumber), IsUnique = true)]
    public class Person : GuidIdentifiable
    {
        public string Login { get; set; }

        public string Password { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Patronymic { get; set; }

        public virtual Role Role { get; set; }

        public virtual Position Position { get; set; }

        public bool IsNewbie { get; set; }

        public string Telegram { get; set; }

        public string Slack { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }
    }
}
