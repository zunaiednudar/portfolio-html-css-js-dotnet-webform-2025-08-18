using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;

namespace portfolio_html_css_js_dotnet_webform_2025_08_18
{
    public partial class Site : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                // AUTO FILL FROM COOKIES
                if (Request.Cookies["AdminUsername"] != null)
                {
                    txtAdminUsername.Attributes["value"] = Request.Cookies["AdminUsername"].Value;
                }
                if (Request.Cookies["AdminPassword"] != null)
                {
                    txtAdminPassword.Attributes["value"] = Request.Cookies["AdminPassword"].Value;
                }
            }
        }
        protected void DownloadCV_Click(object sender, EventArgs e)
        {
            string filePath = Server.MapPath("~/documents/cv-md-zunaied-nudar.pdf");
            Response.ContentType = "application/pdf";
            Response.AppendHeader("Content-Disposition", "attachment; filename=cv.pdf");
            Response.TransmitFile(filePath);
            Response.End();
        }
        protected void btnAdminSubmit_Click(object sender, EventArgs e)
        {
            string username = txtAdminUsername.Text.Trim();
            string password = txtAdminPassword.Text.Trim();
            if (username == "admin" && password == "2107041")
            {
                // COOKIES STORAGE (AUTO FILL)
                Response.Cookies["AdminUsername"].Value = username;
                Response.Cookies["AdminUsername"].Expires = DateTime.Now.AddDays(7);
                Response.Cookies["AdminPassword"].Value = password;
                Response.Cookies["AdminPassword"].Expires = DateTime.Now.AddDays(7);
                Response.Redirect("AdminPanel.aspx");
            }
            else
            {
                loginError.InnerText = "Invalid username or password!";
                loginError.Style["display"] = "block";
            }
        }
    }
}