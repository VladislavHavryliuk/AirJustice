using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DBAccess;
using DBAccess.Models;
using MVC.DTOs.Complaint;

namespace MVC.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComplaintController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ComplaintController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateComplaint(ComplaintCreateDto dto)
        {
            var complaint = new Complaint
            {
                UserId = dto.UserId,
                FlightId = dto.FlightId,
                AdditionalInfo = dto.AdditionalInfo
            };

            _context.Complaints.Add(complaint);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Complaint submitted", ComplaintId = complaint.Id });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ComplaintStatusDto>> GetComplaintStatus(Guid id)
        {
            var complaint = await _context.Complaints.FindAsync(id);

            if (complaint == null)
                return NotFound();

            return new ComplaintStatusDto
            {
                Id = complaint.Id,
                Status = complaint.Status.ToString(),
                SubmittedAt = complaint.SubmittedAt
            };
        }
    }
}
