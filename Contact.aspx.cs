using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace portfolio_html_css_js_dotnet_webform_2025_08_18
{
    public partial class Contact : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Only populate fields with cookies if it's not a postback
            if (!IsPostBack)
            {
                // Check if cookies exist and populate the form fields
                if (Request.Cookies["NameCookie"] != null)
                {
                    txtFormName.Text = Request.Cookies["NameCookie"].Value;
                }
                if (Request.Cookies["EmailCookie"] != null)
                {
                    txtFormEmail.Text = Request.Cookies["EmailCookie"].Value;
                }
                if (Request.Cookies["MessageCookie"] != null)
                {
                    txtFormMessage.Text = Request.Cookies["MessageCookie"].Value;
                }
            }         
        }
        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            string name = txtFormName.Text.Trim();
            string email = txtFormEmail.Text.Trim();
            string message = txtFormMessage.Text.Trim();
            InsertContactMessage(name, email, message);
            SetCookies(name, email, message);
        }
        private void InsertContactMessage(string name, string email, string message)
        {
            string connectionString = ConfigurationManager.ConnectionStrings["PortfolioDbConnection"].ConnectionString;
            string query = "INSERT INTO PortfolioHomeContact (Name, Email, Message, SubmittedAt) VALUES (@Name, @Email, @Message, @SubmittedAt)";
            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = new SqlCommand(query, connection);
            command.Parameters.AddWithValue("@Name", name);
            command.Parameters.AddWithValue("@Email", email);
            command.Parameters.AddWithValue("@Message", message);
            command.Parameters.AddWithValue("@SubmittedAt", DateTime.Now);
            try
            {
                connection.Open();
                int rowsAffected = command.ExecuteNonQuery();
                if (rowsAffected > 0)
                {
                    Response.Write("<script>alert('Your message has been sent successfully!');</script>");
                }
                else
                {
                    Response.Write("<script>alert('There was an error sending your message. Please try again later.');</script>");
                }
            }
            catch (Exception ex)
            {
                Response.Write("<script>alert('An error occurred: " + ex.Message + "');</script>");
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                {
                    connection.Close();
                }
            }
        }
        private void SetCookies(string name, string email, string message)
        {
            // Set cookies to expire in 90 days
            HttpCookie nameCookie = new HttpCookie("NameCookie", name)
            {
                Expires = DateTime.Now.AddDays(90)
            };
            HttpCookie emailCookie = new HttpCookie("EmailCookie", email)
            {
                Expires = DateTime.Now.AddDays(90)
            };
            HttpCookie messageCookie = new HttpCookie("MessageCookie", message)
            {
                Expires = DateTime.Now.AddDays(90)
            };
            // Add cookies to the response
            Response.Cookies.Add(nameCookie);
            Response.Cookies.Add(emailCookie);
            Response.Cookies.Add(messageCookie);
        }
    }
}