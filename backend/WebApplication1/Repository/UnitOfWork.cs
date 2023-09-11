using WebApplication1.Data;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _db;

        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
            ProductRepository = new ProductRepository(_db);
            ApplicationUserRepository = new ApplicationUserRepository(_db);
            CategoryRepository = new CategoryRepository(_db);
            CoverTypeRepository = new CoverTypeRepository(_db);
            ShoppingCartRepository = new ShoppingCartRepository(_db);
            OrderHeaderRepository = new OrderHeaderRepository(_db);
            OrderDetailsRepository = new OrderDetailsRepository(_db);
        }

        public IProductRepository ProductRepository { get; private set; }
        public IApplicationUserRepository ApplicationUserRepository { get; private set; }
        public ICategoryRepository CategoryRepository { get; private set; }
        public ICoverTypeRepository CoverTypeRepository { get; private set; }
        public IShoppingCartRepository ShoppingCartRepository { get; private set; }
        public IOrderHeaderRepository OrderHeaderRepository { get; private set; }
        public IOrderDetailsRepository OrderDetailsRepository { get; private set; }

        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
