using System;
using System.Data.Entity.Migrations;
using PIM.Data.Users;
using PIM.Data.MasterData;
using PIM.Data.Integrations;
using PIM.Data.Enums;

namespace PIM.Data.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<PIMContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(PIMContext context)
        {
            /*
            var role = new[]{
           new Role{Id=1,Name="Administrator",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=2,Name="Aggregation Admin",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=3,Name="ANZ - Marketing Steward",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=4,Name="ANZ - Part Create",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=5,Name="ANZ - Pricing",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=6,Name="ANZ - Product Manager",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=7,Name="ANZ - Supply Chain/FG",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=8,Name="ANZ - VMS",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=9,Name="Controller - BZL",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=10,Name="Customer Service - BZL",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=11,Name="Digital Marketing - BZL",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=12,Name="GS1 Admin",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=13,Name="Industrial Process - BZL",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=14,Name="ItemUpdateEnable",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=15,Name="Logistic - BZL",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=16,Name="Marketing Channel - BZL",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=17,Name="Marketing Manager - BZL",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=18,Name="Marketing Price - BZL",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=19,Name="Marketing Steward",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=20,Name="MIS",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=21,Name="PIM Admin - BZL",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=22,Name="Planning - BZL",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=23,Name="Product Manager",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=24,Name="ReadOnly",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=25,Name="SAP Master Data - BZL",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=26,Name="Supply Chain/FG",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=27,Name="Syndication Admin",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=28,Name="SystemAdmin",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=29,Name="Translation Admin",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=30,Name="VMS",CreatedBy=1,CreatedDate=DateTime.Now},
           new Role{Id=31,Name="Workflow Marshal",CreatedBy=1,CreatedDate=DateTime.Now},

           };

           context.Roles.AddOrUpdate(c => new { c.Name,c.CreatedBy,c.CreatedDate }, role);

           var Language = new[]
          {
              new Language {Id = 1,Name  ="en"},
              new Language {Id = 2, Name = "fr"},
              new Language {Id = 3, Name = "pt"} 
          };

          context.Languages.AddOrUpdate(c => new { c.Name }, Language);

          var user = new[]
          {
              new User {Id = 1, Username = "S3135114", Firstname = "sourabh", Lastname = "Padwad",Email = "sourabh.padwad@saint-gobain.com",Disabled =false,Active = true,LanguageId=1,Password="b6bc7b58510319a151d168ba3d5aecb3ac0a9708d06dd930f37fbc89b6cdc697"}
          };

          context.Users.AddOrUpdate(c => new {  c.Username, c.Firstname, c.Lastname, c.Email, c.Active,c.Disabled }, user);



           var userRights = new[]
           {
              new UserRights {RoleId=1,UserId=1,CreatedBy=1,CreatedDate=DateTime.Now }

          };

          context.UserRights.AddOrUpdate(c => new { c.RoleId, c.UserId, c.CreatedBy, c.CreatedDate }, userRights);


          

            var orgs = new[] {
               new Organization { Id = 1, ShortName = "Saint-Gobain", LongName = "Saint-Gobain",ParentId=0,CreatedBy=1,CreatedDate=DateTime.Now }
           };

           context.Organizations.AddOrUpdate(c => new { c.Id, c.ShortName, c.LongName,c.ParentId,c.CreatedBy,c.CreatedDate }, orgs);



           var userpref = new[] {
           new UserPreferences {DataLocal=1,TimeZone="",CatalogId=null, RoleId=1,Taxonomy=null,UserId=1,OrganizationId=1,CreatedBy=1,CreatedDate=DateTime.Now},

           };

           context.UserPreferences.AddOrUpdate(c => new { c.DataLocal, c.TimeZone,c.CatalogId,c.RoleId,c.Taxonomy,c.OrganizationId }, userpref);
          

            var dataType = new[] {
                new DataType { Id=1,Name="Date"},
                new DataType { Id=2,Name="String"},
                new DataType { Id=3,Name="Decimal"},
                new DataType { Id=4,Name="Boolean"},
                new DataType { Id=5,Name="Image"},
                new DataType { Id=7,Name="Integer"},
                new DataType { Id=8,Name="File"},
                new DataType { Id=10,Name="Fraction"},
                new DataType { Id=12,Name="URL"},
                new DataType { Id=13,Name="ImageURL"},
                new DataType { Id=14,Name="DateTime"},
                new DataType { Id=15,Name="Hierarchical"}
            };

            context.DataTypes.AddOrUpdate(dt => new { dt.Id, dt.Name }, dataType);

            var displayType = new[] {
                new DisplayType { Id=1,Name="Date",DataTypeId=1},
                new DisplayType { Id=3,Name="TextBox",DataTypeId=2},
                new DisplayType { Id=8,Name="TextArea",DataTypeId=2},
                new DisplayType { Id=4,Name="NumericTextBox",DataTypeId=3},
                new DisplayType { Id=7,Name="CheckBox",DataTypeId=4},
                new DisplayType { Id=9,Name="DropDown",DataTypeId=4},
                new DisplayType { Id=2,Name="Image",DataTypeId=5},
                new DisplayType { Id=10,Name="File",DataTypeId=5},
                new DisplayType { Id=4,Name="NumericTextBox",DataTypeId=7},
                new DisplayType { Id=2,Name="Image",DataTypeId=8},
                new DisplayType { Id=10,Name="File",DataTypeId=8},
                new DisplayType { Id=3,Name="TextBox",DataTypeId=10},
                new DisplayType { Id=12,Name="URL",DataTypeId=12},
                new DisplayType { Id=9,Name="DropDown",DataTypeId=2},
                new DisplayType { Id=18,Name="LookupTable",DataTypeId=2},
                new DisplayType { Id=19,Name="ImageURL",DataTypeId=13},
                new DisplayType { Id=21,Name="FileBrowser",DataTypeId=8},
                new DisplayType { Id=21,Name="FileBrowser",DataTypeId=5},
                new DisplayType { Id=22,Name="DateTime",DataTypeId=14},
                new DisplayType { Id=3,Name="TextBox",DataTypeId=15}
            };


            context.DisplayTypes.AddOrUpdate(dt => new { dt.Id, dt.Name, dt.DataTypeId }, displayType);
            

            var attrtype = new[] {
               new AttributeType { Id=1,ShortName="Common",LongName="Common",CreatedBy=1,CreatedDate=DateTime.Now},
               new AttributeType { Id=2,ShortName="Technical",LongName="Technical",CreatedBy=1,CreatedDate=DateTime.Now},
            };

            context.AttributeTypes.AddOrUpdate(ag => new { ag.Id, ag.ShortName, ag.LongName,ag.CreatedBy,ag.CreatedDate }, attrtype);

             
            

            var action = new[] {
               new Actions { Id=1,Name="Approve" },
               new Actions { Id=2,Name="Reject"},
               new Actions { Id=3,Name="Done"},
            };

            context.Actions.AddOrUpdate(a => new { a.Id, a.Name}, action);
           

            foreach (IntegrationStatusEnum status in Enum.GetValues(typeof(IntegrationStatusEnum)))
                context.IntegrationStatus.AddOrUpdate(x => x.Id, new IntegrationStatus
                {
                    Id = (int)status,
                    Name = status.ToString()
                });
                 

            foreach (EnumJobType type in Enum.GetValues(typeof(EnumJobType)))
                context.JobTypes.AddOrUpdate(x => x.Id, new JobType
                {
                    Id = (int)type,
                    Name = type.ToString()
                });

            foreach (EnumMessageType type in Enum.GetValues(typeof(EnumMessageType)))
                context.MessageTypes.AddOrUpdate(x => x.Id, new MessageType
                {
                    Id = (int)type,
                    Name = type.ToString()
                });
                */
        }
    }
}