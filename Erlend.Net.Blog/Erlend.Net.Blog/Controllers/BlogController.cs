using System.Web.Mvc;
using System.Linq;
using Erlend.Net.Blog.Core.Repositories;

namespace Erlend.Net.Blog.Controllers
{
    public class BlogController : Controller
    {
        public ActionResult Index()
        {
            var postRepository = new PostRepository();
            var posts = postRepository.GetAllPosts(true).Take(3);
            return View(posts);
        }

        public ActionResult Post(int id)
        {
            var postRepository = new PostRepository();
            var post = postRepository.GetPostById(id);
            ViewBag.SinglePost = true;
            return View(post);
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }
    }
}
