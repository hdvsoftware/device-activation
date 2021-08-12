using Microsoft.AspNetCore.Blazor.Browser.Services;
using Microsoft.AspNetCore.Blazor.Hosting;
using Microsoft.Extensions.DependencyInjection;
using MoHIS.Activation.Portal.Blazor.Client.DataAccess;

namespace MoHIS.Activation.Portal.Blazor.Client {
    public class Program {
        public static void Main(string[] args) {
            
            //var serviceProvider = new BrowserServiceProvider(configure => {
            //    configure.Add(ServiceDescriptor.Singleton<ApiClient, ApiClient>());
            //});

            CreateHostBuilder(args).Build().Run();
        }

        public static IWebAssemblyHostBuilder CreateHostBuilder(string[] args) =>
            BlazorWebAssemblyHost.CreateDefaultBuilder()
                .UseBlazorStartup<Startup>();
    }
}
