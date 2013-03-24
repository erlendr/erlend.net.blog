using System.Data.Entity;
using Erlend.Net.Blog.Core.Models;

namespace Erlend.Net.Blog.Core
{
    public class BlogContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }
    }
}
