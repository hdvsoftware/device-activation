using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;

namespace Activation.API.Security {
    public class CustomAuthenticationOptions : AuthenticationSchemeOptions {
        public string Realm { get; set; }
        public ClaimsIdentity Identity { get; set; }
    }
}
