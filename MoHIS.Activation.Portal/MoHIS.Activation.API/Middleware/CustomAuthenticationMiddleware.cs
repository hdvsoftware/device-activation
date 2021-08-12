using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using MoHIS.Activation.API.Security;
using MoHIS.Activation.API.Services;
using MoHIS.Activation.Shared;

namespace MoHIS.Activation.API.Middleware {
    public class CustomAuthenticationMiddleware {
        private readonly RequestDelegate next;

        public CustomAuthenticationMiddleware(RequestDelegate next) {
            this.next = next;
        }

        public async Task Invoke(HttpContext context, ICustomAuthenticationService customAuthenticationService) {
            // Do something with context near the beginning of request processing.

            if (context.Request.Headers.ContainsKey("Authorization") && 
                AuthenticationHeaderValue.TryParse(context.Request.Headers["Authorization"], out AuthenticationHeaderValue headerValue) &&
                CustomAuthenticationDefaults.AuthenticationScheme.Equals(headerValue.Scheme, StringComparison.OrdinalIgnoreCase)) 
            {
                string publicToken = headerValue.Parameter;
                if (publicToken != null) {
                    publicToken = await customAuthenticationService.UpdateSession(publicToken);
                }
            }  

            //misschien niet teruggeven in header van response?
            //if (context.Response.Headers.ContainsKey("Authorization")) {
            //    context.Response.Headers["Authorization"] = $"{CustomAuthenticationDefaults.AuthenticationScheme} {publicToken}";
            //} else {
            //    context.Response.Headers.Add("Authorization", $"{CustomAuthenticationDefaults.AuthenticationScheme} {publicToken}");
            //}

            await next.Invoke(context);

            // Clean up.
        }
    }

    public static class CustomAuthenticationMiddlewareExtensions {
        public static IApplicationBuilder UseCustomAuthenticationMiddleware(this IApplicationBuilder builder) {
            return builder.UseMiddleware<CustomAuthenticationMiddleware>();
        }
    }
}
