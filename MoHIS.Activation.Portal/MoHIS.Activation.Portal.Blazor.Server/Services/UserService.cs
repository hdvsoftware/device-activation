using MoHIS.Activation.Shared;
using MoHIS.Activation.Shared.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace MoHIS.Activation.Portal.Blazor.Server.Services {
    public interface IUserService {
        //Appuser Authenticate(string username, string password);
        string Authenticate(string username, string password);
        int GetAppuserId(ClaimsPrincipal claimsPrincipal);
    }

    public class UserService : IUserService {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<Appuser> _users = new List<Appuser>
        {
            new Appuser {
                Id = 1,
                Username = "test",
                Password = "test",
                Created = DateTime.Now,
                Modified = DateTime.Now
            }
        };

        private readonly IJwtTokenService jwtTokenService;
        private readonly PortalDbContext PortalDbContext;

        public UserService(IJwtTokenService jwtTokenService, PortalDbContext portalDbContext) {
            this.jwtTokenService = jwtTokenService;
            this.PortalDbContext = portalDbContext;
        }

        public string Authenticate(string username, string password) {
            var user = PortalDbContext.Appusers.SingleOrDefault(x => x.Username == username && x.Password == password);

            // return null if user not found
            if (user == null) {
                return null;
            }

            return jwtTokenService.BuildToken($"{user.Id}");
        }

        public int GetAppuserId(ClaimsPrincipal claimsPrincipal) {
            //var identifier = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var identifier = claimsPrincipal.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(identifier)) {
                throw new Exception("invalid token?");
            }
            //var identifier = claimsPrincipal.Identity.Name;
            int appuser_id = int.Parse(identifier);
            return appuser_id;
        }

    }
}