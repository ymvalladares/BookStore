using WebApplication1.Entitys;

namespace WebApplication1.Repository.IRepository
{
    public interface ICategoryRepository : IRepository<Category>
    {
        void Update(Category category);
    }
}
