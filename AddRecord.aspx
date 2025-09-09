<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AddRecord.aspx.cs" Inherits="portfolio_html_css_js_dotnet_webform_2025_08_18.AddRecord" ValidateRequest="false" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--Google Fonts-->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet" />
    <!--Web app icon-->
    <link rel="icon" href="images/icons8-person-100.png" type="image/png" />
    <!--Icons (Font Awesome)-->
    <script src="https://kit.fontawesome.com/115498d46a.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="styles/add-record.css" type="text/css" />
    <link rel="stylesheet" href="styles/site.css" type="text/css" />
    <title>Add New Record</title>
</head>
<body>
    <form id="addRecordForm" runat="server">
        <h2><asp:Label ID="lblTableName" runat="server" /></h2>
        <asp:Panel ID="pnlForm" runat="server"></asp:Panel>
        <asp:Button ID="btnAdd" runat="server" Text="Add" OnClick="btnAdd_Click" />
    </form>
<!--JavaScript-->
<script src="scripts/update-record.js"></script>
</body>
</html>
