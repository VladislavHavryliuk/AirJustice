namespace MVC.DTOs.Flight
{
    public class FlightDto
    {
        public Guid Id { get; set; }

        public string FlightNumber { get; set; } = string.Empty;

        public DateTime DepartureTime { get; set; }

        public DateTime ArrivalTime { get; set; }

        public string FromAirport { get; set; } = string.Empty;

        public string ToAirport { get; set; } = string.Empty;

        public string AirlineName { get; set; } = string.Empty;
    }
}
