using System;
using Storage;
using Storage.Entities;

namespace InsideNet.Services
{
    public class PositionsService
    {
        private readonly IRepository<Position> positions;

        public PositionsService(IRepository<Position> positions)
        {
            this.positions = positions;
        }

        public Position Get(Guid id)
        {
            return positions.Get(id);
        }

        public Position[] GetAll()
        {
            return positions.GetAll();
        }

        public Position Create(Position position)
        {
            positions.Create(position);
            return position;
        }

        public Position Update(Position position)
        {
            positions.Update(position);
            return position;
        }

        public void Delete(Guid id)
        {
            positions.Delete(id);
        }
    }
}
