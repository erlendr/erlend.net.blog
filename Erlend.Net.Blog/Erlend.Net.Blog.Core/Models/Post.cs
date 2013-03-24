using System;

namespace Erlend.Net.Blog.Core.Models
{
    public class Post
    {
        public int Id { get; set; }
        public bool Published { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? PublishedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}