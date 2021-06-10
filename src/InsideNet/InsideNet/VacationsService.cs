using System;
using Storage;
using Storage.Entities;

namespace InsideNet.Services
{
    public class VacationsService
    {
        private readonly IRepository<Vacation> vacations;

        public VacationsService(IRepository<Vacation> vacations)
        {
            this.vacations = vacations;
        }

        public Vacation[] GetForPeriod(Guid personId, DateTime from, DateTime to)
        {
            return vacations.Find(v => v.From.Date >= from.Date && v.To.Date <= to.Date && v.PersonId == personId);
        }

        public void Create(Vacation vacation)
        {
            vacations.Create(vacation);
        }

        public void Update(Vacation vacation)
        {
            vacations.Update(vacation);
        }

        public void Delete(Guid id)
        {
            vacations.Delete(id);
        }
    }
}
