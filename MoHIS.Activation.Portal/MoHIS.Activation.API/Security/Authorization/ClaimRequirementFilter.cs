using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MoHIS.Activation.API.Security.Authorization {
    public class ClaimRequirementFilter : IAuthorizationFilter {

        readonly Claim _claim;

        public ClaimRequirementFilter(Claim claim) {
            _claim = claim;
        }

        public void OnAuthorization(AuthorizationFilterContext context) {
            var hasClaim = context.HttpContext.User.Claims.Any(c => c.Type == _claim.Type && c.Value == _claim.Value);
            if (!hasClaim) {
                context.Result = new ForbidResult();
            }
        }
    }
}
