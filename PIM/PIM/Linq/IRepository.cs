using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace PIM.API.Linq
{
    public interface IRepository
    {
        DbContext Context { get; }

        IQueryable<T> GetAll<T>() where T : class;

        IQueryable<T> FindBy<T>(Expression<Func<T, bool>> predicate) where T : class;

        T GetById<T>(int id) where T : class;

        void Add<T>(T entity) where T : class;

        void Update<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        bool Save();
    }
}
