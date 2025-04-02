﻿using System.ComponentModel.DataAnnotations;

namespace MVC.Models
{
    public class Airline
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public List<Flight> Flights { get; set; } = new();
    }
}
