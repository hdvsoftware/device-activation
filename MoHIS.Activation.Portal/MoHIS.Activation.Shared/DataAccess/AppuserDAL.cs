using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MoHIS.Activation.Shared.Data;

namespace MoHIS.Activation.Shared.DataAccess {

    public interface IAppuserDAL {
        Task AddAsync(Appuser appuser);
        Task<Appuser> GetAppuserAsync(int id, bool includeCustomerLink = false);
        Task<Appuser> GetAppuserAsync(string username, bool includeCustomerLink = false);
        Task<IEnumerable<string>> GetRulesForUserAsync(int appuserId);
        Task<IEnumerable<string>> GetRulesForUserAsync(string username);

    }

    public class AppuserDAL : IAppuserDAL {

        private readonly PortalDbContext portalDbContext;
        public AppuserDAL(PortalDbContext portalDbContext) {
            this.portalDbContext = portalDbContext;
        }

        public async Task AddAsync(Appuser appuser) {
            await portalDbContext.Appusers.AddAsync(appuser);
        }

        public async Task<Appuser> GetAppuserAsync(int id, bool includeCustomerLink = false) {
            Appuser appuser = null;

            if (includeCustomerLink) {
                appuser = await portalDbContext.Appusers
                    .Include(a => a.CustomerLink)
                    .FirstAsync(a => a.Id == id);
            } else {
                appuser = await portalDbContext.Appusers
                    //.Include(a => a.CustomerLink)
                    .FirstAsync(a => a.Id == id);
            }
            return appuser;
        }

        public async Task<Appuser> GetAppuserAsync(string username, bool includeCustomerLink = false) {
            var user = await portalDbContext.Appusers.SingleOrDefaultAsync(x => x.Username == username && !x.Deleted.HasValue);
            return user;

        }

        public async Task<IEnumerable<string>> GetRulesForUserAsync(int appuserId) {
            var user = await portalDbContext.Appusers
                .Include(a => a.RoleLink)
                .SingleAsync(x => x.Id == appuserId && !x.Deleted.HasValue);
            return await GetRulesForUserAsync(user);
        }

        public async Task<IEnumerable<string>> GetRulesForUserAsync(string username) {
            var user = await portalDbContext.Appusers
                .Include(a => a.RoleLink)
                .SingleAsync(x => x.Username == username && !x.Deleted.HasValue);
            return await GetRulesForUserAsync(user);
            //List<int> roleIds = user.RoleLink.ConvertAll(rl => rl.ApproleId);

            //var rules = await portalDbContext.Rules
            //    .Where(e => e.ApproleApprule.Any(rrlink => roleIds.Contains(rrlink.ApproleId)))
            //    .ToListAsync();
            //return rules.Select(r => r.Name);
        }

        private async Task<IEnumerable<string>> GetRulesForUserAsync(Appuser user) {
            List<int> roleIds = user.RoleLink.ConvertAll(rl => rl.ApproleId);

            var rules = await portalDbContext.Rules
                .Where(e => e.ApproleApprule.Any(rrlink => roleIds.Contains(rrlink.ApproleId)))
                .ToListAsync();
            return rules.Select(r => r.Name);
        }
    }
}
