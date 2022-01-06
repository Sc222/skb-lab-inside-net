using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class FixAccessRightKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AccessRequest",
                columns: table => new
                {
                    PersonId = table.Column<Guid>(nullable: false),
                    SlackUserId = table.Column<string>(nullable: false),
                    ChannelId = table.Column<string>(nullable: true),
                    ChannelName = table.Column<string>(nullable: true),
                    IsDisapproved = table.Column<bool>(nullable: false),
                    DisapproveReason = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccessRequest", x => new { x.PersonId, x.SlackUserId });
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccessRequest");
        }
    }
}
