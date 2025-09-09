<%@ Page Title="AdminPanel" Language="C#" AutoEventWireup="true" CodeBehind="AdminPanel.aspx.cs" Inherits="portfolio_html_css_js_dotnet_webform_2025_08_18.AdminPanel" ValidateRequest="false" %>

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
    <link rel="stylesheet" href="styles/admin-panel.css" type="text/css" />
    <link rel="stylesheet" href="styles/site.css" type="text/css" />
    <title>Admin Panel</title>
</head>
<body>
    <form id="adminPanel" runat="server">
        <h2>Welcome, <span class="highlight">Zunaied!</span></h2>
        <asp:Repeater ID="rptTables" runat="server" OnItemDataBound="rptTables_ItemDataBound">
            <ItemTemplate>
                <div class="table-section" style="margin-bottom: 40px;">
                    <h3><%# Eval("TABLE_NAME") %></h3>
                    <!-- Add Button -->
                    <asp:Button ID="btnAdd" runat="server" Text="Add New"
                        CommandName="Add" CommandArgument='<%# Eval("TABLE_NAME") %>'
                        OnCommand="btnAdd_Command" CssClass="btn-add" />
                    <!-- GridView for table rows -->
                    <asp:GridView ID="gvTable" runat="server"
                        AutoGenerateColumns="true"
                        CssClass="grid"
                        OnRowCommand="gvTable_RowCommand">
                        <Columns>
                            <asp:TemplateField HeaderText="Actions">
                                <ItemStyle CssClass="action-cell" />
                                <ItemTemplate>
                                    <asp:LinkButton ID="lnkUpdate" runat="server" CommandName="UpdateRow">
                                        Update
                                    </asp:LinkButton>
                                    <asp:LinkButton ID="lnkDelete" runat="server" CommandName="DeleteRow"
                                        OnClientClick="return confirm('Are you sure you want to delete this record?');">
                                        Delete
                                    </asp:LinkButton>
                                </ItemTemplate>
                            </asp:TemplateField>
                        </Columns>
                    </asp:GridView>
                </div>
            </ItemTemplate>
        </asp:Repeater>
    </form>
</body>
</html>
