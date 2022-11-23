using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Upmeet.Models;

public partial class EventsDbContext : DbContext
{
    public EventsDbContext()
    {
    }

    public EventsDbContext(DbContextOptions<EventsDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<FavEvent> FavEvents { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSqlLocalDb;Database=EventsDb;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Events__3213E83F03CF7B1B");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Address).HasMaxLength(30);
            entity.Property(e => e.City).HasMaxLength(20);
            entity.Property(e => e.DateTime).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.HostedBy).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.State)
                .HasMaxLength(2)
                .IsUnicode(false);
            entity.Property(e => e.TicketPrice).HasColumnType("money");
            entity.Property(e => e.Type).HasMaxLength(20);
        });

        modelBuilder.Entity<FavEvent>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__FavEvent__3213E83F713E54AD");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.EventId).HasColumnName("eventID");
            entity.Property(e => e.UserId).HasColumnName("userID");

            entity.HasOne(d => d.Event).WithMany(p => p.FavEvents)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("FK__FavEvents__event__38996AB5");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
