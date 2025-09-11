using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace portfolio_html_css_js_dotnet_webform_2025_08_18
{
    public partial class AdminPanel : System.Web.UI.Page
    {
        string connectionString = ConfigurationManager.ConnectionStrings["PortfolioDbConnection"].ConnectionString;
        Dictionary<string, string> tablePKs = new Dictionary<string, string>()
        {
            { "PortfolioHomeSkillCategory", "CID" },
            { "PortfolioHomeSkillItem", "SID" },
            { "PortfolioBlogsItem", "BID" },
            { "PortfolioProjectsItem", "PID" }
        };
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                BindTables();
            }
        }
        private void BindTables()
        {
            DataTable tablesDT = new DataTable();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                // string query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE' AND TABLE_CATALOG='PortfolioDb'";
                string query = "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'";
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    try
                    {
                        con.Open();
                        da.Fill(tablesDT);
                        rptTables.DataSource = tablesDT;
                        rptTables.DataBind();
                    }
                    catch (Exception ex)
                    {
                        System.Diagnostics.Debug.WriteLine(ex.Message);
                    }
                }
            }
        }
        protected void rptTables_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {
                string tableName = DataBinder.Eval(e.Item.DataItem, "TABLE_NAME").ToString();
                GridView gv = (GridView)e.Item.FindControl("gvTable");
                Button btnAdd = (Button)e.Item.FindControl("btnAdd");
                // Hide Add button if table is Contact
                if (tableName.Equals("PortfolioHomeContact", StringComparison.OrdinalIgnoreCase))
                {
                    btnAdd.Visible = false;
                }
                // Load table data as usual
                DataTable dt = new DataTable();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlDataAdapter da = new SqlDataAdapter($"SELECT * FROM {tableName}", con);
                    da.Fill(dt);
                }
                string pkColumn = tablePKs.ContainsKey(tableName) ? tablePKs[tableName] : dt.Columns[0].ColumnName;
                gv.DataKeyNames = new string[] { pkColumn };
                gv.Attributes["TableName"] = tableName;
                gv.RowDataBound += (s, ev) =>
                {
                    if (ev.Row.RowType == DataControlRowType.DataRow)
                    {
                        LinkButton lnkUpdate = (LinkButton)ev.Row.FindControl("lnkUpdate");
                        LinkButton lnkDelete = (LinkButton)ev.Row.FindControl("lnkDelete");
                        string idValue = gv.DataKeys[ev.Row.RowIndex].Value.ToString();
                        // Hide Update button if table is Contact
                        if (tableName.Equals("PortfolioHomeContact", StringComparison.OrdinalIgnoreCase))
                        {
                            if (lnkUpdate != null) lnkUpdate.Visible = false;
                        }
                        if (lnkUpdate != null) lnkUpdate.CommandArgument = idValue;
                        if (lnkDelete != null) lnkDelete.CommandArgument = idValue;
                    }
                };

                gv.DataSource = dt;
                gv.DataBind();
            }
        }
        protected void gvTable_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            GridView gv = (GridView)sender;
            // Retrieve table name from the GridView attribute
            string tableName = gv.Attributes["TableName"];
            if (string.IsNullOrEmpty(tableName))
                return; // safety check
            string pkColumn = tablePKs.ContainsKey(tableName) ? tablePKs[tableName] : gv.DataKeyNames[0];
            string id = e.CommandArgument.ToString();
            if (e.CommandName == "DeleteRow")
            {
                DeleteRow(tableName, pkColumn, id);
            }
            else if (e.CommandName == "UpdateRow")
            {
                Response.Redirect($"UpdateRecord.aspx?table={tableName}&id={id}");
            }
        }
        private void DeleteRow(string tableName, string pkColumn, string id)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                try
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand($"DELETE FROM {tableName} WHERE {pkColumn}=@id", con);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine(ex.Message);
                }
                finally
                {
                    BindTables(); // Refresh after delete
                }
            }
        }
        protected void btnAdd_Command(object sender, CommandEventArgs e)
        {
            string tableName = e.CommandArgument.ToString();
            Response.Redirect($"AddRecord.aspx?table={tableName}");
        }
        protected void btnBack_Command(object sender, CommandEventArgs e)
        {
            Response.Redirect($"Home.aspx");
        }
    }
}
