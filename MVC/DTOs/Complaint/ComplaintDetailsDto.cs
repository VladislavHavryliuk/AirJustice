namespace MVC.DTOs.Complaint
{
    public class ComplaintDetailsDto
    {
        public Guid Id { get; set; }

        public string Status { get; set; } = string.Empty;

        public DateTime SubmittedAt { get; set; }

        public string? AdditionalInfo { get; set; }

        public string FlightNumber { get; set; } = string.Empty;

        public string AirlineName { get; set; } = string.Empty;
    }
}
