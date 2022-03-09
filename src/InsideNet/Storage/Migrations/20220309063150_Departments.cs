using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class Departments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "DepartmentId",
                table: "Persons",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Department",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Department", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Persons_DepartmentId",
                table: "Persons",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Department_Name",
                table: "Department",
                column: "Name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_Department_DepartmentId",
                table: "Persons",
                column: "DepartmentId",
                principalTable: "Department",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Persons_Department_DepartmentId",
                table: "Persons");

            migrationBuilder.DropTable(
                name: "Department");

            migrationBuilder.DropIndex(
                name: "IX_Persons_DepartmentId",
                table: "Persons");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "Persons");
        }
    }
}
