using WebApplication1.Data;
using WebApplication1.Entitys;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.Repository
{
    public class CoverTypeRepository : Repository<CoverTypes>, ICoverTypeRepository
    {
        private readonly ApplicationDbContext _db;

        public CoverTypeRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(CoverTypes obj)
        {
            var objFromDb = _db.CoverTypes.FirstOrDefault(p => p.Id == obj.Id);
            if (objFromDb != null)
            {
                objFromDb.Name = obj.Name;
            }
        }
    }
}
