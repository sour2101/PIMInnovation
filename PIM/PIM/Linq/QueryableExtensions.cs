using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.Entity;
using System.Dynamic;
using System.Linq;
using System.Linq.Dynamic;

namespace PIM.API.Linq
{
    public static class QueryExtensions
    {
        public static PagedList<T> ToPagedList<T>(this IQueryable<T> superSet, int? pageNumber = null, int? pageSize = null, string sortBy = null, bool reverse = false, string orderBy = null)
        {
            var totalCount = superSet.Count();

            var size = pageSize ?? totalCount;

            var totalPages = size == 0 ? 1 : (int)Math.Ceiling((decimal)totalCount / size);

            var page = pageNumber ?? 1;

            if (totalPages > 0 && (page <= 0 || page > totalPages))
                throw new ArgumentOutOfRangeException();

            superSet = string.IsNullOrWhiteSpace(sortBy) ? superSet.OrderBy("Id ASC") : superSet.OrderBy(sortBy + " " + (reverse ? "DESC" : "ASC"));

            return new PagedList<T>
            {
                TotalCount = totalCount,
                TotalPages = totalPages,
                Entries = superSet.Skip((page - 1) * size)
                .Take(size)
                .ToList()
            };
        }

        public static System.Collections.IEnumerable DynamicSqlQuery(this Database database, string sql, Type type)
        {
            return database.SqlQuery(type, sql);
        }

        public static IEnumerable<dynamic> DynamicListFromSql(this Database database, string Sql, Dictionary<string, object> Params)
        {
            using (var cmd = database.Connection.CreateCommand())
            {
                cmd.CommandText = Sql;
                if (cmd.Connection.State != ConnectionState.Open) { cmd.Connection.Open(); }

                foreach (KeyValuePair<string, object> p in Params)
                {
                    DbParameter dbParameter = cmd.CreateParameter();
                    dbParameter.ParameterName = p.Key;
                    dbParameter.Value = p.Value;
                    cmd.Parameters.Add(dbParameter);
                }

                using (var dataReader = cmd.ExecuteReader())
                {
                    while (dataReader.Read())
                    {
                        var row = new ExpandoObject() as IDictionary<string, object>;
                        for (var fieldCount = 0; fieldCount < dataReader.FieldCount; fieldCount++)
                        {
                            row.Add(dataReader.GetName(fieldCount), dataReader[fieldCount]);
                        }
                        yield return row;
                    }
                }
            }
        }

    }
}
