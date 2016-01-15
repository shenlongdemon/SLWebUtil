using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using SL.Repository;
namespace SL.Repository
{
    public abstract class DbContextRepository<C, T> :
        IGenericRepository<T> where T : class where C : DbContext, new()
    {
        private C _dbContext = new C();
        public C DbContext
        {

            get { return _dbContext; }
            set { _dbContext = value; }
        }
        public virtual void Insert(T entity)
        {
            _dbContext.Set<T>().Add(entity);
        }

        public virtual IQueryable<T> All()
        {
            IQueryable<T> query = _dbContext.Set<T>().AsQueryable<T>();
            return query;
        }

        public virtual void Delete(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
        }


        
        public virtual void Update(T entity)
        {
            _dbContext.Entry<T>(entity).State = EntityState.Modified;
        }

        public virtual void Save()
        {
            _dbContext.SaveChanges();
        }

        public virtual IQueryable<T> Where(Expression<Func<T, bool>> predicate)
        {
            IQueryable<T> query = All().Where(predicate).AsNoTracking<T>().AsQueryable<T>();
            return query;
        }
    }
}
