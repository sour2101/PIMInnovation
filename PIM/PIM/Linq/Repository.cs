using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace PIM.API.Linq
{
    public class Repository : IRepository
    {
        public DbContext Context { get; }

        public Repository(DbContext context)
        {
            Context = context;
        }

        public IQueryable<T> GetAll<T>() where T : class
        {
            return Context.Set<T>();
        }

        public IQueryable<T> FindBy<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            return Context.Set<T>().Where(predicate);
        }

        public T GetById<T>(int id) where T : class
        {
            return Context.Set<T>().Find(id);
        }

        public void Add<T>(T entity) where T : class
        {
            Context.Entry(entity).State = EntityState.Added;
        }

        public void Update<T>(T entity) where T : class
        {
            Context.Entry(entity).State = EntityState.Modified;
        }

        public void Delete<T>(T entity) where T : class
        {
            Context.Entry(entity).State = EntityState.Deleted;
        }

        public bool Save()
        {
            return Context.SaveChanges() > 0;
        }
    }
}
