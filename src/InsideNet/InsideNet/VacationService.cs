using System;
using Storage;
using Storage.Entities;

namespace InsideNet.Services
{
    public class VacationService
    {
        private readonly IRepository<Vacation> vacations;

        public VacationService(IRepository<Vacation> vacations)
        {
            this.vacations = vacations;
        }

        public Vacation[] GetPersonVacations(Guid personId)
        {
            return vacations.Find(v => v.PersonId == personId);
        }

        public Vacation[] GetForPeriod(DateTime from, DateTime to)
        {
            return vacations.Find(v => v.From.Date >= from.Date && v.To.Date <= to.Date);
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
