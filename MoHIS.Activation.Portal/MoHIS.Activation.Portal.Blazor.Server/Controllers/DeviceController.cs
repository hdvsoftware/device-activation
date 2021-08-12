using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MoHIS.Activation.Portal.Blazor.Server.Services;
using MoHIS.Activation.Shared;
using MoHIS.Activation.Shared.Data;
using MoHIS.Activation.Shared.Models;

namespace MoHIS.Activation.Portal.Blazor.Server.Controllers {
    [Authorize]
    [Route("[controller]")]
    public class DeviceController : ControllerBase {
        private readonly IUserService userService;
        private readonly PortalDbContext portalDbContext;

        public DeviceController(PortalDbContext portalDbContext, IUserService userService) {
            this.portalDbContext = portalDbContext;
            this.userService = userService;
        }

        [HttpPost("adddevice")]
        public async void AddDeviceAsync(Device device) {
            await portalDbContext.Devices.AddAsync(device);
        }

        [HttpPut("updatedevice/{id}")]
        public async void UpdateDeviceAsync(int id, Device device) {
            Device d = await portalDbContext.Devices.FindAsync(id);
            if (d == null) {
                //badrequest
                throw new Exception();
            }
            device.Modified = DateTime.Now;
            portalDbContext.Devices.Update(device);

        }

        [HttpGet("getdevice/{uuid}")]
        public Device GetDevice(string uuid) {
            return portalDbContext.Devices.First(d => string.Compare(d.UUID, uuid, true) == 0);
        }

        [HttpGet("getdevicesbyenvironment/{environmentId}")]
        public IEnumerable<Device> GetDevices(int environmentId) {
            return portalDbContext.Devices.Where(d => d.CustomerId == environmentId);
        }

        [AllowAnonymous]
        [HttpGet("getdeviceactivation/{uuid}")]
        public Device GetDeviceActivation(string uuid) {
            return portalDbContext.Devices.First(d => string.Compare(d.UUID, uuid, true) == 0);
        }

    }
}
