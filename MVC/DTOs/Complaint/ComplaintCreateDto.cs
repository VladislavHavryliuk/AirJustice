namespace MVC.DTOs.Complaint
{
    public class ComplaintCreateDto
    {
        public Guid FlightId { get; set; }

        public string? AdditionalInfo { get; set; }
    }
}
