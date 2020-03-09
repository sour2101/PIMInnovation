namespace PIM.Data
{
    using System.Data.Entity;
    using System.Data.Entity.ModelConfiguration.Conventions;
    using Migrations;
    using Users;
    using MasterData;
    using Integrations;
    using Attributes;

    public class PIMContext:DbContext
    {
        public PIMContext()
            : base("name=PIM")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<PIMContext, Configuration>());
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            base.OnModelCreating(modelBuilder);
        }

        public virtual DbSet<Menu> Menus { get; set; }

        public virtual DbSet<Locale> Locales { get; set; }

        public virtual DbSet<MenuChildrens> MenuChildrens { get; set; }

        public virtual DbSet<User> Users { get; set; }

        public virtual DbSet<UserRights> UserRights { get; set; }

        public virtual DbSet<UserPreferences> UserPreferences { get; set; }

        public virtual DbSet<Role> Roles { get; set; }

        public virtual DbSet<MenuRights> MenuRights { get; set; }

        public virtual DbSet<Country> Countries { get; set; }

        public virtual DbSet<Language> Languages { get; set; }

        public virtual DbSet<Category> categories { get; set; }

        public virtual DbSet<Organization> Organizations { get; set; }

        public virtual DbSet<DataType> DataTypes { get; set; }

        public virtual DbSet<DisplayType> DisplayTypes { get; set; }

        public virtual DbSet<LookupTables> LookupTables { get; set; }

        public virtual DbSet<LookUpColumns> LookUpColumns { get; set; }

        public virtual DbSet<UOMType> UOMTypes { get; set; }

        public virtual DbSet<UOM> UOM { get; set; }

        public virtual DbSet<AttributeGroup> AttributeGroups { get; set; }

        public virtual DbSet<AttributeType> AttributeTypes { get; set; }

        public virtual DbSet<Attribute> Attributes { get; set; }
      

        public virtual DbSet<AttributeLookup> AttributeLookups { get; set; }

        public virtual DbSet<AttributeDropdowns> AtrributeDropdowns { get; set; }

        public virtual DbSet<AttributeUOM> AttributeUOMs { get; set; }


        public virtual DbSet<AttributeCatalog> AttributeCatalogs { get; set; }

        public virtual DbSet<AttributeBRs> AttribureBRs { get; set; }

        public virtual DbSet<Actions> Actions { get; set; }

        public virtual DbSet<Workflow> Workflows { get; set; }

        public virtual DbSet<WorkflowSteps> WorkflowSteps { get; set; }

        public virtual DbSet<JobType> JobTypes { get; set; }

        public virtual DbSet<ImportProfile> ImportProfiles { get; set; }

        public virtual DbSet<IntegrationJob> IntegrationJobs { get; set; }

        public virtual DbSet<IntegrationStatus> IntegrationStatus { get; set; }

        public virtual DbSet<FileDetails> FileDetails { get; set; }

        public virtual DbSet<MessageType> MessageTypes { get; set; }

        public virtual DbSet<JobDetails> JobDetails { get; set; }

       

    }
}