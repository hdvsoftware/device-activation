using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Activation.API.Middleware;
using Activation.API.Security;
using Activation.API.Services;
using Activation.API.Utils;
using Activation.Shared;
using System;

namespace Activation.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
                options.AddPolicy("MyAllowedOrigins",
                    builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    }
                )
            );
            //services.AddCors();
            services.AddMvc()
                .AddJsonOptions(options => {
                    //options.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });

        var openApiInfo = new Microsoft.OpenApi.Models.OpenApiInfo()
            {
                Title = "Device Activation API",
                Version = "v1"
            };

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", openApiInfo);
                c.AddSecurityDefinition(CustomAuthenticationDefaults.AuthenticationScheme, new OpenApiSecurityScheme
                {
                    Description = "Custom Authorization header using the Bearer scheme (Example: 'Authorization 12345abcdef')",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer"
                });
            });

            services.AddAuthentication(CustomAuthenticationDefaults.AuthenticationScheme).AddCustomAuthentication(CustomAuthenticationDefaults.AuthenticationScheme, "Custom authentication scheme", o => { });

            //string connectionString = "Host=localhost;Database=dummy;Username=dummy;Password=dummy";
            //services.ConfigureDbContext(options => options.UseNpgsql(connectionString));


            var databaseConnectionString = Configuration["DatabaseConnectionString"];
            //databaseConnectionString = "Server=localhost;Port=5432;Database=dummy;User Id=dummy;Password=dummy";
            services.ConfigureDbContext(options => options.UseNpgsql(databaseConnectionString)) ;

            //services.AddDbContext<PortalDbContext>(options => options.UseNpgsql(connectionString));
            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            
            services.Configure<AppSettings>(appSettingsSection);


            //services.AddScoped<IUserService, UserService>();
            //services.AddScoped<IDataManager, DataManager>();
            //services.AddScoped<IAppsessionDAL, AppsessionDAL>();
            //services.AddScoped<IAppuserDAL, AppuserDAL>();
            //services.AddScoped<ICustomerDAL, CustomerDAL>();
            //services.AddScoped<IDeviceDAL, DeviceDAL>();
            // configure DI for application services
            services.AddScoped<ICustomAuthenticationService, CustomAuthenticationService>();
            //services.AddTransient<ICustomAuthenticationService, CustomAuthenticationService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                
            }
            else
            {
                app.UseHsts();
            }

            app.UseSwagger();
            //https://curamlocal.yucat.com/Activation/API/swagger/v1/swagger.json
            app.UseSwaggerUI(c =>
            {
                //c.SwaggerEndpoint("/activation/api/swagger/v1/swagger.json", "My API V1");
                c.SwaggerEndpoint("v1/swagger.json", "My API V1");
                //c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
            

            //app.UseHttpsRedirection();

            app.UseRouting();

            //global cors policy
            app.UseCors("MyAllowedOrigins");

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCustomAuthenticationMiddleware();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            //app.UseMvc();
        }
    }
}
