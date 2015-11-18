using University_of_Contoso.Models;
using MySql.Data.Entity;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace University_of_Contoso.DAL
{
    //[DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class UniversityContext : DbContext
    {

        public UniversityContext() : base("name=UniversityContext")
        {
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<MSA_LearningContext, MyConfiguration>());
        }

        public System.Data.Entity.DbSet<University_of_Contoso.Models.Student> Students { get; set; }

        public System.Data.Entity.DbSet<University_of_Contoso.Models.Course> Courses { get; set; }

        public System.Data.Entity.DbSet<University_of_Contoso.Models.Assessment> Assessments { get; set; }
    }
}
