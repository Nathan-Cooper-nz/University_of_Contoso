using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using University_of_Contoso.DAL;
using University_of_Contoso.Models;

namespace University_of_Contoso.Controllers
{
    public class AssessmentsController : ApiController
    {
        private UniversityContext db = new UniversityContext();

        // GET: api/Assessments
        public IQueryable<Assessment> GetAssessments()
        {
            return db.Assessments;
        }

        // GET: api/Assessments/5
        [ResponseType(typeof(Assessment))]
        public IHttpActionResult GetAssessment(int id)
        {
            Assessment assessment = db.Assessments.Find(id);
            if (assessment == null)
            {
                return NotFound();
            }

            return Ok(assessment);
        }

        // PUT: api/Assessments/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAssessment(int id, Assessment assessment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != assessment.AssessmentID)
            {
                return BadRequest();
            }

            db.Entry(assessment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssessmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Assessments
        [ResponseType(typeof(Assessment))]
        public IHttpActionResult PostAssessment(Assessment assessment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Assessments.Add(assessment);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = assessment.AssessmentID }, assessment);
        }

        // DELETE: api/Assessments/5
        [ResponseType(typeof(Assessment))]
        public IHttpActionResult DeleteAssessment(int id)
        {
            Assessment assessment = db.Assessments.Find(id);
            if (assessment == null)
            {
                return NotFound();
            }

            db.Assessments.Remove(assessment);
            db.SaveChanges();

            return Ok(assessment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AssessmentExists(int id)
        {
            return db.Assessments.Count(e => e.AssessmentID == id) > 0;
        }
    }
}