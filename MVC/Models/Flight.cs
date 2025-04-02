using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MVC.Models
{
    public class Flight
    {
        [Key]
        public int Id { get; set; }

        [Required, ForeignKey("Airline")]
        public int AirlineId { get; set; }
        public Airline Airline { get; set; }

        [Required]
        public string FlightNumber { get; set; }

        [Required]
        public DateTime DepartureTime { get; set; }

        [Required]
        public DateTime ArrivalTime { get; set; }
    }
}
