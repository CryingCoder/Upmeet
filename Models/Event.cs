using System;
using System.Collections.Generic;

namespace Upmeet.Models;

public partial class Event
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Address { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public decimal? TicketPrice { get; set; }

    public string? Type { get; set; }

    public string? HostedBy { get; set; }

    public DateTime? DateTime { get; set; }

    public int? AvailableTickets { get; set; }

    public virtual ICollection<FavEvent> FavEvents { get; } = new List<FavEvent>();
}
