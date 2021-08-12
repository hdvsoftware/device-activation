using Microsoft.AspNetCore.Blazor.Builder;
using Microsoft.Extensions.DependencyInjection;

using MoHIS.Activation.Portal.Blazor.Client.DataAccess;



namespace MoHIS.Activation.Portal.Blazor.Client {
    public class Startup {
        public void ConfigureServices(IServiceCollection services) {
            services.AddSingleton<IApiClient, ApiClient>();
            services.AddSingleton<AppState>();

        }

        public void Configure(IBlazorApplicationBuilder app) {
            //app.UseAuthentication();
            app.AddComponent<App>("app");
        }
    }
}
