using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoHIS.Activation.API.Security.Authorization;
using MoHIS.Activation.API.Services;
using MoHIS.Activation.Shared;
using MoHIS.Activation.Shared.Data;
using MoHIS.Activation.Shared.DataAccess;
using MoHIS.Activation.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MoHIS.Activation.API.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomAuthenticationService customAuthenticationService;
        private readonly IDataManager dataManager;
        private readonly ICustomerDAL customerDAL;
        private readonly IAppuserDAL appuserDAL;
        public CustomerController(ICustomAuthenticationService customAuthenticationService, IDataManager dataManager, IAppuserDAL appuserDAL, ICustomerDAL customerDAL) {
            this.customAuthenticationService = customAuthenticationService;
            this.dataManager = dataManager;
            this.appuserDAL = appuserDAL;
            this.customerDAL = customerDAL;
        }

        [HttpGet]
        public async Task<IEnumerable<CustomerGridViewModel>> GetCustomersAsync() {
                int appuser_id = customAuthenticationService.GetAppuserId(User);

            var environments = await customerDAL.GetAllCustomersOfUserAsync(appuser_id, true);

            return environments.ConvertAll(item => CustomerGridViewModel.ConvertFromDataModel(item));
        }

        [HttpGet("detail/{id}")]
        public async Task<ActionResult<CustomerDetailViewModel>> DetailAsync(int id) {
            int appuser_id = customAuthenticationService.GetAppuserId(User);
            var customer = await customerDAL.GetCustomerOfUserAsync(id, appuser_id, true);
            return CustomerDetailViewModel.ConvertFromDataModel(customer);
        }

        [ClaimRequirement(MyClaimTypes.Permission, "customer-add")]
        [HttpPost("AddCustomer")]
        public async Task<IActionResult> AddCustomer([FromBody]AddCustomerRequest addCustomer) {
            int appuser_id = customAuthenticationService.GetAppuserId(User);
            var user = await appuserDAL.GetAppuserAsync(appuser_id);
            Customer customer = new Customer() {
                Name = addCustomer.Name,
                Description = addCustomer.Description,
                Code = addCustomer.Code,
                Server = addCustomer.Server,
                NumberOfDevices = addCustomer.NumberOfDevices,
                Created = DateTime.Now,
                Modified = DateTime.Now

            };

            AppuserCustomer appuserCustomer = new AppuserCustomer() {
                Customer = customer,
                Appuser = user
            };
            customer.AppuserLink.Add(appuserCustomer);
            await customerDAL.AddAsync(customer);
            await dataManager.SaveChanges();
            return Ok();
        }

        [ClaimRequirement(MyClaimTypes.Permission, "customer-update")]
        [HttpPut("UpdateCustomer/{id}")]
        public async Task<IActionResult> UpdateCustomer([FromRoute]int id, [FromBody]UpdateCustomerRequest updateCustomer) {
            int appuser_id = customAuthenticationService.GetAppuserId(User);
            var customer = await customerDAL.GetCustomerOfUserAsync(id, appuser_id);
            if(customer == null) {
                return BadRequest();
            }
            customer.Name = updateCustomer.Name;
            customer.Description = updateCustomer.Description;
            customer.Code = updateCustomer.Code;
            customer.Server = updateCustomer.Server;
            customer.NumberOfDevices = updateCustomer.NumberOfDevices;
            customer.Modified = DateTime.Now;

            customerDAL.Update(customer);
            await dataManager.SaveChanges();

            return Ok();
        }
    }
}