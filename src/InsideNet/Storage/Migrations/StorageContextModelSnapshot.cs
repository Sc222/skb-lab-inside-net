﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Storage;

namespace Storage.Migrations
{
    [DbContext(typeof(StorageContext))]
    partial class StorageContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.6")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("Storage.Entities.AccessRight", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("AccessLevel")
                        .HasColumnType("text");

                    b.Property<string>("ResourceName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("AccessRights");
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

                    b.Property<Guid>("PositionId")
                        .HasColumnType("uuid");

                    b.Property<string>("Slack")
                        .HasColumnType("text");

                    b.Property<string>("Telegram")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Login")
                        .IsUnique();

                    b.HasIndex("PhoneNumber")
                        .IsUnique();

                    b.HasIndex("PositionId");

                    b.HasIndex("Slack")
                        .IsUnique();

                    b.HasIndex("Telegram")
                        .IsUnique();

                    b.ToTable("Persons");
                });

            modelBuilder.Entity("Storage.Entities.PersonAccessRights", b =>
                {
                    b.Property<Guid>("PersonId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("AccesRightId")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsApproved")
                        .HasColumnType("boolean");

                    b.HasKey("PersonId", "AccesRightId");

                    b.ToTable("PersonAccessRights");
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

            modelBuilder.Entity("Storage.Entities.PersonRole", b =>
                {
                    b.Property<Guid>("PersonId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uuid");

                    b.HasKey("PersonId", "RoleId");

                    b.ToTable("PersonRoles");
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

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Storage.Entities.Vacation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("From")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("PersonId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("To")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id");

                    b.ToTable("Vacations");
                });

            modelBuilder.Entity("Storage.Entities.Person", b =>
                {
                    b.HasOne("Storage.Entities.Position", "Position")
                        .WithMany()
                        .HasForeignKey("PositionId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Position");
                });
#pragma warning restore 612, 618
        }
    }
}
