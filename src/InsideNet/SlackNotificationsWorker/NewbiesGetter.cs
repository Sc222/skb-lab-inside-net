using Storage;
using Storage.Entities;

namespace SlackNotificationsWorker
{
    public class NewbiesGetter
    {
        private readonly IRepository<Person> people;

        public NewbiesGetter(IRepository<Person> people)
        {
            this.people = people;
        }

        public Person[] GetNewbies()
        {
            return people.Find(p => p.IsNewbie);
        }
    }
}
