using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MoHIS.Activation.Shared.DataAccess;

namespace MoHIS.Activation.Shared {
    public static class PortalDbContextExtensions {
        public static void ConfigureDbContext(this IServiceCollection services, Action<DbContextOptionsBuilder> optionsAction = null) {
            services.AddDbContext<PortalDbContext>(optionsAction);
            services.AddScoped<IDataManager, DataManager>();
            services.AddScoped<IAppsessionDAL, AppsessionDAL>();
            services.AddScoped<IAppuserDAL, AppuserDAL>();
            services.AddScoped<ICustomerDAL, CustomerDAL>();
            services.AddScoped<IDeviceDAL, DeviceDAL>();
        }
    }
}
