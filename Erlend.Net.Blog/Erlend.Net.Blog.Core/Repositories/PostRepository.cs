using System;
using System.Data;
using System.Linq;
using System.Collections.Generic;
using Erlend.Net.Blog.Core.Interfaces;
using Erlend.Net.Blog.Core.Models;

namespace Erlend.Net.Blog.Core.Repositories
{
    public class PostRepository : IPostRepository
    {
        public List<Post> GetAllPosts(bool published)
        {
            using (var context = new BlogContext())
            {
                return context.Posts.Where(x => x.Published == published).ToList();
            }
        }

        public List<Post> GetAllPosts()
        {
            using (var context = new BlogContext())
            {
                return context.Posts.ToList();
            }
        }

        public List<Post> FilterPosts(DateTime from, DateTime to, bool published)
        {
            using (var context = new BlogContext())
            {
                return context.Posts.Where(x => x.PublishedDate.Value.Date >= from.Date && x.PublishedDate < to.Date).ToList();
            }
        }

        public Post GetPostById(int id)
        {
            using (var context = new BlogContext())
            {
                return context.Posts.FirstOrDefault(x => x.Id == id);
            }
        }

        public Post AddPost(Post post)
        {
            using (var context = new BlogContext())
            {
                var newPost = context.Posts.Add(post);
                context.SaveChanges();
                return newPost;
            }
        }

        public Post UpdatePost(Post post)
        {
            using (var context = new BlogContext())
            {
                context.Posts.Include("Tags");
                context.Posts.Attach(post);
                context.Entry(post).State = EntityState.Modified;
                context.SaveChanges();
                return post;
            }
        }

        public void DeletePost(int id)
        {
            using (var context = new BlogContext())
            {
                var postToDelete = context.Posts.FirstOrDefault(x => x.Id == id);
                if(postToDelete != null)
                {
                    context.Posts.Remove(postToDelete);
                    context.SaveChanges();
                }
            }
        }
    }
}
