using WebApplication1.Entitys;

namespace WebApplication1.Repository.IRepository
{
    public interface ICoverTypeRepository : IRepository<CoverTypes>
    {
        void Update(CoverTypes coverTypes);
    }
}
