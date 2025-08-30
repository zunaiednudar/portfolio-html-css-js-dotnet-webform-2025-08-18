using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace portfolio_html_css_js_dotnet_webform_2025_08_18
{
    public partial class Blogs : System.Web.UI.Page
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
    }
}