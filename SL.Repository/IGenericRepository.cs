using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SL.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        IQueryable<T> All();
        IQueryable<T> Where(Expression<Func<T, bool>> predicate);
        void Insert(T entity);
        void Delete(T entity);
        void Update(T entity);
    }
}
