using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class Fourth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "Patronymic",
                table: "Persons");

            migrationBuilder.RenameColumn(
                name: "Surname",
                table: "Persons",
                newName: "FullName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "Persons",
                newName: "Surname");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Persons",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Patronymic",
                table: "Persons",
                type: "text",
                nullable: true);
        }
    }
}
