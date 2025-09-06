using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace portfolio_html_css_js_dotnet_webform_2025_08_18
{
    public class CategoryDTO
    {
        public string CategoryName { get; set; }
        public List<SkillDTO> Skills { get; set; }
    }
    public class SkillDTO
    {
        public string SkillName { get; set; }
        public string ImagePath { get; set; }
        public int Proficiency { get; set; }
    }
    public partial class Skills : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                var skillsData = GetSkillsFromDatabase();
                rptSkillsCategories.DataSource = skillsData;
                rptSkillsCategories.DataBind();
            }
        }
        protected List<CategoryDTO> GetSkillsFromDatabase()
        {
            var categories = new List<CategoryDTO>();
            string connectionString = ConfigurationManager.ConnectionStrings["PortfolioDbConnection"].ConnectionString;
            SqlConnection connection = new SqlConnection(connectionString);
            string query = @"
                SELECT sc.CID, sc.CName, s.SID, s.SName, s.SImagePath, s.SProficiency
                FROM PortfolioHomeSkillItem s INNER JOIN PortfolioHomeSkillCategory sc
                ON s.CID = sc.CID
                ORDER BY sc.CDisplayOrder, s.SDisplayOrder;
            ";
            SqlCommand command = new SqlCommand(query, connection);
            try
            {
                connection.Open();
                SqlDataReader reader = command.ExecuteReader();
                Dictionary<int, CategoryDTO> categoryDictionary = new Dictionary<int, CategoryDTO>();
                while (reader.Read())
                {
                    int cid = Convert.ToInt32(reader["CID"]);
                    string cname = reader["CName"].ToString();
                    if (!categoryDictionary.ContainsKey(cid))
                    {
                        categoryDictionary[cid] = new CategoryDTO
                        {
                            CategoryName = cname,
                            Skills = new List<SkillDTO>()
                        };
                    }
                    var skill = new SkillDTO
                    {
                        SkillName = reader["SName"].ToString(),
                        ImagePath = reader["SImagePath"].ToString(),
                        Proficiency = Convert.ToInt32(reader["SProficiency"])
                    };
                    categoryDictionary[cid].Skills.Add(skill);
                }
                categories.AddRange(categoryDictionary.Values);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                connection.Close();
            }
            return categories;
        }
        protected void rptSkillsCategories_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {
                var category = (CategoryDTO)e.Item.DataItem;
                var rptSkills = (Repeater)e.Item.FindControl("rptSkills");
                rptSkills.DataSource = category.Skills;
                rptSkills.DataBind();
            }
        }
        protected void rptSkills_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {
                var skill = (SkillDTO)e.Item.DataItem;
                var bar = (HtmlGenericControl)e.Item.FindControl("skillBar");
                bar.Style["width"] = skill.Proficiency + "%";
            }
        }
    }
}