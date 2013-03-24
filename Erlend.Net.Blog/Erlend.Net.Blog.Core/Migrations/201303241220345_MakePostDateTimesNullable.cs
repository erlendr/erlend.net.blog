namespace Erlend.Net.Blog.Core.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MakePostDateTimesNullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Posts", "CreatedDate", c => c.DateTime());
            AlterColumn("dbo.Posts", "PublishedDate", c => c.DateTime());
            AlterColumn("dbo.Posts", "ModifiedDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Posts", "ModifiedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Posts", "PublishedDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Posts", "CreatedDate", c => c.DateTime(nullable: false));
        }
    }
}
