using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Activation.Shared.Data;

namespace Activation.Shared.DataAccess {
    public interface ICustomerDAL {
        Task<List<Customer>> GetAllCustomersOfUserAsync(int appuserId, bool includeDevices = false);
        Task<Customer> GetCustomerOfUserAsync(int customerId, int appuserId, bool includeDevices = false);
        Task<List<Customer>> GetCustomersAsync(List<int> customerIds);

        Task AddAsync(Customer customer);
        void Update(Customer customer);
    }

    public class CustomerDAL : ICustomerDAL {

        private readonly PortalDbContext portalDbContext;
        public CustomerDAL(PortalDbContext portalDbContext) {
            this.portalDbContext = portalDbContext;
        }

        public async Task AddAsync(Customer customer) {
            await portalDbContext.Customers.AddAsync(customer);
        }

        public async Task<List<Customer>> GetCustomersAsync(List<int> customerIds) {
            //var customers = portalDbContext.Customers.Where(c => customerIds.Contains(c.Id)).ToList();
            return await portalDbContext.Customers.Where(c => customerIds.Contains(c.Id)).ToListAsync();
        }

        public async Task<List<Customer>> GetAllCustomersOfUserAsync(int appuserId, bool includeDevices) {
            if(includeDevices) {
                return await portalDbContext.Customers
                .Include(e => e.Devices)
                .Where(e => e.AppuserLink.Any(link => link.AppuserId == appuserId))
                .ToListAsync();
            } else {
                return await portalDbContext.Customers.Where(c => c.AppuserLink.Any(al => al.AppuserId == appuserId)).ToListAsync();
            }            
        }

        public void Update(Customer customer) {
            portalDbContext.Customers.Update(customer);
        }

        public async Task<Customer> GetCustomerOfUserAsync(int customerId, int appuserId, bool includeDevices = false) {
            if(includeDevices) {
                return await portalDbContext.Customers
                .Include(e => e.Devices)
                .FirstAsync(e => e.AppuserLink.Any(link => link.AppuserId == appuserId) && e.Id == customerId);
            } else {
                return await portalDbContext.Customers
                .FirstAsync(e => e.AppuserLink.Any(link => link.AppuserId == appuserId) && e.Id == customerId);
            }
        }
    }
}
