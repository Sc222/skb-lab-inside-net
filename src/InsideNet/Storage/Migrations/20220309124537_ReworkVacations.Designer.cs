﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Storage;

namespace Storage.Migrations
{
    [DbContext(typeof(StorageContext))]
    [Migration("20220309124537_ReworkVacations")]
    partial class ReworkVacations
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.16")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Storage.Entities.AccessRequest", b =>
                {
                    b.Property<Guid>("PersonId")
                        .HasColumnType("uuid");

                    b.Property<string>("SlackUserId")
                        .HasColumnType("text");

                    b.Property<string>("ChannelId")
                        .HasColumnType("text");

                    b.Property<string>("ChannelName")
                        .HasColumnType("text");

                    b.Property<string>("DisapproveReason")
                        .HasColumnType("text");

                    b.Property<bool>("IsDisapproved")
                        .HasColumnType("boolean");

                    b.HasKey("PersonId", "SlackUserId");

                    b.ToTable("AccessRequest");
                });

            modelBuilder.Entity("Storage.Entities.CalendarData", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("ManagerComment")
                        .HasColumnType("text");

                    b.Property<Guid?>("PersonId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Subject")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.ToTable("Vacations");
                });

            modelBuilder.Entity("Storage.Entities.Department", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Department");
                });

            modelBuilder.Entity("Storage.Entities.NotificationsChannel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Slack")
                        .HasColumnType("text");

                    b.Property<string>("SlackForHr")
                        .HasColumnType("text");

                    b.Property<string>("Telegram")
                        .HasColumnType("text");

                    b.Property<string>("TelegramBotApiKey")
                        .HasColumnType("text");

                    b.Property<string>("TelegramForHr")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("NotificationsChannel");
                });

            modelBuilder.Entity("Storage.Entities.Person", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("AvatarUrl")
                        .HasColumnType("text");

                    b.Property<Guid?>("DepartmentId")
                        .HasColumnType("uuid");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FullName")
                        .HasColumnType("text");

                    b.Property<bool>("IsNewbie")
                        .HasColumnType("boolean");

                    b.Property<string>("Login")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<Guid?>("PositionId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("RoleId")
                        .HasColumnType("uuid");

                    b.Property<string>("Slack")
                        .HasColumnType("text");

                    b.Property<string>("SlackId")
                        .HasColumnType("text");

                    b.Property<string>("Telegram")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Login")
                        .IsUnique();

                    b.HasIndex("PhoneNumber")
                        .IsUnique();

                    b.HasIndex("PositionId");

                    b.HasIndex("RoleId");

                    b.HasIndex("Slack")
                        .IsUnique();

                    b.HasIndex("SlackId")
                        .IsUnique();

                    b.HasIndex("Telegram")
                        .IsUnique();

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("Storage.Entities.PersonContact", b =>
                {
                    b.Property<Guid>("PersonId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("ContactId")
                        .HasColumnType("uuid");

                    b.HasKey("PersonId", "ContactId");

                    b.ToTable("PersonContacts");
                });

            modelBuilder.Entity("Storage.Entities.Position", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Positions");
                });

            modelBuilder.Entity("Storage.Entities.Role", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<List<string>>("AllowedActions")
                        .HasColumnType("text[]");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Storage.Entities.CalendarData", b =>
                {
                    b.HasOne("Storage.Entities.Person", "Person")
                        .WithMany()
                        .HasForeignKey("PersonId");
                });

            modelBuilder.Entity("Storage.Entities.Person", b =>
                {
                    b.HasOne("Storage.Entities.Department", "Department")
                        .WithMany()
                        .HasForeignKey("DepartmentId");

                    b.HasOne("Storage.Entities.Position", "Position")
                        .WithMany()
                        .HasForeignKey("PositionId");

                    b.HasOne("Storage.Entities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId");
                });
#pragma warning restore 612, 618
        }
    }
}
