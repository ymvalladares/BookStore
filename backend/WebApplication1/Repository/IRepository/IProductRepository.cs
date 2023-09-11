using WebApplication1.Entitys;

namespace WebApplication1.Repository.IRepository
{
    public interface IProductRepository : IRepository<Product>
    {
        void Update(Product product);
    }
}
