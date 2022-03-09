using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Storage.Migrations
{
    public partial class PositionNotRequiredForPerson : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Persons_Positions_PositionId",
                table: "Persons");

            migrationBuilder.AlterColumn<Guid>(
                name: "PositionId",
                table: "Persons",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_Positions_PositionId",
                table: "Persons",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Persons_Positions_PositionId",
                table: "Persons");

            migrationBuilder.AlterColumn<Guid>(
                name: "PositionId",
                table: "Persons",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Persons_Positions_PositionId",
                table: "Persons",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id");
        }
    }
}
