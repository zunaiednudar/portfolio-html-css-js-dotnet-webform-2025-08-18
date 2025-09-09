using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace portfolio_html_css_js_dotnet_webform_2025_08_18
{
    public partial class AddRecord : System.Web.UI.Page
    {
        string connectionString = ConfigurationManager.ConnectionStrings["PortfolioDbConnection"].ConnectionString;

        // Map table names to their primary key columns
        Dictionary<string, string> tablePKs = new Dictionary<string, string>()
        {
            { "PortfolioHomeSkillCategory", "CID" },
            { "PortfolioHomeSkillItem", "SID" },
            { "PortfolioBlogsItem", "BID" },
            { "PortfolioProjectsItem", "PID" }
        };

        string tableName;
        string pkColumn;

        protected void Page_Load(object sender, EventArgs e)
        {
            tableName = Request.QueryString["table"];

            if (string.IsNullOrEmpty(tableName))
            {
                Response.Write("Invalid table.");
                Response.End();
            }

            pkColumn = tablePKs.ContainsKey(tableName) ? tablePKs[tableName] : "ID";

            if (!IsPostBack)
            {
                litTableName.Text = $"Adding New Record to Table: {tableName}";
                LoadForm();
            }
        }

        private void LoadForm()
        {
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                // Load zero rows to get the schema
                SqlDataAdapter da = new SqlDataAdapter($"SELECT * FROM {tableName} WHERE 1=0", con);
                da.Fill(dt);
            }

            pnlForm.Controls.Clear();

            foreach (DataColumn col in dt.Columns)
            {
                if (col.ColumnName == pkColumn) continue; // skip PK

                pnlForm.Controls.Add(new Literal { Text = $"<label>{col.ColumnName}</label><br/>" });

                TextBox txt = new TextBox
                {
                    ID = "txt_" + col.ColumnName,
                    Width = 300
                };
                pnlForm.Controls.Add(txt);
                pnlForm.Controls.Add(new Literal { Text = "<br/><br/>" });
            }
        }

        protected void btnAdd_Click(object sender, EventArgs e)
        {
            List<string> columns = new List<string>();
            List<string> paramNames = new List<string>();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = new SqlConnection(connectionString);

            foreach (Control ctrl in pnlForm.Controls)
            {
                if (ctrl is TextBox txt)
                {
                    string colName = txt.ID.Replace("txt_", "");
                    columns.Add(colName);
                    paramNames.Add("@" + colName);
                    cmd.Parameters.AddWithValue("@" + colName, txt.Text);
                }
            }

            string columnsJoined = string.Join(", ", columns);
            string paramsJoined = string.Join(", ", paramNames);

            cmd.CommandText = $"INSERT INTO {tableName} ({columnsJoined}) VALUES ({paramsJoined})";

            try
            {
                cmd.Connection.Open();
                cmd.ExecuteNonQuery();
                Response.Write("<script>alert('Record added successfully');window.location='AdminPanel.aspx';</script>");
            }
            catch (Exception ex)
            {
                Response.Write($"Error: {ex.Message}");
            }
            finally
            {
                cmd.Connection.Close();
            }
        }
    }
}
