using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class notifications : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TelegramBotApiKey",
                table: "NotificationsChannel",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TelegramBotApiKey",
                table: "NotificationsChannel");
        }
    }
}
