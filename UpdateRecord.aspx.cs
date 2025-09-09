using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace portfolio_html_css_js_dotnet_webform_2025_08_18
{
    public partial class UpdateRecord : System.Web.UI.Page
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
        string pkColumn;
        string recordId;
        protected void Page_Load(object sender, EventArgs e)
        {
            tableName = Request.QueryString["table"];
            recordId = Request.QueryString["id"];
            if (string.IsNullOrEmpty(tableName) || string.IsNullOrEmpty(recordId))
            {
                ClientScript.RegisterStartupScript(this.GetType(), "alert", "alert('Invalid table or record ID.');", true);
                return;
            }
            pkColumn = tablePKs.ContainsKey(tableName) ? tablePKs[tableName] : "ID";
            lblTableName.Text = $"Update <span class='highlight-table-name'>{tableName}</span>";
            LoadRecord();
        }
        private void LoadRecord()
        {
            DataTable dt = new DataTable();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = $"SELECT * FROM [{tableName}] WHERE [{pkColumn}]=@id";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@id", recordId);
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    da.Fill(dt);
                }
            }
            if (dt.Rows.Count == 0) return;
            pnlForm.Controls.Clear();
            foreach (DataColumn col in dt.Columns)
            {
                if (col.ColumnName == pkColumn) continue;
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
                    Text = dt.Rows[0][col.ColumnName].ToString(),
                    ClientIDMode = ClientIDMode.Static,
                    TextMode = TextBoxMode.MultiLine,
                    CssClass = "form-input auto-resize"
                };
                divWrapper.Controls.Add(lbl);
                divWrapper.Controls.Add(txt);
                pnlForm.Controls.Add(divWrapper);
            }
        }
        protected void btnUpdate_Click(object sender, EventArgs e)
        {
            List<string> setClauses = new List<string>();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = new SqlConnection(connectionString);
            string newPkValue = null;
            void AddTextBoxParameters(Control parent)
            {
                foreach (Control ctrl in parent.Controls)
                {
                    if (ctrl is TextBox txt)
                    {
                        string colName = txt.ID.Replace("txt_", "");
                        setClauses.Add($"[{colName}]=@{colName}");
                        cmd.Parameters.AddWithValue("@" + colName, txt.Text ?? "");

                        if (colName == pkColumn)
                            newPkValue = txt.Text;
                    }
                    else if (ctrl.HasControls())
                    {
                        AddTextBoxParameters(ctrl);
                    }
                }
            }
            AddTextBoxParameters(pnlForm);
            if (setClauses.Count == 0)
            {
                ClientScript.RegisterStartupScript(this.GetType(), "alert", "alert('Nothing to update!');", true);
                return;
            }
            // Check if PK value already exists (but not the current record)
            if (!string.IsNullOrEmpty(pkColumn) && !string.IsNullOrEmpty(newPkValue) && newPkValue != recordId)
            {
                using (SqlConnection conCheck = new SqlConnection(connectionString))
                using (SqlCommand checkCmd = new SqlCommand($"SELECT COUNT(1) FROM [{tableName}] WHERE [{pkColumn}]=@pkValue AND [{pkColumn}]<>@currentId", conCheck))
                {
                    checkCmd.Parameters.AddWithValue("@pkValue", newPkValue);
                    checkCmd.Parameters.AddWithValue("@currentId", recordId);
                    conCheck.Open();
                    int exists = (int)checkCmd.ExecuteScalar();
                    if (exists > 0)
                    {
                        ClientScript.RegisterStartupScript(this.GetType(), "alert", $"alert('A record with {pkColumn}={newPkValue} already exists!');", true);
                        return;
                    }
                }
            }
            string setClause = string.Join(", ", setClauses);
            cmd.CommandText = $"UPDATE [{tableName}] SET {setClause} WHERE [{pkColumn}]=@id";
            cmd.Parameters.AddWithValue("@id", recordId);
            try
            {
                cmd.Connection.Open();
                int rows = cmd.ExecuteNonQuery();
                if (rows > 0)
                    ClientScript.RegisterStartupScript(this.GetType(), "alert", "alert('Record updated successfully');window.location='AdminPanel.aspx';", true);
                else
                    ClientScript.RegisterStartupScript(this.GetType(), "alert", "alert('No record was updated.');", true);
            }
            catch (Exception ex)
            {
                ClientScript.RegisterStartupScript(this.GetType(), "alert", $"alert('Error: {ex.Message}');", true);
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
