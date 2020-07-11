

namespace PIM.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    using Users;
    using MasterData;
    using Integrations;
    using Enums;
    using Attributes;
    using Organizations;

    internal sealed class Configuration : DbMigrationsConfiguration<PIMContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(PIMContext context)
        {
            /*var tax = new[] {
                new Taxonomy { Id = 1, Name = "Hierarchy", ParentId = null }
            };

            context.Taxonomies.AddOrUpdate(t => new { t.Id, t.Name, t.ParentId }, tax);
            var locale = new[] {
                  new Locale {Id=1,Code="en",Name="English" },
                  new Locale {Id=2,Code="fr",Name="France" },
                  new Locale {Id=3,Code="pt",Name="Portuguese" }
              };


            context.Locales.AddOrUpdate(l => new {l.Id, l.Code, l.Name }, locale);

            var role = new[]{
              new Role{Id=1,Name="Administrator",Active=true,CreatedBy="S3135114",CreatedDate=DateTime.Now},
              new Role{Id=2,Name="Viewer",CreatedBy="S3135114",Active=true,CreatedDate=DateTime.Now},
              };

            context.Roles.AddOrUpdate(c => new { c.Name, c.Active, c.CreatedBy, c.CreatedDate }, role);



            var user = new[]
            {
               new User {Id = 1, Username = "S3135114", Firstname = "sourabh", Lastname = "Padwad",Email = "sourabh.padwad@saint-gobain.com",Disabled =false,Active = true,OrganizationId=1,LanguageId=1,Password="b6bc7b58510319a151d168ba3d5aecb3ac0a9708d06dd930f37fbc89b6cdc697"},
               new User {Id = 2, Username = "S4769362", Firstname = "Shweta", Lastname = "Chavan",Email = "sourabh.padwad@saint-gobain.com",Disabled =false,Active = true,OrganizationId=1,LanguageId=1,Password="b6bc7b58510319a151d168ba3d5aecb3ac0a9708d06dd930f37fbc89b6cdc697"},
               new User {Id = 3, Username = "A5523296", Firstname = "Abhiraj", Lastname = "Mane",Email = "sourabh.padwad@saint-gobain.com",Disabled =false,Active = true,OrganizationId=1,LanguageId=1,Password="b6bc7b58510319a151d168ba3d5aecb3ac0a9708d06dd930f37fbc89b6cdc697"},
               new User {Id = 4, Username = "A8747475", Firstname = "Ashish", Lastname = "Mane",Email = "sourabh.padwad@saint-gobain.com",Disabled =false,Active = true,OrganizationId=1,LanguageId=1,Password="b6bc7b58510319a151d168ba3d5aecb3ac0a9708d06dd930f37fbc89b6cdc697"},
               new User {Id = 5, Username = "U6779390", Firstname = "Ujwala", Lastname = "Daund",Email = "sourabh.padwad@saint-gobain.com",Disabled =false,Active = true,OrganizationId=1,LanguageId=1,Password="b6bc7b58510319a151d168ba3d5aecb3ac0a9708d06dd930f37fbc89b6cdc697"}
            };

            context.Users.AddOrUpdate(c => new { c.Username, c.Firstname, c.Lastname, c.Email, c.LanguageId, c.Password, c.Active, c.Disabled }, user);



            var userRights = new[]
            {
                     new UserRights {RoleId=1,UserId=1 },
                     new UserRights {RoleId=1,UserId=2 },
                     new UserRights {RoleId=1,UserId=3 },
                     new UserRights {RoleId=1,UserId=4 },
                     new UserRights {RoleId=1,UserId=5 }

                 };

            context.UserRights.AddOrUpdate(c => new { c.RoleId, c.UserId }, userRights);




            var orgs = new[] {
                  new Organization { Id = 1, ShortName = "Saint-Gobain", LongName = "Saint-Gobain",ParentId=null,CreatedBy="S3135114",CreatedDate=DateTime.Now }
              };

            context.Organizations.AddOrUpdate(c => new { c.Id, c.ShortName, c.LongName, c.ParentId, c.CreatedBy, c.CreatedDate }, orgs);



            //var userpref = new[] {
            //  new UserPreferences {DataLocal=1,TimeZone="",CatalogId=null, RoleId=1,Taxonomy=null,UserId=1,OrganizationId=1,CreatedBy="S3135114",CreatedDate=DateTime.Now},
            //  new UserPreferences {DataLocal=1,TimeZone="",CatalogId=null, RoleId=1,Taxonomy=null,UserId=2,OrganizationId=1,CreatedBy="S3135114",CreatedDate=DateTime.Now},
            //  new UserPreferences {DataLocal=1,TimeZone="",CatalogId=null, RoleId=1,Taxonomy=null,UserId=3,OrganizationId=1,CreatedBy="S3135114",CreatedDate=DateTime.Now},
            //  new UserPreferences {DataLocal=1,TimeZone="",CatalogId=null, RoleId=1,Taxonomy=null,UserId=4,OrganizationId=1,CreatedBy="S3135114",CreatedDate=DateTime.Now},
            //  new UserPreferences {DataLocal=1,TimeZone="",CatalogId=null, RoleId=1,Taxonomy=null,UserId=5,OrganizationId=1,CreatedBy="S3135114",CreatedDate=DateTime.Now},

            //  };

            //context.UserPreferences.AddOrUpdate(c => new { c.DataLocal, c.TimeZone, c.CatalogId, c.RoleId, c.Taxonomy, c.OrganizationId }, userpref);


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
                  new AttributeType { Id=1,Name="Common",CreatedBy="S3135114",CreatedDate=DateTime.Now},
                  new AttributeType { Id=2,Name="Technical",CreatedBy="S3135114",CreatedDate=DateTime.Now},
               };

            context.AttributeTypes.AddOrUpdate(ag => new { ag.Id, ag.Name, ag.CreatedBy, ag.CreatedDate }, attrtype);




            var action = new[] {
                  new Actions { Id=1,Name="Approve" },
                  new Actions { Id=2,Name="Reject"},
                  new Actions { Id=3,Name="Done"},
               };

            context.Actions.AddOrUpdate(a => new { a.Id, a.Name }, action);


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

            var uomType = new[] {
                       new UOMType { Id=1,Name="Angle"},
                new UOMType { Id=2,Name="Angle - Plane"},
                new UOMType { Id=3,Name="Angular Velocity"},
                new UOMType { Id=4,Name="Area"},
                new UOMType { Id=5,Name="Battery Average Run Time (Camera)"},
                new UOMType { Id=6,Name="Battery Capacity"},
                new UOMType { Id=7,Name="Brightness"},
                new UOMType { Id=8,Name="Data Transfer Rate"},
                new UOMType { Id=9,Name="Data Transfer Rate (Bits)"},
                new UOMType { Id=10,Name="Dot Pitch"},
                new UOMType { Id=11,Name="Drive Speed"},
                new UOMType { Id=12,Name="Duty Cycle"},
                new UOMType { Id=13,Name="ELECTRIC CURRENT"},
                new UOMType { Id=14,Name="Electrical Capacitan"},
                new UOMType { Id=15,Name="Electrical Current"},
                new UOMType { Id=16,Name="Electrical Inductanc"},
                new UOMType { Id=17,Name="Electrical Potential"},
                new UOMType { Id=18,Name="Electrical Resistanc"},
                new UOMType { Id=19,Name="Flow Rate"},
                new UOMType { Id=20,Name="Focal Length"},
                new UOMType { Id=21,Name="Force"},
                new UOMType { Id=22,Name="Force per Length"},
                new UOMType { Id=23,Name="Frequency"},
                new UOMType { Id=24,Name="Image Capture Speed"},
                new UOMType { Id=25,Name="Length"},
                new UOMType { Id=26,Name="Mass"},
                new UOMType { Id=27,Name="Mass per Length"},
                new UOMType { Id=28,Name="Media Capacity"},
                new UOMType { Id=29,Name="Media Quantity"},
                new UOMType { Id=30,Name="Megapixels"},
                new UOMType { Id=31,Name="Page Yield"},
                new UOMType { Id=32,Name="Power"},
                new UOMType { Id=33,Name="Pressure"},
                new UOMType { Id=34,Name="Print Speed"},
                new UOMType { Id=35,Name="Quantity"},
                new UOMType { Id=36,Name="Resolution"},
                new UOMType { Id=37,Name="Rotation Speed"},
                new UOMType { Id=38,Name="Sensitivity"},
                new UOMType { Id=39,Name="Storage"},
                new UOMType { Id=40,Name="Storage Capacity"},
                new UOMType { Id=41,Name="Surge Protection"},
                new UOMType { Id=42,Name="Temperature"},
                new UOMType { Id=43,Name="Time"},
                new UOMType { Id=44,Name="Time (Small)"},
                new UOMType { Id=45,Name="Torque"},
                new UOMType { Id=46,Name="Volume"},
                new UOMType { Id=47,Name="Weight"},
                new UOMType { Id=48,Name="Zoom"}

                               };
            context.UOMTypes.AddOrUpdate(a => new { a.Id, a.Name }, uomType);

            var uom = new[] {
          new UOM {Id=1,Name="Degrees",Code="degrees",UomTypeId= 1},
    new UOM {Id=2,Name="deg",Code="deg",UomTypeId= 2},
    new UOM {Id=3,Name="Revolutions",Code="rev",UomTypeId= 2},
    new UOM {Id=4,Name="rpm",Code="rpm",UomTypeId= 3},
    new UOM {Id=5,Name="in²",Code="in²_1",UomTypeId= 4},
    new UOM {Id=6,Name="square metre",Code="m²",UomTypeId= 4},
    new UOM {Id=7,Name="square kilometre",Code="km²",UomTypeId= 4},
    new UOM {Id=8,Name="are",Code="a",UomTypeId= 4},
    new UOM {Id=9,Name="decare",Code="daa",UomTypeId= 4},
    new UOM {Id=10,Name="hectare",Code="ha",UomTypeId= 4},
    new UOM {Id=11,Name="square centimetre",Code="cm²",UomTypeId= 4},
    new UOM {Id=12,Name="square decimetre",Code="dm²",UomTypeId= 4},
    new UOM {Id=13,Name="square millimetre",Code="mm²",UomTypeId= 4},
    new UOM {Id=14,Name="square inch",Code="in²",UomTypeId= 4},
    new UOM {Id=15,Name="square foot",Code="ft²",UomTypeId= 4},
    new UOM {Id=16,Name="square yard",Code="yd²",UomTypeId= 4},
    new UOM {Id=17,Name="square mile",Code="mi²",UomTypeId= 4},
    new UOM {Id=18,Name="acre",Code="acre",UomTypeId= 4},
    new UOM {Id=19,Name="Hours",Code="hour(s)",UomTypeId= 5},
    new UOM {Id=20,Name="Images",Code="images",UomTypeId= 5},
    new UOM {Id=21,Name="Minute",Code="min",UomTypeId= 5},
    new UOM {Id=22,Name="AmpereHour",Code="Ah",UomTypeId= 6},
    new UOM {Id=23,Name="MilliAmpereHour",Code="mAh",UomTypeId= 6},
    new UOM {Id=24,Name="Wh",Code="Wh",UomTypeId= 6},
    new UOM {Id=25,Name="AnsiLumens",Code="ANSI lumens",UomTypeId= 7},
    new UOM {Id=26,Name="CandelasPerMeterSquared",Code="cd/m2",UomTypeId= 7},
    new UOM {Id=27,Name="Nits",Code="nits",UomTypeId= 7},
    new UOM {Id=28,Name="BytesPerSecond",Code="B/s",UomTypeId= 8},
    new UOM {Id=29,Name="BitsPerSecond",Code="bps",UomTypeId= 8},
    new UOM {Id=30,Name="GigabytesPerHour",Code="GB/h",UomTypeId= 8},
    new UOM {Id=31,Name="GigabytesPerMinute",Code="GB/min",UomTypeId= 8},
    new UOM {Id=32,Name="GigabytesPerSecond",Code="GB/s",UomTypeId= 8},
    new UOM {Id=33,Name="GigabitsPerSecond",Code="Gbps",UomTypeId= 8},
    new UOM {Id=34,Name="KilobytesPerSecond",Code="KB/s",UomTypeId= 8},
    new UOM {Id=35,Name="KilobitsPerSecond",Code="Kbps",UomTypeId= 8},
    new UOM {Id=36,Name="MegabytesPerHour",Code="MB/h",UomTypeId= 8},
    new UOM {Id=37,Name="MegabytesPerMinute",Code="MB/min",UomTypeId= 8},
    new UOM {Id=38,Name="MegabytesPerSecond",Code="MB/s",UomTypeId= 8},
    new UOM {Id=39,Name="MegabitsPerSecond",Code="Mbps",UomTypeId= 8},
    new UOM {Id=40,Name="TerabytesPerHour",Code="TB/h",UomTypeId= 8},
    new UOM {Id=41,Name="BitsPerSecond",Code="bps",UomTypeId= 9},
    new UOM {Id=42,Name="KilobitsPerSecond",Code="Kbps",UomTypeId= 9},
    new UOM {Id=43,Name="MegabitsPerSecond",Code="Mbps",UomTypeId= 9},
    new UOM {Id=44,Name="Milimeter",Code="mm",UomTypeId= 10},
    new UOM {Id=45,Name="Impressions",Code="impressions",UomTypeId= 12},
    new UOM {Id=46,Name="Pages",Code="pages",UomTypeId= 12},
    new UOM {Id=47,Name="Amperes",Code="Amp",UomTypeId= 13},
    new UOM {Id=48,Name="F",Code="F",UomTypeId= 14},
    new UOM {Id=49,Name="H",Code="H",UomTypeId= 16},
    new UOM {Id=50,Name="V",Code="V",UomTypeId= 17},
    new UOM {Id=51,Name="Volts",Code="Volts",UomTypeId= 17},
    new UOM {Id=52,Name="KVolts",Code="KVolts",UomTypeId= 17},
    new UOM {Id=53,Name="ohm",Code="ohm",UomTypeId= 18},
    new UOM {Id=54,Name="in³/s",Code="in³/s",UomTypeId= 19},
    new UOM {Id=55,Name="Centimeter",Code="cm",UomTypeId= 20},
    new UOM {Id=56,Name="Milimeter",Code="mm",UomTypeId= 20},
    new UOM {Id=57,Name="lbf",Code="lbf",UomTypeId= 21},
    new UOM {Id=58,Name="N",Code="N",UomTypeId= 21},
    new UOM {Id=59,Name="lbf/ft",Code="lbf/ft",UomTypeId= 22},
    new UOM {Id=60,Name="N/m",Code="N/m",UomTypeId= 22},
    new UOM {Id=61,Name="Hertz",Code="Hz",UomTypeId= 23},
    new UOM {Id=62,Name="MegaHertz",Code="MHz",UomTypeId= 23},
    new UOM {Id=63,Name="GigaHertz",Code="GHz",UomTypeId= 23},
    new UOM {Id=64,Name="Kilohertz",Code="kHz",UomTypeId= 23},
    new UOM {Id=65,Name="FramesPerSecond",Code="frames per second",UomTypeId= 24},
    new UOM {Id=66,Name="ImagesPerSecond",Code="images per second",UomTypeId= 24},
    new UOM {Id=67,Name="metre",Code="m",UomTypeId= 25},
    new UOM {Id=68,Name="decimetre",Code="dm",UomTypeId= 25},
    new UOM {Id=69,Name="centimetre",Code="cm",UomTypeId= 25},
    new UOM {Id=70,Name="micrometre",Code="µm",UomTypeId= 25},
    new UOM {Id=71,Name="millimetre",Code="mm",UomTypeId= 25},
    new UOM {Id=72,Name="hectometre",Code="hm",UomTypeId= 25},
    new UOM {Id=73,Name="kilometre",Code="km",UomTypeId= 25},
    new UOM {Id=74,Name="nanometre",Code="nm",UomTypeId= 25},
    new UOM {Id=75,Name="picometre",Code="pm",UomTypeId= 25},
    new UOM {Id=76,Name="femtometre",Code="fm",UomTypeId= 25},
    new UOM {Id=77,Name="decametre",Code="dam",UomTypeId= 25},
    new UOM {Id=78,Name="nautical mile",Code="n mile",UomTypeId= 25},
    new UOM {Id=79,Name="Angstrom",Code="Å",UomTypeId= 25},
    new UOM {Id=80,Name="astronomical unit",Code="AU",UomTypeId= 25},
    new UOM {Id=81,Name="parsec",Code="pc",UomTypeId= 25},
    new UOM {Id=82,Name="chain",Code="ch",UomTypeId= 25},
    new UOM {Id=83,Name="inch",Code="in",UomTypeId= 25},
    new UOM {Id=84,Name="micro-inch",Code="µin",UomTypeId= 25},
    new UOM {Id=85,Name="foot",Code="ft",UomTypeId= 25},
    new UOM {Id=86,Name="yard",Code="yd",UomTypeId= 25},
    new UOM {Id=87,Name="mile (statute mile)",Code="mile",UomTypeId= 25},
    new UOM {Id=88,Name="milli-inch",Code="mil",UomTypeId= 25},
    new UOM {Id=89,Name="light year",Code="l.y.",UomTypeId= 25},
    new UOM {Id=90,Name="Inch",Code="in.",UomTypeId= 25},
    new UOM {Id=91,Name="lbs-mass",Code="lbs-mass",UomTypeId= 26},
    new UOM {Id=92,Name="lbs-mass/in",Code="lbs-mass/in",UomTypeId= 27},
    new UOM {Id=93,Name="lbs-mass/ft",Code="lbs-mass/ft",UomTypeId= 27},
    new UOM {Id=94,Name="Cards",Code="cards",UomTypeId= 28},
    new UOM {Id=95,Name="CompactDiscs",Code="CDs",UomTypeId= 28},
    new UOM {Id=96,Name="Discs",Code="discs",UomTypeId= 28},
    new UOM {Id=97,Name="Disks",Code="disks",UomTypeId= 28},
    new UOM {Id=98,Name="Envelopes",Code="Envelopes",UomTypeId= 28},
    new UOM {Id=99,Name="Hours",Code="hour(s)",UomTypeId= 28},
    new UOM {Id=100,Name="Minute",Code="min",UomTypeId= 28},
    new UOM {Id=101,Name="Pages",Code="pages",UomTypeId= 28},
    new UOM {Id=102,Name="PagesPerMinute",Code="ppm",UomTypeId= 28},
    new UOM {Id=103,Name="Rolls",Code="rolls",UomTypeId= 28},
    new UOM {Id=104,Name="Sheets",Code="sheets",UomTypeId= 28},
    new UOM {Id=105,Name="Tapes",Code="tapes",UomTypeId= 28},
    new UOM {Id=106,Name="Cards",Code="cards",UomTypeId= 29},
    new UOM {Id=107,Name="Inserts",Code="Inserts",UomTypeId= 29},
    new UOM {Id=108,Name="Labels",Code="Labels",UomTypeId= 29},
    new UOM {Id=109,Name="Rolls",Code="rolls",UomTypeId= 29},
    new UOM {Id=110,Name="Sheets",Code="sheets",UomTypeId= 29},
    new UOM {Id=111,Name="Megapixel",Code="Megapixel",UomTypeId= 30},
    new UOM {Id=112,Name="Discs",Code="discs",UomTypeId= 31},
    new UOM {Id=113,Name="Images",Code="images",UomTypeId= 31},
    new UOM {Id=114,Name="Pages",Code="pages",UomTypeId= 31},
    new UOM {Id=115,Name="Prints",Code="Prints",UomTypeId= 31},
    new UOM {Id=116,Name="Watt",Code="W",UomTypeId= 32},
    new UOM {Id=117,Name="hp",Code="hp",UomTypeId= 32},
    new UOM {Id=118,Name="Kilowatt",Code="kW",UomTypeId= 32},
    new UOM {Id=119,Name="VoltAmpere",Code="VA",UomTypeId= 32},
    new UOM {Id=120,Name="Volt",Code="V",UomTypeId= 32},
    new UOM {Id=121,Name="psi",Code="psi",UomTypeId= 33},
    new UOM {Id=122,Name="millipascal",Code="mPa",UomTypeId= 33},
    new UOM {Id=123,Name="megapascal",Code="MegaPascal",UomTypeId= 33},
    new UOM {Id=124,Name="pascal",Code="Pa",UomTypeId= 33},
    new UOM {Id=125,Name="kilopascal",Code="kPa",UomTypeId= 33},
    new UOM {Id=126,Name="hectobar",Code="hbar",UomTypeId= 33},
    new UOM {Id=127,Name="millibar",Code="millibar",UomTypeId= 33},
    new UOM {Id=128,Name="kilobar",Code="kbar",UomTypeId= 33},
    new UOM {Id=129,Name="standard atmosphere",Code="atm",UomTypeId= 33},
    new UOM {Id=130,Name="gigapascal",Code="GPa",UomTypeId= 33},
    new UOM {Id=131,Name="micropascal",Code="µPa",UomTypeId= 33},
    new UOM {Id=132,Name="hectopascal",Code="hPa",UomTypeId= 33},
    new UOM {Id=133,Name="microbar",Code="µb",UomTypeId= 33},
    new UOM {Id=134,Name="newton per square metre",Code="N/m²",UomTypeId= 33},
    new UOM {Id=135,Name="newton per square millimetre",Code="N/mm²",UomTypeId= 33},
    new UOM {Id=136,Name="pound per square foot",Code="lb/ft²",UomTypeId= 33},
    new UOM {Id=137,Name="pound-force per square inch",Code="lbf/in²",UomTypeId= 33},
    new UOM {Id=138,Name="kilogram-force per square metre",Code="kgf/m²",UomTypeId= 33},
    new UOM {Id=139,Name="torr",Code="Torr",UomTypeId= 33},
    new UOM {Id=140,Name="technical atmosphere",Code="at",UomTypeId= 33},
    new UOM {Id=141,Name="pounds per square inch absolute",Code="lb/in²",UomTypeId= 33},
    new UOM {Id=142,Name="conventional millimetre of mercury",Code="mm Hg",UomTypeId= 33},
    new UOM {Id=143,Name="CardsPerHour",Code="cards/hr.",UomTypeId= 34},
    new UOM {Id=144,Name="CharactersPerSec",Code="char/sec",UomTypeId= 34},
    new UOM {Id=145,Name="CharactersPerMinute",Code="cpm",UomTypeId= 34},
    new UOM {Id=146,Name="DisksPerMinute",Code="disks/min",UomTypeId= 34},
    new UOM {Id=147,Name="InchPerMinute",Code="inch/min",UomTypeId= 34},
    new UOM {Id=148,Name="InchesPerSecond",Code="inches/sec",UomTypeId= 34},
    new UOM {Id=149,Name="InchPerSecond",Code="ips",UomTypeId= 34},
    new UOM {Id=150,Name="LabelsPerMinute",Code="labels/minute",UomTypeId= 34},
    new UOM {Id=151,Name="LinesPerSecond",Code="lines/sec",UomTypeId= 34},
    new UOM {Id=152,Name="LinesPerMinute",Code="LPM",UomTypeId= 34},
    new UOM {Id=153,Name="MinutesPerPage",Code="min/page",UomTypeId= 34},
    new UOM {Id=154,Name="PagesPerMinute",Code="ppm",UomTypeId= 34},
    new UOM {Id=155,Name="SquareFeetPerHour",Code="sq.ft/hour",UomTypeId= 34},
    new UOM {Id=156,Name="Drum",Code="Drum",UomTypeId= 35},
    new UOM {Id=157,Name="Each",Code="EA",UomTypeId= 35},
    new UOM {Id=158,Name="Rows",Code="Rows",UomTypeId= 35},
    new UOM {Id=159,Name="Trufts",Code="Trufts",UomTypeId= 35},
    new UOM {Id=160,Name="CharactersPerInch",Code="cpi",UomTypeId= 36},
    new UOM {Id=161,Name="DotsPerInch",Code="dpi",UomTypeId= 36},
    new UOM {Id=162,Name="LinesPerInch",Code="lpi",UomTypeId= 36},
    new UOM {Id=163,Name="RevolutionsPerMinute",Code="rpm",UomTypeId= 37},
    new UOM {Id=164,Name="Decibel",Code="dB",UomTypeId= 38},
    new UOM {Id=165,Name="dBV/Pascal",Code="dBV/Pascal",UomTypeId= 38},
    new UOM {Id=166,Name="dBV/uBar",Code="dBV/uBar",UomTypeId= 38},
    new UOM {Id=167,Name="Bytes",Code="Byte",UomTypeId= 39},
    new UOM {Id=168,Name="Kilobytes",Code="KB",UomTypeId= 39},
    new UOM {Id=169,Name="Megabytes",Code="MB",UomTypeId= 39},
    new UOM {Id=170,Name="Gigabytes",Code="GB",UomTypeId= 39},
    new UOM {Id=171,Name="Terabytes",Code="TB",UomTypeId= 39},
    new UOM {Id=172,Name="Byte",Code="Byte",UomTypeId= 40},
    new UOM {Id=173,Name="Gigabyte",Code="GB",UomTypeId= 40},
    new UOM {Id=174,Name="Kilobyte",Code="KB",UomTypeId= 40},
    new UOM {Id=175,Name="Megabyte",Code="MB",UomTypeId= 40},
    new UOM {Id=176,Name="Terabyte",Code="TB",UomTypeId= 40},
    new UOM {Id=177,Name="Joules",Code="Joules",UomTypeId= 41},
    new UOM {Id=178,Name="degC",Code="degC",UomTypeId= 42},
    new UOM {Id=179,Name="degF",Code="degF",UomTypeId= 42},
    new UOM {Id=180,Name="s",Code="s",UomTypeId= 43},
    new UOM {Id=181,Name="Days",Code="days",UomTypeId= 43},
    new UOM {Id=182,Name="Hours",Code="hour(s)",UomTypeId= 43},
    new UOM {Id=183,Name="Incident",Code="incident",UomTypeId= 43},
    new UOM {Id=184,Name="Incidents",Code="incidents",UomTypeId= 43},
    new UOM {Id=185,Name="Minute",Code="min",UomTypeId= 43},
    new UOM {Id=186,Name="Month",Code="month",UomTypeId= 43},
    new UOM {Id=187,Name="Months",Code="months",UomTypeId= 43},
    new UOM {Id=188,Name="Second",Code="sec",UomTypeId= 43},
    new UOM {Id=189,Name="Year",Code="year",UomTypeId= 43},
    new UOM {Id=190,Name="Years",Code="years",UomTypeId= 43},
    new UOM {Id=191,Name="Milisecond",Code="ms",UomTypeId= 44},
    new UOM {Id=192,Name="Nanosecond",Code="ns",UomTypeId= 44},
    new UOM {Id=193,Name="Pound force inch",Code="lbf*in",UomTypeId= 45},
    new UOM {Id=194,Name="Newton metre",Code="N*m",UomTypeId= 45},
    new UOM {Id=195,Name="Pound force foot",Code="lbf*ft",UomTypeId= 45},
    new UOM {Id=196,Name="in**3",Code="in³_1",UomTypeId= 46},
    new UOM {Id=197,Name="cubic metre",Code="m³",UomTypeId= 46},
    new UOM {Id=198,Name="mega litre",Code="Megalitre",UomTypeId= 46},
    new UOM {Id=199,Name="litre",Code="l",UomTypeId= 46},
    new UOM {Id=200,Name="cubic millimetre",Code="mm³",UomTypeId= 46},
    new UOM {Id=201,Name="cubic centimetre",Code="cm³",UomTypeId= 46},
    new UOM {Id=202,Name="cubic decimetre",Code="dm³",UomTypeId= 46},
    new UOM {Id=203,Name="millilitre",Code="ml",UomTypeId= 46},
    new UOM {Id=204,Name="hectolitre",Code="hl",UomTypeId= 46},
    new UOM {Id=205,Name="centilitre",Code="cl",UomTypeId= 46},
    new UOM {Id=206,Name="decilitre",Code="dl",UomTypeId= 46},
    new UOM {Id=207,Name="microlitre",Code="µl",UomTypeId= 46},
    new UOM {Id=208,Name="kilolitre",Code="kl",UomTypeId= 46},
    new UOM {Id=209,Name="decalitre",Code="dal",UomTypeId= 46},
    new UOM {Id=210,Name="cubic inch",Code="in³",UomTypeId= 46},
    new UOM {Id=211,Name="cubic foot",Code="ft³",UomTypeId= 46},
    new UOM {Id=212,Name="cubic yard",Code="yd³",UomTypeId= 46},
    new UOM {Id=213,Name="gallon",Code="gal",UomTypeId= 46},
    new UOM {Id=214,Name="pint",Code="pt",UomTypeId= 46},
    new UOM {Id=215,Name="quart",Code="qt",UomTypeId= 46},
    new UOM {Id=216,Name="liquid pint",Code="liq pt",UomTypeId= 46},
    new UOM {Id=217,Name="liquid quart",Code="liq qt",UomTypeId= 46},
    new UOM {Id=218,Name="dry pint",Code="dry pt",UomTypeId= 46},
    new UOM {Id=219,Name="fluid ounce",Code="fl oz",UomTypeId= 46},
    new UOM {Id=220,Name="bushel",Code="bushel",UomTypeId= 46},
    new UOM {Id=221,Name="bushel",Code="bu",UomTypeId= 46},
    new UOM {Id=222,Name="barrel",Code="barrel",UomTypeId= 46},
    new UOM {Id=223,Name="dry barrel",Code="bbl",UomTypeId= 46},
    new UOM {Id=224,Name="dry gallon",Code="dry gal",UomTypeId= 46},
    new UOM {Id=225,Name="dry quart",Code="dry qt",UomTypeId= 46},
    new UOM {Id=226,Name="microgram",Code="µg",UomTypeId= 47},
    new UOM {Id=227,Name="decagram",Code="dag",UomTypeId= 47},
    new UOM {Id=228,Name="decigram",Code="dg",UomTypeId= 47},
    new UOM {Id=229,Name="kilogram",Code="kg",UomTypeId= 47},
    new UOM {Id=230,Name="gram",Code="g",UomTypeId= 47},
    new UOM {Id=231,Name="centigram",Code="cg",UomTypeId= 47},
    new UOM {Id=232,Name="tonne (metric ton)",Code="t",UomTypeId= 47},
    new UOM {Id=233,Name="decitonne",Code="dt",UomTypeId= 47},
    new UOM {Id=234,Name="milligram",Code="milligram",UomTypeId= 47},
    new UOM {Id=235,Name="hectogram",Code="hg",UomTypeId= 47},
    new UOM {Id=236,Name="kilotonne",Code="kt",UomTypeId= 47},
    new UOM {Id=237,Name="megagram",Code="Megagram",UomTypeId= 47},
    new UOM {Id=238,Name="pound",Code="lb",UomTypeId= 47},
    new UOM {Id=239,Name="grain",Code="gr",UomTypeId= 47},
    new UOM {Id=240,Name="ounce",Code="oz",UomTypeId= 47},
    new UOM {Id=241,Name="hundred pounds",Code="cwt",UomTypeId= 47},
    new UOM {Id=242,Name="troy ounce or apothecaries' ounce",Code="tr oz",UomTypeId= 47},
    new UOM {Id=243,Name="kilogram per cubic metre",Code="kg/m³",UomTypeId= 47},
    new UOM {Id=244,Name="Pounds",Code="lbs",UomTypeId= 47}



               };

            context.UOM.AddOrUpdate(a => new { a.Id, a.Name, a.Code, a.UomTypeId }, uom);
            */
        }
    }
}