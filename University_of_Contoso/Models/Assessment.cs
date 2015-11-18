using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace University_of_Contoso.Models
{
    public enum Type
    {
        Test, Assignment, LabProject
    }

    public class Assessment
    {
        public int AssessmentID { get; set; }
        public int CourseID { get; set; }

        string AssementName { get; set; }
        Type? Type { get; set; }
        double CourseWeight { get; set; }
        string Instructions { get; set; }

        [JsonIgnore]
        public virtual Course Course { get; set; }
        
    }
}
