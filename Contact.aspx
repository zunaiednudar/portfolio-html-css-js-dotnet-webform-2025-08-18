<%@ Page Title="Contact" Language="C#" AutoEventWireup="true" CodeBehind="Contact.aspx.cs" Inherits="portfolio_html_css_js_dotnet_webform_2025_08_18.Contact" %>
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <!--Google Fonts-->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet" />
    <!--CSS-->
    <link rel="stylesheet" href="styles/site.css" type="text/css" />
    <link rel="stylesheet" href="styles/contact.css" type="text/css" />
    <title>Contact Me</title>
</head>
<body class="contact">
    <form id="form1" runat="server">
        <div class="contact-form-container">
            <h2>Contact Me</h2>
            <hr />
            <div class="contact-form-container-div">
                <label for="<%= txtFormName.ClientID %>">Name:</label>
                <asp:TextBox ID="txtFormName" runat="server" CssClass="contact-form-container-div-textbox" placeholder="Enter your name" Required="true"></asp:TextBox>
            </div>
            <div class="contact-form-container-div">
                <label for="<%= txtFormEmail.ClientID %>">Email:</label>
                <asp:TextBox ID="txtFormEmail" runat="server" CssClass="contact-form-container-div-textbox" placeholder="Enter your email" Required="true" TextMode="Email"></asp:TextBox>
            </div>
            <div class="contact-form-container-div">
                <label for="<%= txtFormMessage.ClientID %>">Message:</label>
                <asp:TextBox ID="txtFormMessage" runat="server" CssClass="contact-form-container-div-textarea" placeholder="Your message here" TextMode="MultiLine" Rows="4" Required="true"></asp:TextBox>
            </div>
            <div class="contact-form-container-div">
                <asp:Button ID="btnFormSubmit" runat="server" Text="Submit" CssClass="contact-form-container-div-button-submit" OnClick="btnSubmit_Click" />
            </div>
            <!--JavaScript-->
            <script src="scripts/contact.js"></script>
        </div>
    </form>
</body>
</html>
