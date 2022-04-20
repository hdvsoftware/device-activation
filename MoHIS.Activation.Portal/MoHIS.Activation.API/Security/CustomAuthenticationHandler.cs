using System;
using System.Linq;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Activation.API.Services;
using Activation.Shared.DataAccess;
using Activation.API.Security.Authorization;

namespace Activation.API.Security {
    public class CustomAuthenticationHandler : AuthenticationHandler<CustomAuthenticationOptions> {

        private readonly ICustomAuthenticationService customAuthenticationService;
        private readonly IAppuserDAL appuserDAL;

        public CustomAuthenticationHandler(
            IOptionsMonitor<CustomAuthenticationOptions> options, 
            ILoggerFactory logger, 
            UrlEncoder encoder, 
            ISystemClock clock,
            ICustomAuthenticationService customAuthenticationService,
            IAppuserDAL appuserDAL
            ) : base(options, logger, encoder, clock) {
            this.customAuthenticationService = customAuthenticationService;
            this.appuserDAL = appuserDAL;
        }


        protected async override Task<AuthenticateResult> HandleAuthenticateAsync() {
            if (!Request.Headers.ContainsKey("Authorization")) {
                //Authorization header not in request
                return AuthenticateResult.NoResult();
                //return Task.FromResult(AuthenticateResult.NoResult());
            }

            if (!AuthenticationHeaderValue.TryParse(Request.Headers["Authorization"], out AuthenticationHeaderValue headerValue)) {
                //Invalid Authorization header
                return AuthenticateResult.NoResult();
                //return Task.FromResult(AuthenticateResult.NoResult());
            }

            if (!CustomAuthenticationDefaults.AuthenticationScheme.Equals(headerValue.Scheme, StringComparison.OrdinalIgnoreCase)) {
                //Authentication header does not match scheme
                return AuthenticateResult.NoResult();
                //return Task.FromResult(AuthenticateResult.NoResult());
            }

            string publicToken = headerValue.Parameter;

            if(string.IsNullOrWhiteSpace(publicToken)) {
                return AuthenticateResult.Fail("Invalid authentication header");
                //return Task.FromResult(AuthenticateResult.Fail("Invalid authentication header"));
            }

            var session = await customAuthenticationService.GetSession(publicToken);

            if (session == null) {
                return AuthenticateResult.Fail("Invalid authentication header");
                //return Task.FromResult(AuthenticateResult.Fail("Invalid authentication header"));
            }

            if (DateTime.Now > session.ValidUntil) {
                return AuthenticateResult.Fail("Session expired");
                //return Task.FromResult(AuthenticateResult.Fail("Session expired"));
            }

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, $"{session.AppuserId}"));

            var rules = await appuserDAL.GetRulesForUserAsync(session.AppuserId);
            
            claims.AddRange(
                rules.ToList().ConvertAll(item => new Claim(MyClaimTypes.Permission, item))
            );
            //ClaimTypes.NameIdentifier
            //var claims = new[] { new Claim(ClaimTypes.NameIdentifier, $"{session.AppuserId}") };

            //var claims = new[] { new Claim(ClaimTypes.Email, $"{session.AppuserId}") };
            var identity = new ClaimsIdentity(claims, Scheme.Name);
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, Scheme.Name);
            return AuthenticateResult.Success(ticket);
            //return Task.FromResult(AuthenticateResult.Success(ticket));
        }

        protected override async Task HandleChallengeAsync(AuthenticationProperties properties) {
            Response.Headers["WWW-Authenticate"] = $"Basic realm=\"{Options.Realm}\", charset=\"UTF-8\"";
            await base.HandleChallengeAsync(properties);
        }
    }
}
