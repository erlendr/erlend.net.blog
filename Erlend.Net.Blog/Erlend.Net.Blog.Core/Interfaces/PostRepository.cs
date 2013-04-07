using System;
using System.Collections.Generic;
using Erlend.Net.Blog.Core.Models;

namespace Erlend.Net.Blog.Core.Interfaces
{
    public interface IPostRepository
    {
        List<Post> GetAllPosts(bool published);
        List<Post> GetAllPosts();
        List<Post> FilterPosts(DateTime from, DateTime to, bool published);
        Post GetPostById(int id);
        Post AddPost(Post post);
        Post UpdatePost(Post post);
        void DeletePost(int id);
    }
}
