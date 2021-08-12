using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MoHIS.Activation.Shared.Data;

namespace MoHIS.Activation.Shared.DataAccess {
    public interface IDeviceDAL {
        Task<Device> Get(int deviceId);
        Task<Device> Get(string uuid);
        Task AddAsync(Device device);
        void Update(Device device);
        void Remove(Device device);

        IEnumerable<Device> GetDevicesForCustomer(int customerId);
        int GetDeviceCountForCustomer(int customerId);
    }
    public class DeviceDAL : IDeviceDAL {

        private readonly PortalDbContext portalDbContext;
        public DeviceDAL(PortalDbContext portalDbContext) {
            this.portalDbContext = portalDbContext;
        }

        public async Task AddAsync(Device device) {
            await portalDbContext.Devices.AddAsync(device);
        }

        public async Task<Device> Get(int deviceId) {
            return await portalDbContext.Devices.FindAsync(deviceId);
        }

        public async Task<Device> Get(string uuid) {
            return await portalDbContext.Devices.FirstAsync(d => d.UUID == uuid);
        }

        public int GetDeviceCountForCustomer(int customerId) {
            return portalDbContext.Devices.Count(d => d.CustomerId == customerId);
        }

        public IEnumerable<Device> GetDevicesForCustomer(int customerId) {
            return portalDbContext.Devices.Where(d => d.CustomerId == customerId);
        }

        public void Remove(Device device) {
            portalDbContext.Devices.Remove(device);
            //or the following (but update the get function aswell to include the deleted predicate)
            //device.Deleted = DateTime.Now;
            //portalDbContext.Devices.Update(device);
        }

        public void Update(Device device) {
            portalDbContext.Devices.Update(device);
        }
    }
}
