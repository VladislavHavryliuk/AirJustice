using Microsoft.Extensions.DependencyInjection;
using MVC.Repositories.Interfaces;
using MVC.Repositories.Implementations;
// using MVC.Services.Interfaces;
// using MVC.Services.Implementations;

namespace MVC.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddProjectServices(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IComplaintRepository, ComplaintRepository>();
            services.AddScoped<IFlightRepository, FlightRepository>();

            // services.AddScoped<IAuthService, AuthService>();
            // services.AddScoped<IComplaintService, ComplaintService>();
            // services.AddScoped<IFlightService, FlightService>();

            return services;
        }
    }
}
