using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MVC.Models;

namespace MVC.Controllers;

public class ComplaintController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }

    /// <summary>
    /// Route to the page with all complaints.
    /// </summary>
    /// <returns></returns>
    public IActionResult List()
    {
        return View();
    }
    
    // TODO: POST WITH ID OF COMPLAINT
    
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}