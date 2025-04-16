using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MVC.Models;
//using MVC.Data; // Assuming ApplicationDbContext is here
//using BCrypt.Net;

namespace MVC.Controllers
{
    public class AuthController : Controller
    {
        //private readonly ApplicationDbContext _context;

        // Inject DbContext via constructor
        public AuthController()
        {
            
        }

        // GET: /Auth/Register
        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        // POST: /Auth/Register
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Register(User user)
        {
            if (ModelState.IsValid)
            {
                /*
                // Check if any user with this email exists
                if (_context.Users.Any(u => u.Email == user.Email))
                {
                    ModelState.AddModelError("Email", "This email is already registered.");
                    return View(user);
                }

                // Hash password
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

                // Validate Role
                if (user.Role != "Client" && user.Role != "Admin")
                {
                    ModelState.AddModelError("Role", "Invalid role selected.");
                    return View(user);
                }

                // Restrict Admin role for safety
                if (user.Role == "Admin")
                {
                    user.Role = "Client"; // Default to Client
                }

                // Add User to DB and SaveChanges
                _context.Users.Add(user);
                _context.SaveChanges();

                // Redirect to Success registration page
                 */
                return RedirectToAction("RegisterSuccess");
            }

            // If validation fails, redisplay the form
            return View(user);
        }

        // GET: /Auth/RegisterSuccess
        [HttpGet]
        public IActionResult RegisterSuccess()
        {
            return View();
        }

        // GET: /Auth/Login
        [HttpGet]
        public IActionResult Login()
        {
            return View(new LoginUserViewModel());
        }

        // POST: /Auth/Login
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Login(LoginUserViewModel loginUser)
        {
            if (ModelState.IsValid)
            {
                /*
                var user = _context.Users.FirstOrDefault(u => u.Email == loginUser.Email);

                // Check if user exists and verify password
                if (user == null || !BCrypt.Net.BCrypt.Verify(loginUser.Password, user.PasswordHash))
                {
                    ModelState.AddModelError("", "Invalid email or password.");
                    return View(loginUser);
                }

                // TODO: Implement authentication (e.g., set cookie or session)
                // For now, redirect to success page
                 */
                // Find user by email
                
                return RedirectToAction("LoginSuccess");
            }

            // If validation fails, redisplay the form
            return View(loginUser);
        }

        // GET: /Auth/LoginSuccess
        [HttpGet]
        public IActionResult LoginSuccess()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}