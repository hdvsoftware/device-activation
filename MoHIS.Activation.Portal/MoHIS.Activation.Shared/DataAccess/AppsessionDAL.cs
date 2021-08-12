using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MoHIS.Activation.Shared.Data;

namespace MoHIS.Activation.Shared.DataAccess {
    public interface IAppsessionDAL {
        Task<Appsession> Get(string token);
        Task AddAsync(Appsession appsession);
        void Update(Appsession appsession);
        void Remove(Appsession appsession);
    }

    public class AppsessionDAL : IAppsessionDAL {

        private readonly PortalDbContext portalDbContext;
        public AppsessionDAL(PortalDbContext portalDbContext) {
            this.portalDbContext = portalDbContext;
        }

        public async Task AddAsync(Appsession appsession) {
            await portalDbContext.Sessions.AddAsync(appsession);
        }

        public async Task<Appsession> Get(string token) {
            var session = await portalDbContext.Sessions.FirstOrDefaultAsync(x => x.Token == token && !x.Deleted.HasValue);
            return session;
        }

        public void Remove(Appsession appsession) {
            portalDbContext.Sessions.Remove(appsession);
            //or
            //appsession.Deleted = DateTime.Now;
            //portalDbContext.Sessions.Update(appsession);
        }

        public void Update(Appsession appsession) {
            portalDbContext.Sessions.Update(appsession);
        }
    }
}
