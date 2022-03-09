using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class ReworkVacations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "From",
                table: "Vacations");

            migrationBuilder.DropColumn(
                name: "To",
                table: "Vacations");

            migrationBuilder.AlterColumn<Guid>(
                name: "PersonId",
                table: "Vacations",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndTime",
                table: "Vacations",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ManagerComment",
                table: "Vacations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartTime",
                table: "Vacations",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Subject",
                table: "Vacations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vacations_PersonId",
                table: "Vacations",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vacations_Persons_PersonId",
                table: "Vacations",
                column: "PersonId",
                principalTable: "Persons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vacations_Persons_PersonId",
                table: "Vacations");

            migrationBuilder.DropIndex(
                name: "IX_Vacations_PersonId",
                table: "Vacations");

            migrationBuilder.DropColumn(
                name: "EndTime",
                table: "Vacations");

            migrationBuilder.DropColumn(
                name: "ManagerComment",
                table: "Vacations");

            migrationBuilder.DropColumn(
                name: "StartTime",
                table: "Vacations");

            migrationBuilder.DropColumn(
                name: "Subject",
                table: "Vacations");

            migrationBuilder.AlterColumn<Guid>(
                name: "PersonId",
                table: "Vacations",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "From",
                table: "Vacations",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "To",
                table: "Vacations",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
