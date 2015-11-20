using Newtonsoft.Json;

namespace University_of_Contoso.Models
{
    public enum Importance
    {
        High, Medium, Low
    }

    public class Task
    {
        public int TaskID { get; set; }
        public int StudentID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Importance? Importance { get; set; }

        [JsonIgnore]
        public virtual Student Student { get; set; }
    }
}