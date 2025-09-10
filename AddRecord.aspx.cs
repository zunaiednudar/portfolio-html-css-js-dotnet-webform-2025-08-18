using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace portfolio_html_css_js_dotnet_webform_2025_08_18
{
    public partial class AddRecord : System.Web.UI.Page
    {
        string connectionString = ConfigurationManager.ConnectionStrings["PortfolioDbConnection"].ConnectionString;
        Dictionary<string, string> tablePKs = new Dictionary<string, string>()
        {
            { "PortfolioHomeSkillCategory", "CID" },
            { "PortfolioHomeSkillItem", "SID" },
            { "PortfolioBlogsItem", "BID" },
            { "PortfolioProjectsItem", "PID" }
        };
        string tableName;
        protected void Page_Load(object sender, EventArgs e)
        {
            tableName = Request.QueryString["table"];
            if (string.IsNullOrEmpty(tableName))
            {
                Response.Write("Invalid table name.");
                Response.End();
            }
            lblTableName.Text = $"Add to <span class='highlight-table-name'>{tableName}</span>";
            LoadColumns();
        }
        private void LoadColumns()
        {
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = $"SELECT TOP 0 * FROM [{tableName}]";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                }
            }
            pnlForm.Controls.Clear();
            foreach (DataColumn col in dt.Columns)
            {
                if (tablePKs.ContainsKey(tableName) && col.ColumnName == tablePKs[tableName] && col.AutoIncrement) continue;
                var divWrapper = new System.Web.UI.HtmlControls.HtmlGenericControl("div");
                divWrapper.Attributes["class"] = "form-row";
                var lbl = new Label
                {
                    AssociatedControlID = "txt_" + col.ColumnName,
                    Text = col.ColumnName,
                    CssClass = "form-label"
                };
                TextBox txt = new TextBox
                {
                    ID = "txt_" + col.ColumnName,
                    ClientIDMode = ClientIDMode.Static,
                    TextMode = TextBoxMode.MultiLine,
                    CssClass = "form-input auto-resize"
                };
                divWrapper.Controls.Add(lbl);
                divWrapper.Controls.Add(txt);
                pnlForm.Controls.Add(divWrapper);
            }
        }
        protected void btnAdd_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(tableName))
            {
                ClientScript.RegisterStartupScript(this.GetType(), "alert", "alert('Invalid table name.');", true);
                return;
            }
            // Restrict PortfolioHomeArticles to max 6 rows
            if (tableName == "PortfolioHomeArticles")
            {
                using (SqlConnection conCheck = new SqlConnection(connectionString))
                using (SqlCommand checkCmd = new SqlCommand($"SELECT COUNT(*) FROM [{tableName}]", conCheck))
                {
                    conCheck.Open();
                    int totalRows = (int)checkCmd.ExecuteScalar();
                    if (totalRows >= 6) // Extra 3 articles "Skills", "Education", "Contact", which are not included in the database takes space -> Total articles = 9
                    {
                        ClientScript.RegisterStartupScript(this.GetType(), "alert", "alert('You cannot insert more than 6 articles in PortfolioHomeArticles.');", true);
                        return;
                    }
                }
            }
            List<string> columns = new List<string>();
            List<string> parameters = new List<string>();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = new SqlConnection(connectionString);
            string pkColumn = tablePKs.ContainsKey(tableName) ? tablePKs[tableName] : null;
            string pkValue = null;
            foreach (Control div in pnlForm.Controls)
            {
                if (div is System.Web.UI.HtmlControls.HtmlGenericControl containerDiv)
                {
                    foreach (Control inner in containerDiv.Controls)
                    {
                        if (inner is TextBox txt)
                        {
                            string colName = txt.ID.Replace("txt_", "");
                            columns.Add($"[{colName}]");
                            parameters.Add($"@{colName}");
                            cmd.Parameters.AddWithValue("@" + colName, txt.Text ?? "");

                            if (colName == pkColumn)
                                pkValue = txt.Text;
                        }
                    }
                }
            }
            if (columns.Count == 0)
            {
                ClientScript.RegisterStartupScript(this.GetType(), "alert", "alert('Nothing to insert!');", true);
                return;
            }
            // Check for duplicate PK
            if (!string.IsNullOrEmpty(pkColumn) && !string.IsNullOrEmpty(pkValue))
            {
                using (SqlConnection conCheck = new SqlConnection(connectionString))
                using (SqlCommand checkCmd = new SqlCommand($"SELECT COUNT(1) FROM [{tableName}] WHERE [{pkColumn}]=@pkValue", conCheck))
                {
                    checkCmd.Parameters.AddWithValue("@pkValue", pkValue);
                    conCheck.Open();
                    int exists = (int)checkCmd.ExecuteScalar();
                    if (exists > 0)
                    {
                        // Use ScriptManager and this reference
                        if (ScriptManager.GetCurrent(this.Page) != null)
                        {
                            ScriptManager.RegisterStartupScript(this.Page, this.Page.GetType(), "dupAlert",
                                $"alert('A record with {pkColumn}={pkValue} already exists!');", true);
                        }
                        else
                        {
                            // fallback if no ScriptManager
                            ClientScript.RegisterStartupScript(this.GetType(), "dupAlert",
                                $"alert('A record with {pkColumn}={pkValue} already exists!');", true);
                        }
                        return;
                    }
                }
            }
            // Insert record
            string colList = string.Join(", ", columns);
            string paramList = string.Join(", ", parameters);
            cmd.CommandText = $"INSERT INTO [{tableName}] ({colList}) VALUES ({paramList})";
            try
            {
                cmd.Connection.Open();
                cmd.ExecuteNonQuery();
                ClientScript.RegisterStartupScript(this.GetType(), "alert",
                    "alert('Record added successfully'); window.location='AdminPanel.aspx';", true);

            }
            catch (Exception ex)
            {
                string safeMessage = HttpUtility.JavaScriptStringEncode(ex.Message);
                ClientScript.RegisterStartupScript(this.GetType(), "alert",
                    $"alert('{safeMessage}');", true);
            }
            finally
            {
                cmd.Connection.Close();
            }
        }
        protected void btnBack_Command(object sender, CommandEventArgs e)
        {
            Response.Redirect($"AdminPanel.aspx");
        }
    }
}
