using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptoHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoHIS.Activation.API.Security.Authorization;
using MoHIS.Activation.API.Services;
using MoHIS.Activation.Shared;
using MoHIS.Activation.Shared.Data;
using MoHIS.Activation.Shared.DataAccess;
using MoHIS.Activation.Shared.Models;

namespace MoHIS.Activation.API.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ICustomAuthenticationService customAuthenticationService;
        private readonly IDataManager dataManager;
        private readonly IAppuserDAL appuserDAL;
        private readonly ICustomerDAL customerDAL;

        public UserController(ICustomAuthenticationService customAuthenticationService, IDataManager dataManager, IAppuserDAL appuserDAL, ICustomerDAL customerDAL) {
            this.customAuthenticationService = customAuthenticationService;
            this.dataManager = dataManager;
            this.appuserDAL = appuserDAL;
            this.customerDAL = customerDAL;
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody]LoginRequest loginRequest) {
            var token = await customAuthenticationService.AuthenticateAsync(loginRequest.username, loginRequest.password);
            if (token == null) {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
            IEnumerable<string> rules = await customAuthenticationService.GetRulesForUser(loginRequest.username);
            return new LoginResponse() {
                Succes = true,
                Token = token,
                Rules = rules.ToArray()
            };

        }

        [ClaimRequirement(MyClaimTypes.Permission, "appuser-add")]
        [HttpGet("AddUser")]
        public async Task<ActionResult<AddUserViewModel>> AddUser() {
            int loggedInAppuserId = customAuthenticationService.GetAppuserId(User);
            var possibleCustomers = await customerDAL.GetAllCustomersOfUserAsync(loggedInAppuserId);

            AddUserViewModel addUserViewModel = new AddUserViewModel(possibleCustomers);
            return addUserViewModel;
        }

        [ClaimRequirement(MyClaimTypes.Permission, "appuser-add")]
        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUser([FromBody]AddUserRequest user) {
            
            try {
                await dataManager.BeginTransaction();

                Appuser appuser = new Appuser() {
                    Username = user.Username,
                    Password = Crypto.HashPassword(user.Password),
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                };
                if (user.CustomerIds == null || user.CustomerIds.Count == 0) {
                    return BadRequest();
                }

                var customers = await customerDAL.GetCustomersAsync(user.CustomerIds);
                
                if (customers == null || customers.Count == 0) {
                    return BadRequest();
                }
                await appuserDAL.AddAsync(appuser);

                appuser.CustomerLink = new List<AppuserCustomer>();
                foreach(var customer in customers) {
                    appuser.CustomerLink.Add(new AppuserCustomer() {
                        Appuser = appuser,
                        Customer = customer
                    });
                }
                await dataManager.SaveChanges();
                dataManager.CommitTransaction();
                return Ok();
            } catch (Exception e) {
                dataManager.RollbackTransaction();
                return BadRequest(e);
            }
        }

        [ClaimRequirement(MyClaimTypes.Permission, "appuser")]
        [HttpGet("Detail/{id}")]
        public async Task<ActionResult<UserDetailViewModel>> Details(int id) {
            var appuser = await appuserDAL.GetAppuserAsync(id);
            
            if (appuser == null) {
                return BadRequest();
            }

            var linkedCustomers = await customerDAL.GetAllCustomersOfUserAsync(id);

            UserDetailViewModel userDetailViewModel = new UserDetailViewModel(linkedCustomers) {
                Id = id,
                Username = appuser.Username
            };
            return userDetailViewModel;
        }

        [ClaimRequirement(MyClaimTypes.Permission, "appuser-update")]
        [HttpGet("UpdateUser/{id}")]
        public async Task<ActionResult<UpdateUserViewModel>> UpdateUser(int id) {
            int loggedInAppuserId = customAuthenticationService.GetAppuserId(User);
            try {
                var appuser = await appuserDAL.GetAppuserAsync(id, true);
                
                if (appuser == null) {
                    return BadRequest();
                }

                var possibleCustomers = await customerDAL.GetAllCustomersOfUserAsync(loggedInAppuserId);

                UpdateUserViewModel updateUserViewModel = new UpdateUserViewModel(possibleCustomers) {
                    Id = appuser.Id,
                    Username = appuser.Username,
                    CurrentLinkedCustomerIds = appuser.CustomerLink.ConvertAll(cl => cl.CustomerId)
                };
                return updateUserViewModel;
            } catch (Exception e) {
                return BadRequest(e);
            }
        }

        [ClaimRequirement(MyClaimTypes.Permission, "appuser-update")]
        [HttpPut("UpdateUser/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody]UpdateUserRequest user) {

            try {
                await dataManager.BeginTransaction();
                var appuser = await appuserDAL.GetAppuserAsync(id, true);
                
                if(appuser == null) {
                    return BadRequest();
                }

                if(!string.IsNullOrEmpty(user.Password)) {
                    appuser.Password = Crypto.HashPassword(user.Password);
                }

                appuser.CustomerLink = new List<AppuserCustomer>();

                if (user.CustomerIds == null || user.CustomerIds.Count == 0) {
                    return BadRequest();
                }
                
                var customers = await customerDAL.GetCustomersAsync(user.CustomerIds);
                
                if (customers == null || customers.Count == 0) {
                    return BadRequest();
                }
                await appuserDAL.AddAsync(appuser);
                
                appuser.CustomerLink = new List<AppuserCustomer>();
                foreach (var customer in customers) {
                    appuser.CustomerLink.Add(new AppuserCustomer() {
                        Appuser = appuser,
                        Customer = customer
                    });
                }
                await dataManager.SaveChanges();
                dataManager.CommitTransaction();
                return Ok();
            } catch (Exception e) {
                dataManager.RollbackTransaction();
                return BadRequest(e);
            }
        }
    }
}
