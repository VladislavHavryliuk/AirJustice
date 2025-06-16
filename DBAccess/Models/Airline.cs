using System.ComponentModel.DataAnnotations;

namespace DBAccess.Models
{
    public class Airline
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required, MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        public ICollection<Flight> Flights { get; set; } = new List<Flight>();
    }
}
