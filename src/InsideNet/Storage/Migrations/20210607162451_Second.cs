using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class Second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccessRights_Persons_PersonId",
                table: "AccessRights");

            migrationBuilder.DropIndex(
                name: "IX_AccessRights_PersonId",
                table: "AccessRights");

            migrationBuilder.DropColumn(
                name: "PersonId",
                table: "AccessRights");

            migrationBuilder.CreateTable(
                name: "PersonAccessRights",
                columns: table => new
                {
                    PersonId = table.Column<Guid>(type: "uuid", nullable: false),
                    AccesRightId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonAccessRights", x => new { x.PersonId, x.AccesRightId });
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PersonAccessRights");

            migrationBuilder.AddColumn<Guid>(
                name: "PersonId",
                table: "AccessRights",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AccessRights_PersonId",
                table: "AccessRights",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_AccessRights_Persons_PersonId",
                table: "AccessRights",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id");
        }
    }
}
