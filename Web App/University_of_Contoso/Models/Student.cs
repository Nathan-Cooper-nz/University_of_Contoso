using Newtonsoft.Json;
using System.Collections.Generic;


namespace University_of_Contoso.Models
{
    public class Student
    {
        public int StudentID { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }

        [JsonIgnore]
        public virtual ICollection<Course> Course { get; set; }

        [JsonIgnore]
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
