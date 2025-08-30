using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
using System.Configuration;
using System.Web.Services;

namespace portfolio_html_css_js_dotnet_webform_2025_08_18
{
    public partial class Home : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Bind the header and form elements only on the initial page load
            if (!IsPostBack) // Check if it's the first time the page is loaded
            {
                this.Page.Header.DataBind();
                this.Page.Form.DataBind();
            }
        }

        [WebMethod]
        public static string GetArticles()
        {
            string connectionString = ConfigurationManager.ConnectionStrings["PortfolioDbConnection"].ConnectionString;
            DataTable dataTable = new DataTable();
            SqlConnection connection = new SqlConnection(connectionString);
            string query = "SELECT ID, ArticleName, ArticleTitle, ArticleDescription, CreatedAt, LastUpdatedAt, ImagePath FROM PortfolioHomeArticles";
            SqlCommand command = new SqlCommand(query, connection);
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            try
            {
                connection.Open();
                dataAdapter.Fill(dataTable);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                connection.Close();
            }
            // Convert DataTable to List of Dictionary
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            foreach (DataRow dataRow in dataTable.Rows)
            {
                Dictionary<string, object> row = new Dictionary<string, object>();
                foreach (DataColumn column in dataTable.Columns)
                {
                    row.Add(column.ColumnName, dataRow[column]);
                }
                rows.Add(row);
            }
            // Convert List of Dictionary to JSON
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            return javaScriptSerializer.Serialize(rows);
        }
    }
}