using Microsoft.EntityFrameworkCore;
using Activation.Shared.Data;
using System;

namespace Activation.Shared
{
    public class PortalDbContext : DbContext
    {



        public PortalDbContext(DbContextOptions<PortalDbContext> options) : base(options) { }

        public DbSet<Appuser> Appusers { get; set; }
        //public DbSet<AppuserEnvironment> AppuserEnvironments { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Approle> Roles { get; set; }
        public DbSet<Apprule> Rules { get; set; }
        public DbSet<Appsession> Sessions { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Appuser>(entity => {
                //entity.ToTable("appuser");
                //entity.Property(e => e.Id).HasColumnName("id");
                //entity.Property(e => e.Username).HasColumnName("username");
                //entity.Property(e => e.Password).HasColumnName("password");
                //entity.Property(e => e.Created).HasColumnName("created");
                //entity.Property(e => e.Modified).HasColumnName("modified");
                //entity.Property(e => e.Deleted).HasColumnName("deleted");
                //entity.ToTable
                //entity.Property(e=>e.Id).
                entity.HasMany(e => e.CustomerLink);//.WithOne(b => b.Appuser);
                entity.HasMany(e => e.RoleLink);
                entity.HasMany(e => e.Sessions);
            });

            modelBuilder.Entity<Approle>(entity => {
                entity.HasKey(e => e.Id);
                entity.HasMany(e => e.AppuserLink);
                entity.HasMany(e => e.ApproleApprule);
            });

            modelBuilder.Entity<Apprule>(entity => {
                entity.HasKey(e => e.Id);
                entity.HasMany(e => e.ApproleApprule);
            });

            modelBuilder.Entity<ApproleApprule>(entity => {
                entity.HasKey(e => new {e.ApproleId, e.AppruleId });
            });

            modelBuilder.Entity<AppuserApprole>(entity => {
                entity.HasKey(e => new { e.ApproleId, e.AppuserId });
            });

            modelBuilder.Entity<AppuserCustomer>(entity =>
            {
                //entity.ToTable("appusercustomer");

                //entity.Property(e => e.AppuserId).HasColumnName("appuserid");
                //entity.Property(e => e.CustomerId).HasColumnName("customerid");

                entity.HasKey(e => new { e.AppuserId, e.CustomerId });

                //entity
                //.HasOne(a => a.Appuser);
                //.WithMany(b => b.CustomerLink);

                //entity
                //.HasOne(a => a.Customer);
                //.WithMany(b => b.AppuserLink);

            });

            modelBuilder.Entity<Device>(entity => {
                entity.HasKey(e => e.Id);
                //entity.ToTable("device");
                //entity.Property(e => e.Id).HasColumnName("id");
                //entity.Property(e => e.CustomerId).HasColumnName("customerid");
                //entity.Property(e => e.UUID).HasColumnName("uuid");
                //entity.Property(e => e.Description).HasColumnName("description");
                //entity.Property(e => e.Created).HasColumnName("created");
                //entity.Property(e => e.Modified).HasColumnName("modified");
                //entity.Property(e => e.Deleted).HasColumnName("deleted");
                //entity.HasOne(a => a.Customer);//.WithMany(b => b.Devices);

            });

            modelBuilder.Entity<Appsession>(entity => {
                entity.HasKey(e => e.Id);

            });



            modelBuilder.Entity<Customer>(entity =>
            {
                //entity.ToTable("customer");
                //entity.Property(e => e.Id).HasColumnName("id");
                //entity.Property(e => e.Name).HasColumnName("name");
                //entity.Property(e => e.Code).HasColumnName("code");
                //entity.Property(e => e.Description).HasColumnName("description");
                //entity.Property(e => e.Created).HasColumnName("created");
                //entity.Property(e => e.Modified).HasColumnName("modified");
                //entity.Property(e => e.Deleted).HasColumnName("deleted");
                entity.HasMany(a => a.Devices);//.WithOne(b => b.Customer);
                entity.HasMany(a => a.AppuserLink);//.WithOne(b => b.Customer);
            });

            modelBuilder.Entity<TransactionLog>(entity => {
                entity.HasKey(e => e.Id);
            });
        }
    }
}
