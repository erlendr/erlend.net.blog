using System;
using System.Web.Mvc;
using Erlend.Net.Blog.Core.Interfaces;
using Erlend.Net.Blog.Core.Models;
using Erlend.Net.Blog.Core.Repositories;
using Erlend.Net.Blog.Filters;

namespace Erlend.Net.Blog.Controllers
{
    [Authorize]
    [InitializeSimpleMembership]
    public class PostsController : Controller
    {
        private readonly IPostRepository _postRepository;

        // If you are using Dependency Injection, you can delete the following constructor
        public PostsController()
            : this(new PostRepository())
        {
        }

        public PostsController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        //
        // GET: /Posts/

        public ViewResult Index()
        {
            return View(_postRepository.GetAllPosts());
        }

        //
        // GET: /Posts/Details/5

        public ViewResult Details(int id)
        {
            return View(_postRepository.GetPostById(id));
        }

        //
        // GET: /Posts/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /Posts/Create

        [HttpPost]
        public ActionResult Create(Post post)
        {
            if (ModelState.IsValid)
            {
                if(post.Published)
                {
                    post.PublishedDate = DateTime.Now;
                }
                if (!post.CreatedDate.HasValue)
                {
                    post.CreatedDate = DateTime.Now;
                }
                _postRepository.AddPost(post);
                return RedirectToAction("Index");
            }
            return View();
        }

        //
        // GET: /Posts/Edit/5
        public ActionResult Edit(int id)
        {
            return View(_postRepository.GetPostById(id));
        }

        //
        // POST: /Posts/Edit/5

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(Post post)
        {
            if (ModelState.IsValid)
            {
                if (post.Published)
                {
                    post.PublishedDate = DateTime.Now;
                }
                if (!post.CreatedDate.HasValue)
                {
                    post.CreatedDate = DateTime.Now;
                }
                post.ModifiedDate = DateTime.Now;
                _postRepository.UpdatePost(post);
            }
            return View();
        }

        //
        // GET: /Posts/Delete/5

        public ActionResult Delete(int id)
        {
            return View(_postRepository.GetPostById(id));
        }

        //
        // POST: /Posts/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            _postRepository.DeletePost(id);
            return RedirectToAction("Index");
        }
    }
}

