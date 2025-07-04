using System;

namespace MVC.DTOs.Complaint
{
    public class ComplaintCreateDto
    {
        public Guid UserId { get; set; }

        public Guid FlightId { get; set; }

        public string? AdditionalInfo { get; set; }
    }
}
