
namespace WebApplication1.Repository.IRepository
{
    public interface IUnitOfWork
    {
       IProductRepository ProductRepository { get; }
       IApplicationUserRepository ApplicationUserRepository { get; }
       ICategoryRepository CategoryRepository { get; }
       ICoverTypeRepository CoverTypeRepository { get; }
       IShoppingCartRepository ShoppingCartRepository { get; }
       IOrderHeaderRepository  OrderHeaderRepository { get; }
       IOrderDetailsRepository OrderDetailsRepository { get; }
       void Save();
    }
}
