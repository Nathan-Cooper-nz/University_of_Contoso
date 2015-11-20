using University_of_Contoso.Models;
using MySql.Data.Entity;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity.Migrations;
using System.Collections.Generic;
using System.Linq;
using System;

namespace University_of_Contoso.DAL
{
    [DbConfigurationType(typeof(MySqlEFConfiguration))]
    public class UniversityContext : DbContext
    {
        public class MyConfiguration : DbMigrationsConfiguration<UniversityContext>
        {
            public MyConfiguration()
            {
                this.AutomaticMigrationsEnabled = true;
            }

            protected override void Seed(UniversityContext context)
            {
                var students = new List<Student>
                {
                    new Student { FirstName = "Carson", LastName = "Alexander" },
                    new Student { FirstName = "Meredith", LastName = "Alonso"},
                    new Student { FirstName = "Arturo", LastName = "Anand" },
                    new Student { FirstName = "Gytis", LastName = "Barzdukas"},
                    new Student { FirstName = "Yan", LastName = "Li"},
                    new Student { FirstName = "Peggy", LastName = "Justice"},
                    new Student { FirstName = "Laura", LastName = "Norman"},
                    new Student { FirstName = "Nino", LastName = "Olivetto"}
                };
                students.ForEach(s => context.Students.AddOrUpdate(p => p.LastName, s));
                context.SaveChanges();
                var courses = new List<Course>
                {
                    new Course {CourseID = 1050, Title = "Chemistry", Credits = 3, },
                    new Course {CourseID = 4022, Title = "Microeconomics", Credits = 3, },
                    new Course {CourseID = 4041, Title = "Macroeconomics", Credits = 3, },
                    new Course {CourseID = 1045, Title = "Calculus", Credits = 4, },
                    new Course {CourseID = 3141, Title = "Trigonometry", Credits = 4, },
                    new Course {CourseID = 2021, Title = "Composition", Credits = 3, },
                    new Course {CourseID = 2042, Title = "Literature", Credits = 4, }
                };
                courses.ForEach(s => context.Courses.AddOrUpdate(p => p.Title, s));
                context.SaveChanges();
                var assessments = new List<Assessment>
                {
                    new Assessment {
                        CourseID = courses.Single(c => c.Title == "Chemistry" ).CourseID,
                        Type = Models.Type.Assignment,
                        AssessmentName = "A",
                        CourseWeight = 25,
                        DueDate = DateTime.Parse("2010-09-01")
                    },
                    new Assessment {
                        CourseID = courses.Single(c => c.Title == "Microeconomics" ).CourseID,
                        Type = Models.Type.Assignment,
                        AssessmentName = "B",
                        CourseWeight = 25,
                        DueDate = DateTime.Parse("2010-09-01")
                    },
                    new Assessment {
                        CourseID = courses.Single(c => c.Title == "Macroeconomics" ).CourseID,
                        Type = Models.Type.Assignment,
                        AssessmentName = "C",
                        CourseWeight = 25,
                        DueDate = DateTime.Parse("2010-09-01")
                    },
                    new Assessment {
                        CourseID = courses.Single(c => c.Title == "Calculus" ).CourseID,
                        Type = Models.Type.Assignment,
                        AssessmentName = "D",
                        CourseWeight = 25,
                        DueDate = DateTime.Parse("2010-09-01")
                    },
                    new Assessment {
                        CourseID = courses.Single(c => c.Title == "Trigonometry" ).CourseID,
                        Type = Models.Type.Assignment,
                        AssessmentName = "E",
                         CourseWeight = 25,
                        DueDate = DateTime.Parse("2010-09-01")
                   },
                    new Assessment {
                        CourseID = courses.Single(c => c.Title == "Composition" ).CourseID,
                        Type = Models.Type.Assignment,
                        AssessmentName = "F",
                        CourseWeight = 25,
                        DueDate = DateTime.Parse("2010-09-01")
                    },
                    new Assessment {
                        CourseID = courses.Single(c => c.Title == "Chemistry" ).CourseID,
                        Type = Models.Type.Assignment,
                        AssessmentName = "G",
                        CourseWeight = 25,
                        DueDate = DateTime.Parse("2010-09-21")
                    },
                    new Assessment {
                        CourseID = courses.Single(c => c.Title == "Microeconomics").CourseID,
                        Type = Models.Type.Assignment,
                        AssessmentName = "H",
                        CourseWeight = 25,
                        DueDate = DateTime.Parse("2015-09-05")
                    },
                    new Assessment {
                        CourseID = courses.Single(c => c.Title == "Chemistry").CourseID,
                        Type = Models.Type.Assignment,
                        AssessmentName = "I",
                        CourseWeight = 25,
                        DueDate = DateTime.Parse("2015-04-01")
                    },
                    new Assessment {
                        CourseID = courses.Single(c => c.Title == "Composition").CourseID,
                        Type = Models.Type.Assignment,
                        AssessmentName = "J",
                        CourseWeight = 25,
                        DueDate = DateTime.Parse("2013-09-01")
                    },
                    new Assessment {
                        CourseID = courses.Single(c => c.Title == "Literature").CourseID,
                        Type = Models.Type.Assignment,
                        AssessmentName = "K",
                        CourseWeight = 25,
                        DueDate = DateTime.Parse("2015-09-01")
                    }
                };
                assessments.ForEach(s => context.Assessments.AddOrUpdate(p => p.AssessmentName, s));
                context.SaveChanges();

                var tasks = new List<Task>
                {
                    new Task
                    {
                        Title = "Finish off Calculus Assigment",
                        Description = "Still need to do Q3 - Q5",
                        StudentID = students[0].StudentID,
                        Importance = Importance.Medium
                    },
                    new Task
                    {
                        Title = "Finish off Literature Assigment",
                        Description = "Write Entire Essay",
                        StudentID = students[2].StudentID,
                        Importance = Importance.High
                    }
                };
                tasks.ForEach(s => context.Tasks.AddOrUpdate(p => p.TaskID, s));
                context.SaveChanges();
            }
        }


        public UniversityContext() : base("name=UniversityContext")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<UniversityContext, MyConfiguration>());
        }

        public System.Data.Entity.DbSet<University_of_Contoso.Models.Student> Students { get; set; }

        public System.Data.Entity.DbSet<University_of_Contoso.Models.Course> Courses { get; set; }

        public System.Data.Entity.DbSet<University_of_Contoso.Models.Assessment> Assessments { get; set; }

        public System.Data.Entity.DbSet<University_of_Contoso.Models.Task> Tasks { get; set; }
    }
}
