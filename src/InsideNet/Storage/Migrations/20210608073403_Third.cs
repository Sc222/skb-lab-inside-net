using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class Third : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Persons_Roles_RoleId",
                table: "Persons");

            migrationBuilder.DropIndex(
                name: "IX_Persons_RoleId",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "Persons");

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "PersonAccessRights",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "PersonRoles",
                columns: table => new
                {
                    PersonId = table.Column<Guid>(type: "uuid", nullable: false),
                    RoleId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonRoles", x => new { x.PersonId, x.RoleId });
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PersonRoles");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "PersonAccessRights");

            migrationBuilder.AddColumn<Guid>(
                name: "RoleId",
                table: "Persons",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Persons_RoleId",
                table: "Persons",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_Roles_RoleId",
                table: "Persons",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id");
        }
    }
}
