
namespace MVC.DTOs.Complaint
{
    public class ComplaintStatusDto
    {
        public Guid Id { get; set; }

        public string Status { get; set; } = string.Empty;

        public DateTime SubmittedAt { get; set; }
    }
}
