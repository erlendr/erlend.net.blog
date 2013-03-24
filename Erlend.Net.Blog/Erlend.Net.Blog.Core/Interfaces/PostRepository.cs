using System;
using System.Collections.Generic;
using Erlend.Net.Blog.Core.Models;

namespace Erlend.Net.Blog.Core.Interfaces
{
    public interface IPostRepository
    {
        List<Post> GetAllPosts();
        List<Post> FilterPosts(DateTime from, DateTime to);
        Post GetPostById(int id);
        Post AddPost(Post post);
        Post UpdatePost(Post post);
        Post DeletePost(int id);
    }
}
