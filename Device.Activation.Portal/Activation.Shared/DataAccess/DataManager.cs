using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace Activation.Shared.DataAccess {

    public interface IDataManager {
        Task BeginTransaction();
        void CommitTransaction();
        void RollbackTransaction();
        Task SaveChanges();
    }

    public class DataManager : IDataManager {
        private readonly PortalDbContext PortalDbContext;
        public DataManager(PortalDbContext PortalDbContext) {
            this.PortalDbContext = PortalDbContext;
        }

        public async Task BeginTransaction() {
            await PortalDbContext.Database.BeginTransactionAsync();
        }

        public void CommitTransaction() {
            PortalDbContext.Database.CommitTransaction();
        }

        public void RollbackTransaction() {
            PortalDbContext.Database.RollbackTransaction();
        }

        public async Task SaveChanges() {
            await PortalDbContext.SaveChangesAsync();
            //throw new NotImplementedException();
        }

        
    }
}
