using System;
using Erlend.Net.Blog.Core.Models;
using Erlend.Net.Blog.Core.Repositories;
using NUnit.Framework;

namespace Erlend.Net.Blog.Core.Tests.Integration
{
    [TestFixture]
    public class PostRepositoryTests
    {
        [Test]
        // ReSharper disable InconsistentNaming
        public void WhenData_CorrectQuery_ShouldNotBeNull()
        // ReSharper restore InconsistentNaming
        {
            var subjectUnderTest = new PostRepository();
            var post = new Post();
            post.Content = "Content";
            post.Title = "Content";
            post.CreatedDate = DateTime.Now;
            post.Published = false;

            var createdPost = subjectUnderTest.AddPost(post);

            createdPost.Title = "Lol";
            var updatedPost = subjectUnderTest.UpdatePost(post);
            Assert.AreEqual(createdPost.Title, updatedPost.Title);
        }
    }
}
