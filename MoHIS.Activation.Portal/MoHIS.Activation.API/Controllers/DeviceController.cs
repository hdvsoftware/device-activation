using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoHIS.Activation.API.Security.Authorization;
using MoHIS.Activation.API.Services;
using MoHIS.Activation.Shared;
using MoHIS.Activation.Shared.Data;
using MoHIS.Activation.Shared.DataAccess;
using MoHIS.Activation.Shared.Models;

namespace MoHIS.Activation.API.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly ICustomAuthenticationService customAuthenticationService;
        private readonly IDataManager dataManager;
        private readonly IDeviceDAL deviceDAL;
        private readonly ICustomerDAL customerDAL;
        public DeviceController(ICustomAuthenticationService customAuthenticationService, IDataManager dataManager, IDeviceDAL deviceDAL, ICustomerDAL customerDAL) {
            this.customAuthenticationService = customAuthenticationService;
            this.dataManager = dataManager;
            this.deviceDAL = deviceDAL;
            this.customerDAL = customerDAL;
        }

        
        [HttpGet("detail/{id}")]
        public async Task<ActionResult<DeviceDetailViewModel>> DetailAsync(int id) {
            int loggedInAppuserId = customAuthenticationService.GetAppuserId(User);

            var device = await deviceDAL.Get(id);
            if(device == null) {
                return new NotFoundResult();
            }
            var customer = await customerDAL.GetCustomerOfUserAsync(device.CustomerId, loggedInAppuserId);
            return DeviceDetailViewModel.ConvertFromDataModel(device, customer.Name);
        }

        [ClaimRequirement(MyClaimTypes.Permission, "device-add")]
        [HttpPost("AddDevice")]
        public async Task<IActionResult> AddDeviceAsync([FromBody]AddDeviceRequest addDevice) {
            int loggedInAppuserId = customAuthenticationService.GetAppuserId(User);
            Device device = new Device() {
                UUID = addDevice.UUID,
                Description = addDevice.Description,
                CustomerId = addDevice.CustomerId,
                Created = DateTime.Now,
                Modified = DateTime.Now
            };

            try {
                var customer = await customerDAL.GetCustomerOfUserAsync(device.CustomerId, loggedInAppuserId);
                var count = deviceDAL.GetDeviceCountForCustomer(addDevice.CustomerId);

                await deviceDAL.AddAsync(device);
                await dataManager.SaveChanges();
            } catch {
                throw;
            }
            return Ok();
        }

        [ClaimRequirement(MyClaimTypes.Permission, "device-update")]
        [HttpGet("UpdateDevice/{id}")]
        public async Task<ActionResult<UpdateDeviceViewModel>> UpdateDeviceAsync(int id) {
            int loggedInAppuserId = customAuthenticationService.GetAppuserId(User);
            var d = await deviceDAL.Get(id);
            if (d == null) {
                return BadRequest();
            }

            var linkedCustomers = await customerDAL.GetAllCustomersOfUserAsync(loggedInAppuserId);

            UpdateDeviceViewModel updateDeviceViewModel = new UpdateDeviceViewModel(linkedCustomers) {
                Id = d.Id,
                CustomerId = d.CustomerId,
                UUID = d.UUID,
                Description = d.Description,
            };
            return updateDeviceViewModel;
        }

        [ClaimRequirement(MyClaimTypes.Permission, "device-update")]
        [HttpPut("UpdateDevice/{id}")]
        public async Task<IActionResult> UpdateDeviceAsync([FromRoute]int id, [FromBody]UpdateDeviceRequest updateDevice) {

            var d = await deviceDAL.Get(id);
            if (d == null) {
                return BadRequest();
            }
            d.UUID = updateDevice.UUID;
            d.Description = updateDevice.Description;
            d.CustomerId = updateDevice.CustomerId;
            d.Modified = DateTime.Now;

            deviceDAL.Update(d);
            await dataManager.SaveChanges();

            return Ok();
        }

        [HttpGet("GetDevice/{uuid}")]
        public async Task<Device> GetDevice([NotNull] string uuid) {
            return await deviceDAL.Get(uuid);
        }

        [HttpGet("GetDevicesByEnvironment/{environmentId}")]
        public IEnumerable<Device> GetDevices(int environmentId) {
            return deviceDAL.GetDevicesForCustomer(environmentId);
        }

        [AllowAnonymous]
        [HttpGet("GetDeviceActivation/{uuid}")]
        public async Task<Device> GetDeviceActivation([NotNull] string uuid) {
            var device = await deviceDAL.Get(uuid);

            if (device != null) {
                device.LastConnection = DateTime.Now;
                deviceDAL.Update(device);
                await dataManager.SaveChanges();
            }
            return device;
        }

    }
}
