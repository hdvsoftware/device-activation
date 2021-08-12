using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoHIS.Activation.Portal.Blazor.Server.Services;
using MoHIS.Activation.Shared;
using MoHIS.Activation.Shared.Models;

namespace MoHIS.Activation.Portal.Blazor.Server.Controllers {
    [Authorize]
    [Route("[controller]")]
    public class UserController : ControllerBase {
        private readonly IUserService userService;
        private readonly PortalDbContext portalDbContext;
        public UserController(PortalDbContext portalDbContext, IUserService userService) {
            this.portalDbContext = portalDbContext;
            this.userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody]LoginRequest loginRequest) {
            //var token = userService.Authenticate(loginRequest.Username, loginRequest.Password);
            var token = userService.Authenticate(loginRequest.username, loginRequest.password);
            if (token == null) {
                return BadRequest(new { message = "Username or password is incorrect" });
            }
            return Ok(new LoginResponse() {
                Succes = true,
                Token = token
            });

        }
    }
}
