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

        public Position[] GetAll()
        {
            return positions.GetAll();
        }

        public void Create(Position position)
        {
            positions.Create(position);
        }

        public void Update(Position position)
        {
            positions.Update(position);
        }

        public void Delete(Guid id)
        {
            positions.Delete(id);
        }
    }
}
