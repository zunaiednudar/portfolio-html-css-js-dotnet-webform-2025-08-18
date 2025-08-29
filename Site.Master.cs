using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace portfolio_html_css_js_dotnet_webform_2025_08_18
{
    public partial class Site : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void DownloadCV_Click(object sender, EventArgs e)
        {
            string filePath = Server.MapPath("~/documents/cv-md-zunaied-nudar.pdf");
            Response.ContentType = "application/pdf";
            Response.AppendHeader("Content-Disposition", "attachment; filename=cv.pdf");
            Response.TransmitFile(filePath);
            Response.End();
        }
    }
}