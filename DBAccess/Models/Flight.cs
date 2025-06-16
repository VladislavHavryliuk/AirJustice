using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DBAccess.Models
{
    public class Flight
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required, MaxLength(20)]
        public string FlightNumber { get; set; } = string.Empty;

        [Required]
        public DateTime DepartureTime { get; set; }

        [Required]
        public DateTime ArrivalTime { get; set; }

        [Required, MaxLength(3)]
        public string FromAirport { get; set; } = string.Empty;

        [Required, MaxLength(3)]
        public string ToAirport { get; set; } = string.Empty;

        [Required]
        public Guid AirlineId { get; set; }
        public Airline Airline { get; set; } = null!;

        public ICollection<Complaint> Complaints { get; set; } = new List<Complaint>();
    }
}
