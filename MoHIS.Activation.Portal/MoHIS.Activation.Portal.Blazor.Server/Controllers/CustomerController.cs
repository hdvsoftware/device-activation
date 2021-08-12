using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoHIS.Activation.Portal.Blazor.Server.Services;
using MoHIS.Activation.Shared;
using MoHIS.Activation.Shared.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoHIS.Activation.Portal.Blazor.Server.Controllers {
    //[Authorize]
    [Authorize]
    [Route("[controller]")]
    public class CustomerController : ControllerBase {
        private readonly IUserService userService;
        private readonly PortalDbContext portalDbContext;
        public CustomerController(PortalDbContext portalDbContext, IUserService userService) {
            this.portalDbContext = portalDbContext;
            this.userService = userService;
        }

        //[HttpGet("customers")]
        [HttpGet]
        public async Task<IEnumerable<Customer>> GetCustomersAsync() {
            int appuser_id = userService.GetAppuserId(User);

            var environments = await portalDbContext.Customers
                .Include(e => e.AppuserLink)
                .Where(e => e.AppuserLink.Any(link => link.AppuserId == appuser_id))
                .ToListAsync();



            return environments;
        }

        [HttpGet("detail/{id}")]
        public async Task<Customer> DetailAsync(int id) {
            int appuser_id = userService.GetAppuserId(User);
            var customer = await portalDbContext.Customers
                .Include(e => e.Devices)
                .Include(e => e.AppuserLink)
                .FirstAsync(e => e.AppuserLink.Any(link => link.AppuserId == appuser_id) && e.Id == id);
            //.Where(e => e.AppuserLink.Any(link => link.AppuserId == appuser_id) && e.Id == id)
            //.ToListAsync();
            return customer;
        }
    }
}
