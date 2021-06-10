using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Storage;
using Storage.Entities;

namespace InsideNet.Services
{
    public class PeopleService
    {
        private readonly IRepository<Person> people;
        private readonly IRepository<PersonAccessRights> accessRights;
        private readonly NotificationsService notificationsService;
        private static readonly TimeSpan ExpirationTime = TimeSpan.FromHours(4);


        public PeopleService(IRepository<Person> people, IRepository<PersonAccessRights> accessRights, NotificationsService notificationsService)
        {
            this.people = people;
            this.accessRights = accessRights;
            this.notificationsService = notificationsService;
        }

        public async Task<Person> Create(Person person)
        {
            people.Create(person);
            if (person.IsNewbie)
                try
                {
                    await notificationsService.SendNotificationAboutNewUserToSlack(person).ConfigureAwait(false);
                    await notificationsService.SendNotificationAboutNewUserToTelegram(person).ConfigureAwait(false);
                }
                catch
                {
                    // ignored
                }

            return person;
        }

        public Person Get(Guid id)
        {
            return people.Get(id);
        }

        public Person Update(Person person)
        {
            people.Update(person);
            return person;
        }

        public Person[] SearchByName(string searchedName)
        {
            var searchedNameLower = searchedName.ToLower();
            return people.Find(p => p.FullName.ToLower().Contains(searchedNameLower));
        }

        public Person[] GetAll()
        {
            return people.GetAll(true);
        }

        public (Person Person, string Token, DateTime Expires)? Authenticate(string login, string password)
        {
            var user = people.SingleOrDefault(x => x.Login == login && x.Password == password);

            if (user == null)
                return null;

            var (token, expires) = GenerateJwtToken(user);

            return (user, token, expires);
        }

        private static (string Token, DateTime Expires) GenerateJwtToken(Person person)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("absolutelysecretkey)))");
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
}
