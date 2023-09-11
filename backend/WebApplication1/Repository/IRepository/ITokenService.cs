using WebApplication1.Entitys;

namespace WebApplication1.Repository.IRepository
{
    public interface ITokenService
    {
        string CreateToken(ApplicationUser user, List<string> Role);
    }
}
