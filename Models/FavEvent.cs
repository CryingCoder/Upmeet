using System;
using System.Collections.Generic;

namespace Upmeet.Models;

public partial class FavEvent
{
    public int Id { get; set; }

    public int? EventId { get; set; }

    public int? UserId { get; set; }

    public virtual Event? Event { get; set; }
}
