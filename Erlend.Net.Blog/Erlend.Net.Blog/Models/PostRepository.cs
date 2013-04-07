using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using Erlend.Net.Blog.Core.Models;

namespace Erlend.Net.Blog.Models
{ 
    public class PostRepository : IPostRepository
    {
        ErlendNetBlogContext context = new ErlendNetBlogContext();

        public IQueryable<Post> All
        {
            get { return context.Posts; }
        }

        public IQueryable<Post> AllIncluding(params Expression<Func<Post, object>>[] includeProperties)
        {
            IQueryable<Post> query = context.Posts;
            foreach (var includeProperty in includeProperties) {
                query = query.Include(includeProperty);
            }
            return query;
        }

        public Post Find(int id)
        {
            return context.Posts.Find(id);
        }

        public void InsertOrUpdate(Post post)
        {
            if (post.Id == default(int)) {
                // New entity
                context.Posts.Add(post);
            } else {
                // Existing entity
                context.Entry(post).State = EntityState.Modified;
            }
        }

        public void Delete(int id)
        {
            var post = context.Posts.Find(id);
            context.Posts.Remove(post);
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public void Dispose() 
        {
            context.Dispose();
        }
    }

    public interface IPostRepository : IDisposable
    {
        IQueryable<Post> All { get; }
        IQueryable<Post> AllIncluding(params Expression<Func<Post, object>>[] includeProperties);
        Post Find(int id);
        void InsertOrUpdate(Post post);
        void Delete(int id);
        void Save();
    }
}