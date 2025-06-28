using FluentValidation;
using MVC.DTOs.Complaint;

namespace MVC.Validators
{
    public class ComplaintCreateValidator : AbstractValidator<ComplaintCreateDto>
    {
        public ComplaintCreateValidator()
        {
            RuleFor(x => x.FlightId)
                .NotEqual(Guid.Empty).WithMessage("Flight ID is required.");

            RuleFor(x => x.AdditionalInfo)
                .MaximumLength(1000)
                .WithMessage("Additional information cannot exceed 1000 characters.")
                .When(x => !string.IsNullOrEmpty(x.AdditionalInfo));
        }
    }
}
