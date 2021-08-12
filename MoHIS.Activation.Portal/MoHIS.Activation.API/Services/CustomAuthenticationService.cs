using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MoHIS.Activation.API.Security;
using MoHIS.Activation.Shared;
using MoHIS.Activation.Shared.Data;
using MoHIS.Activation.Shared.DataAccess;
using CryptoHelper;

namespace MoHIS.Activation.API.Services {

    public interface ICustomAuthenticationService {
        Task<string> AuthenticateAsync(string username, string password);
        Task<IEnumerable<string>> GetRulesForUser(string username);
        int GetAppuserIdFromPublicToken(string publicToken);
        int GetAppuserId(ClaimsPrincipal claimsPrincipal);

        Task<string> CreateSessionAsync(int appuserId);
        Task<Appsession> GetSession(string publicToken);
        Task<string> UpdateSession(string publicToken);
        Task<string> UpdateSession(Appsession session);
        Task DeleteSessionAsync(string publicToken);
        Task DeleteSessionAsync(Appsession session);
        
        
    }

    public class CustomAuthenticationService : ICustomAuthenticationService {
        private readonly IConfiguration Config;
        //private readonly PortalDbContext PortalDbContext;
        private readonly IDataManager dataManager;
        private readonly IAppuserDAL appuserDAL;
        private readonly IAppsessionDAL appsessionDAL;
        public CustomAuthenticationService(IConfiguration config, IDataManager dataManager, IAppuserDAL appuserDAL, IAppsessionDAL appsessionDAL) {
            //this.PortalDbContext = portalDbContext;
            this.Config = config;
            this.dataManager = dataManager;
            this.appuserDAL = appuserDAL;
            this.appsessionDAL = appsessionDAL;
        }


        public async Task<string> AuthenticateAsync(string username, string password) {
            var user = await appuserDAL.GetAppuserAsync(username);
            //if(!Crypto.VerifyHashedPassword(user.Password, password)) {
            //    return null;
            //}

            if (user.Password != password)
            {
                return null;
            }
            //var user = PortalDbContext.Appusers.SingleOrDefault(x => x.Username == username && x.Password == password && !x.Deleted.HasValue);

            // return null if user not found
            if (user == null) {
                return null;
            }
            return await CreateSessionAsync(user.Id);
        }

        public async Task<IEnumerable<string>> GetRulesForUser(string username) {
            return await appuserDAL.GetRulesForUserAsync(username);
            //var user = await PortalDbContext.Appusers
            //    .Include(a => a.RoleLink)
            //    .SingleAsync(x => x.Username == username && !x.Deleted.HasValue);

            //List<int> roleIds = user.RoleLink.ConvertAll(rl => rl.ApproleId);

            //var rules = await PortalDbContext.Rules
            //    .Where(e => e.ApproleApprule.Any(rrlink => roleIds.Contains(rrlink.ApproleId)))
            //    .ToListAsync();
            //return rules.Select(r => r.Name);

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="appuserId"></param>
        /// <returns>public session token</returns>
        public async Task<string> CreateSessionAsync(int appuserId) {
            Appsession appsession = new Appsession() {
                AppuserId = appuserId,
                Token = Guid.NewGuid().ToString(),
                ValidUntil = DateTime.Now.AddMinutes(15),
                Created = DateTime.Now,
                Modified = DateTime.Now
            };
            await appsessionDAL.AddAsync(appsession);
            //await PortalDbContext.Sessions.AddAsync(appsession);
            await dataManager.SaveChanges();
            //await PortalDbContext.SaveChangesAsync();
            return CreateBase64PublicToken(appuserId, appsession.Token);
        }

        
        public async Task<Appsession> GetSession(string publicToken) {
            (int appuserId, string token) = ParseBase64PublicToken(publicToken);
            var session = await appsessionDAL.Get(token);
            //var session = PortalDbContext.Sessions.SingleOrDefault(x => x.Token == token && !x.Deleted.HasValue);
            return session;
        }

        public async Task<string> UpdateSession(string publicToken) {
            var session = await GetSession(publicToken);
            return await UpdateSession(session);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="session"></param>
        /// <returns>new public session token</returns>
        public async Task<string> UpdateSession(Appsession session) {
            //session.Token = Guid.NewGuid().ToString();
            session.ValidUntil = DateTime.Now.AddMinutes(15);
            session.Modified = DateTime.Now;
            appsessionDAL.Update(session);
            //PortalDbContext.Sessions.Update(session);
            await dataManager.SaveChanges();
            //await PortalDbContext.SaveChangesAsync();
            return CreateBase64PublicToken(session.AppuserId, session.Token);
        }

        public async Task DeleteSessionAsync(string publicToken) {
            var session = await GetSession(publicToken);
            await DeleteSessionAsync(session);
        }

        public async Task DeleteSessionAsync(Appsession session) {
            appsessionDAL.Remove(session);
            //PortalDbContext.Sessions.Remove(session);
            await dataManager.SaveChanges();
            //await PortalDbContext.SaveChangesAsync();
        }

        public int GetAppuserIdFromPublicToken(string publicToken) {
            (int appuserId, string privateToken) = ParseBase64PublicToken(publicToken);
            return appuserId;
        }

        public int GetAppuserId(ClaimsPrincipal claimsPrincipal) {
            //var identifier = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //NameIdentifier
            var identifier = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //var identifier = claimsPrincipal.FindFirst(ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(identifier)) {
                throw new Exception("invalid token?");
            }
            //var identifier = claimsPrincipal.Identity.Name;
            int appuser_id = int.Parse(identifier);
            return appuser_id;
        }


        private string CreateBase64PublicToken(int appuserId, string privateToken) {
            return StringCipher.Encrypt($"{appuserId}:{privateToken}", Config["CUSTOMAUTH:Key"]);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="publicToken"></param>
        /// <returns>appuserId as int, privateToken as string</returns>
        private (int, string) ParseBase64PublicToken(string publicToken) {

            var notEncrypted = StringCipher.Decrypt(publicToken, Config["CUSTOMAUTH:Key"]);
            var values = notEncrypted.Split(":");
            if(values.Length != 2) {
                throw new Exception("Invalid public token");
            }
            int appuserId = int.Parse(values[0]);
            string privateToken = values[1];


            return (appuserId, privateToken);
        }




    }
}
