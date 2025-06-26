namespace MVC.DTOs.Complaint
{
    public class DocumentShortDto
    {
        public string FileName { get; set; } = string.Empty;

        public string ContentType { get; set; } = string.Empty;

        public DateTime UploadedAt { get; set; }
    }
}
